"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Hammer, Key, HeartHandshake, RefreshCw, ArrowRight, Download, Share2, Check, Copy } from "lucide-react";

interface RebuilderDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
}

type PillarType = "REBUILDING" | "RESTORING" | "REPAIRING" | "REPLENISHING";

interface MandateProfile {
  pillar: PillarType;
  title: string;
  tagline: string;
  scriptureRef: string;
  scriptureText: string;
  color: string;
  accentBg: string;
  actionPillars: string[];
}

const PROFILES: Record<PillarType, MandateProfile> = {
  REBUILDING: {
    pillar: "REBUILDING",
    title: "The System Rebuilder",
    tagline: "Called to reconstruct broken structures, policies, and generational foundations.",
    scriptureRef: "Isaiah 58:12",
    scriptureText: "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in.",
    color: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.15)",
    actionPillars: [
      "Architect structural frameworks in your industry",
      "Reconstruct weakened organisational systems",
      "Anchor generational foundations through principled governance",
    ],
  },
  RESTORING: {
    pillar: "RESTORING",
    title: "The Identity Restorer",
    tagline: "Called to awaken divine purpose, spiritual authority, and individual calling.",
    scriptureRef: "Isaiah 61:3",
    scriptureText: "To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness.",
    color: "#3b82f6",
    accentBg: "rgba(59, 130, 246, 0.15)",
    actionPillars: [
      "Restore wounded leaders back into their divine assignment",
      "Cultivate spiritual discernment and kingdom confidence",
      "Mentor emerging builders to discover their original design",
    ],
  },
  REPAIRING: {
    pillar: "REPAIRING",
    title: "The Breach Repairer",
    tagline: "Called to mend relational breaches, resolve cultural fractures, and foster covenant unity.",
    scriptureRef: "Nehemiah 4:6",
    scriptureText: "So built we the wall; and all the wall was joined together unto the half thereof: for the people had a mind to work.",
    color: "#10b981",
    accentBg: "rgba(16, 185, 129, 0.15)",
    actionPillars: [
      "Heal systemic trust gaps in communities and teams",
      "Bridge divides between leadership and emerging generations",
      "Establish fortress accountability and collaborative unity",
    ],
  },
  REPLENISHING: {
    pillar: "REPLENISHING",
    title: "The Legacy Replenisher",
    tagline: "Called to build sustainable kingdom economics, capital multiplication, and generational inheritance.",
    scriptureRef: "Psalm 112:3",
    scriptureText: "Wealth and riches shall be in his house: and his righteousness endureth for ever.",
    color: "#eab308",
    accentBg: "rgba(234, 179, 8, 0.15)",
    actionPillars: [
      "Generate ethical capital for transformative kingdom impact",
      "Multiply resources through high-integrity enterprise",
      "Leave a tangible generational inheritance that endures decades",
    ],
  },
};

const QUESTIONS = [
  {
    id: 1,
    title: "What tension in society or your environment grieves you most?",
    subtitle: "Select the condition that stirs your deepest burden to take action:",
    options: [
      { pillar: "REBUILDING" as PillarType, text: "Collapsing institutions, decaying systems, and the absence of durable frameworks." },
      { pillar: "RESTORING" as PillarType, text: "People wandering without divine identity, buried callings, and wasted human potential." },
      { pillar: "REPAIRING" as PillarType, text: "Deep relational divisions, leadership scandals, and broken community trust." },
      { pillar: "REPLENISHING" as PillarType, text: "Lack of economic resilience, poverty cycles, and generational resource scarcity." },
    ],
  },
  {
    id: 2,
    title: "Where do you operate with the deepest natural authority and conviction?",
    subtitle: "Identify your instinctive zone of kingdom productivity:",
    options: [
      { pillar: "REBUILDING" as PillarType, text: "Setting up structures, designing strategic roadmaps, and executing long-term projects." },
      { pillar: "RESTORING" as PillarType, text: "Counseling leaders, igniting personal vision, and speaking truth that restores dignity." },
      { pillar: "REPAIRING" as PillarType, text: "Facilitating reconciliation, uniting fractured groups, and standing in the gap." },
      { pillar: "REPLENISHING" as PillarType, text: "Building enterprise, multiplying capital, managing assets, and funding vision." },
    ],
  },
  {
    id: 3,
    title: "What generational outcome would represent maximum fulfillment for your life?",
    subtitle: "Your desired eternal imprint on future generations:",
    options: [
      { pillar: "REBUILDING" as PillarType, text: "Robust institutions, systems, and platforms that endure for centuries (Isaiah 58:12)." },
      { pillar: "RESTORING" as PillarType, text: "A lineage of kings and priests walking in undeniable spiritual authority and purpose." },
      { pillar: "REPAIRING" as PillarType, text: "Healed families, peaceful communities, and unbreakable covenant bonds." },
      { pillar: "REPLENISHING" as PillarType, text: "Generational wealth and kingdom infrastructure that outlives my lifetime." },
    ],
  },
];

export default function RebuilderDiagnosticModal({
  isOpen,
  onClose,
  defaultName = "",
}: RebuilderDiagnosticModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<PillarType[]>([]);
  const [userName, setUserName] = useState(defaultName || "");
  const [resultProfile, setResultProfile] = useState<MandateProfile | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleSelectOption = (pillar: PillarType) => {
    const updated = [...answers, pillar];
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent pillar
      const counts: Record<PillarType, number> = {
        REBUILDING: 0,
        RESTORING: 0,
        REPAIRING: 0,
        REPLENISHING: 0,
      };
      updated.forEach((p) => counts[p]++);

      let highestPillar: PillarType = "REBUILDING";
      let maxCount = -1;
      (Object.keys(counts) as PillarType[]).forEach((p) => {
        if (counts[p] > maxCount) {
          maxCount = counts[p];
          highestPillar = p;
        }
      });

      setResultProfile(PROFILES[highestPillar]);
      setCurrentStep(QUESTIONS.length); // Result view
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultProfile(null);
  };

  const getPillarIcon = (pillar: PillarType) => {
    switch (pillar) {
      case "REBUILDING":
        return <Hammer className="w-5 h-5 text-amber-500" />;
      case "RESTORING":
        return <Key className="w-5 h-5 text-blue-500" />;
      case "REPAIRING":
        return <HeartHandshake className="w-5 h-5 text-emerald-500" />;
      case "REPLENISHING":
        return <RefreshCw className="w-5 h-5 text-yellow-500" />;
    }
  };

  const handleShareWhatsApp = () => {
    if (!resultProfile) return;
    const nameStr = userName ? `${userName}` : "I";
    const text = `🔥 ${nameStr} just discovered their Rebuilder Mandate at LifeBuild Global: "${resultProfile.title}" (${resultProfile.scriptureRef})!\n\n"${resultProfile.tagline}"\n\nDiscover your mandate: https://www.lifebuildglobal.com.ng`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyResult = () => {
    if (!resultProfile) return;
    const text = `LifeBuild Global Rebuilder Mandate: ${resultProfile.title} (${resultProfile.scriptureRef}) — ${resultProfile.tagline}. Take the diagnostic at https://www.lifebuildglobal.com.ng`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // HTML5 Canvas generation for high-res PNG download
  const handleDownloadCard = () => {
    if (!resultProfile) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 700;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 700);
    bgGradient.addColorStop(0, "#09090b");
    bgGradient.addColorStop(0.5, "#141417");
    bgGradient.addColorStop(1, "#09090b");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 700);

    // Gold borders
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 640);

    // Inner gold border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(45, 45, 1110, 610);

    // Header badge
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 20px monospace";
    ctx.fillText("LIFEBUILD GLOBAL • ISAIAH 58:12 MANDATE", 80, 100);

    // Mandate Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px serif";
    ctx.fillText(resultProfile.title, 80, 180);

    // Recipient name
    ctx.fillStyle = "#d4af37";
    ctx.font = "italic 26px serif";
    ctx.fillText(`Conferred Upon: ${userName || "Kingdom Rebuilder"}`, 80, 230);

    // Tagline
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "20px sans-serif";
    ctx.fillText(resultProfile.tagline, 80, 280);

    // Scripture box
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(80, 320, 1040, 150);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.strokeRect(80, 320, 1040, 150);

    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 18px monospace";
    ctx.fillText(`SCRIPTURAL ANCHOR: ${resultProfile.scriptureRef}`, 110, 360);

    ctx.fillStyle = "#e4e4e7";
    ctx.font = "italic 17px serif";
    ctx.fillText(`"${resultProfile.scriptureText.substring(0, 110)}..."`, 110, 400);

    // Action pillars
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px monospace";
    ctx.fillText("STRATEGIC ACTION PILLARS:", 80, 520);

    ctx.fillStyle = "#d4d4d8";
    ctx.font = "16px sans-serif";
    resultProfile.actionPillars.forEach((p, idx) => {
      ctx.fillText(`• ${p}`, 80, 560 + idx * 30);
    });

    // Verification Seal
    ctx.fillStyle = "#71717a";
    ctx.font = "13px monospace";
    ctx.fillText("OFFICIALLY ISSUED BY LIFEBUILD GLOBAL • REBUILDING EVERYWHERE YOU GO", 80, 650);

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `lifebuild-mandate-${resultProfile.pillar.toLowerCase()}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-zinc-950 text-white border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-auto space-y-6"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-[#3b2262]/40 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold block">
                30-Second Diagnostic
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                Discover Your Rebuilder Mandate
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Diagnostic Steps Flow */}
        {currentStep < QUESTIONS.length ? (
          <div className="space-y-6">
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
                <span className="text-[#d4af37] font-bold">
                  {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Completed
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#d4af37] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            <div className="space-y-1">
              <h4 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                {QUESTIONS[currentStep].title}
              </h4>
              <p className="text-xs text-zinc-400 font-light">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectOption(opt.pillar)}
                  className="w-full p-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-[#d4af37]/60 text-left transition-all flex items-start gap-3.5 group cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-400 group-hover:border-[#d4af37] group-hover:text-[#d4af37] shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-white leading-relaxed">
                    {opt.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          /* Result View: Luxury Mandate Card */
          resultProfile && (
            <div className="space-y-6">
              {/* Optional Name Personalization */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">Personalize Card:</span>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="flex-1 bg-transparent border-b border-zinc-700 focus:border-[#d4af37] outline-none text-xs font-mono text-white px-2 py-1"
                />
              </div>

              {/* The Mandate Card */}
              <div
                ref={cardRef}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-[#d4af37]/50 shadow-2xl relative overflow-hidden space-y-6"
              >
                {/* Background watermarks */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                      {getPillarIcon(resultProfile.pillar)}
                      <span>Verified 4T Rebuilder Profile</span>
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif-headline text-white">
                      {resultProfile.title}
                    </h2>
                    {userName && (
                      <p className="text-xs font-mono text-[#d4af37] italic">
                        Conferred Upon: <strong className="text-white font-bold">{userName}</strong>
                      </p>
                    )}
                  </div>

                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                    {resultProfile.scriptureRef}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {resultProfile.tagline}
                </p>

                {/* Scripture Anchor */}
                <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
                  <div className="text-[10px] font-mono text-[#d4af37] uppercase font-bold">
                    Scriptural Anchor • {resultProfile.scriptureRef}
                  </div>
                  <p className="text-xs italic text-zinc-300 font-serif leading-relaxed">
                    "{resultProfile.scriptureText}"
                  </p>
                </div>

                {/* 3 Strategic Action Blueprint */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                    Strategic Action Blueprint
                  </div>
                  <div className="space-y-1.5">
                    {resultProfile.actionPillars.map((action, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Download PNG, WhatsApp Share, Copy */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleDownloadCard}
                  className="py-3 px-4 rounded-2xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Card</span>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="py-3 px-4 rounded-2xl bg-[#25D366] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyResult}
                  className="py-3 px-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:text-white transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-zinc-500 hover:text-zinc-300 font-mono underline cursor-pointer"
                >
                  Retake Diagnostic
                </button>
              </div>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
}
