"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { X, QrCode, CheckCircle2, Camera, RefreshCw, UserCheck, ShieldCheck, Download, Plus, Heart } from "lucide-react";
import { MemberData } from "./RegistrationForm";
import { recordSundayAttendance, recordManualBatchHeadcount } from "../../lib/supabase";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMember: MemberData | null;
}

interface AttendanceLog {
  id: string;
  name: string;
  role: string;
  timestamp: string;
  status: "VERIFIED" | "PENDING";
}

export default function QRScannerModal({
  isOpen,
  onClose,
  currentMember,
}: QRScannerModalProps) {
  const [activeTab, setActiveTab] = useState<"PASS" | "SCANNER">("PASS");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<AttendanceLog | null>(null);
  const [manualSuccessMsg, setManualSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const memberId = currentMember ? currentMember.memberId : "LB-2026-9041";
  const memberName = currentMember ? currentMember.fullName : "Zeki Ubor (Founder)";
  const memberRole = currentMember ? currentMember.role : "Founder & Executive";
  const memberMode = currentMember ? currentMember.attendanceMode : "In-Person Gathering";

  const visionMeetingInfo = `LIFE BUILD GATHERING & 4T CONFERENCE
--------------------------------------------
MEMBER: ${memberName}
ID: ${memberId}
ROLE: ${memberRole}
MODE: ${memberMode}

SUNDAY GATHERING DETAILS:
• Time: 2nd & 4th Sunday @ 5:00 PM GMT+1
• Location: Life Build Center & Global Stream
• Convener: Zeki Ubor
• Anchor: Isaiah 58:12 (Rebuilding Broken Walls)
--------------------------------------------
https://www.lifebuildglobal.com.ng`;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScannedResult(null);
    setManualSuccessMsg(null);

    setTimeout(async () => {
      const newLog: AttendanceLog = {
        id: memberId,
        name: memberName,
        role: memberRole,
        timestamp: `${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • Gate 1 Entrance`,
        status: "VERIFIED",
      };

      await recordSundayAttendance(
        memberId,
        memberName,
        memberRole,
        memberMode.includes("Stream") ? "GLOBAL_STREAM" : "IN_PERSON",
        "GATE_SCANNER"
      );

      setScannedResult(newLog);
      setIsScanning(false);
    }, 1000);
  };

  const handleElderlyManualCheckin = async () => {
    setScannedResult(null);
    const logs = await recordManualBatchHeadcount(1, "Elderly Attendee / Guest");
    setManualSuccessMsg(`Logged Elderly Attendee Check-In at ${logs[0].checkInTime}`);
    setTimeout(() => {
      setManualSuccessMsg(null);
    }, 4000);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-white text-black p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xl my-auto max-h-[88vh] overflow-y-auto space-y-6">
        
        {/* Prominent High-Contrast Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white text-zinc-600 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header with Lifebuild Logo */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 pr-8">
          <div className="relative w-10 h-10 flex items-center justify-center bg-transparent shrink-0">
            <Image
              src="/images/logo_icon_nobg.png"
              alt="Lifebuild Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
              Sunday Gathering Entrance
            </span>
            <h3 className="font-serif-headline text-2xl text-zinc-950">
              Vision Pass & Scanner
            </h3>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-gray-100 p-1 rounded-full text-xs font-mono">
          <button
            onClick={() => setActiveTab("PASS")}
            className={`flex-1 py-2.5 rounded-full font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "PASS" ? "bg-black text-white shadow-xs" : "text-zinc-600 hover:text-black"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>My Scannable QR Pass</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab("SCANNER");
              handleSimulateScan();
            }}
            className={`flex-1 py-2.5 rounded-full font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "SCANNER" ? "bg-black text-white shadow-xs" : "text-zinc-600 hover:text-black"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Gate Scanner</span>
          </button>
        </div>

        {/* TAB 1: PASS QR CODE DISPLAY */}
        {activeTab === "PASS" && (
          <div className="space-y-6">
            <div className="bg-[#141414] text-white p-6 rounded-2xl border border-zinc-800 space-y-4 text-center">
              
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block">
                  SUNDAY GATHERING ENTRANCE
                </span>
                <h4 className="font-serif-headline text-2xl text-white font-normal">
                  {memberName}
                </h4>
                <p className="text-xs font-mono text-zinc-400">
                  {memberId} • {memberRole}
                </p>
              </div>

              {/* Scannable QR Code */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 my-2 space-y-2">
                <QRCodeSVG
                  value={visionMeetingInfo}
                  size={180}
                  level="M"
                  includeMargin={true}
                  fgColor="#111111"
                  bgColor="#ffffff"
                />
                <span className="text-[9px] font-mono text-zinc-900 font-bold uppercase tracking-wider block pt-1 border-t border-zinc-100 w-full">
                  SCAN WITH ANY PHONE CAMERA
                </span>
              </div>

              <div className="text-[11px] font-mono text-zinc-400 pt-1">
                2nd & 4th Sunday @ 5:00 PM (GMT+1) • Isaiah 58:12
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GATE ENTRANCE CAMERA SCANNER */}
        {activeTab === "SCANNER" && (
          <div className="space-y-4">
            <div className="relative w-full aspect-video rounded-2xl bg-zinc-950 flex flex-col items-center justify-center overflow-hidden border border-zinc-800">
              
              {/* Background Watermark Overlay */}
              <div className="absolute inset-0 w-32 h-32 m-auto opacity-10 pointer-events-none">
                <Image
                  src="/images/logo_icon_nobg.png"
                  alt="Lifebuild Overlay"
                  fill
                  sizes="128px"
                  className="object-contain filter invert"
                />
              </div>

              {isScanning && (
                <div className="absolute inset-x-0 h-0.5 bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981] top-1/2 -translate-y-1/2 z-10"></div>
              )}

              <div className="relative w-40 h-40 border border-dashed border-zinc-600 rounded-xl flex items-center justify-center z-10">
                <Camera className="w-8 h-8 text-zinc-500 animate-pulse" />
              </div>

              <div className="absolute bottom-3 inset-x-0 text-center z-10">
                <span className="text-[10px] font-mono text-zinc-300 bg-black/80 px-3 py-1 rounded-full border border-zinc-700">
                  {isScanning ? "Scanning Pass Barcode..." : "Gate Verification Active"}
                </span>
              </div>
            </div>

            {/* Manual Hand Count Buttons for Gender & Age Categories */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col items-start space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs font-mono text-amber-900 font-bold">
                  Quick Gate Hand Tally (Non-Digital Guests)
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-1.5 w-full">
                <button
                  onClick={async () => {
                    setScannedResult(null);
                    const logs = await recordManualBatchHeadcount(1, "Adult Male (Man)", "Adult Male", "MALE");
                    setManualSuccessMsg(`Logged Adult Male Check-In at ${logs[0].checkInTime}`);
                    setTimeout(() => setManualSuccessMsg(null), 4000);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-zinc-900 text-white font-mono text-xs font-bold hover:bg-black transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>👨 +1 Man</span>
                </button>

                <button
                  onClick={async () => {
                    setScannedResult(null);
                    const logs = await recordManualBatchHeadcount(1, "Adult Female (Woman)", "Adult Female", "FEMALE");
                    setManualSuccessMsg(`Logged Adult Female Check-In at ${logs[0].checkInTime}`);
                    setTimeout(() => setManualSuccessMsg(null), 4000);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-purple-900 text-white font-mono text-xs font-bold hover:bg-purple-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>👩 +1 Woman</span>
                </button>

                <button
                  onClick={async () => {
                    setScannedResult(null);
                    const logs = await recordManualBatchHeadcount(1, "Child Male (Boy)", "Child Sanctuary", "MALE");
                    setManualSuccessMsg(`Logged Child Male (Boy) Check-In at ${logs[0].checkInTime}`);
                    setTimeout(() => setManualSuccessMsg(null), 4000);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-blue-900 text-white font-mono text-xs font-bold hover:bg-blue-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>👦 +1 Boy</span>
                </button>

                <button
                  onClick={async () => {
                    setScannedResult(null);
                    const logs = await recordManualBatchHeadcount(1, "Child Female (Girl)", "Child Sanctuary", "FEMALE");
                    setManualSuccessMsg(`Logged Child Female (Girl) Check-In at ${logs[0].checkInTime}`);
                    setTimeout(() => setManualSuccessMsg(null), 4000);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-pink-900 text-white font-mono text-xs font-bold hover:bg-pink-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>👧 +1 Girl</span>
                </button>
              </div>
            </div>

            {manualSuccessMsg && (
              <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 text-xs font-mono font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{manualSuccessMsg}</span>
              </div>
            )}

            {scannedResult && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-emerald-200 space-y-1 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ENTRANCE VERIFIED — ACCESS GRANTED</span>
                  </div>
                  <p className="text-[11px] font-mono text-emerald-300/80">
                    {scannedResult.name} ({scannedResult.id}) • {scannedResult.timestamp}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Action Footer */}
        <div className="flex gap-2 pt-2">
          {activeTab === "SCANNER" && (
            <button
              onClick={handleSimulateScan}
              className="flex-1 py-3 rounded-full bg-black text-white font-mono text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
              <span>Rescan Entrance Pass</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 rounded-full border border-gray-300 text-zinc-700 hover:border-black text-xs font-mono cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
