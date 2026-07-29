"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Zap, ShieldCheck, QrCode } from "lucide-react";

interface WeeklyMeetingProps {
  onOpenRegister?: () => void;
  onOpenScanner?: () => void;
}

export default function WeeklyMeeting({ onOpenRegister, onOpenScanner }: WeeklyMeetingProps) {
  return (
    <section id="fellowship" className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden">
      
      {/* Background Watermark Overlay */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/images/logo_icon.jpg"
          alt="Lifebuild Overlay"
          fill
          sizes="500px"
          className="object-contain filter grayscale"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest block">
            Weekly Gathering & 4T Conference
          </span>
          
          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            The Founder's Sanctuary. <br />
            Weekly Gathering & Annual 4T Conference.
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            Every Sunday at 5:00 PM GMT+1, founders and leaders gather for 60 minutes of spiritual grounding, Kingdom strategic teaching, and iron-sharpening fellowship anchored in Isaiah 58:12.
          </p>
        </div>

        {/* Featured Modern Minimalist Worship Artwork Card */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-gray-200 bg-zinc-950 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Side: Worship Image */}
          <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[400px] w-full">
            <Image
              src="/images/worship_nigerian_african.png"
              alt="Single Black African Nigerian Worshipper in Reverence to God"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/90 lg:to-zinc-950 pointer-events-none"></div>
          </div>

          {/* Right Side: Text & Scriptural Mandate */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#d4af37] text-[10px] font-mono font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              Presence • Alignment • Impact
            </span>

            <h3 className="font-serif-headline text-2xl sm:text-3xl text-white font-normal leading-tight">
              A Sacred Space for Builders to Recharge.
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in."
            </p>

            <div className="pt-2 text-xs font-mono text-[#d4af37] font-bold">
              — Isaiah 58:12
            </div>

            {/* Quick Sanctuary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenRegister}
                className="px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Join Fellowship
              </button>

              <button
                onClick={onOpenScanner}
                className="px-5 py-2.5 rounded-full border border-zinc-800 hover:border-white text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Sanctuary Entrance Pass</span>
              </button>
            </div>

          </div>

        </div>

        {/* 2-Column Info & 60-Minute Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Meeting Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4 border-b border-gray-200 pb-8">
              <h3 className="font-heading font-bold text-2xl text-black">
                Meeting Mechanics
              </h3>
              <ul className="space-y-3 text-sm text-zinc-600 font-light">
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Frequency</span>
                  <span className="font-medium text-black">Every Sunday</span>
                </li>
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Time</span>
                  <span className="font-medium text-black">5:00 PM – 6:00 PM (GMT+1)</span>
                </li>
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Duration</span>
                  <span className="font-medium text-black">60 Minutes</span>
                </li>
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Format</span>
                  <span className="font-medium text-black">Hybrid (In-Person & Global Stream)</span>
                </li>
                <li className="flex items-start justify-between pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Anchor Scripture</span>
                  <span className="font-medium text-black font-mono text-xs">Isaiah 58:12</span>
                </li>
              </ul>
            </div>

            {/* Annual 4T Conference Teaser Block */}
            <div className="p-8 bg-zinc-950 text-white rounded-3xl space-y-4 border border-zinc-800">
              <span className="text-xs font-mono uppercase text-[#d4af37] tracking-widest block">
                Annual Flagship Gathering
              </span>
              <h4 className="font-serif-headline text-2xl text-white">The 4T Conference</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Our annual gathering of Kingdom builders, investors, conveners, and societal leaders across the 4Tribe Network. 3 days of intensive commissioning and strategic reconstruction.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#d4af37] transition-colors cursor-pointer font-bold uppercase tracking-wider"
                >
                  <span>Request Conference Pass</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: 4-Step 60-Minute Meeting Blueprint */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-heading text-lg font-bold text-black flex items-center gap-2">
                <Zap className="w-4 h-4 text-black" />
                60-Minute Meeting Blueprint
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 01</span>
                  <span>10 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Grounding & Devotional Focus</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Stripping away workweek noise. Centering mind and spirit in worship, gratitude, and divine perspective under Isaiah 58:12.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 02</span>
                  <span>30 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">4T Teaching & Kingdom Principles</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Actionable teaching on Rebuilding, Restoring, Repairing, and Replenishing broken systems and leaders.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 03</span>
                  <span>10 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Rebuilder's Prayer & Strategy</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Targeted prayer, faith declarations, and strategic alignment across the 4Tribe Network. Iron sharpening iron.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 04</span>
                  <span>10 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Commissioning & Prophetic Alignment</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Final blessing, weekly commissioning, and sending forth leaders into their spheres of impact with authority.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
