"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, ArrowUpRight, ShieldCheck, Sparkles, Check, Copy } from "lucide-react";

interface JoinQRCodeBannerProps {
  onOpenRegister: () => void;
  compact?: boolean;
}

export default function JoinQRCodeBanner({ onOpenRegister, compact = false }: JoinQRCodeBannerProps) {
  const [copied, setCopied] = useState(false);

  // Scannable payload with direct vision link & meeting details
  const qrJoinPayload = `https://www.lifebuildglobal.com.ng/join?src=qr_banner&vision=Isaiah58:12`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://www.lifebuildglobal.com.ng/join");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={`relative w-full ${compact ? "py-12" : "py-20"} bg-[#0f0f11] text-white border-t border-b border-zinc-800 overflow-hidden`}>
      
      {/* Background Watermark Overlay */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.04] pointer-events-none select-none">
        <Image
          src="/images/logo_icon.jpg"
          alt="Lifebuild Watermark"
          fill
          sizes="550px"
          className="object-contain filter invert"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Main High-Impact Banner Card */}
        <div className="relative w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-8 sm:p-12 lg:p-16 rounded-3xl border border-zinc-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Smartphone Pass Graphic / Visual */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/18] rounded-[40px] border-4 border-zinc-700 bg-zinc-950 p-4 shadow-[0_0_50px_rgba(59,34,98,0.3)] flex flex-col justify-between overflow-hidden group hover:border-zinc-500 transition-colors">
              
              {/* Phone Notch & Speaker */}
              <div className="absolute top-3 inset-x-0 m-auto w-24 h-4 bg-zinc-900 rounded-full border border-zinc-800 z-20 flex items-center justify-center">
                <div className="w-8 h-1 rounded-full bg-zinc-800"></div>
              </div>

              {/* Inside Smartphone Pass Display */}
              <div className="relative w-full h-full pt-8 flex flex-col justify-between space-y-4 text-white z-10">
                
                {/* Brand Strip */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 flex items-center justify-center bg-white rounded-md p-0.5">
                      <Image
                        src="/images/logo_icon_nobg.png"
                        alt="Lifebuild Logo"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-heading font-extrabold text-xs tracking-tight">
                      lifebuild<span className="text-[9px] font-semibold text-zinc-400 ml-0.5">nation</span><span className="text-[#d4af37]">.</span>
                    </span>
                  </div>
                  <span className="text-[8px] font-mono uppercase bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                    PASS
                  </span>
                </div>

                {/* Big Promotional Graphic Text inside Phone */}
                <div className="space-y-2 text-center py-6">
                  <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-widest block font-bold">
                    SUNDAY GATHERING
                  </span>
                  <h4 className="font-serif-headline text-3xl font-extrabold tracking-tight leading-none text-white">
                    JOIN THE <br /> VISION
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Rebuilding Broken Walls • Isaiah 58:12
                  </p>
                </div>

                {/* Phone Card Footer */}
                <div className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800 space-y-2 text-center">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase">
                    ● GATHERING 2ND & 4TH SUNDAY @ 5PM
                  </span>
                  <button
                    onClick={onOpenRegister}
                    className="w-full py-2 rounded-xl bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                  >
                    REGISTER FREE
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Scan QR Code & Join Now Action Box */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[#d4af37] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Sunday Entrance Access</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h3 className="font-serif-headline text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08]">
                SCAN QR CODE <br /> TO JOIN NOW.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
                Point your smartphone camera at the QR code below to instantly open your Sunday Vision registration pass and join the 4Tribe Network.
              </p>
            </div>

            {/* QR Code Card & Callout */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-zinc-950 rounded-2xl border border-zinc-800">
              
              {/* The Scannable QR Code */}
              <div className="relative p-3 bg-white rounded-2xl shadow-xl shrink-0 flex items-center justify-center border-2 border-black">
                <QRCodeSVG
                  value={qrJoinPayload}
                  size={150}
                  level="H"
                  includeMargin={false}
                  fgColor="#000000"
                  bgColor="#ffffff"
                  imageSettings={{
                    src: "/images/logo_icon_nobg.png",
                    x: undefined,
                    y: undefined,
                    height: 32,
                    width: 32,
                    excavate: true,
                  }}
                />
              </div>

              {/* Instructions & Link */}
              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-mono text-[#d4af37] uppercase font-bold block tracking-wider">
                    SCAN WITH ANY PHONE CAMERA
                  </span>
                  <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    Sunday Gathering & 4T Pass
                  </h4>
                </div>

                <p className="text-xs text-zinc-400 font-light">
                  2nd & 4th Sunday @ 5:00 PM GMT+1 • Life Build Center & Global Stream
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                  <button
                    onClick={onOpenRegister}
                    className="px-6 py-3 rounded-full bg-white text-black font-medium text-xs uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Join the Vision Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-3 rounded-full border border-zinc-700 text-zinc-300 hover:border-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                    <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
