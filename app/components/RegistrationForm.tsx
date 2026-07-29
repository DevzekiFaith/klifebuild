"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, ArrowUpRight, ShieldCheck, Check } from "lucide-react";

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
  const [attendanceMode, setAttendanceMode] = useState("In-Person Sanctuary");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);

    setTimeout(() => {
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

      localStorage.setItem("lifebuild_member_pass", JSON.stringify(newMember));

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
      <div className="relative w-full max-w-xl bg-white text-black p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-2xl my-auto max-h-[88vh] overflow-y-auto space-y-6">
        
        {/* Prominent High-Contrast Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white text-zinc-600 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
            Membership Application
          </span>
          <h3 className="font-serif-headline text-3xl font-normal text-zinc-950">
            Join Lifebuild Fellowship
          </h3>
          <p className="text-xs text-zinc-500 font-light">
            Submit your credentials to receive your official Attendance Pass with embedded Sunday Gathering details and QR barcode.
          </p>
        </div>

        {/* Form Fields */}
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/50"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/50"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-600 block mb-1">
                CALLING / ROLE
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/50 cursor-pointer"
              >
                <option value="Founder / Executive">Founder / Executive</option>
                <option value="Kingdom Business Leader">Kingdom Business Leader</option>
                <option value="Minister / Spiritual Builder">Minister / Spiritual Builder</option>
                <option value="Tech Builder / Strategist">Tech Builder / Strategist</option>
                <option value="Community Rebuilder">Community Rebuilder</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-600 block mb-1">
                ATTENDANCE MODE
              </label>
              <select
                value={attendanceMode}
                onChange={(e) => setAttendanceMode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/50 cursor-pointer"
              >
                <option value="In-Person Sanctuary">In-Person Sanctuary (Sunday @ 5PM)</option>
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm bg-gray-50/50"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-black text-white font-medium text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Credentials...</span>
              ) : (
                <>
                  <span>Generate Official Attendance Pass</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
