"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Star, ShieldCheck, Award, Compass, UserCheck } from "lucide-react";

interface FounderSectionProps {
  onOpenRegister: () => void;
}

export default function FounderSection({ onOpenRegister }: FounderSectionProps) {
  return (
    <section id="founder" className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden">
      
      {/* Background Watermark Overlay */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/images/logo_icon.jpg"
          alt="Lifebuild Overlay"
          fill
          className="object-contain filter grayscale"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-gray-200 text-zinc-700 text-xs font-mono uppercase tracking-widest">
            <UserCheck className="w-3.5 h-3.5 text-[#3b2262]" />
            <span>Founder & Keynote Leadership</span>
          </div>

          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            Led by Zeki Ubor. <br />
            15 Years of Rebuilding & Human Architecture.
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            Grounded in a 15-year God-given mandate under Isaiah 58:12, Zeki Ubor equips founders, builders, and executives to rebuild broken walls, restore human identity, and position Kingdom ventures for generational impact.
          </p>
        </div>

        {/* Founder Feature Showcase Grid (Featuring Zeki Ubor's Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Zeki Ubor Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-zinc-950 text-white space-y-4">
              
              {/* Photo Container */}
              <div className="relative w-full aspect-[3/4] bg-zinc-900 overflow-hidden">
                <Image
                  src="/images/founder_zeki_ubor.jpg"
                  alt="Zeki Ubor - Founder of Lifebuild & 4Tribe Network"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-mono text-[#d4af37] font-bold uppercase">
                  Founder & Keynote Speaker
                </div>
              </div>

              {/* Founder Information Footer */}
              <div className="p-6 pt-0 space-y-2">
                <h3 className="font-serif-headline text-3xl text-white font-normal">
                  Zeki Ubor
                </h3>
                <p className="text-xs font-mono text-[#d4af37]">
                  Founder, Lifebuild & 4Tribe Network
                </p>
                <p className="text-xs text-zinc-400 font-light pt-1 border-t border-zinc-800">
                  "Human Architecture & Strategic Positioning Masterclass"
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Masterclass & Leadership Principles */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
                The Masterclass Pillar
              </span>
              <h3 className="font-serif-headline text-3xl sm:text-4xl text-zinc-950 font-normal leading-tight">
                Becoming a Person of Interest & Strategic Impact.
              </h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                Leadership is not merely managing tasks; it is about constructing a spirit of resilience, integrity, and divine authority. Zeki Ubor brings 15 years of silent preparation to teach actionable human architecture.
              </p>
            </div>

            {/* 3 Core Masterclass Principles */}
            <div className="space-y-4 pt-2">
              
              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">01 / HUMAN ARCHITECTURE</span>
                <h4 className="font-heading font-bold text-base text-black">Restoring Identity & Spiritual Authority</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Unlocking keys to who you were created to be before building products or leading teams.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">02 / STRATEGIC POSITIONING</span>
                <h4 className="font-heading font-bold text-base text-black">Kingdom Execution & High-Stakes Scaling</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Navigating market shifts, resource stewardship, and institutional building with unshakeable faith.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">03 / THE REBUILDER'S TABLE</span>
                <h4 className="font-heading font-bold text-base text-black">Confidential Peer Mentorship & Prayer</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Iron sharpening iron — direct roundtable interaction with Zeki Ubor during Sunday weekly gatherings.
                </p>
              </div>

            </div>

            {/* Call to Action */}
            <div className="pt-2">
              <button
                onClick={onOpenRegister}
                className="px-8 py-4 rounded-full bg-black text-white font-medium text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Join Fellowship with Zeki Ubor</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
