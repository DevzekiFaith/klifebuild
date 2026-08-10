"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { QrCode, ArrowUpRight, Hammer, Key, HeartHandshake, RefreshCw, ChevronDown } from "lucide-react";

interface HeroSolarSystemProps {
  onOpenRegister: () => void;
  onOpenScanner: () => void;
  onOpenConference?: () => void;
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
    description: "The God-given blueprint activating people to maximize their giftings and career paths to bring real transformation to communities.",
    size: 76,
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
  onOpenConference,
}: HeroSolarSystemProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPillar>(PILLARS[0]);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Mouse Parallax 3D Tilt Values
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  // Scroll Parallax Displacement
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
      ref={heroRef}
      id="solar-system"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen pt-32 pb-20 bg-white text-black selection:bg-black selection:text-white overflow-hidden perspective-1000"
    >
      {/* Background Lifebuild Logo Watermark Overlay with Scroll Parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-12 right-0 w-[450px] h-[450px] opacity-[0.04] pointer-events-none select-none"
      >
        <Image
          src="/images/logo_icon_nobg.png"
          alt="Lifebuild Overlay"
          fill
          sizes="450px"
          className="object-contain filter grayscale"
          priority
          loading="eager"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Serif Mandate Statement & 4T Sub-Row */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-gray-200 text-zinc-700 text-xs font-mono uppercase tracking-widest shadow-xs"
            >
              <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo_icon_nobg.png"
                  alt="Lifebuild emblem"
                  fill
                  sizes="24px"
                  className="object-contain"
                  priority
                  loading="eager"
                />
              </div>
              <span>Isaiah 58:12 • Bi-Weekly 4Tribe Network</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-headline text-5xl sm:text-7xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-zinc-950"
            >
              Rebuilding broken walls. Raising people, transforming communities.
            </motion.h1>

            {/* 4T Sub-row links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest pt-1"
            >
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
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenRegister}
                className="px-6 py-3.5 rounded-full bg-black text-white font-medium text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Join the Vision</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenScanner}
                className="px-5 py-3.5 rounded-full border border-gray-300 text-zinc-800 font-mono text-xs hover:border-black transition-all flex items-center gap-2 cursor-pointer bg-white"
              >
                <QrCode className="w-4 h-4" />
                <span>Check-In</span>
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Right Column: 4T Cosmic Orbit Graphic featuring 3D Tilt Parallax & Official Emblem Centerpiece */}
          <motion.div
            style={{ y: orbitY, rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-center justify-center relative min-h-[420px]"
          >
            
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              
              {/* Concentric Orbit Rings */}
              {PILLARS.filter((p) => p.id !== "sun").map((planet) => (
                <div
                  key={`ring-${planet.id}`}
                  className="absolute rounded-full border border-gray-200 pointer-events-none transition-all duration-300"
                  style={{
                    width: `${planet.orbitRadius * 2}px`,
                    height: `${planet.orbitRadius * 2}px`,
                    borderColor:
                      selectedPlanet.id === planet.id ? "#111111" : "#e5e7eb",
                  }}
                />
              ))}

              {/* Central Sun Element (Featuring Official Lifebuild Emblem Icon) */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPlanet(PILLARS[0])}
                className="absolute z-20 cursor-pointer rounded-full bg-white border-2 border-black p-1 shadow-2xl flex items-center justify-center transition-transform overflow-hidden"
                style={{
                  width: `${PILLARS[0].size}px`,
                  height: `${PILLARS[0].size}px`,
                  transform: "translateZ(30px)",
                }}
                title="Lifebuild Central Anchor"
              >
                <Image
                  src="/images/logo_icon_nobg.png"
                  alt="Lifebuild Central Sun Emblem"
                  width={64}
                  height={64}
                  className="object-contain"
                  priority
                  loading="eager"
                />
              </motion.div>

              {/* Orbiting 4T Planet Elements */}
              {PILLARS.filter((p) => p.id !== "sun").map((planet, idx) => {
                const angleDeg = (rotationAngle * (100 / planet.orbitSpeed) + idx * 90) % 360;
                const angleRad = (angleDeg * Math.PI) / 180;
                const x = Math.cos(angleRad) * planet.orbitRadius;
                const y = Math.sin(angleRad) * planet.orbitRadius;
                const isSelected = selectedPlanet.id === planet.id;

                return (
                  <motion.div
                    key={planet.id}
                    onClick={() => setSelectedPlanet(planet)}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 1.05 }}
                    className="absolute z-20 cursor-pointer transition-all flex items-center justify-center group"
                    style={{
                      transform: `translate(${x}px, ${y}px) translateZ(40px)`,
                      width: `${planet.size}px`,
                      height: `${planet.size}px`,
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full bg-zinc-900 border transition-transform ${
                        isSelected
                          ? "border-black ring-4 ring-black/20 bg-black shadow-lg scale-110"
                          : "border-zinc-300 group-hover:border-black"
                      }`}
                    />
                    <span className="absolute -bottom-6 text-[10px] font-mono whitespace-nowrap text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-xs border border-gray-200">
                      {planet.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Pillar Floating Inspection Box (Positioned safely outside the inner orbit area) */}
            <motion.div
              key={selectedPlanet.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-10 left-0 right-0 max-w-xs mx-auto p-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl text-center space-y-1 shadow-lg pointer-events-auto z-30"
              style={{ transform: "translateZ(50px)" }}
            >
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">4T Pillar Inspection</span>
              <h4 className="font-heading text-sm font-bold text-black">{selectedPlanet.name}</h4>
              <p className="text-xs text-zinc-600 font-light">{selectedPlanet.description}</p>
              <span className="text-[10px] font-mono text-[#3b2262] font-semibold block pt-1">
                Anchor: {selectedPlanet.specs.biblicalAnchor}
              </span>
            </motion.div>

          </motion.div>

        </div>

        {/* Hero Bottom Row: The 4T Pillars Feature Columns with Staggered Entrance */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-gray-100"
        >
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="space-y-3 p-5 border border-gray-100 rounded-2xl hover:border-black hover:shadow-md transition-all bg-gray-50/50"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <Hammer className="w-5 h-5 text-amber-800" />
            </div>
            <h3 className="font-heading font-bold text-sm text-black">01. REBUILDING</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Reconstructing broken walls, business systems, and economic foundations under Isaiah 58:12.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="space-y-3 p-5 border border-gray-100 rounded-2xl hover:border-black hover:shadow-md transition-all bg-gray-50/50"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-800" />
            </div>
            <h3 className="font-heading font-bold text-sm text-black">02. RESTORING</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Unlocking keys to identity, restoring human dignity, calling, and peace in communities.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="space-y-3 p-5 border border-gray-100 rounded-2xl hover:border-black hover:shadow-md transition-all bg-gray-50/50"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="font-heading font-bold text-sm text-black">03. REPAIRING</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Binding wounds, unifying builders, and strengthening community fabric step by step.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="space-y-3 p-5 border border-gray-100 rounded-2xl hover:border-black hover:shadow-md transition-all bg-gray-50/50"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-yellow-800" />
            </div>
            <h3 className="font-heading font-bold text-sm text-black">04. REPLENISHING</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Unlocking abundance, sustainable stewardship, and overflowing resources for generations.
            </p>
          </motion.div>

        </motion.div>

        {/* Animated Scroll Down Indicator Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center justify-center pt-8 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
