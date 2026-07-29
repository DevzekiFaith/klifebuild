"use client";

import React from "react";
import { Calendar, Clock, MapPin, QrCode, Zap, ArrowUpRight, Sparkles } from "lucide-react";

interface WeeklyMeetingProps {
  onOpenRegister: () => void;
  onOpenScanner: () => void;
}

export default function WeeklyMeeting({ onOpenRegister, onOpenScanner }: WeeklyMeetingProps) {
  return (
    <section id="fellowship" className="relative w-full bg-white text-black py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        
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
            Every Sunday at 5:00 PM GMT+1, founders and leaders gather for 120 minutes of spiritual grounding, Kingdom strategic teaching, and iron-sharpening fellowship anchored in Isaiah 54:12.
          </p>
        </div>

        {/* 2-Column Minimalist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Logistics & Entry Scanner Trigger */}
          <div className="lg:col-span-5 border border-gray-200 p-8 rounded-2xl space-y-8 bg-zinc-50/50">
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">Sanctuary Details</span>
              <h3 className="font-heading text-xl font-bold text-black">Logistics & Entry Protocol</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase block">Weekly Gathering</span>
                  <span className="text-sm font-semibold text-black">Every Sunday @ 5:00 PM (GMT+1)</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase block">Annual Event</span>
                  <span className="text-sm font-semibold text-[#3b2262]">4T Conference (4Tribe Network)</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase block">Location / Access</span>
                  <span className="text-sm font-semibold text-black">Lifebuild Center & Global Stream</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <QrCode className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase block">Entrance Barcode</span>
                  <span className="text-sm font-semibold text-black">Personal QR Pass Required</span>
                </div>
              </div>
            </div>

            {/* Attendance QR Pass CTAs */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button
                onClick={onOpenRegister}
                className="w-full py-3 rounded-full bg-black text-white font-medium text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply For Fellowship & 4T Pass</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenScanner}
                className="w-full py-3 rounded-full border border-gray-300 text-zinc-800 font-mono text-xs hover:border-black transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Service Entrance Scanner</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4-Step 120-Minute Meeting Blueprint */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-heading text-lg font-bold text-black flex items-center gap-2">
                <Zap className="w-4 h-4 text-black" />
                120-Minute Meeting Blueprint
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 01</span>
                  <span>20 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Grounding & Devotional Focus</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Stripping away workweek noise. Centering mind and spirit in worship, gratitude, and divine perspective under Isaiah 54.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 02</span>
                  <span>40 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">4T Teaching & Kingdom Principles</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Actionable teaching on Rebuilding, Restoring, Repairing, and Replenishing broken systems and leaders.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 03</span>
                  <span>45 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">The Rebuilder's Roundtable</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Confidential peer breakout groups across the 4Tribe Network. Iron sharpening iron — real strategy, prayer, and solutions.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 04</span>
                  <span>15 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Commissioning & Anointing</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Targeted prayer for your team, products, health, and family before stepping into the upcoming week.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
