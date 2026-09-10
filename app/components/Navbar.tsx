"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, ShieldCheck, Menu, X, ArrowUpRight, Users, Clock, BookOpen, ChevronDown, Sparkles, Ticket } from "lucide-react";
import RotatingTagline from "./RotatingTagline";

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenPass: () => void;
  onOpenScanner: () => void;
  onOpenDashboard?: () => void;
  onOpenNotes?: () => void;
  onOpenFlyer?: () => void;
  onOpenConference?: () => void;
  onOpenDiagnostic?: () => void;
  hasPass: boolean;
}

export default function Navbar({
  onOpenRegister,
  onOpenPass,
  onOpenScanner,
  onOpenDashboard,
  onOpenNotes,
  onOpenFlyer,
  onOpenConference,
  onOpenDiagnostic,
  hasPass,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/92 backdrop-blur-md border-b border-gray-200/80 py-2.5 shadow-sm"
          : "bg-white/60 backdrop-blur-xs py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between gap-3">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/images/logo_icon_nobg.png"
                alt="Lifebuild Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
                loading="eager"
              />
            </div>
            <div className="flex flex-col justify-center shrink-0">
              <span className="font-heading font-extrabold text-base sm:text-lg text-black tracking-tight leading-none">
                lifebuild<span className="text-[10px] sm:text-xs font-semibold text-zinc-500 ml-0.5">global</span><span className="text-[#3b2262]">.</span>
              </span>
              <div className="h-3 relative overflow-hidden flex items-center mt-0.5">
                <RotatingTagline
                  className="text-[8px] font-mono uppercase tracking-widest text-zinc-400 font-medium whitespace-nowrap"
                  phrases={["Rebuilding Everywhere You Go"]}
                />
              </div>
            </div>
          </a>

          {/* Desktop Nav — visible from sm (640px) upwards */}
          <nav className="hidden sm:flex items-center gap-3 lg:gap-4 text-xs font-medium text-zinc-600 flex-1 justify-end">

            {/* Schedule badge — hide on smaller sm viewports to save space */}
            <div className="hidden lg:flex px-2.5 py-1 rounded-full bg-purple-50/70 border border-purple-200/60 text-[10px] font-mono text-zinc-700 font-semibold items-center gap-1 shrink-0">
              <Clock className="w-3 h-3 text-[#3b2262]" />
              <span>2nd Sun • Last Sun</span>
            </div>

            <a href="#vision" className="hover:text-black transition-colors whitespace-nowrap">Vision</a>
            <a href="#pillars" className="hover:text-black transition-colors whitespace-nowrap">4T Framework</a>
            <a href="#transformation-pathway" className="hover:text-black transition-colors whitespace-nowrap">Journey</a>
            <a href="#gathering" className="hover:text-black transition-colors whitespace-nowrap">Gathering</a>
            <a
              href="#live-review"
              className="hover:text-amber-900 transition-colors font-semibold text-amber-700 flex items-center gap-1 whitespace-nowrap"
            >
              <span>Reviews</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </a>

            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer border ${
                  toolsOpen
                    ? "bg-black text-white border-black"
                    : "bg-gray-100/80 border-gray-200 text-zinc-700 hover:border-black hover:text-black"
                }`}
              >
                <span>Tools</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-2 z-50 space-y-1"
                  >
                    {onOpenDiagnostic && (
                      <button
                        onClick={() => { setToolsOpen(false); onOpenDiagnostic(); }}
                        className="w-full px-3 py-2 text-left rounded-xl bg-amber-500/10 hover:bg-amber-500/20 transition-colors text-[10px] font-mono font-bold text-amber-800 flex items-center gap-2 cursor-pointer border border-amber-300/60"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>4T Mandate Quiz</span>
                      </button>
                    )}

                    {onOpenConference && (
                      <button
                        onClick={() => { setToolsOpen(false); onOpenConference(); }}
                        className="w-full px-3 py-2 text-left rounded-xl bg-purple-50/70 hover:bg-purple-100/70 transition-colors text-[10px] font-mono font-bold text-[#3b2262] flex items-center gap-2 cursor-pointer border border-purple-200/60"
                      >
                        <Ticket className="w-3.5 h-3.5 text-[#3b2262]" />
                        <span>Conference Pass</span>
                      </button>
                    )}

                    {onOpenFlyer && (
                      <button
                        onClick={() => { setToolsOpen(false); onOpenFlyer(); }}
                        className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 transition-colors text-[10px] font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#3b2262]" />
                        <span>September Flyer</span>
                      </button>
                    )}

                    {onOpenNotes && (
                      <button
                        onClick={() => { setToolsOpen(false); onOpenNotes(); }}
                        className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 transition-colors text-[10px] font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#3b2262]" />
                        <span>Rebuilder Journal</span>
                      </button>
                    )}

                    <button
                      onClick={() => { setToolsOpen(false); onOpenScanner(); }}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 transition-colors text-[10px] font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#3b2262]" />
                      <span>QR Scanner</span>
                    </button>

                    {onOpenDashboard && (
                      <button
                        onClick={() => { setToolsOpen(false); onOpenDashboard(); }}
                        className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 transition-colors text-[10px] font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer border-t border-gray-100 pt-2"
                      >
                        <Users className="w-3.5 h-3.5 text-[#3b2262]" />
                        <span>Live Headcount</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            {hasPass ? (
              <button
                onClick={onOpenPass}
                className="px-3 py-1.5 rounded-full border border-zinc-900 bg-zinc-900 text-white text-[10px] font-medium hover:bg-black transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                <span>My Pass</span>
              </button>
            ) : (
              <button
                onClick={onOpenRegister}
                className="px-3 py-1.5 rounded-full border border-zinc-900 text-black hover:bg-black hover:text-white transition-all text-[10px] font-medium flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Join</span>
                <ArrowUpRight className="w-3 h-3 text-[#3b2262]" />
              </button>
            )}
          </nav>

          {/* Mobile Trigger — only on xs screens */}
          <div className="flex items-center gap-2 sm:hidden">
            {hasPass && (
              <button
                onClick={onOpenPass}
                className="p-1.5 rounded-full border border-zinc-900 text-black"
                title="My Pass"
              >
                <ShieldCheck className="w-4 h-4 text-[#3b2262]" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-black hover:opacity-60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#3b2262]" /> : <Menu className="w-5 h-5 text-[#3b2262]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer — xs only */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="px-5 pt-4 pb-7 space-y-4">

              {/* Schedule Badge */}
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/60 text-[10px] font-mono text-zinc-700 flex items-center gap-2 font-bold">
                <Clock className="w-3.5 h-3.5 text-[#3b2262] shrink-0" />
                <span>2nd Sunday Gathering • Last Sunday Activation • 5 PM GMT+1</span>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col space-y-3 text-sm font-medium text-zinc-800">
                <a href="#vision" onClick={() => setMobileMenuOpen(false)}>Vision &amp; Mission</a>
                <a href="#pillars" onClick={() => setMobileMenuOpen(false)}>4T Framework</a>
                <a href="#transformation-pathway" onClick={() => setMobileMenuOpen(false)}>The Rebuilder Journey</a>
                <a href="#gathering" onClick={() => setMobileMenuOpen(false)}>Gatherings &amp; Activations</a>
                <a
                  href="#live-review"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#3b2262] font-semibold flex items-center justify-between"
                >
                  <span>Live Reviews</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-[#3b2262] text-[9px] font-mono uppercase font-bold">Live</span>
                </a>
              </nav>

              {/* Tools */}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Gathering Tools</p>

                {onOpenDiagnostic && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenDiagnostic(); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-300/60 text-xs font-mono font-bold text-amber-900 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    4T Mandate Diagnostic
                  </button>
                )}

                {onOpenConference && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenConference(); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-purple-50 border border-purple-200/60 text-xs font-mono font-bold text-[#3b2262] flex items-center gap-2 cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    Conference Pass
                  </button>
                )}

                {onOpenFlyer && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenFlyer(); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#3b2262]" />
                    September Flyer
                  </button>
                )}

                {onOpenNotes && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenNotes(); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#3b2262]" />
                    Rebuilder Journal
                  </button>
                )}

                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenScanner(); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#3b2262]" />
                  QR Scanner
                </button>

                {onOpenDashboard && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenDashboard(); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-[#3b2262]" />
                    Live Headcount
                  </button>
                )}
              </div>

              {/* Main CTA */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => { setMobileMenuOpen(false); hasPass ? onOpenPass() : onOpenRegister(); }}
                  className="w-full py-3 rounded-full bg-black text-white font-medium text-sm text-center"
                >
                  {hasPass ? "View My Attendance Pass" : "Join the Movement"}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
