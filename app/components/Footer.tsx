"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Lock } from "lucide-react";
import RotatingTagline from "./RotatingTagline";

interface FooterProps {
  onOpenRegister: () => void;
  onOpenPass: () => void;
  onOpenDashboard?: () => void;
}

export default function Footer({ onOpenRegister, onOpenPass, onOpenDashboard }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-white text-black border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-gray-100">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 flex items-center justify-center bg-transparent">
                <Image
                  src="/images/logo_icon_nobg.png"
                  alt="Lifebuild Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-2xl text-black tracking-tight block">
                lifebuild<span className="text-[#3b2262]">.</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm font-light">
              <RotatingTagline className="font-semibold text-zinc-800" suffix="." /> A propelling movement to build people and rebuild lives under Isaiah 58:12.
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-600">
            <a href="#solar-system" className="hover:text-black transition-colors">
              Vision
            </a>
            <a href="#fellowship" className="hover:text-black transition-colors">
              Gathering
            </a>
            <a href="#pillars" className="hover:text-black transition-colors">
              Pillars
            </a>
            <button
              onClick={onOpenRegister}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Membership
            </button>
            <button
              onClick={onOpenPass}
              className="hover:text-black transition-colors cursor-pointer"
            >
              My QR Pass
            </button>

            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="hover:text-black font-bold text-black transition-colors cursor-pointer flex items-center gap-1"
                title="Admin Live Headcount"
              >
                <Lock className="w-3 h-3 text-[#d4af37]" />
                <span>Admin Headcount</span>
              </button>
            )}
          </div>

        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <p suppressHydrationWarning>© 2011 - {new Date().getFullYear()} Lifebuild. Est. 2011.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
