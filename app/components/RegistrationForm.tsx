"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, ArrowUpRight, User, Mail, Phone, Briefcase, Compass } from "lucide-react";

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
  onSuccess: (data: MemberData) => void;
}

export default function RegistrationForm({ isOpen, onClose, onSuccess }: RegistrationFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Founder & CEO");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white text-black p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-2xl my-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
            Membership Application
          </span>
          <h3 className="font-serif-headline text-3xl font-normal text-zinc-950">
            Join Lifebuild Fellowship
          </h3>
          <p className="text-xs text-zinc-500 font-light">
            Submit your credentials to become an official member and receive your personal attendance QR barcode pass.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-zinc-500 block">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. David Sterling"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-zinc-500 block">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="david@company.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-zinc-500 block">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-1234"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-zinc-500 block">
                Primary Role / Domain
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black text-sm focus:outline-none focus:border-black transition-colors"
              >
                <option value="Founder & CEO">Founder & CEO</option>
                <option value="Executive Leader">Executive Leader</option>
                <option value="Tech Builder / Engineer">Tech Builder / Engineer</option>
                <option value="Creative & Designer">Creative & Designer</option>
                <option value="Ministry / Non-Profit Leader">Ministry / Non-Profit Leader</option>
                <option value="Investor / Steward">Investor / Steward</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-zinc-500 block">
              Preferred Meeting Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttendanceMode("In-Person Sanctuary")}
                className={`py-3 px-4 rounded-xl text-xs font-mono border text-center transition-all ${
                  attendanceMode === "In-Person Sanctuary"
                    ? "bg-black text-white border-black font-bold"
                    : "bg-gray-50 border-gray-200 text-zinc-600 hover:text-black"
                }`}
              >
                In-Person Sanctuary
              </button>

              <button
                type="button"
                onClick={() => setAttendanceMode("Global Remote Stream")}
                className={`py-3 px-4 rounded-xl text-xs font-mono border text-center transition-all ${
                  attendanceMode === "Global Remote Stream"
                    ? "bg-black text-white border-black font-bold"
                    : "bg-gray-50 border-gray-200 text-zinc-600 hover:text-black"
                }`}
              >
                Global Remote Stream
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-zinc-500 block">
              What are you currently building or rebuilding?
            </label>
            <textarea
              rows={3}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Briefly describe your venture, vision, or life rebuilding focus..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-full text-zinc-500 hover:text-black text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-3 rounded-full bg-black text-white font-medium text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Generating Pass...</span>
              ) : (
                <>
                  <span>Complete & Issue QR Pass</span>
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
