"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QrCode, ArrowUpRight, Hammer, Key, HeartHandshake, RefreshCw } from "lucide-react";

interface HeroSolarSystemProps {
  onOpenRegister: () => void;
  onOpenScanner: () => void;
}

interface PlanetPillar {
  id: string;
  name: string;
  tagline: string;
  description: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  color: string;
  specs: {
    orbitPeriod: string;
    foundationalFocus: string;
    biblicalAnchor: string;
  };
}

const PILLARS: PlanetPillar[] = [
  {
    id: "sun",
    name: "Divine Calling",
    tagline: "Isaiah 58:12 Core Catalyst",
    description: "The 15-year God-given blueprint centered on divine purpose, spiritual alignment, and total life reconstruction under Isaiah 58:12.",
    size: 64,
    orbitRadius: 0,
    orbitSpeed: 0,
    color: "from-zinc-900 via-zinc-800 to-black",
    specs: {
      orbitPeriod: "Central Anchor",
      foundationalFocus: "Spiritual Grounding & Vision",
      biblicalAnchor: "Isaiah 58:12",
    },
  },
  {
    id: "rebuilding",
    name: "01. Rebuilding",
    tagline: "Broken Walls & Systems",
    description: "Reconstructing broken walls, structural foundations, and economic ecosystems to withstand future shocks.",
    size: 36,
    orbitRadius: 105,
    orbitSpeed: 45,
    color: "from-amber-900 via-zinc-900 to-black",
    specs: {
      orbitPeriod: "4T Pillar 01",
      foundationalFocus: "Structural Reconstruction",
      biblicalAnchor: "Isaiah 58:12",
    },
  },
  {
    id: "restoring",
    name: "02. Restoring",
    tagline: "Identity & Calling",
    description: "Unlocking keys to human identity, restoring dignity, spiritual authority, and peace in families and organizations.",
    size: 32,
    orbitRadius: 165,
    orbitSpeed: 70,
    color: "from-blue-950 via-zinc-900 to-black",
    specs: {
      orbitPeriod: "4T Pillar 02",
      foundationalFocus: "Human Dignity & Peace",
      biblicalAnchor: "Isaiah 61:3",
    },
  },
  {
    id: "repairing",
    name: "03. Repairing",
    tagline: "Breaches & Community",
    description: "Repairing systemic breaches, unifying builders, and healing character gaps to strengthen community fabric.",
    size: 34,
    orbitRadius: 225,
    orbitSpeed: 95,
    color: "from-emerald-950 via-zinc-900 to-black",
    specs: {
      orbitPeriod: "4T Pillar 03",
      foundationalFocus: "Community & Alignment",
      biblicalAnchor: "Nehemiah 4:6",
    },
  },
  {
    id: "replenishing",
    name: "04. Replenishing",
    tagline: "Abundance & Legacy",
    description: "Unlocking sustainable stewardship, economic overflow, and generational inheritance for decades ahead.",
    size: 38,
    orbitRadius: 285,
    orbitSpeed: 125,
    color: "from-yellow-950 via-zinc-900 to-black",
    specs: {
      orbitPeriod: "4T Pillar 04",
      foundationalFocus: "Generational Overflow",
      biblicalAnchor: "Psalms 112:3",
    },
  },
];

export default function HeroSolarSystem({
  onOpenRegister,
  onOpenScanner,
}: HeroSolarSystemProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPillar>(PILLARS[0]);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setRotationAngle((prev) => (prev + delta * 6) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section
      id="solar-system"
      className="relative w-full min-h-screen pt-32 pb-20 bg-white text-black selection:bg-black selection:text-white overflow-hidden"
    >
      {/* Background Lifebuild Logo Watermark Overlay */}
      <div className="absolute top-12 right-0 w-[450px] h-[450px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/images/logo_icon.jpg"
          alt="Lifebuild Overlay"
          fill
          className="object-contain filter grayscale"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Serif Mandate Statement & 4T Sub-Row */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-gray-200 text-zinc-700 text-xs font-mono uppercase tracking-widest">
              <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/images/logo_icon.jpg"
                  alt="Lifebuild emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Isaiah 58:12 Mandate • 4Tribe Network</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-headline text-5xl sm:text-7xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-zinc-950">
              Rebuilding the broken wall. Raising mighties, transforming communities.
            </h1>

            {/* 4T Sub-row links */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest pt-1">
              <a href="#pillars" className="hover:text-black transition-colors font-bold text-zinc-900">
                01. Rebuilding
              </a>
              <span>—</span>
              <a href="#pillars" className="hover:text-black transition-colors font-bold text-zinc-900">
                02. Restoring
              </a>
              <span>—</span>
              <a href="#pillars" className="hover:text-black transition-colors font-bold text-zinc-900">
                03. Repairing
              </a>
              <span>—</span>
              <a href="#pillars" className="hover:text-black transition-colors font-bold text-zinc-900">
                04. Replenishing
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenRegister}
                className="px-6 py-3.5 rounded-full bg-black text-white font-medium text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Join Fellowship & 4T Conf</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
              
              <button
                onClick={onOpenScanner}
                className="px-5 py-3.5 rounded-full border border-gray-300 text-zinc-800 font-mono text-xs hover:border-black transition-all flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Service Check-In</span>
              </button>
            </div>

          </div>

          {/* Right Column: 4T Cosmic Orbit Graphic featuring Official Lifebuild Logo Centerpiece */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[420px]">
            
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              
              {/* Concentric Orbit Rings */}
              {PILLARS.filter((p) => p.id !== "sun").map((planet) => (
                <div
                  key={`ring-${planet.id}`}
                  className="absolute rounded-full border border-gray-200 pointer-events-none"
                  style={{
                    width: `${planet.orbitRadius * 2}px`,
                    height: `${planet.orbitRadius * 2}px`,
                    borderColor:
                      selectedPlanet.id === planet.id ? "#111111" : "#e5e7eb",
                  }}
                />
              ))}

              {/* Central Sun Element (Featuring Official Lifebuild Emblem Icon) */}
              <div
                onClick={() => setSelectedPlanet(PILLARS[0])}
                className="absolute z-20 cursor-pointer rounded-full bg-white border-2 border-black p-1 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 overflow-hidden"
                style={{
                  width: `${PILLARS[0].size}px`,
                  height: `${PILLARS[0].size}px`,
                }}
                title="Lifebuild Central Anchor"
              >
                <Image
                  src="/images/logo_icon.jpg"
                  alt="Lifebuild Central Sun Emblem"
                  width={48}
                  height={48}
                  className="object-contain rounded-full"
                />
              </div>

              {/* Orbiting 4T Planet Elements */}
              {PILLARS.filter((p) => p.id !== "sun").map((planet, idx) => {
                const angleDeg = (rotationAngle * (100 / planet.orbitSpeed) + idx * 90) % 360;
                const angleRad = (angleDeg * Math.PI) / 180;
                const x = Math.cos(angleRad) * planet.orbitRadius;
                const y = Math.sin(angleRad) * planet.orbitRadius;
                const isSelected = selectedPlanet.id === planet.id;

                return (
                  <div
                    key={planet.id}
                    onClick={() => setSelectedPlanet(planet)}
                    className="absolute z-20 cursor-pointer transition-all flex items-center justify-center group"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      width: `${planet.size}px`,
                      height: `${planet.size}px`,
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full bg-zinc-900 border transition-transform group-hover:scale-125 ${
                        isSelected ? "border-black ring-2 ring-black scale-125 bg-black" : "border-zinc-300"
                      }`}
                    />
                    <span className="absolute -bottom-6 text-[10px] font-mono whitespace-nowrap text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {planet.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Pillar Floating Inspection Box */}
            <div className="absolute bottom-2 left-0 right-0 max-w-xs mx-auto p-4 bg-white border border-gray-200 rounded-xl text-center space-y-1 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">4T Pillar Inspection</span>
              <h4 className="font-heading text-sm font-bold text-black">{selectedPlanet.name}</h4>
              <p className="text-xs text-zinc-600 font-light">{selectedPlanet.description}</p>
              <span className="text-[10px] font-mono text-[#3b2262] font-semibold block pt-1">
                Anchor: {selectedPlanet.specs.biblicalAnchor}
              </span>
            </div>

          </div>

        </div>

        {/* Hero Bottom Row: The 4T Pillars Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-gray-100">
          
          <div className="space-y-3 p-5 border border-gray-100 rounded-2xl hover:border-black transition-colors bg-gray-50/50">
            <div className="w-8 h-8 flex items-center justify-center">
              <Hammer className="w-5 h-5 text-amber-800" />
            </div>
            <h3 className="font-heading font-bold text-sm text-black">01. REBUILDING</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Reconstructing broken walls, business systems, and economic foundations under Isaiah 58:12.
            </p>
          </div>

          <div className="space-y-3 p-5 border border-gray-100 rounded-2xl hover:border-black transition-colors bg-gray-50/50">
            <div className="w-8 h-8 flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-800" />
            </div>
            <h3 className="font-heading font-bold text-sm text-black">02. RESTORING</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Unlocking keys to identity, restoring human dignity, calling, and peace in communities.
            </p>
          </div>

          <div className="space-y-3 p-5 border border-gray-100 rounded-2xl hover:border-black transition-colors bg-gray-50/50">
            <div className="w-8 h-8 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="font-heading font-bold text-sm text-black">03. REPAIRING</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Binding wounds, unifying builders, and strengthening community fabric step by step.
            </p>
          </div>

          <div className="space-y-3 p-5 border border-gray-100 rounded-2xl hover:border-black transition-colors bg-gray-50/50">
            <div className="w-8 h-8 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-yellow-800" />
            </div>
            <h3 className="font-heading font-bold text-sm text-black">04. REPLENISHING</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Unlocking abundance, sustainable stewardship, and overflowing resources for generations.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
