"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { X, Download, ShieldCheck, QrCode, Check, Copy, Calendar, Info, Mail, Send, BookOpen } from "lucide-react";
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!isOpen || !member) return null;

  // Complete Vision & Meeting Information embedded in the QR Code
  const visionMeetingInfo = `LIFE BUILD GATHERING & 4T CONFERENCE
--------------------------------------------
MEMBER: ${member.fullName}
ID: ${member.memberId}
ROLE: ${member.role}
MODE: ${member.attendanceMode}

SUNDAY GATHERING DETAILS:
• Gathering Time: 2nd & 4th Sunday @ 5:00 PM GMT+1
• Location: Life Build Center & Global Stream
• Convener: Zeki Ubor
• Scriptural Anchor: Isaiah 58:12 (Rebuilding Broken Walls)
• 4T Pillars: Rebuilding • Restoring • Repairing • Replenishing
--------------------------------------------
Rebuilding Everywhere You Go & Positioning in the Marketplace
https://www.lifebuildglobal.com.ng`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResendEmail = async () => {
    if (!member.email || emailStatus === "sending") return;
    setEmailStatus("sending");
    try {
      const isConference = member.memberId.startsWith("4T-CONF");
      const res = await fetch("/api/send-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: isConference ? "CONFERENCE_PASS" : "MEMBER_PASS",
          member,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatus("sent");
        setTimeout(() => setEmailStatus("idle"), 4000);
      } else {
        setEmailStatus("error");
        setTimeout(() => setEmailStatus("idle"), 4000);
      }
    } catch (err) {
      console.warn("Email dispatch error:", err);
      setEmailStatus("error");
      setTimeout(() => setEmailStatus("idle"), 4000);
    }
  };

  // High-Resolution PNG Pass Card Generator & Downloader
  const handleDownloadPng = () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Dark Background
      ctx.fillStyle = "#141414";
      ctx.fillRect(0, 0, 800, 1080);

      // Gold Border Frame
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 6;
      ctx.strokeRect(20, 20, 760, 1040);

      // 2. Header Strip
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 36px sans-serif";
      ctx.fillText("lifebuild.", 60, 90);

      ctx.fillStyle = "#d4af37";
      ctx.font = "bold 18px monospace";
      ctx.fillText("SUNDAY VISION PASS", 460, 90);

      // Divider Line
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 120);
      ctx.lineTo(740, 120);
      ctx.stroke();

      // 3. Member Info
      ctx.fillStyle = "#888888";
      ctx.font = "14px monospace";
      ctx.fillText("MEMBER NAME", 60, 170);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 34px Georgia, serif";
      ctx.fillText(member.fullName, 60, 215);

      ctx.fillStyle = "#888888";
      ctx.font = "14px monospace";
      ctx.fillText("MEMBER ID", 60, 270);
      ctx.fillStyle = "#d4af37";
      ctx.font = "bold 22px monospace";
      ctx.fillText(member.memberId, 60, 305);

      ctx.fillStyle = "#888888";
      ctx.font = "14px monospace";
      ctx.fillText("ROLE / CALLING", 450, 270);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(member.role, 450, 305);

      // 4. Sunday Gathering Callout Box
      ctx.fillStyle = "#1e1e24";
      ctx.fillRect(60, 350, 680, 130);
      ctx.strokeStyle = "#3b2262";
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 350, 680, 130);

      ctx.fillStyle = "#d4af37";
      ctx.font = "bold 16px monospace";
      ctx.fillText("SUNDAY GATHERING & 4T CONFERENCE", 90, 390);

      ctx.fillStyle = "#dddddd";
      ctx.font = "16px sans-serif";
      ctx.fillText("Gathering: 2nd & 4th Sunday @ 5:00 PM (GMT+1)", 90, 425);
      ctx.fillText("Vision: Isaiah 58:12 Rebuilding Broken Walls", 90, 455);

      // 5. Draw QR Code from DOM SVG
      const svgEl = document.getElementById("pass-qr-code-svg");
      if (svgEl) {
        const svgData = new XMLSerializer().serializeToString(svgEl);
        const img = new window.Image();
        img.onload = () => {
          // White QR Container Box
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(250, 510, 300, 300);

          ctx.drawImage(img, 260, 520, 280, 280);

          // Footer Text
          ctx.fillStyle = "#888888";
          ctx.font = "14px monospace";
          ctx.textAlign = "center";
          ctx.fillText("SCAN WITH PHONE CAMERA FOR ENTRANCE & VISION VERIFICATION", 400, 860);

          ctx.fillStyle = "#10b981";
          ctx.font = "bold 16px monospace";
          ctx.fillText("● VERIFIED LIFEBUILD MEMBER", 400, 900);

          ctx.fillStyle = "#555555";
          ctx.font = "13px monospace";
          ctx.fillText("4Tribe Network • Convener Zeki Ubor", 400, 940);
          ctx.fillText("https://www.lifebuildglobal.com.ng", 400, 970);

          // Trigger PNG download
          const link = document.createElement("a");
          link.download = `Lifebuild_Attendance_Pass_${member.memberId}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
          setIsDownloading(false);
        };
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
      } else {
        setIsDownloading(false);
      }
    } catch (err) {
      console.error("Error generating pass PNG:", err);
      setIsDownloading(false);
    }
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
            {member.memberId.startsWith("4T-CONF") ? "4T Conference Delegate Pass" : "Lifebuild Attendance Pass"}
          </h3>
        </div>

        {/* Live Automatic Registration & Email Confirmation Banner */}
        <div className="p-4 bg-emerald-50/95 border-2 border-emerald-300 rounded-2xl flex items-start gap-3 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm shadow-xs">
            ✓
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-950 block">
              ✨ Registration Confirmed &amp; Pass Automatically Emailed!
            </span>
            <span className="text-[11px] text-emerald-800 leading-snug block">
              Your official credentials and welcome package have been dispatched to <span className="font-mono font-bold text-emerald-950 underline">{member.email}</span>. Check your inbox!
            </span>
          </div>
        </div>

        {/* Digital Membership Pass Card (Monochrome High Contrast) */}
        <div className="relative bg-[#141414] text-white p-6 rounded-2xl border border-zinc-800 space-y-6 shadow-xl">
          
          {/* Top Pass Strip */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 flex items-center justify-center bg-white rounded-md shrink-0 p-0.5">
                <Image
                  src="/images/lifebuild_official_logo.png"
                  alt="Lifebuild Logo"
                  width={32}
                  height={32}
                  className="object-contain"
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
              id="pass-qr-code-svg"
              value={visionMeetingInfo}
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
                Contains Sunday Vision & 4T Meeting Info
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

        {/* Exclusive Member Welcome Gift: 2 E-Books */}
        <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#3b2262]" />
              <span className="text-xs font-mono font-bold text-[#3b2262] uppercase tracking-wider">
                🎁 2 Welcome E-Books Included
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold bg-[#3b2262] text-white px-2 py-0.5 rounded-full">
              FREE PDF
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {/* Book 1 */}
            <div className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-xs flex items-center gap-3">
              <div className="relative w-12 h-16 shrink-0 rounded-md overflow-hidden bg-[#3b2262]">
                <Image
                  src="/images/book_cover_identity.jpg"
                  alt="Self Discovery"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[8px] font-mono text-[#3b2262] font-bold block uppercase">
                  Vol 1 • 3 Pages
                </span>
                <h5 className="text-xs font-bold text-zinc-900 leading-snug line-clamp-1">
                  Self-Discovery: Identity
                </h5>
                <a
                  href="/books/self-discovery-divine-identity.pdf"
                  target="_blank"
                  download="Self-Discovery-Divine-Identity.pdf"
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#3b2262] hover:underline"
                >
                  <Download className="w-2.5 h-2.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Book 2 */}
            <div className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-xs flex items-center gap-3">
              <div className="relative w-12 h-16 shrink-0 rounded-md overflow-hidden bg-[#3b2262]">
                <Image
                  src="/images/book_cover_placement.jpg"
                  alt="Kingdom Placement"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[8px] font-mono text-[#3b2262] font-bold block uppercase">
                  Vol 2 • 3 Pages
                </span>
                <h5 className="text-xs font-bold text-zinc-900 leading-snug line-clamp-1">
                  Kingdom Placement: 4T
                </h5>
                <a
                  href="/books/kingdom-placement-marketplace-dominion.pdf"
                  target="_blank"
                  download="Kingdom-Placement-Marketplace-Dominion.pdf"
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#3b2262] hover:underline"
                >
                  <Download className="w-2.5 h-2.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons & Email Dispatch */}
        <div className="space-y-2.5">
          <div className="p-3 bg-zinc-50 border border-gray-200 rounded-xl flex items-start gap-2.5 text-xs text-zinc-600">
            <Info className="w-4 h-4 text-[#3b2262] shrink-0 mt-0.5" />
            <p className="leading-snug">
              Point any smartphone camera at this QR code to view your Sunday Vision credentials and meeting details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleDownloadPng}
              disabled={isDownloading}
              className="py-3 px-4 rounded-full bg-black text-white text-xs font-mono font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>{isDownloading ? "Generating PNG..." : "Download Pass (PNG)"}</span>
            </button>

            <button
              onClick={handleResendEmail}
              disabled={emailStatus === "sending"}
              className={`py-3 px-4 rounded-full text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm border ${
                emailStatus === "sent"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : emailStatus === "error"
                  ? "bg-red-50 text-red-700 border-red-300"
                  : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border-zinc-300"
              }`}
            >
              {emailStatus === "sending" ? (
                <>
                  <Send className="w-3.5 h-3.5 animate-spin text-zinc-600" />
                  <span>Sending Copy...</span>
                </>
              ) : emailStatus === "sent" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copy Sent!</span>
                </>
              ) : emailStatus === "error" ? (
                <>
                  <Mail className="w-3.5 h-3.5 text-red-600" />
                  <span>Retry Dispatch</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Resend Email Copy</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full border border-gray-200 text-zinc-500 hover:text-black hover:border-zinc-400 text-xs font-mono cursor-pointer transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
