"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Users, UserCheck, Search, Filter, Calendar, MapPin, Globe, RefreshCw, CheckCircle2, ShieldCheck, Radio } from "lucide-react";
import { fetchSundayAttendanceSummary, subscribeToSundayAttendance, logoutAuthRole, recordManualBatchHeadcount, AttendanceSummary, SundayAttendanceLog, AuthRole } from "../../lib/supabase";
import { LogOut, Lock, Plus, UserPlus, Heart } from "lucide-react";

interface AdminAttendanceDashboardProps {
  isOpen: boolean;
  authRole: AuthRole;
  onClose: () => void;
  onLogout: () => void;
}

export default function AdminAttendanceDashboard({
  isOpen,
  authRole,
  onClose,
  onLogout,
}: AdminAttendanceDashboardProps) {
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "IN_PERSON" | "GLOBAL_STREAM">("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isManualAdding, setIsManualAdding] = useState(false);
  const [customManualCount, setCustomManualCount] = useState(1);
  const [customCategory, setCustomCategory] = useState("Elderly Attendee / Walk-in Guest");

  // Usher Privacy Data Masking Helper
  const maskName = (name: string) => {
    if (authRole === "MASTER_ADMIN") return name;
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return `${parts[0]} ${parts[1][0]}.`;
    }
    return parts[0];
  };

  const loadAttendance = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSundayAttendanceSummary();
      setSummary(data);
    } catch (err) {
      console.warn("Error refreshing live headcount:", err);
    } finally {
      setTimeout(() => setIsLoading(false), 400);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAttendance();

      // Subscribe to Supabase Realtime WebSocket changes
      const unsubscribe = subscribeToSundayAttendance((newLog) => {
        setSummary((prev) => {
          if (!prev) return prev;
          const exists = prev.attendees.some((a) => a.memberId === newLog.memberId);
          if (exists) return prev;

          const updatedAttendees = [newLog, ...prev.attendees];
          return {
            ...prev,
            totalAttendees: updatedAttendees.length,
            inPersonCount: updatedAttendees.filter((a) => a.attendanceType === "IN_PERSON").length,
            streamCount: updatedAttendees.filter((a) => a.attendanceType === "GLOBAL_STREAM").length,
            attendees: updatedAttendees,
          };
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [isOpen]);

  const handleQuickManualAdd = async (
    countToAdd: number = 1,
    label: string = "Elderly Attendee / Walk-in Guest",
    roleTag: string = "Elder / Walk-in Guest"
  ) => {
    setIsLoading(true);
    const newLogs = await recordManualBatchHeadcount(countToAdd, label, roleTag);
    setSummary((prev) => {
      if (!prev) return null;
      const updated = [...newLogs, ...prev.attendees];
      return {
        ...prev,
        totalAttendees: updated.length,
        inPersonCount: updated.filter((a) => a.attendanceType === "IN_PERSON").length,
        streamCount: updated.filter((a) => a.attendanceType === "GLOBAL_STREAM").length,
        attendees: updated,
      };
    });
    setIsLoading(false);
    setIsManualAdding(false);
  };

  if (!isOpen) return null;

  const filteredAttendees = summary?.attendees.filter((log) => {
    const matchesSearch =
      log.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.role.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "IN_PERSON") return matchesSearch && log.attendanceType === "IN_PERSON";
    if (filterType === "GLOBAL_STREAM") return matchesSearch && log.attendanceType === "GLOBAL_STREAM";
    return matchesSearch;
  });

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-3xl bg-white text-black p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xl my-auto max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header Strip */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image
                src="/images/logo_icon_nobg.png"
                alt="Lifebuild Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                    {authRole === "MASTER_ADMIN" ? "Convener Master Access" : "Protocol Usher Privacy View"}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    REALTIME SYNC
                  </span>
                </div>
                <h3 className="font-serif-headline text-2xl text-zinc-950">
                  Live Sunday Attendance Dashboard
                </h3>
              </div>

              <button
                onClick={() => {
                  logoutAuthRole();
                  onLogout();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-black text-xs font-mono text-zinc-600 hover:text-black transition-colors cursor-pointer shrink-0 ml-2"
                title="Lock Admin Session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                <span className="hidden sm:inline">Lock Session</span>
                <span className="sm:hidden">Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Headcount Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Total Headcount */}
          <div className="p-5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#d4af37]">
              <span>TOTAL HEADCOUNT</span>
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-serif-headline text-4xl text-white font-normal">
              {summary ? summary.totalAttendees : 0}
            </h4>
            <p className="text-[10px] font-mono text-zinc-400">
              Service Date: {summary?.serviceDate}
            </p>
          </div>

          {/* In-Person Sanctuary */}
          <div className="p-5 bg-zinc-50 border border-gray-200 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>IN-PERSON SANCTUARY</span>
              <MapPin className="w-4 h-4 text-black" />
            </div>
            <h4 className="font-serif-headline text-4xl text-black font-normal">
              {summary ? summary.inPersonCount : 0}
            </h4>
            <p className="text-[10px] font-mono text-emerald-600 font-bold">
              ● Gate & Manual Count
            </p>
          </div>

          {/* Global Stream */}
          <div className="p-5 bg-zinc-50 border border-gray-200 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>GLOBAL STREAM</span>
              <Globe className="w-4 h-4 text-black" />
            </div>
            <h4 className="font-serif-headline text-4xl text-black font-normal">
              {summary ? summary.streamCount : 0}
            </h4>
            <p className="text-[10px] font-mono text-zinc-500">
              Online Check-ins
            </p>
          </div>

        </div>

        {/* Manual Hand Count & Elder / Child Care Entry Bar (Protocol Usher Control) */}
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <h5 className="font-mono text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Manual Hand Count (Elderly, Children & Non-Digital Guests)
                </h5>
                <p className="text-[11px] font-mono text-amber-800">
                  Tally walk-in elderly attendees, children, or visitors without QR phones.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleQuickManualAdd(1, "Child Sanctuary Attendee", "Child Sanctuary")}
                className="px-3 py-2 rounded-xl bg-blue-900 text-white font-mono text-xs font-bold hover:bg-blue-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+1 Child</span>
              </button>

              <button
                onClick={() => handleQuickManualAdd(1, "Elderly Attendee / Walk-in Guest", "Elder / Walk-in Guest")}
                className="px-3 py-2 rounded-xl bg-amber-900 text-white font-mono text-xs font-bold hover:bg-amber-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+1 Elder</span>
              </button>

              <button
                onClick={() => setIsManualAdding(!isManualAdding)}
                className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-mono text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Batch Count</span>
              </button>
            </div>
          </div>

          {/* Batch Count Sub-Panel */}
          {isManualAdding && (
            <div className="pt-3 border-t border-amber-200/80 flex flex-wrap items-center gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-900 font-bold">Count:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={customManualCount}
                  onChange={(e) => setCustomManualCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 p-2 rounded-lg border border-amber-300 text-xs font-mono bg-white text-black"
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Category label e.g. Elderly Guests"
                  className="w-full p-2 rounded-lg border border-amber-300 text-xs font-mono bg-white text-black"
                />
              </div>

              <button
                onClick={() => handleQuickManualAdd(customManualCount, customCategory)}
                className="px-4 py-2 rounded-lg bg-black text-white font-mono text-xs font-bold hover:bg-zinc-800 cursor-pointer"
              >
                Record {customManualCount} Attendees
              </button>
            </div>
          )}
        </div>

        {/* Roster Controls: Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search member, ID, or role..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-black text-xs font-mono bg-gray-50/50"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex bg-gray-100 p-1 rounded-full text-xs font-mono w-full sm:w-auto">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-3 py-1.5 rounded-full font-bold transition-all ${
                filterType === "ALL" ? "bg-black text-white" : "text-zinc-600 hover:text-black"
              }`}
            >
              All ({summary?.totalAttendees || 0})
            </button>
            <button
              onClick={() => setFilterType("IN_PERSON")}
              className={`px-3 py-1.5 rounded-full font-bold transition-all ${
                filterType === "IN_PERSON" ? "bg-black text-white" : "text-zinc-600 hover:text-black"
              }`}
            >
              Sanctuary
            </button>
            <button
              onClick={() => setFilterType("GLOBAL_STREAM")}
              className={`px-3 py-1.5 rounded-full font-bold transition-all ${
                filterType === "GLOBAL_STREAM" ? "bg-black text-white" : "text-zinc-600 hover:text-black"
              }`}
            >
              Stream
            </button>
          </div>

        </div>

        {/* Attendees List Roster Table */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-2 uppercase">
            <span>Attendee Credentials</span>
            <span>Check-in Status</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {filteredAttendees && filteredAttendees.length > 0 ? (
              filteredAttendees.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border border-gray-200 rounded-2xl flex items-center justify-between hover:border-black transition-colors bg-white shadow-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h5 className="font-heading font-bold text-sm text-black">
                        {maskName(log.fullName)}
                      </h5>
                      <span className="text-[9px] font-mono bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded font-bold">
                        {log.memberId}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-light">
                      {log.role}
                    </p>
                  </div>

                  <div className="text-right space-y-0.5">
                    <span className="text-xs font-mono font-bold text-emerald-600 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {log.attendanceType === "IN_PERSON" ? "In-Person" : "Global Stream"}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 block">
                      {log.checkInTime}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center border border-dashed border-gray-200 rounded-2xl text-xs font-mono text-zinc-400">
                No attendance records matching filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={loadAttendance}
            className="text-xs font-mono text-zinc-600 hover:text-black flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh Live Headcount</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAuthRole();
                onLogout();
              }}
              className="px-4 py-2.5 rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-mono font-medium hover:bg-zinc-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
