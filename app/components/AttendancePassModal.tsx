"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { X, Download, ShieldCheck, QrCode, Check, Copy, Calendar, Info } from "lucide-react";
import { MemberData } from "./RegistrationForm";

interface AttendancePassModalProps {
  isOpen: boolean;
  member: MemberData | null;
  onClose: () => void;
  onOpenScanner: () => void;
}

export default function AttendancePassModal({
  isOpen,
  member,
  onClose,
  onOpenScanner,
}: AttendancePassModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !member) return null;

  // Complete Fellowship Meeting Information embedded in the QR Code
  const fellowshipMeetingInfo = `LIFEBUILD FOUNDER FELLOWSHIP & 4T CONFERENCE
--------------------------------------------
MEMBER: ${member.fullName}
ID: ${member.memberId}
ROLE: ${member.role}
MODE: ${member.attendanceMode}

SUNDAY FELLOWSHIP DETAILS:
• Gathering Time: Every Sunday @ 5:00 PM GMT+1
• Location: Lifebuild Center & Global Stream
• Convener: Zeki Ubor
• Scriptural Anchor: Isaiah 58:12 (Rebuilding Broken Walls)
• 4T Pillars: Rebuilding • Restoring • Repairing • Replenishing
--------------------------------------------
Rebuilding Everywhere You Go
https://github.com/DevzekiFaith/klifebuild`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-white text-black p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xl my-auto max-h-[88vh] overflow-y-auto space-y-6">
        
        {/* Prominent High-Contrast Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white text-zinc-600 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge Header */}
        <div className="space-y-1 pr-8">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
            Official Credential
          </span>
          <h3 className="font-serif-headline text-2xl text-zinc-950">
            Lifebuild Attendance Pass
          </h3>
        </div>

        {/* Digital Membership Pass Card (Monochrome High Contrast) */}
        <div className="relative bg-[#141414] text-white p-6 rounded-2xl border border-zinc-800 space-y-6 shadow-xl">
          
          {/* Top Pass Strip */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-zinc-700 p-0.5 bg-white shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="Lifebuild Logo"
                  width={28}
                  height={28}
                  className="object-contain rounded"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-sm tracking-tight text-white block">
                  lifebuild<span className="text-[#d4af37]">.</span>
                </span>
                <span className="text-[9px] font-mono text-zinc-400 block uppercase">
                  Founder Pass
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyId}
              className="font-mono text-xs text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{member.memberId}</span>
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
            </button>
          </div>

          {/* Member Credentials Info */}
          <div className="space-y-2">
            <div>
              <span className="text-[9px] font-mono uppercase text-zinc-400 block">Member Name</span>
              <h4 className="font-serif-headline text-xl font-normal text-white">
                {member.fullName}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400 pt-1">
              <div>
                <span className="text-[9px] uppercase text-zinc-500 block">Role</span>
                <span className="text-zinc-200 font-semibold">{member.role}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-zinc-500 block">Mode</span>
                <span className="text-zinc-200 font-semibold">{member.attendanceMode}</span>
              </div>
            </div>
          </div>

          {/* Real Scannable QR Code containing Fellowship Meeting Info */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 space-y-2">
            <QRCodeSVG
              value={fellowshipMeetingInfo}
              size={165}
              level="M"
              includeMargin={true}
              fgColor="#111111"
              bgColor="#ffffff"
            />
            <div className="text-center space-y-0.5 pt-1 border-t border-zinc-100 w-full">
              <span className="text-[9px] font-mono text-zinc-900 font-bold uppercase tracking-wider block">
                SCAN WITH PHONE CAMERA
              </span>
              <span className="text-[8px] font-mono text-zinc-500 block">
                Contains Sunday Fellowship & 4T Meeting Info
              </span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-zinc-800 pt-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#d4af37]" />
              Issued: {member.joinedDate}
            </span>
            <span className="text-emerald-400 font-bold">
              ● VERIFIED MEMBER
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <div className="p-3 bg-zinc-50 border border-gray-200 rounded-xl flex items-start gap-2.5 text-xs text-zinc-600">
            <Info className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <p className="leading-snug">
              Point any smartphone camera at this QR code to view your Sunday Fellowship Gathering credentials and meeting details.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => alert(`Attendance Pass ID: ${member.memberId}\nSaved in local storage.`)}
              className="flex-1 py-3 rounded-full bg-black text-white text-xs font-mono font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Pass Credentials</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-gray-300 text-zinc-700 hover:border-black text-xs font-mono cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
