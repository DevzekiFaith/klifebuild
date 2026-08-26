"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Hammer, RefreshCw, HeartHandshake, Shield, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import gatheringGroupImg from "@/public/images/gathering_rebuilders_group.jpg";
import gatheringDuoImg from "@/public/images/gathering_rebuilders.jpg";

interface EmotionalConnectionSectionProps {
  onOpenRegister?: () => void;
}

const GALLERY_SLIDES = [
  {
    id: "group",
    title: "Community Gathering",
    subtitle: "Builders across cultures coming together",
    image: gatheringGroupImg,
    alt: "Lifebuild Global Gathering Rebuilders Community Circle",
  },
  {
    id: "duo",
    title: "Dialogue & Alignment",
    subtitle: "Strategic planning and spiritual grounding",
    image: gatheringDuoImg,
    alt: "Lifebuild Global Gathering Nigerian Rebuilders in Dialogue",
  },
];

export default function EmotionalConnectionSection({ onOpenRegister }: EmotionalConnectionSectionProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto-advance gallery slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = GALLERY_SLIDES[activeSlideIndex];

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
              {/* Interactive Pill Indicator (Matching Reference Dots Bar) */}
              <div className="inline-flex items-center gap-2 p-1 pl-3 pr-2 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-700">
                <div className="flex items-center gap-1.5">
                  {GALLERY_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        idx === activeSlideIndex
                          ? "w-4 h-2 bg-zinc-900"
                          : "w-2 h-2 bg-zinc-300 hover:bg-zinc-500"
                      }`}
                      title={`View ${slide.title}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-700 ml-1">
                  {activeSlide.title}
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
                Bi-Weekly Gathering • 2nd &amp; 4th Sunday • 5:00 PM GMT+1 (90 mins)
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

          {/* Right Column: High-End Hero Editorial Card with Dual-Image Crossfade */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200/90 group bg-zinc-900">
              
              {/* Animated Crossfade between both Nigerian Rebuilder photographs */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Ambient Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />

              {/* Top Glassmorphic Overlay Badge (Matching Kiara Washington badge in reference) */}
              <div className="absolute top-5 sm:top-6 left-5 sm:left-6 p-4 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 text-white max-w-[280px] sm:max-w-xs shadow-lg z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  Official Invitation
                </span>
                <h3 className="font-serif-headline text-lg sm:text-2xl font-normal text-white mt-1 leading-snug">
                  Lifebuild Global Gathering
                </h3>
                <p className="text-[11px] font-mono text-zinc-300 mt-1 flex items-center gap-1">
                  <span>→</span>
                  <span>{activeSlide.subtitle}</span>
                </p>
              </div>

              {/* Top-Right Slide Nav Switchers */}
              <div className="absolute top-5 sm:top-6 right-5 sm:right-6 flex items-center gap-1.5 z-10">
                <button
                  onClick={() => setActiveSlideIndex((prev) => (prev === 0 ? GALLERY_SLIDES.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSlideIndex((prev) => (prev + 1) % GALLERY_SLIDES.length)}
                  className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Pill Tags Overlay (Matching reference pill tags row) */}
              <div className="absolute bottom-5 sm:bottom-6 inset-x-5 sm:inset-x-6 flex flex-wrap items-center justify-between gap-2.5 z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-zinc-950 text-[11px] font-mono font-bold shadow-sm">
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
