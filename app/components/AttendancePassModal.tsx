"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { X, Download, ShieldCheck, QrCode, Check, Copy, Calendar } from "lucide-react";
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

  const qrPayload = JSON.stringify({
    org: "LIFEBUILD",
    type: "ATTENDANCE_PASS",
    id: member.memberId,
    name: member.fullName,
    email: member.email,
    role: member.role,
    mode: member.attendanceMode,
    timestamp: new Date().toISOString(),
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white text-black p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xl my-6 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Header */}
        <div className="space-y-1">
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
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-sm tracking-tight text-white">
                lifebuild<span className="text-[#d4af37]">.</span>
              </span>
              <span className="text-[9px] font-mono text-zinc-400 block uppercase">
                Founder Pass
              </span>
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

          {/* QR Barcode Section */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 space-y-2">
            <QRCodeSVG
              value={qrPayload}
              size={150}
              level="H"
              includeMargin={true}
              fgColor="#111111"
              bgColor="#ffffff"
            />
            <span className="text-[9px] font-mono text-zinc-900 font-bold uppercase tracking-wider text-center pt-1 border-t border-zinc-100 w-full">
              SCAN AT SUNDAY SERVICE ENTRANCE
            </span>
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
          <button
            onClick={onOpenScanner}
            className="w-full py-3 rounded-full bg-black text-white font-mono font-semibold text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#d4af37]" />
            <span>Test Service Entrance Scanner</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => alert(`Attendance Pass ID: ${member.memberId}\nSaved in local storage.`)}
              className="flex-1 py-2.5 rounded-full border border-gray-200 text-zinc-700 hover:border-black text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Pass</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-zinc-500 hover:text-black text-xs font-mono cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
