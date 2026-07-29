"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, UserCheck, Heart, Sparkles, Target } from "lucide-react";

interface FounderSectionProps {
  onOpenRegister: () => void;
}

export default function FounderSection({ onOpenRegister }: FounderSectionProps) {
  return (
    <section id="founder" className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden">
      
      {/* Background Watermark Overlay */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/images/logo_icon_nobg.png"
          alt="Lifebuild Overlay"
          fill
          sizes="550px"
          className="object-contain filter grayscale"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-gray-200 text-zinc-700 text-xs font-mono uppercase tracking-widest">
            <UserCheck className="w-3.5 h-3.5 text-[#3b2262]" />
            <span>Meet The Founder</span>
          </div>

          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            Zeki Ubor. <br />
            Founder & Convener of Lifebuild.
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            A propelling movement of transformation and impact, centered on spiritual alignment, rebuilding broken walls, and empowering leaders to reconstruct broken foundations across lives, families, and communities under Isaiah 58:12.
          </p>
        </div>

        {/* Founder Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official Zeki Ubor Flipped Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-[#141414] text-white space-y-4">
              
              {/* Photo Container with Horizontal Flip (scale-x-[-1]) */}
              <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black overflow-hidden flex items-end justify-center pt-6">
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-radial from-[#3b2262]/30 via-transparent to-transparent pointer-events-none"></div>

                {/* Flipped Image */}
                <div className="relative w-full h-full scale-x-[-1]">
                  <Image
                    src="/images/zeki_ubor_official.png"
                    alt="Zeki Ubor - Founder & Convener of Lifebuild"
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-contain object-bottom hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent pointer-events-none"></div>
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-mono text-white font-bold uppercase">
                  Founder & Convener
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
                  "Rebuilding ancient ruins and raising up age-old foundations."
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Founder's Story & Mandate */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
                The Founder's Journey
              </span>
              <h3 className="font-serif-headline text-3xl sm:text-4xl text-zinc-950 font-normal leading-tight">
                Building People to Rebuild Everywhere You Go.
              </h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                Propelled by divine authority and an unyielding commitment to giving, Zeki Ubor convenes founders, executives, and visionaries under the <strong>Lifebuild & 4Tribe Network</strong>. This movement is dedicated to raising mighties, imparting wisdom, and deploying strategic resources to rebuild broken walls across business, family, and society.
              </p>
            </div>

            {/* 3 Core Pillars of Zeki Ubor's Leadership */}
            <div className="space-y-4 pt-2">
              
              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-1 bg-gray-50/40">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold uppercase">
                  <Target className="w-4 h-4 text-black" />
                  <span>01 / DIVINE PURPOSE & ALIGNMENT</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Spiritual Grounding First</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Prioritizing spiritual alignment and character over mere hustle. Aligning vision with God's blueprint for long-term endurance.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-1 bg-gray-50/40">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold uppercase">
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>02 / THE 4T FRAMEWORK</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Rebuilding, Restoring, Repairing, Replenishing</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  A holistic approach to life reconstruction — fixing broken systems, healing identity breaches, and stewarding generational wealth.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-1 bg-gray-50/40">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold uppercase">
                  <Heart className="w-4 h-4 text-black" />
                  <span>03 / COMMUNITY & FELLOWSHIP</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Raising Mighties & Transforming Communities</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Gathering builders every Sunday for iron-sharpening fellowship, strategic teaching, and genuine brotherhood.
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
