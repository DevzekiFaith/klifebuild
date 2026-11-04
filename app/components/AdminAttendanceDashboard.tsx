"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Users, UserCheck, Search, Filter, Calendar, MapPin, Globe, RefreshCw, CheckCircle2, ShieldCheck, Radio, ChevronDown, Layers } from "lucide-react";
import { fetchSundayAttendanceSummary, fetchCumulativeAttendanceMetrics, subscribeToSundayAttendance, logoutAuthRole, recordManualBatchHeadcount, AttendanceSummary, CumulativeMetrics, SundayAttendanceLog, AuthRole } from "../../lib/supabase";
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
  const [cumulative, setCumulative] = useState<CumulativeMetrics | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
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

  const loadAttendance = async (targetDate?: string) => {
    setIsLoading(true);
    const dateToFetch = targetDate || selectedDate;
    try {
      const data = await fetchSundayAttendanceSummary(dateToFetch);
      const cumData = await fetchCumulativeAttendanceMetrics();
      setSummary(data);
      setCumulative(cumData);
    } catch (err) {
      console.warn("Error refreshing live headcount:", err);
    } finally {
      setTimeout(() => setIsLoading(false), 400);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAttendance(selectedDate);

      // Subscribe to Supabase Realtime WebSocket changes
      const unsubscribe = subscribeToSundayAttendance((newLog) => {
        setSummary((prev) => {
          if (!prev) return prev;
          // Only append if the check-in belongs to the currently selected Sunday
          if (newLog.serviceDate !== selectedDate) return prev;
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

        setCumulative((prevCum) => {
          if (!prevCum) return null;
          return {
            ...prevCum,
            cumulativeTotalCheckIns: prevCum.cumulativeTotalCheckIns + 1,
          };
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [isOpen, selectedDate]);

  const handleQuickManualAdd = async (
    countToAdd: number = 1,
    label: string = "Adult Male (Man)",
    roleTag: string = "Adult Male",
    genderTag?: "MALE" | "FEMALE"
  ) => {
    setIsLoading(true);
    const newLogs = await recordManualBatchHeadcount(countToAdd, label, roleTag, genderTag);
    setSummary((prev) => {
      if (!prev) return null;
      const updated = [...newLogs, ...prev.attendees];
      const boys = updated.filter((l) => (l.role.toLowerCase().includes("child") || l.role.toLowerCase().includes("boy")) && l.gender === "MALE").length;
      const girls = updated.filter((l) => (l.role.toLowerCase().includes("child") || l.role.toLowerCase().includes("girl")) && l.gender === "FEMALE").length;
      const men = updated.filter((l) => !(l.role.toLowerCase().includes("child") || l.role.toLowerCase().includes("boy") || l.role.toLowerCase().includes("girl")) && l.gender === "MALE").length;
      const women = updated.filter((l) => !(l.role.toLowerCase().includes("child") || l.role.toLowerCase().includes("boy") || l.role.toLowerCase().includes("girl")) && l.gender === "FEMALE").length;

      return {
        ...prev,
        totalAttendees: updated.length,
        inPersonCount: updated.filter((a) => a.attendanceType === "IN_PERSON").length,
        streamCount: updated.filter((a) => a.attendanceType === "GLOBAL_STREAM").length,
        demographics: { men, women, boys, girls },
        attendees: updated,
      };
    });
    setCumulative((prevCum) => {
      if (!prevCum) return null;
      return {
        ...prevCum,
        cumulativeTotalCheckIns: prevCum.cumulativeTotalCheckIns + countToAdd,
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

  const isTodaySelected = selectedDate === new Date().toISOString().split("T")[0];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl bg-white text-black p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xl my-auto max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
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
          </div>

          <div className="flex items-center gap-2">
            {/* Sunday Service Date Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-8 pr-8 py-2 rounded-full border border-gray-200 focus:border-black text-xs font-mono bg-gray-50 text-black font-bold appearance-none cursor-pointer"
              >
                <option value={new Date().toISOString().split("T")[0]}>
                  Sunday, {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })} (Today's Service)
                </option>
                {cumulative?.availableServiceDates
                  .filter((d) => d !== new Date().toISOString().split("T")[0])
                  .map((d) => (
                    <option key={d} value={d}>
                      Sunday, {new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </option>
                  ))}
              </select>
              <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            </div>

            <button
              onClick={() => {
                logoutAuthRole();
                onLogout();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 hover:border-black text-xs font-mono text-zinc-600 hover:text-black transition-colors cursor-pointer shrink-0"
              title="Lock Admin Session"
            >
              <LogOut className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Lock Session</span>
              <span className="sm:hidden">Log Out</span>
            </button>
          </div>
        </div>

        {/* Real-time & Cumulative Headcount Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Selected Sunday Headcount (Fresh for each Sunday) */}
          <div className="p-5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#d4af37]">
              <span>{isTodaySelected ? "THIS SUNDAY" : "SELECTED SERVICE"}</span>
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-serif-headline text-4xl text-white font-normal">
              {summary ? summary.totalAttendees : 0}
            </h4>
            <p className="text-[10px] font-mono text-zinc-400">
              {isTodaySelected ? "Fresh Count Starting Today" : `Service Date: ${selectedDate}`}
            </p>
          </div>

          {/* In-Person Sanctuary */}
          <div className="p-5 bg-zinc-50 border border-gray-200 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>SANCTUARY HALL</span>
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
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
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

          {/* Cumulative All-Time Check-Ins Card */}
          <div className="p-5 bg-zinc-50 border border-gray-200 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>ALL-TIME CHECK-INS</span>
              <Layers className="w-4 h-4 text-[#3b2262]" />
            </div>
            <h4 className="font-serif-headline text-4xl text-[#3b2262] font-normal">
              {cumulative ? cumulative.cumulativeTotalCheckIns : 0}
            </h4>
            <p className="text-[10px] font-mono text-zinc-500">
              Cumulative Total Across Sundays
            </p>
          </div>

        </div>

        {/* Demographic Gender & Age Breakdown Strip */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
              Sunday Attendance Demographics
            </span>
            <h5 className="font-serif-headline text-lg text-black">
              Gender & Age Breakdown
            </h5>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
            <div className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-black flex items-center gap-1.5 shadow-2xs">
              <span>👨 Men:</span>
              <span className="text-blue-600">{summary?.demographics.men || 0}</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-black flex items-center gap-1.5 shadow-2xs">
              <span>👩 Women:</span>
              <span className="text-purple-600">{summary?.demographics.women || 0}</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-black flex items-center gap-1.5 shadow-2xs">
              <span>👦 Boys:</span>
              <span className="text-emerald-600">{summary?.demographics.boys || 0}</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-black flex items-center gap-1.5 shadow-2xs">
              <span>👧 Girls:</span>
              <span className="text-pink-600">{summary?.demographics.girls || 0}</span>
            </div>
          </div>
        </div>

        {/* Manual Hand Count & Gender Entry Bar (Protocol Usher Control) */}
        {isTodaySelected && (
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <h5 className="font-mono text-xs font-bold text-amber-950 uppercase tracking-wider">
                    Quick Hand Count Tally (Usher & Protocol Gate)
                  </h5>
                  <p className="text-[11px] font-mono text-amber-800">
                    Tally walk-in adults, elders, children without QR phones.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleQuickManualAdd(1, "Adult Male (Man)", "Adult Male", "MALE")}
                  className="px-3 py-2 rounded-xl bg-zinc-900 text-white font-mono text-xs font-bold hover:bg-black transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>👨 +1 Man</span>
                </button>

                <button
                  onClick={() => handleQuickManualAdd(1, "Adult Female (Woman)", "Adult Female", "FEMALE")}
                  className="px-3 py-2 rounded-xl bg-purple-900 text-white font-mono text-xs font-bold hover:bg-purple-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>👩 +1 Woman</span>
                </button>

                <button
                  onClick={() => handleQuickManualAdd(1, "Child Male (Boy)", "Child Sanctuary", "MALE")}
                  className="px-3 py-2 rounded-xl bg-blue-900 text-white font-mono text-xs font-bold hover:bg-blue-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>👦 +1 Boy</span>
                </button>

                <button
                  onClick={() => handleQuickManualAdd(1, "Child Female (Girl)", "Child Sanctuary", "FEMALE")}
                  className="px-3 py-2 rounded-xl bg-pink-900 text-white font-mono text-xs font-bold hover:bg-pink-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>👧 +1 Girl</span>
                </button>

                <button
                  onClick={() => setIsManualAdding(!isManualAdding)}
                  className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-mono text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Batch</span>
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
        )}

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

          {/* Filter Pills & Refresh */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                filterType === "ALL" ? "bg-black text-white" : "bg-gray-100 text-zinc-600 hover:text-black"
              }`}
            >
              All ({summary?.attendees.length || 0})
            </button>

            <button
              onClick={() => setFilterType("IN_PERSON")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                filterType === "IN_PERSON" ? "bg-black text-white" : "bg-gray-100 text-zinc-600 hover:text-black"
              }`}
            >
              Sanctuary ({summary?.inPersonCount || 0})
            </button>

            <button
              onClick={() => setFilterType("GLOBAL_STREAM")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                filterType === "GLOBAL_STREAM" ? "bg-black text-white" : "bg-gray-100 text-zinc-600 hover:text-black"
              }`}
            >
              Online Stream ({summary?.streamCount || 0})
            </button>
          </div>

        </div>

        {/* Live Attendance Member Roster Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-gray-100 pb-2">
            <span>SUNDAY SANCTUARY ATTENDANCE LOG</span>
            <span>SHOWING {filteredAttendees?.length || 0} RECORDS</span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="p-8 text-center text-xs font-mono text-zinc-400 animate-pulse">
                Fetching live Sunday attendance logs...
              </div>
            ) : filteredAttendees && filteredAttendees.length > 0 ? (
              filteredAttendees.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-gray-50/70 hover:bg-gray-100 rounded-xl border border-gray-100 transition-colors flex items-center justify-between gap-4 text-xs font-mono"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-700 font-bold flex items-center justify-center shrink-0">
                      {log.fullName[0]?.toUpperCase() || "M"}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-zinc-900 truncate">
                        {maskName(log.fullName)}
                      </h5>
                      <p className="text-[10px] text-zinc-500 truncate">
                        {log.memberId} • {log.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.attendanceType === "IN_PERSON"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {log.attendanceType === "IN_PERSON" ? "IN-PERSON" : "STREAM"}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {log.checkInTime}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center border border-dashed border-gray-200 rounded-2xl text-xs font-mono text-zinc-400">
                No attendance records matching filter criteria for this Sunday.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => loadAttendance(selectedDate)}
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
