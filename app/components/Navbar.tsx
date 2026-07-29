"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QrCode, ShieldCheck, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenPass: () => void;
  onOpenScanner: () => void;
  hasPass: boolean;
}

export default function Navbar({
  onOpenRegister,
  onOpenPass,
  onOpenScanner,
  hasPass,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700">
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
            <button
              onClick={onOpenScanner}
              className="hover:text-black transition-colors text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              Scanner
            </button>

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
