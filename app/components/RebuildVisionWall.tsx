"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Globe, MapPin, Hammer, Key, HeartHandshake, RefreshCw, X, Plus, CheckCircle2 } from "lucide-react";
import { fetchRebuildingDeclarations, submitRebuildingDeclaration, RebuildingDeclaration } from "../../lib/supabase";

export default function RebuildVisionWall() {
  const [declarations, setDeclarations] = useState<RebuildingDeclaration[]>([]);
  const [activePillar, setActivePillar] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [location, setLocation] = useState("");
  const [pillar, setPillar] = useState<"REBUILDING" | "RESTORING" | "REPAIRING" | "REPLENISHING">("REBUILDING");
  const [declarationText, setDeclarationText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const loadDeclarations = async () => {
    const data = await fetchRebuildingDeclarations();
    setDeclarations(data);
  };

  useEffect(() => {
    loadDeclarations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !declarationText) return;

    setIsSubmitting(true);
    const newDec = await submitRebuildingDeclaration(
      authorName,
      location || "Global Network",
      pillar,
      declarationText
    );

    setDeclarations((prev) => [newDec, ...prev]);
    setIsSubmitting(false);
    setSubmittedSuccess(true);

    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setAuthorName("");
      setLocation("");
      setDeclarationText("");
    }, 1500);
  };

  const filteredDeclarations = declarations.filter((d) => {
    if (activePillar === "ALL") return true;
    return d.pillar === activePillar;
  });

  const getPillarIcon = (p: string) => {
    switch (p) {
      case "REBUILDING":
        return <Hammer className="w-3.5 h-3.5 text-amber-500" />;
      case "RESTORING":
        return <Key className="w-3.5 h-3.5 text-blue-500" />;
      case "REPAIRING":
        return <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />;
      case "REPLENISHING":
        return <RefreshCw className="w-3.5 h-3.5 text-yellow-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-white" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="vision-wall"
      className="relative w-full bg-[#141414] text-white py-28 border-b border-zinc-800 overflow-hidden"
    >
      
      {/* Subtle Background Watermark with Scroll Parallax */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.03] pointer-events-none select-none"
      >
        <Image
          src="/images/logo_icon_nobg.png"
          alt="Lifebuild Watermark"
          fill
          sizes="700px"
          className="object-contain filter invert"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12 relative z-10">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[#d4af37] text-xs font-mono uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Isaiah 58:12 Global Declaration Wall</span>
            </div>

            <h2 className="font-serif-headline text-4xl sm:text-6xl font-normal text-white leading-tight">
              Where Altars Are Rebuilt & Visions Staked.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              Stand with leaders, families, and Kingdom builders around the world. Post your vow to rebuild broken walls, restore identity, and repair breaches in your city and organization.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Post Your Declaration</span>
          </motion.button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800">
          {["ALL", "REBUILDING", "RESTORING", "REPAIRING", "REPLENISHING"].map((p) => (
            <motion.button
              key={p}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePillar(p)}
              className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                activePillar === p
                  ? "bg-white text-black shadow-md"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>

        {/* Declarations Grid */}
        <motion.div
          layout
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredDeclarations.map((item) => (
              <motion.div
                layout
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -6, borderColor: "#52525b" }}
                className="p-6 bg-zinc-900/90 rounded-2xl border border-zinc-800 space-y-4 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 text-[10px] font-mono text-zinc-300 font-bold uppercase">
                      {getPillarIcon(item.pillar)}
                      {item.pillar}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{item.createdAt}</span>
                  </div>

                  <p className="text-sm text-zinc-200 leading-relaxed font-serif italic">
                    "{item.declarationText}"
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {item.authorName}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    {item.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Post Declaration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto text-black"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xl my-auto space-y-6"
            >
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white text-zinc-600 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                  Isaiah 58:12 Declaration
                </span>
                <h3 className="font-serif-headline text-2xl text-zinc-950">
                  Post Your Rebuilding Vow
                </h3>
              </div>

              {submittedSuccess ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 m-auto animate-bounce" />
                  <h4 className="font-heading font-bold text-lg text-emerald-950">Declaration Published!</h4>
                  <p className="text-xs text-emerald-800 font-mono">
                    Your rebuilding vow is live on the Global Wall.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-600 font-bold uppercase">Your Name or Family</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. David O. & Family"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-black text-xs font-mono bg-gray-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-600 font-bold uppercase">City & Country</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Lagos, Nigeria"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-black text-xs font-mono bg-gray-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-600 font-bold uppercase">Select 4T Pillar</label>
                    <select
                      value={pillar}
                      onChange={(e: any) => setPillar(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-black text-xs font-mono bg-gray-50 cursor-pointer"
                    >
                      <option value="REBUILDING">01 / REBUILDING — Walls & Systems</option>
                      <option value="RESTORING">02 / RESTORING — Identity & Calling</option>
                      <option value="REPAIRING">03 / REPAIRING — Breaches & Community</option>
                      <option value="REPLENISHING">04 / REPLENISHING — Overflow & Legacy</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-600 font-bold uppercase">Your Rebuilding Declaration / Vow</label>
                    <textarea
                      required
                      rows={3}
                      value={declarationText}
                      onChange={(e) => setDeclarationText(e.target.value)}
                      placeholder="e.g. Rebuilding our family altar and deploying resources to restore 50 broken youth in our community..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-black text-xs font-mono bg-gray-50"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-black text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-[#d4af37]" />
                    <span>{isSubmitting ? "Publishing Vow..." : "Publish Declaration"}</span>
                  </motion.button>
                </form>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
