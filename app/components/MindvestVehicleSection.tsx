"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, GraduationCap, Palette, HeartHandshake, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function MindvestVehicleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const vehicles = [
    {
      id: "origin",
      name: "Origin",
      category: "Human Development",
      icon: GraduationCap,
      headline: "Unconventional Learning & Capability",
      description:
        "Developing real-world human capacity through transformative learning experiences, mindset restructuring, and practical competency building for emerging leaders.",
      outputs: [
        "Unconventional learning pathways",
        "Practical human capability development",
        "Leadership resilience and mindset growth",
      ],
    },
    {
      id: "elevation",
      name: "Elevation Studio",
      category: "Creative & Digital Infrastructure",
      icon: Palette,
      headline: "Architecture, Design & Digital Software",
      description:
        "Building digital and spatial capabilities — combining architectural precision, human-centered design, and robust software engineering to translate visions into tangible assets.",
      outputs: [
        "Architecture & spatial environments",
        "High-fidelity design & creative strategy",
        "Digital & software platform capabilities",
      ],
    },
    {
      id: "homecare",
      name: "Homecare",
      category: "Practical Care Services",
      icon: HeartHandshake,
      headline: "Compassionate Family & Care Systems",
      description:
        "Bringing the rebuilding mandate into everyday living environments through structured, high-dignity care services that support vulnerable individuals and reinforce family stability.",
      outputs: [
        "Structured home & community care",
        "Dignity-first operational standards",
        "Strengthening family support systems",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="vehicles"
      className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden"
    >
      {/* Background Watermark Overlay with Parallax Motion */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.03] pointer-events-none select-none"
      >
        <Image
          src="/images/logo_icon_nobg.png"
          alt="Lifebuild Overlay"
          fill
          sizes="550px"
          className="object-contain filter grayscale"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-gray-200 text-zinc-700 text-xs font-mono uppercase tracking-widest shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#3b2262]" />
            <span>Practical Execution Vehicles</span>
          </div>

          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            Translating the Vision into Practical Action.
          </h2>

          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-light">
            <strong className="text-black font-medium">Lifebuild Global is the overarching vision, calling, and movement.</strong> To operate tangibly across marketplace sectors, practical vehicles such as <strong className="text-black font-medium">Mindvest</strong> help anchor the mission through people development, workforce enhancement, and community building.
          </p>
        </motion.div>

        {/* Structural Architecture Breadcrumb Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-zinc-50 border border-gray-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <div>
              <span className="font-bold text-black uppercase block">Lifebuild Global</span>
              <span className="text-[11px] text-zinc-500">The Vision, Calling &amp; Movement</span>
            </div>
          </div>

          <span className="text-zinc-400 hidden md:block">→</span>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#3b2262] text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <div>
              <span className="font-bold text-black uppercase block">Mindvest</span>
              <span className="text-[11px] text-zinc-500">The Practical Vehicle &amp; Enterprise</span>
            </div>
          </div>

          <span className="text-zinc-400 hidden md:block">→</span>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#d4af37] text-zinc-950 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <div>
              <span className="font-bold text-black uppercase block">Impact Disciplines</span>
              <span className="text-[11px] text-zinc-500">People • Workforce • Communities</span>
            </div>
          </div>
        </motion.div>

        {/* Mindvest Expressions 3-Column Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {vehicles.map((vehicle) => {
            const Icon = vehicle.icon;
            return (
              <motion.div
                key={vehicle.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="p-8 border border-gray-200 rounded-3xl hover:border-black hover:shadow-xl transition-all space-y-5 bg-white flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3b2262]">
                      {vehicle.category}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-gray-200 flex items-center justify-center group-hover:border-black transition-colors">
                      <Icon className="w-5 h-5 text-zinc-900" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif-headline text-2xl text-black font-normal">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 pt-0.5">
                      {vehicle.headline}
                    </p>
                  </div>

                  <p className="text-sm text-zinc-600 leading-relaxed font-light">
                    {vehicle.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-semibold">
                      Practical Focus
                    </span>
                    <ul className="space-y-1.5">
                      {vehicle.outputs.map((out, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Mindvest Vehicle</span>
                  <span className="font-bold text-black group-hover:translate-x-1 transition-transform">
                    Expression Active →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Clarifying Summary Banner */}
        <div className="p-6 bg-gray-50/70 border border-gray-200 rounded-2xl text-center space-y-1">
          <p className="text-xs sm:text-sm text-zinc-600 font-light">
            <strong className="text-black font-medium">Clear Positioning:</strong> Lifebuild does not exist to run commercial enterprises, nor does Mindvest define Lifebuild. Mindvest serves as one practical mechanism translating the spiritual and transformational blueprint of Lifebuild into everyday economic and social solutions.
          </p>
        </div>

      </div>
    </section>
  );
}
