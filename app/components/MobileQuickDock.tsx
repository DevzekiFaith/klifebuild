"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Calendar, CheckCircle2, Share2, Sparkles, Check, Copy } from "lucide-react";
import { MemberData } from "./RegistrationForm";

interface MobileQuickDockProps {
  currentMember: MemberData | null;
  onOpenPass: () => void;
  onOpenRegister: () => void;
  onOpenCheckIn: () => void;
  onOpenCalendar: () => void;
}

export default function MobileQuickDock({
  currentMember,
  onOpenPass,
  onOpenRegister,
  onOpenCheckIn,
  onOpenCalendar,
}: MobileQuickDockProps) {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = async () => {
    const shareData = {
      title: "LifeBuild Global | Rebuilding Everywhere You Go",
      text: "Join me at LifeBuild Global (Isaiah 58:12). Get your Sunday Gathering pass & connect with Kingdom Rebuilders:",
      url: typeof window !== "undefined" ? window.location.origin : "https://www.lifebuildglobal.com.ng",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        fallbackCopy();
      }
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    const inviteUrl = typeof window !== "undefined" ? window.location.origin : "https://www.lifebuildglobal.com.ng";
    const text = `Join LifeBuild Global (Isaiah 58:12) — Rebuilding broken walls, restoring calling and generational foundations. Register your pass: ${inviteUrl}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setToastMessage("Invite link copied to clipboard!");
    setTimeout(() => {
      setCopied(false);
      setToastMessage(null);
    }, 3000);
  };

  return (
    <>
      {/* Toast Notification when link copied */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-zinc-900/95 text-white border border-[#d4af37]/40 shadow-xl backdrop-blur-md text-xs font-mono flex items-center gap-2 whitespace-nowrap"
          >
            <Check className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Glassmorphism Dock — Mobile Only */}
      <aside aria-label="Quick actions" className="md:hidden fixed bottom-4 left-3 right-3 z-40 pointer-events-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-sm rounded-full bg-zinc-950/85 backdrop-blur-2xl border border-white/15 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center justify-between"
        >
          {/* Action 1: My Pass */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={currentMember ? onOpenPass : onOpenRegister}
            className="flex-1 py-2 px-2 flex flex-col items-center justify-center rounded-full transition-colors hover:bg-white/10 text-zinc-300 hover:text-white group relative cursor-pointer"
          >
            <div className="relative">
              <QrCode className="w-4 h-4 text-[#d4af37]" />
              {currentMember && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-2 ring-zinc-950" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-tight mt-1 font-semibold group-hover:text-white">
              {currentMember ? "My Pass" : "Get Pass"}
            </span>
          </motion.button>

          {/* Action 2: Check-In */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onOpenCheckIn}
            className="flex-1 py-2 px-2 flex flex-col items-center justify-center rounded-full transition-colors hover:bg-white/10 text-zinc-300 hover:text-white group cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono tracking-tight mt-1 font-semibold group-hover:text-white">
              Check-In
            </span>
          </motion.button>

          {/* Action 3: RSVP Calendar */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onOpenCalendar}
            className="flex-1 py-2 px-2 flex flex-col items-center justify-center rounded-full transition-colors hover:bg-white/10 text-zinc-300 hover:text-white group cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-mono tracking-tight mt-1 font-semibold group-hover:text-white">
              RSVP
            </span>
          </motion.button>

          {/* Action 4: Share */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleShare}
            className="flex-1 py-2 px-2 flex flex-col items-center justify-center rounded-full bg-gradient-to-r from-amber-500/20 to-[#3b2262]/40 border border-[#d4af37]/30 text-white group cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4 text-[#d4af37]" />
            )}
            <span className="text-[10px] font-mono tracking-tight mt-1 font-bold text-[#d4af37]">
              {copied ? "Copied" : "Invite"}
            </span>
          </motion.button>
        </motion.div>
      </aside>
    </>
  );
}
