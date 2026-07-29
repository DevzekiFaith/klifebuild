"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";

interface FellowshipStoryProps {
  onOpenRegister?: () => void;
  onOpenPass?: () => void;
}

export default function FellowshipStory({ onOpenRegister, onOpenPass }: FellowshipStoryProps) {
  return (
    <section id="vision" className="relative w-full bg-[#141414] text-white py-28 border-t border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Full-width High Contrast Showcase Grid (Featuring 4T Emblem & Isaiah 54 Mission) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official 4T Emblem Badge & Pass Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-white text-black p-8 rounded-3xl shadow-2xl space-y-6 border border-gray-200 text-center">
              
              {/* Emblem Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="font-heading font-extrabold text-sm tracking-tight text-black">
                  4TribeNetwork
                </span>
                <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-bold">
                  Isaiah 54:12
                </span>
              </div>

              {/* Official 4T Emblem Graphic */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-950 flex items-center justify-center p-2 border border-zinc-300">
                <Image
                  src="/images/4t_emblem.png"
                  alt="4T Emblem - Rebuilding, Restoring, Repairing, Replenishing"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-headline text-2xl text-black">The 4T Framework</h4>
                <p className="text-xs text-zinc-500 font-mono">
                  Rebuilding • Restoring • Repairing • Replenishing
                </p>
              </div>

              {/* Tagline */}
              <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-zinc-600 font-bold uppercase tracking-wider">
                Raising Mighties • Transforming Communities
              </div>
            </div>
          </div>

          {/* Right Column: N26 Style Typography Block with 4T Conference Focus */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Minimal Brand Symbol */}
            <div className="space-y-2">
              <span className="font-heading font-extrabold text-2xl text-white tracking-widest block border-b-2 border-white w-8 pb-1">
                4T
              </span>
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest">
                Isaiah 54:12 Mandate • 4T Conference
              </span>
            </div>

            {/* Serif Headline */}
            <h2 className="font-serif-headline text-4xl sm:text-6xl text-white font-normal leading-tight">
              Rebuilding the broken walls and raising up foundations for generations.
            </h2>

            {/* Star Ratings / Trust Indicator */}
            <div className="flex items-center gap-1 text-[#d4af37]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs font-mono text-zinc-400 ml-2">15 Years of Silent Preparation</span>
            </div>

            {/* Description Paragraph */}
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              Driven by Isaiah 54:12, Lifebuild is a 15-year God-given mandate to rebuild broken walls across human lives, organizations, and ecosystems. Through weekly gatherings and our annual <strong>4T Conference</strong>, we equip leaders to rebuild, restore, repair, and replenish.
            </p>

            {/* Action Link */}
            <div className="pt-4">
              <button
                onClick={onOpenRegister || onOpenPass}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors border-b border-white pb-1 group cursor-pointer"
              >
                <span>Register for Fellowship & 4T Conference</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
