"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, ShieldCheck, Menu, X, ArrowUpRight, Users, Clock, BookOpen, ChevronDown, Sparkles, Ticket } from "lucide-react";

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenPass: () => void;
  onOpenScanner: () => void;
  onOpenDashboard?: () => void;
  onOpenNotes?: () => void;
  onOpenFlyer?: () => void;
  onOpenConference?: () => void;
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
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 py-3 shadow-sm"
          : "bg-white/60 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          
          {/* Logo Identity (Featuring Official Lifebuild Logo Image + Text) */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo_icon_nobg.png"
                alt="Lifebuild Logo"
                width={44}
                height={44}
                className="object-contain"
                priority
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl sm:text-2xl text-black tracking-tight leading-none">
                lifebuild<span className="text-[#3b2262]">.</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-medium">
                Rebuilding Everywhere You Go
              </span>
            </div>
          </a>

          {/* Right Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-700">
            {/* Meeting Schedule Badge */}
            <div className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-zinc-700 font-semibold flex items-center gap-1.5 shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#3b2262]" />
              <span>2nd & 4th Sun @ 5:00 PM (60 mins)</span>
            </div>

            <a
              href="#solar-system"
              className="hover:text-black transition-colors"
            >
              Vision
            </a>
            <a
              href="#founder"
              className="hover:text-black transition-colors font-bold text-black"
            >
              Zeki Ubor
            </a>
            <a
              href="#fellowship"
              className="hover:text-black transition-colors"
            >
              Fellowship
            </a>
            <a
              href="#pillars"
              className="hover:text-black transition-colors"
            >
              Pillars
            </a>
            {/* Sanctuary Tools Dropdown Toggle */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
                  toolsOpen
                    ? "bg-black text-white border-black shadow-xs"
                    : "bg-gray-100/80 border-gray-200 text-zinc-700 hover:border-black hover:text-black"
                }`}
              >
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-2 z-50 space-y-1"
                  >
                    {onOpenConference && (
                      <button
                        onClick={() => {
                          setToolsOpen(false);
                          onOpenConference();
                        }}
                        className="w-full px-3 py-2 text-left rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors text-xs font-mono font-bold text-amber-950 flex items-center gap-2 cursor-pointer border border-amber-200/60"
                      >
                        <Ticket className="w-4 h-4 text-[#d4af37]" />
                        <span>Request Conference Pass</span>
                      </button>
                    )}

                    {onOpenFlyer && (
                      <button
                        onClick={() => {
                          setToolsOpen(false);
                          onOpenFlyer();
                        }}
                        className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 transition-colors text-xs font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>August Prophetic Flyer</span>
                      </button>
                    )}

                    {onOpenNotes && (
                      <button
                        onClick={() => {
                          setToolsOpen(false);
                          onOpenNotes();
                        }}
                        className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 transition-colors text-xs font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-[#3b2262]" />
                        <span>Rebuilder Journal</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setToolsOpen(false);
                        onOpenScanner();
                      }}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 transition-colors text-xs font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-zinc-900" />
                      <span>Entrance QR Scanner</span>
                    </button>

                    {onOpenDashboard && (
                      <button
                        onClick={() => {
                          setToolsOpen(false);
                          onOpenDashboard();
                        }}
                        className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 transition-colors text-xs font-mono font-semibold text-zinc-800 flex items-center gap-2 cursor-pointer border-t border-gray-100 pt-2"
                      >
                        <Users className="w-4 h-4 text-amber-700" />
                        <span>Live Headcount</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Link / Pass CTA */}
            {hasPass ? (
              <button
                onClick={onOpenPass}
                className="px-4 py-1.5 rounded-full border border-zinc-900 bg-zinc-900 text-white text-xs font-medium hover:bg-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>My QR Pass</span>
              </button>
            ) : (
              <button
                onClick={onOpenRegister}
                className="px-4 py-1.5 rounded-full border border-zinc-900 text-black hover:bg-black hover:text-white transition-all text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Join Fellowship</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </nav>

          {/* Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {hasPass && (
              <button
                onClick={onOpenPass}
                className="p-1.5 rounded-full border border-zinc-900 text-black text-xs font-medium"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:opacity-60"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 pt-4 pb-8 space-y-4">
          
          {/* Mobile Meeting Time Badge */}
          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-mono text-zinc-800 flex items-center gap-2 font-bold">
            <Clock className="w-4 h-4 text-[#3b2262]" />
            <span>2nd & 4th Sunday: 5:00 PM GMT+1 (60 mins)</span>
          </div>

          <nav className="flex flex-col space-y-4 text-base font-medium text-zinc-900">
            <a
              href="#solar-system"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vision
            </a>
            <a
              href="#fellowship"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fellowship
            </a>
            <a
              href="#pillars"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pillars
            </a>
            {onOpenNotes && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNotes();
                }}
                className="text-left py-1 text-xs font-mono text-zinc-600 uppercase flex items-center gap-2 font-bold"
              >
                <BookOpen className="w-4 h-4 text-[#3b2262]" />
                Rebuilder Journal
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScanner();
              }}
              className="text-left py-1 text-xs font-mono text-zinc-500 uppercase flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              Service Entrance Scanner
            </button>

            {onOpenDashboard && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="text-left py-1 text-xs font-mono text-black font-bold uppercase flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-black" />
                <span>Admin Live Headcount</span>
              </button>
            )}
          </nav>

          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                hasPass ? onOpenPass() : onOpenRegister();
              }}
              className="w-full py-3 rounded-full bg-black text-white font-medium text-sm text-center"
            >
              {hasPass ? "View My Attendance Pass" : "Join Founder Fellowship"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
