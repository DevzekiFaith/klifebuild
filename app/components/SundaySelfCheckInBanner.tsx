"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, QrCode, Clock, MapPin, Globe, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { MemberData } from "./RegistrationForm";
import { recordSundayAttendance } from "../../lib/supabase";

interface SundaySelfCheckInBannerProps {
  currentMember: MemberData | null;
  onOpenRegister: () => void;
  onOpenPass: () => void;
}

export default function SundaySelfCheckInBanner({
  currentMember,
  onOpenRegister,
  onOpenPass,
}: SundaySelfCheckInBannerProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  const [attendanceType, setAttendanceType] = useState<"IN_PERSON" | "GLOBAL_STREAM">("IN_PERSON");
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [manualMemberId, setManualMemberId] = useState("");
  const [isSundayActive, setIsSundayActive] = useState(true); // Default active for preview

  useEffect(() => {
    // Check if user already checked in for today
    const today = new Date().toISOString().split("T")[0];
    const savedCheckIn = localStorage.getItem(`sunday_checkin_${today}`);
    if (savedCheckIn) {
      const parsed = JSON.parse(savedCheckIn);
      setIsCheckedIn(true);
      setCheckInTime(parsed.time);
    }
  }, []);

  const handleSelfCheckIn = async (overrideMember?: MemberData) => {
    const targetMember = overrideMember || currentMember;
    const nameToUse = targetMember ? targetMember.fullName : manualMemberId || "Fellowship Leader";
    const idToUse = targetMember ? targetMember.memberId : manualMemberId || `LB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const roleToUse = targetMember ? targetMember.role : "Kingdom Builder";

    setIsCheckingIn(true);

    const log = await recordSundayAttendance(
      idToUse,
      nameToUse,
      roleToUse,
      attendanceType,
      "SELF_CHECKIN"
    );

    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(
      `sunday_checkin_${today}`,
      JSON.stringify({ checkedIn: true, time: log.checkInTime, name: nameToUse })
    );

    setTimeout(() => {
      setIsCheckedIn(true);
      setCheckInTime(log.checkInTime);
      setIsCheckingIn(false);
    }, 600);
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-black text-white border-b border-zinc-800 py-6 px-6 sm:px-10 lg:px-16 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Live Badge & Description */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-1 shrink-0 shadow-md">
            <Image
              src="/images/logo_icon_nobg.png"
              alt="Lifebuild Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
              loading="eager"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ● 2ND & 4TH SUNDAY GATHERING CHECK-IN ACTIVE (5:00 PM - 6:00 PM GMT+1 • 60 MINS)
              </span>
            </div>

            <h3 className="font-serif-headline text-xl sm:text-2xl text-white font-normal">
              Check-In to Today's Sanctuary & 4T Stream
            </h3>

            <p className="text-xs text-zinc-400 font-light max-w-xl">
              Record your Sunday presence, confirm your sanctuary or stream seat, and unlock today's 4T Conference notes.
            </p>
          </div>
        </div>

        {/* Right Side: Check-In Controls */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 shrink-0">
          
          {isCheckedIn ? (
            <div className="w-full sm:w-auto p-3 px-6 bg-emerald-950/60 border border-emerald-500/50 rounded-full flex items-center justify-center gap-2 text-emerald-300 text-xs font-mono font-bold shadow-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Checked In ({checkInTime})</span>
            </div>
          ) : (
            <>
              {/* Attendance Mode Selector */}
              <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-full text-xs font-mono w-full sm:w-auto">
                <button
                  onClick={() => setAttendanceType("IN_PERSON")}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold transition-all ${
                    attendanceType === "IN_PERSON" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>Sanctuary</span>
                </button>
                <button
                  onClick={() => setAttendanceType("GLOBAL_STREAM")}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold transition-all ${
                    attendanceType === "GLOBAL_STREAM" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  <span>Stream</span>
                </button>
              </div>

              {/* 1-Click Check In Button */}
              <button
                onClick={() => (currentMember ? handleSelfCheckIn() : onOpenRegister())}
                disabled={isCheckingIn}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isCheckingIn ? (
                  <span>Checking In...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#3b2262]" />
                    <span>{currentMember ? "1-Click Sunday Check-In" : "Join & Check-In"}</span>
                  </>
                )}
              </button>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
