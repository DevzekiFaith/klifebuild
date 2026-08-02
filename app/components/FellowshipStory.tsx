"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Star, Hammer, Key, HeartHandshake, RefreshCw } from "lucide-react";

interface FellowshipStoryProps {
  onOpenRegister?: () => void;
  onOpenPass?: () => void;
}

export default function FellowshipStory({ onOpenRegister, onOpenPass }: FellowshipStoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative w-full bg-white text-black py-28 border-t border-b border-gray-100 overflow-hidden"
    >
      
      {/* Background Watermark Overlay with Parallax Displacement */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 -left-20 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.03] pointer-events-none select-none"
      >
        <Image
          src="/images/logo_icon_nobg.png"
          alt="Lifebuild Overlay"
          fill
          sizes="550px"
          className="object-contain filter grayscale"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Full-width High Contrast Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Pure White & Simple Minimalist 4T Framework Card */}
          <motion.div
            style={{ scale: cardScale }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center"
          >
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              className="relative w-full max-w-md bg-white text-black p-8 pt-16 rounded-t-full rounded-b-3xl shadow-xl space-y-6 border border-gray-200 transition-all duration-300 overflow-hidden"
            >
              
              {/* Card Header with Official Lifebuild Logo */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
                    <Image
                      src="/images/logo_icon_nobg.png"
                      alt="Lifebuild Logo"
                      width={36}
                      height={36}
                      className="object-contain"
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
                <span className="text-[10px] font-mono font-bold bg-zinc-100 border border-zinc-300 text-zinc-800 px-2 py-0.5 rounded-full">
                  Isaiah 58:12
                </span>
              </div>

              {/* Clean Square 2x2 4T Framework Grid Container (No Arch inside) */}
              <div className="relative p-5 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-4 text-black">
                
                <div className="grid grid-cols-2 gap-3 relative">
                  
                  {/* 01. REBUILDING */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-4 rounded-xl bg-white border border-gray-200 flex flex-col justify-between space-y-3 hover:border-black transition-all cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <Hammer className="w-4 h-4 text-zinc-800" />
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">01</span>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-black block">
                        REBUILDING
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono block">Walls & Systems</span>
                    </div>
                  </motion.div>

                  {/* 02. RESTORING */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-4 rounded-xl bg-white border border-gray-200 flex flex-col justify-between space-y-3 hover:border-black transition-all cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <Key className="w-4 h-4 text-zinc-800" />
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">02</span>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-black block">
                        RESTORING
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono block">Identity & Calling</span>
                    </div>
                  </motion.div>

                  {/* 03. REPAIRING */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-4 rounded-xl bg-white border border-gray-200 flex flex-col justify-between space-y-3 hover:border-black transition-all cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <HeartHandshake className="w-4 h-4 text-zinc-800" />
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">03</span>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-black block">
                        REPAIRING
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono block">Community Fabric</span>
                    </div>
                  </motion.div>

                  {/* 04. REPLENISHING */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-4 rounded-xl bg-white border border-gray-200 flex flex-col justify-between space-y-3 hover:border-black transition-all cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <RefreshCw className="w-4 h-4 text-zinc-800" />
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">04</span>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-black block">
                        REPLENISHING
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono block">Overflow & Legacy</span>
                    </div>
                  </motion.div>

                  {/* Central 4T Badge Overlay featuring Lifebuild Logo Icon */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-white text-black p-1 flex items-center justify-center border-2 border-black shadow-md pointer-events-none overflow-hidden"
                  >
                    <Image
                      src="/images/logo_icon_nobg.png"
                      alt="Lifebuild Emblem"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </motion.div>

                </div>

                {/* Sub-Tagline */}
                <div className="pt-2 text-center border-t border-gray-200 text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-wider">
                  4TribeNetwork • Raising Mighties • Transforming Communities
                </div>

              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-gray-100">
                <span className="text-black font-bold">The 4T Framework</span>
                <span>Est. 2011</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Typography Block with Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Minimal Brand Symbol */}
            <div className="space-y-2">
              <span className="font-heading font-extrabold text-2xl text-black tracking-widest block border-b-2 border-black w-8 pb-1">
                4T
              </span>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">
                Isaiah 58:12 Mandate • 4T Conference
              </span>
            </div>

            {/* Serif Headline */}
            <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
              Rebuilding the broken walls and raising up foundations for generations.
            </h2>

            {/* Star Ratings / Trust Indicator */}
            <div className="flex items-center gap-1 text-[#d4af37]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs font-mono text-zinc-600 font-bold ml-2">Propelled by Divine Mandate</span>
            </div>

            {/* Description Paragraph */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
              Driven by Isaiah 58:12, Lifebuild is a propelling movement to rebuild broken walls across human lives, organizations, and ecosystems. Through weekly gatherings and our annual <strong>4T Conference</strong>, we equip leaders to rebuild, restore, repair, and replenish.
            </p>

            {/* Action Link */}
            <div className="pt-4">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={onOpenRegister || onOpenPass}
                className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-zinc-700 transition-colors border-b border-black pb-1 group cursor-pointer bg-transparent border-t-0 border-x-0"
              >
                <span>Register for Fellowship & 4T Conference</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
