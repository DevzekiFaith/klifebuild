"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Hammer, RefreshCw, HeartHandshake, Shield, Sparkles } from "lucide-react";

interface EmotionalConnectionSectionProps {
  onOpenRegister?: () => void;
}

export default function EmotionalConnectionSection({ onOpenRegister }: EmotionalConnectionSectionProps) {
  return (
    <section className="relative w-full bg-white text-zinc-950 py-20 sm:py-28 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* 2-Column Responsive Grid matching reference UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative & Typography */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              {/* Pill Indicator (Matching Reference Dots Bar) */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-600">
                <span className="w-2 h-2 rounded-full bg-zinc-900" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider ml-1 text-zinc-700">
                  Reflection
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif-headline text-3xl sm:text-4xl lg:text-5xl text-zinc-950 font-normal leading-[1.15] tracking-tight">
                Sometimes life changes the plans.
              </h2>

              {/* Narrative Text */}
              <p className="text-zinc-600 text-base sm:text-lg font-light leading-relaxed">
                Sometimes we lose direction. Sometimes what we built no longer looks like what we imagined.
              </p>

              {/* Turning Point Quote */}
              <p className="font-serif-headline italic text-lg sm:text-xl text-zinc-900 font-normal border-l-2 border-zinc-900 pl-4">
                But the story doesn't have to end there.
              </p>
            </div>

            {/* Bottom Callout & Action (Matching 70% Interview rate block in reference) */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="text-2xl sm:text-3xl font-serif-headline text-zinc-950 font-bold tracking-tight">
                Come. Connect. Build.
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Bi-Weekly Gathering • 2nd &amp; 4th Sunday • 5:00 PM GMT+1
              </p>
              {onOpenRegister && (
                <div className="pt-2">
                  <button
                    onClick={onOpenRegister}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Join Us</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: High-End Hero Editorial Card (Matching Reference Card) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200/90 group bg-zinc-900">
              
              {/* Background Photo */}
              <Image
                src="/images/gathering_rebuilders.jpg"
                alt="Lifebuild Global Gathering Rebuilders"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Ambient Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />

              {/* Top Glassmorphic Overlay Badge (Matching Kiara Washington badge in reference) */}
              <div className="absolute top-5 sm:top-6 left-5 sm:left-6 p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white max-w-[280px] sm:max-w-xs shadow-lg">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  Official Invitation
                </span>
                <h3 className="font-serif-headline text-lg sm:text-2xl font-normal text-white mt-1 leading-snug">
                  Lifebuild Global Gathering
                </h3>
                <p className="text-[11px] font-mono text-zinc-300 mt-1 flex items-center gap-1">
                  <span>→</span>
                  <span>A space for rebuilders to align and flourish</span>
                </p>
              </div>

              {/* Bottom Pill Tags Overlay (Matching reference pill tags row) */}
              <div className="absolute bottom-5 sm:bottom-6 inset-x-5 sm:inset-x-6 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-zinc-950 text-[11px] font-mono font-bold shadow-sm">
                    <Hammer className="w-3 h-3 text-amber-700" />
                    Rebuild
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                    <RefreshCw className="w-3 h-3 text-blue-400" />
                    Restore
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                    <HeartHandshake className="w-3 h-3 text-emerald-400" />
                    Repair
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                    <Shield className="w-3 h-3 text-yellow-400" />
                    Replenish
                  </span>
                </div>

                {onOpenRegister && (
                  <button
                    onClick={onOpenRegister}
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#3b2262] text-white text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-[#4d2c80] transition-colors shadow-md cursor-pointer ml-auto"
                  >
                    <span>Join Us</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
