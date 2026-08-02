"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, ArrowUpRight, ShieldCheck, Sparkles, Building2, Ticket, Check } from "lucide-react";
import { saveMemberRecord } from "../../lib/supabase";
import { MemberData } from "./RegistrationForm";

interface ConferenceRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (member: MemberData) => void;
}

export default function ConferenceRegistrationModal({
  isOpen,
  onClose,
  onSuccess,
}: ConferenceRegistrationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [delegateCategory, setDelegateCategory] = useState("Kingdom Investor / Business Owner");
  const [conferenceMode, setConferenceMode] = useState("3-Day In-Person VIP Delegate Pass");
  const [workshopFocus, setWorkshopFocus] = useState("Economic Ecosystems & Wealth Transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);

    setTimeout(async () => {
      const conferencePass: MemberData = {
        memberId: `4T-CONF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName,
        email,
        phone: phone || "+1 555-0199",
        role: `${delegateCategory} (${organization || "Independent Builder"})`,
        vision: `[4T Conference Delegate] Focus: ${workshopFocus}`,
        attendanceMode: conferenceMode,
        joinedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      await saveMemberRecord(conferencePass);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#d4af37", "#ffffff", "#3b2262", "#10b981"],
        });
      } catch (err) {
        console.log("Confetti trigger:", err);
      }

      setIsSubmitting(false);
      onSuccess(conferencePass);
    }, 600);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl bg-zinc-950 text-white p-6 sm:p-10 rounded-3xl border-2 border-zinc-800 shadow-2xl my-auto max-h-[92vh] overflow-y-auto space-y-6">
        
        {/* Prominent High-Contrast Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-zinc-900 hover:bg-white hover:text-black text-zinc-400 flex items-center justify-center transition-colors shadow-sm cursor-pointer border border-zinc-800"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header (Flagship Dark & Gold Design) */}
        <div className="space-y-3 border-b border-zinc-800 pb-5 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Annual Flagship Gathering • 3-Day Pass</span>
          </div>

          <h3 className="font-serif-headline text-3xl sm:text-4xl font-normal text-white leading-tight">
            Request 4T Conference Delegate Pass
          </h3>

          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Our annual gathering of Kingdom builders, investors, conveners, and societal leaders across the 4Tribe Network. 3 days of intensive commissioning and strategic reconstruction.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Zeki Ubor"
                className="w-full px-4 py-3 rounded-xl border border-zinc-800 focus:border-[#d4af37] focus:outline-none text-sm bg-zinc-900 text-white placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                ORGANIZATION / COMPANY
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Company or Ministry Name"
                className="w-full px-4 py-3 rounded-xl border border-zinc-800 focus:border-[#d4af37] focus:outline-none text-sm bg-zinc-900 text-white placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="delegate@domain.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-800 focus:border-[#d4af37] focus:outline-none text-sm bg-zinc-900 text-white placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                PHONE / WHATSAPP
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-zinc-800 focus:border-[#d4af37] focus:outline-none text-sm bg-zinc-900 text-white placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-[#d4af37] font-bold block mb-1">
                DELEGATE CATEGORY
              </label>
              <select
                value={delegateCategory}
                onChange={(e) => setDelegateCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-800 focus:border-[#d4af37] focus:outline-none text-sm bg-zinc-900 text-white cursor-pointer"
              >
                <option value="Kingdom Investor / Business Owner">Kingdom Investor / Business Owner</option>
                <option value="Convener / Societal Leader">Convener / Societal Leader</option>
                <option value="Executive / Corporate Leader">Executive / Corporate Leader</option>
                <option value="Minister / Spiritual Builder">Minister / Spiritual Builder</option>
                <option value="Tech Builder / Strategist">Tech Builder / Strategist</option>
                <option value="Next-Gen Rebuilder">Next-Gen Rebuilder</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-[#d4af37] font-bold block mb-1">
                PARTICIPATION MODE
              </label>
              <select
                value={conferenceMode}
                onChange={(e) => setConferenceMode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-800 focus:border-[#d4af37] focus:outline-none text-sm bg-zinc-900 text-white cursor-pointer"
              >
                <option value="3-Day In-Person VIP Delegate Pass">3-Day In-Person VIP Delegate Pass</option>
                <option value="3-Day Global HD Stream Access">3-Day Global HD Stream Access</option>
                <option value="Executive Roundtable & Gala Pass">Executive Roundtable & Gala Pass</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-1">
              STRATEGIC RECONSTRUCTION WORKSHOP FOCUS
            </label>
            <select
              value={workshopFocus}
              onChange={(e) => setWorkshopFocus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 focus:border-[#d4af37] focus:outline-none text-sm bg-zinc-900 text-white cursor-pointer"
            >
              <option value="Economic Ecosystems & Wealth Transfer">01. Economic Ecosystems & Wealth Transfer</option>
              <option value="Rebuilding Broken Walls & Governance">02. Rebuilding Broken Walls & Governance</option>
              <option value="Kingdom Leadership & Spiritual Alignment">03. Kingdom Leadership & Spiritual Alignment</option>
              <option value="Youth & Next-Gen Generational Legacy">04. Youth & Next-Gen Generational Legacy</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-[#d4af37] hover:bg-[#c5a028] text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Commissioning 4T Pass...</span>
              ) : (
                <>
                  <Ticket className="w-4 h-4" />
                  <span>Request 4T Conference Pass</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

        <div className="text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest pt-2 border-t border-zinc-900">
          4Tribe Network • 3-Day Intensive Commissioning • Isaiah 58:12
        </div>

      </div>
    </div>
  );
}
