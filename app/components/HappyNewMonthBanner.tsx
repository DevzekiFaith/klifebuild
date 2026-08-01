"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, X } from "lucide-react";

interface HappyNewMonthBannerProps {
  onOpenFlyer: () => void;
}

export default function HappyNewMonthBanner({ onOpenFlyer }: HappyNewMonthBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-zinc-950 via-purple-950 to-zinc-950 text-white border-b border-purple-900/40 py-2.5 px-4 sm:px-8 relative z-40"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        
        {/* Left: Prophetic Theme Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 relative shrink-0">
            <Image
              src="/images/logo_icon_nobg.png"
              alt="Lifebuild Emblem"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              AUG 2026
            </span>
            <span className="text-zinc-200 font-medium hidden sm:inline">
              Happy New Month of August! Theme: <strong className="text-emerald-400">Growth</strong> • Prophecy: <strong className="text-[#d4af37]">Enlargement</strong>
            </span>
            <span className="text-zinc-200 font-medium sm:hidden">
              Month of <strong className="text-emerald-400">Growth</strong> & <strong className="text-[#d4af37]">Enlargement</strong>
            </span>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <button
            onClick={onOpenFlyer}
            className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all text-[11px] font-bold uppercase flex items-center gap-1 cursor-pointer"
          >
            <span>View August Flyer</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-zinc-400 hover:text-white transition-colors p-1"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
