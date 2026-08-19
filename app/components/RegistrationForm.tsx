"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { X, ArrowUpRight, Sparkles, Building } from "lucide-react";
import { saveMemberRecord } from "../../lib/supabase";

export interface MemberData {
  memberId: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  vision: string;
  attendanceMode: string;
  joinedDate: string;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (member: MemberData) => void;
}

export default function RegistrationForm({
  isOpen,
  onClose,
  onSuccess,
}: RegistrationFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Founder / Executive");
  const [vision, setVision] = useState("");
  const [attendanceMode, setAttendanceMode] = useState("In-Person Gathering");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);

    setTimeout(async () => {
      const newMember: MemberData = {
        memberId: `LB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName,
        email,
        phone: phone || "+1 555-0199",
        role,
        vision: vision || "Rebuilding lives and expanding Kingdom impact through visionary leadership.",
        attendanceMode,
        joinedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      await saveMemberRecord(newMember);

      // Dispatch automated Resend email pass
      try {
        fetch("/api/send-pass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "MEMBER_PASS",
            member: newMember,
          }),
        }).catch((err) => console.warn("Email pass trigger warning:", err));
      } catch (emailErr) {
        console.warn("Email pass dispatch notice:", emailErr);
      }

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#111111", "#3b2262", "#d4af37"],
        });
      } catch (err) {
        console.log("Confetti trigger:", err);
      }

      setIsSubmitting(false);
      setFullName("");
      setEmail("");
      setPhone("");
      setVision("");
      onSuccess(newMember);
    }, 500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-xl bg-white text-zinc-950 rounded-3xl border border-gray-200 shadow-2xl my-auto max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors shadow-md cursor-pointer border border-white/20 backdrop-blur-sm"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header with Graphic Image Design */}
        <div className="relative h-40 sm:h-44 w-full shrink-0 overflow-hidden bg-zinc-900">
          <Image
            src="/images/green_architectural_vase.jpg"
            alt="Life Build Architectural Design"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />

          {/* Header Content on Image */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center shadow-md">
                <Image
                  src="/images/lifebuild_official_logo.png"
                  alt="Lifebuild Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-mono uppercase text-[#d4af37] tracking-widest block font-bold bg-black/50 px-2.5 py-1 rounded-full border border-[#d4af37]/30 backdrop-blur-xs">
                ✦ Official Membership Credentials
              </span>
            </div>
            
            <h3 className="font-serif-headline text-2xl sm:text-3xl font-normal text-white">
              Join the Life Build Vision
            </h3>
            <p className="text-xs text-zinc-300 font-light max-w-md">
              Receive your official Sunday Gathering Attendance Pass with QR barcode & meeting details.
            </p>
          </div>
        </div>

        {/* Form Body with Crisp White Background */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 flex-1 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-zinc-600 block mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Zeki Ubor"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/70 text-zinc-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-zinc-600 block mb-1">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/70 text-zinc-900"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-600 block mb-1">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/70 text-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-zinc-700 font-semibold block mb-1">
                  CALLING / ROLE
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/70 text-zinc-900 cursor-pointer"
                >
                  <option value="Founder / Executive">Founder / Executive</option>
                  <option value="Kingdom Business Leader">Kingdom Business Leader</option>
                  <option value="Minister / Spiritual Builder">Minister / Spiritual Builder</option>
                  <option value="Tech Builder / Strategist">Tech Builder / Strategist</option>
                  <option value="Community Rebuilder">Community Rebuilder</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-700 font-semibold block mb-1">
                  ATTENDANCE MODE
                </label>
                <select
                  value={attendanceMode}
                  onChange={(e) => setAttendanceMode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/70 text-zinc-900 cursor-pointer"
                >
                  <option value="In-Person Gathering">In-Person Gathering (Sunday @ 5PM)</option>
                  <option value="Global Stream Access">Global Stream Access</option>
                  <option value="4T Conference Hybrid">4T Conference Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-600 block mb-1">
                YOUR REBUILDING VISION (OPTIONAL)
              </label>
              <textarea
                rows={2}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="What broken wall or foundation are you called to rebuild?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/70 text-zinc-900"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-black text-white font-medium text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Credentials...</span>
                ) : (
                  <>
                    <span>Generate Official Attendance Pass</span>
                    <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="text-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest pt-2 border-t border-gray-100">
            Isaiah 58:12 • Repairer of the Breach • Restorer of Paths
          </div>
        </div>

      </div>
    </div>
  );
}
