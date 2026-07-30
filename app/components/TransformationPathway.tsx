"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Hammer, Key, HeartHandshake, RefreshCw, CheckCircle2, Compass } from "lucide-react";

interface TransformationStage {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: any;
  scripture: string;
  description: string;
  keyOutputs: string[];
}

export default function TransformationPathway({
  onOpenRegister,
}: {
  onOpenRegister: () => void;
}) {
  const [activeStageId, setActiveStageId] = useState("01");
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const stages: TransformationStage[] = [
    {
      id: "01",
      stepNumber: "STAGE 01",
      title: "The Ruins & Breaches",
      subtitle: "Acknowledging Disarray & Gaps",
      icon: Compass,
      scripture: "Isaiah 58:12a — 'Your people will rebuild the ancient ruins'",
      description:
        "Recognizing broken walls, disoriented priorities, shattered altars, or failing systems in personal life, family, or business.",
      keyOutputs: [
        "Audit of broken life & business systems",
        "Discerning spiritual disarray",
        "Surrendering to divine direction",
      ],
    },
    {
      id: "02",
      stepNumber: "STAGE 02",
      title: "Grounding in God's Presence",
      subtitle: "Spiritual Alignment at Sanctuary",
      icon: Sparkles,
      scripture: "Isaiah 61:3 — 'Beauty for ashes, oil of joy for mourning'",
      description:
        "Stripping away workweek noise. Grounding heart and vision in worship and reverence to God before executing Kingdom strategy.",
      keyOutputs: [
        "Weekly Sunday Sanctuary Grounding",
        "Character purification & peace",
        "Divine wisdom for decision-making",
      ],
    },
    {
      id: "03",
      stepNumber: "STAGE 03",
      title: "4T Reconstruction Framework",
      subtitle: "Rebuilding, Restoring, Repairing, Replenishing",
      icon: Hammer,
      scripture: "Nehemiah 4:6 — 'So built we the wall; for the people had a mind to work'",
      description:
        "Systematic application of the 4T Framework across career, business, family altars, and community leadership.",
      keyOutputs: [
        "Rebuilding broken economic foundations",
        "Restoring spiritual identity & calling",
        "Repairing character & relationship breaches",
        "Replenishing stewardship & overflow",
      ],
    },
    {
      id: "04",
      stepNumber: "STAGE 04",
      title: "The Mighty & Restorer",
      subtitle: "Transforming Communities & Legacy",
      icon: ShieldCheck,
      scripture: "Isaiah 58:12b — 'You will be called Repairer of Broken Walls, Restorer of Streets with Dwellings'",
      description:
        "Stepping forth as a proven builder. Raising up age-old foundations, deploying resources, and empowering the next generation.",
      keyOutputs: [
        "Restorer of Streets with Dwellings credential",
        "Deploying resources to transform communities",
        "Leaving generational inheritance and overflow",
      ],
    },
  ];

  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <section
      ref={sectionRef}
      id="transformation-pathway"
      className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden"
    >
      
      {/* Background Watermark Overlay with Scroll Parallax */}
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
        
        {/* Minimalist Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
            Isaiah 58:12 Transformation Roadmap
          </span>

          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            From Broken Ruins to Restorer of Streets with Dwellings.
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            A 4-stage spiritual and life reconstruction pathway moving individuals, families, and organizations from disarray into divine alignment, authority, and generational overflow.
          </p>
        </motion.div>

        {/* Minimalist 4-Stage Stepper */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.id === activeStageId;
            return (
              <motion.button
                key={stage.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isActive
                    ? "bg-black text-white border-black shadow-xl"
                    : "bg-white text-black border-gray-200 hover:border-black"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                    isActive
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-zinc-100 border-zinc-200 text-zinc-600"
                  }`}>
                    {stage.stepNumber}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#d4af37]" : "text-zinc-400"}`} />
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base leading-tight">{stage.title}</h3>
                  <p className={`text-xs font-mono font-light ${isActive ? "text-zinc-400" : "text-zinc-500"}`}>
                    {stage.subtitle}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Minimalist Active Stage Breakdown Box (Clean White Editorial Card) with Animated Transitions */}
        <div className="p-8 sm:p-12 bg-white text-black rounded-3xl border border-gray-200 space-y-8 shadow-xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10"
            >
              
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border border-gray-200 bg-gray-100 text-black">
                    {currentStage.stepNumber} • TRANSFORMATION STAGE
                  </span>

                  <h3 className="font-serif-headline text-3xl sm:text-4xl text-zinc-950 font-normal leading-tight">
                    {currentStage.title}
                  </h3>

                  <p className="text-xs font-mono text-zinc-500 italic">
                    "{currentStage.scripture}"
                  </p>
                </div>

                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-light">
                  {currentStage.description}
                </p>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenRegister}
                    className="px-6 py-3.5 rounded-full bg-black text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Begin Your Transformation Journey</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Minimalist Deliverables Column */}
              <div className="lg:col-span-5 p-6 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-4">
                <h4 className="font-mono text-xs font-bold text-black uppercase tracking-wider border-b border-gray-200 pb-2">
                  Key Stage Deliverables
                </h4>

                <ul className="space-y-3 text-xs text-zinc-700 font-light">
                  {currentStage.keyOutputs.map((output, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>{output}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
