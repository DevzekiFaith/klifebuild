"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Sparkles, ArrowRight, Share2, ShieldCheck, Heart } from "lucide-react";
import RotatingTagline from "./RotatingTagline";

interface HappyNewMonthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export default function HappyNewMonthModal({
  isOpen,
  onClose,
  onOpenRegister,
}: HappyNewMonthModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/happy_new_month_august.jpg";
    link.download = "Lifebuild_Happy_New_Month_August_Growth.jpg";
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Lifebuild Happy New Month of August",
        text: "Happy New Month of August! It's the Month of Growth and the Prophesy for this month is ENLARGEMENT.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Website link copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white transition-colors border border-zinc-700 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: High-Res Flyer Showcase */}
          <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[480px] bg-black flex items-center justify-center p-4 overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800">
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/80 group">
              <Image
                src="/images/happy_new_month_august.jpg"
                alt="Lifebuild Happy New Month of August Flyer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain transition-transform duration-500 group-hover:scale-102"
                priority
              />
            </div>
          </div>

          {/* Right Column: Prophetic Content & CTAs */}
          <div className="lg:col-span-6 p-8 sm:p-10 space-y-6 flex flex-col justify-between relative z-10">
            <div className="space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Happy New Month of August</span>
              </div>

              {/* Theme & Prophesy Headline */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[#d4af37] font-bold tracking-wider block">
                  Prophetic Declaration
                </span>
                <h2 className="font-serif-headline text-3xl sm:text-4xl text-white font-normal leading-tight">
                  The Month of <span className="text-emerald-400 italic">Growth</span> & <span className="text-[#d4af37]">Enlargement</span>.
                </h2>
              </div>

              {/* Message Block */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs text-zinc-300 font-light leading-relaxed">
                <p>
                  "This is your season to grow higher, go further and become more. New opportunities. Greater impact. Stronger you. Let's grow — together."
                </p>
                <div className="pt-2 text-[11px] font-mono text-[#d4af37] font-bold flex items-center justify-between border-t border-zinc-800">
                  <span>PROPHESY: ENLARGEMENT</span>
                  <span>ISAIAH 58:12</span>
                </div>
              </div>

              {/* 4T Alignment */}
              <div className="space-y-1.5 text-xs text-zinc-400 font-light">
                <div className="flex items-center gap-2 text-white font-mono font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>August Alignment & 4T Gathering Focus</span>
                </div>
                <p className="text-[11px] leading-relaxed pl-6">
                  Rebuilding foundations, expanding capacity, and stepping into divine enlargement across personal calling, business, and community impact.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-3 border-t border-zinc-800">
              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                  className="flex-1 min-w-[160px] py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Join August Gathering</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDownload}
                  className="px-4 py-3 rounded-full bg-zinc-900 border border-zinc-700 hover:border-white text-white font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Download Flyer Image"
                >
                  <Download className="w-4 h-4 text-[#d4af37]" />
                  <span>Download</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleShare}
                  className="p-3 rounded-full bg-zinc-900 border border-zinc-700 hover:border-white text-white transition-colors cursor-pointer"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-1">
                <span>Life Build •</span>
                <RotatingTagline className="text-zinc-300 font-semibold" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
