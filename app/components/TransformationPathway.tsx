"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  colorBadge: string;
}

export default function TransformationPathway({
  onOpenRegister,
}: {
  onOpenRegister: () => void;
}) {
  const [activeStageId, setActiveStageId] = useState("01");

  const stages: TransformationStage[] = [
    {
      id: "01",
      stepNumber: "STAGE 01",
      title: "The Ruins & Breaches",
      subtitle: "Acknowledging Disarray & Systemic Gaps",
      icon: Compass,
      scripture: "Isaiah 58:12a — 'Your people will rebuild the ancient ruins'",
      description:
        "Recognizing broken walls, disoriented priorities, shattered altars, or failing systems in personal life, family, or business.",
      keyOutputs: [
        "Audit of broken life & business systems",
        "Discerning spiritual disarray",
        "Surrendering to divine direction",
      ],
      colorBadge: "border-red-500/40 text-red-400 bg-red-950/30",
    },
    {
      id: "02",
      stepNumber: "STAGE 02",
      title: "Grounding in God's Presence",
      subtitle: "Spiritual Alignment at Sunday Sanctuary",
      icon: Sparkles,
      scripture: "Isaiah 61:3 — 'Beauty for ashes, oil of joy for mourning'",
      description:
        "Stripping away workweek noise. Grounding heart and vision in worship and reverence to God before executing Kingdom strategy.",
      keyOutputs: [
        "Weekly Sunday Sanctuary Grounding",
        "Character purification & peace",
        "Divine wisdom for decision-making",
      ],
      colorBadge: "border-[#d4af37]/40 text-[#d4af37] bg-yellow-950/30",
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
      colorBadge: "border-blue-500/40 text-blue-400 bg-blue-950/30",
    },
    {
      id: "04",
      stepNumber: "STAGE 04",
      title: "The Mighty & Generational Restorer",
      subtitle: "Transforming Communities & Leaving Legacy",
      icon: ShieldCheck,
      scripture: "Isaiah 58:12b — 'You will be called Repairer of Broken Walls, Restorer of Streets with Dwellings'",
      description:
        "Stepping forth as a proven builder. Raising up age-old foundations, deploying resources, and empowering the next generation.",
      keyOutputs: [
        "Restorer of Streets with Dwellings credential",
        "Deploying resources to transform communities",
        "Leaving generational inheritance and overflow",
      ],
      colorBadge: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    },
  ];

  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <section id="transformation-pathway" className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden">
      
      {/* Background Watermark Overlay */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/images/logo_icon_nobg.png"
          alt="Lifebuild Overlay"
          fill
          className="object-contain filter grayscale"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest block">
            Isaiah 58:12 Transformation Roadmap
          </span>

          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            From Broken Ruins to Restorer of Streets with Dwellings.
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            A 4-stage spiritual and life reconstruction pathway moving individuals, families, and organizations from disarray into divine alignment, authority, and generational overflow.
          </p>
        </div>

        {/* 4-Stage Interactive Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isActive
                    ? "bg-black text-white border-black shadow-xl scale-[1.02]"
                    : "bg-gray-50/60 text-black border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${stage.colorBadge}`}>
                    {stage.stepNumber}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#d4af37]" : "text-zinc-500"}`} />
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg leading-tight">{stage.title}</h3>
                  <p className={`text-xs font-mono ${isActive ? "text-zinc-400" : "text-zinc-500"}`}>
                    {stage.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Box */}
        <div className="p-8 sm:p-12 bg-zinc-950 text-white rounded-3xl border border-zinc-800 space-y-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b2262]/20 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${currentStage.colorBadge}`}>
                  {currentStage.stepNumber} • TRANSFORMATION STAGE
                </span>

                <h3 className="font-serif-headline text-3xl sm:text-4xl text-white font-normal leading-tight">
                  {currentStage.title}
                </h3>

                <p className="text-xs font-mono text-[#d4af37] italic">
                  "{currentStage.scripture}"
                </p>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {currentStage.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenRegister}
                  className="px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Begin Your Transformation Journey</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Key Spiritual & Life Outputs Column */}
            <div className="lg:col-span-5 p-6 bg-zinc-900/90 rounded-2xl border border-zinc-800 space-y-4">
              <h4 className="font-mono text-xs font-bold text-[#d4af37] uppercase tracking-wider border-b border-zinc-800 pb-2">
                Key Stage Deliverables & Milestones
              </h4>

              <ul className="space-y-3 text-xs text-zinc-300 font-light">
                {currentStage.keyOutputs.map((output, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{output}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
