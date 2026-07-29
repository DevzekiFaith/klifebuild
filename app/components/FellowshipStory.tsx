"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Star, Hammer, Key, HeartHandshake, RefreshCw, Layers } from "lucide-react";

interface FellowshipStoryProps {
  onOpenRegister?: () => void;
  onOpenPass?: () => void;
}

export default function FellowshipStory({ onOpenRegister, onOpenPass }: FellowshipStoryProps) {
  return (
    <section id="vision" className="relative w-full bg-[#141414] text-white py-28 border-t border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Full-width High Contrast Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Custom Minimalist 4T Framework UI Emblem Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-white text-black p-8 rounded-3xl shadow-2xl space-y-6 border border-gray-200">
              
              {/* Card Header with Lifebuild Logo */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-300 p-0.5 bg-white">
                    <Image
                      src="/images/logo.jpg"
                      alt="Lifebuild Logo"
                      width={32}
                      height={32}
                      className="object-contain rounded"
                    />
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-sm tracking-tight text-black block">
                      lifebuild<span className="text-[#3b2262]">.</span>
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block">
                      4Tribe Network
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-zinc-900 text-white px-2 py-0.5 rounded">
                  Isaiah 58:12
                </span>
              </div>

              {/* Custom 2x2 4T Framework Grid Graphic */}
              <div className="relative p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3 text-white">
                
                <div className="grid grid-cols-2 gap-3 relative">
                  
                  {/* Rebuilding */}
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <Hammer className="w-5 h-5 text-amber-400" />
                      <span className="text-[9px] font-mono text-amber-300 uppercase font-bold">01</span>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-amber-200 block">
                        REBUILDING
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono">Walls & Systems</span>
                    </div>
                  </div>

                  {/* Restoring */}
                  <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <Key className="w-5 h-5 text-blue-400" />
                      <span className="text-[9px] font-mono text-blue-300 uppercase font-bold">02</span>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-blue-200 block">
                        RESTORING
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono">Identity & Calling</span>
                    </div>
                  </div>

                  {/* Repairing */}
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <HeartHandshake className="w-5 h-5 text-emerald-400" />
                      <span className="text-[9px] font-mono text-emerald-300 uppercase font-bold">03</span>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-emerald-200 block">
                        REPAIRING
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono">Community Fabric</span>
                    </div>
                  </div>

                  {/* Replenishing */}
                  <div className="p-4 rounded-xl bg-yellow-950/40 border border-yellow-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <RefreshCw className="w-5 h-5 text-yellow-400" />
                      <span className="text-[9px] font-mono text-yellow-300 uppercase font-bold">04</span>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-yellow-200 block">
                        REPLENISHING
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono">Overflow & Legacy</span>
                    </div>
                  </div>

                  {/* Central Badge Overlay */}
                  <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white text-black font-heading font-black text-sm flex items-center justify-center border-2 border-zinc-900 shadow-xl pointer-events-none">
                    4T
                  </div>

                </div>

                {/* Sub-Tagline */}
                <div className="pt-2 text-center border-t border-zinc-800 text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">
                  4TribeNetwork • Raising Mighties • Transforming Communities
                </div>

              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-gray-100">
                <span className="text-black font-bold">The 4T Framework</span>
                <span>Est. 2011</span>
              </div>
            </div>
          </div>

          {/* Right Column: N26 Style Typography Block */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Minimal Brand Symbol */}
            <div className="space-y-2">
              <span className="font-heading font-extrabold text-2xl text-white tracking-widest block border-b-2 border-white w-8 pb-1">
                4T
              </span>
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest">
                Isaiah 58:12 Mandate • 4T Conference
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
              Driven by Isaiah 58:12, Lifebuild is a 15-year God-given mandate to rebuild broken walls across human lives, organizations, and ecosystems. Through weekly gatherings and our annual <strong>4T Conference</strong>, we equip leaders to rebuild, restore, repair, and replenish.
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
