"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, QrCode, CheckCircle2, Camera, RefreshCw, UserCheck } from "lucide-react";
import { MemberData } from "./RegistrationForm";

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
  const [isScanning, setIsScanning] = useState(true);
  const [scannedResult, setScannedResult] = useState<AttendanceLog | null>(null);
  const [logs, setLogs] = useState<AttendanceLog[]>([
    {
      id: "LB-2026-8812",
      name: "Marcus Vance",
      role: "Founder & CEO",
      timestamp: "04:52 PM • In-Person",
      status: "VERIFIED",
    },
    {
      id: "LB-2026-4190",
      name: "Dr. Elena Rostova",
      role: "Executive Leader",
      timestamp: "04:55 PM • In-Person",
      status: "VERIFIED",
    },
  ]);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      const targetName = currentMember ? currentMember.fullName : "Alexander Cross";
      const targetId = currentMember ? currentMember.memberId : "LB-2026-9041";
      const targetRole = currentMember ? currentMember.role : "Tech Builder";

      const newLog: AttendanceLog = {
        id: targetId,
        name: targetName,
        role: targetRole,
        timestamp: `${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • Gate 1`,
        status: "VERIFIED",
      };

      setScannedResult(newLog);
      setLogs((prev) => [newLog, ...prev]);
      setIsScanning(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white text-black p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xl my-6 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Lifebuild Logo */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-300 p-0.5 bg-white shrink-0 shadow-xs">
            <Image
              src="/images/logo.jpg"
              alt="Lifebuild Logo"
              width={40}
              height={40}
              className="object-contain rounded-lg"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
              Gate Verification Tool
            </span>
            <h3 className="font-serif-headline text-2xl text-zinc-950">
              Sunday Service Entrance Scanner
            </h3>
          </div>
        </div>

        {/* Scanner Viewfinder Box with Logo Watermark Overlay */}
        <div className="relative w-full aspect-video rounded-2xl bg-zinc-950 flex flex-col items-center justify-center overflow-hidden border border-zinc-800">
          
          {/* Background Watermark Overlay */}
          <div className="absolute inset-0 w-32 h-32 m-auto opacity-10 pointer-events-none">
            <Image
              src="/images/logo_icon.jpg"
              alt="Lifebuild Overlay"
              fill
              className="object-contain filter invert"
            />
          </div>

          {isScanning && (
            <div className="absolute inset-x-0 h-0.5 bg-white animate-pulse shadow-[0_0_10px_#ffffff] top-1/2 -translate-y-1/2 z-10"></div>
          )}

          <div className="relative w-40 h-40 border border-dashed border-zinc-600 rounded-xl flex items-center justify-center z-10">
            <Camera className="w-8 h-8 text-zinc-500 animate-pulse" />
          </div>

          <div className="absolute bottom-3 inset-x-0 text-center z-10">
            <span className="text-[10px] font-mono text-zinc-300 bg-black/80 px-3 py-1 rounded-full border border-zinc-700">
              {isScanning ? "Scanning QR Code..." : "Scan Complete"}
            </span>
          </div>
        </div>

        {/* Scan Result */}
        {scannedResult && (
          <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-300 text-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-sm text-black">
                  APPROVED: {scannedResult.name}
                </h4>
                <span className="text-xs font-mono text-zinc-600">
                  ID: {scannedResult.id} • {scannedResult.role}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex gap-3">
          <button
            onClick={handleSimulateScan}
            className="flex-1 py-3 rounded-full bg-black text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Scan Pass</span>
          </button>
          <button
            onClick={() => setScannedResult(null)}
            className="px-4 py-3 rounded-full border border-gray-200 text-zinc-700 hover:border-black text-xs font-mono cursor-pointer"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Live Service Entry Logs */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
            Live Service Entry Log
          </span>
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span className="font-bold text-black">{log.name}</span>
                  <span className="text-zinc-400">({log.id})</span>
                </div>
                <span className="text-zinc-500 text-[10px]">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
