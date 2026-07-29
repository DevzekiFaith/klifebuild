"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenRegister: () => void;
  onOpenPass: () => void;
}

export default function Footer({ onOpenRegister, onOpenPass }: FooterProps) {
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
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-gray-300 p-0.5 bg-white shadow-xs">
                <Image
                  src="/images/logo.jpg"
                  alt="Lifebuild Logo"
                  width={36}
                  height={36}
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="font-heading font-extrabold text-2xl text-black tracking-tight block">
                lifebuild<span className="text-[#3b2262]">.</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm font-light">
              Rebuilding everywhere you go. A 15-year God-given vision to build people and rebuild lives.
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-600">
            <a href="#solar-system" className="hover:text-black transition-colors">
              Vision
            </a>
            <a href="#fellowship" className="hover:text-black transition-colors">
              Fellowship
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
