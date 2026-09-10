"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Smartphone, X, CheckCircle2, ShieldCheck, WifiOff } from "lucide-react";

interface PWAInstallPromptProps {
  hasPass: boolean;
  onOpenPass: () => void;
}

export default function PWAInstallPrompt({ hasPass, onOpenPass }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Register service worker if supported
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.warn("SW registration skipped:", err);
        });
      });
    }

    // Check if already in standalone mode
    const isRunningStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isRunningStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Don't show if user dismissed recently
    const dismissed = localStorage.getItem("lifebuild_pwa_dismissed");
    if (dismissed && Date.now() - parseInt(dismissed, 10) < 7 * 24 * 60 * 60 * 1000) {
      return;
    }

    // Capture install prompt on Android/Chromium
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isRunningStandalone) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // For iOS, if not standalone, we can prompt after a short delay
    if (isIosDevice && !isRunningStandalone && !dismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosGuide(false);
    localStorage.setItem("lifebuild_pwa_dismissed", Date.now().toString());
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-zinc-950/95 text-white border border-[#d4af37]/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 p-1">
                  <Image
                    src="/images/logo_icon_nobg.png"
                    alt="LifeBuild App Icon"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    <span>Install LifeBuild App</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                      Fast Access
                    </span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-snug">
                    Instant attendance passes, offline gate entry, and gathering reminders on your home screen.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Offline pass assurance badge */}
            {hasPass && (
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[10px] text-emerald-300 font-mono">
                <WifiOff className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Your Pass is saved offline &amp; ready for venue gate scanning</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#d4af37] text-black text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isIOS ? "Add to Home Screen" : "Install App"}</span>
              </button>

              {hasPass && (
                <button
                  onClick={onOpenPass}
                  className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700 transition-colors cursor-pointer"
                >
                  View Pass
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Add to Home Screen Instructions Modal */}
      <AnimatePresence>
        {showIosGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-sm w-full bg-zinc-950 border border-zinc-700 rounded-3xl p-6 text-white space-y-4 text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-[#d4af37]">
                <Smartphone className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Install on iPhone / iPad</h3>
                <p className="text-xs text-zinc-400">
                  Save LifeBuild Global directly to your iOS Home Screen in 2 taps:
                </p>
              </div>

              <div className="space-y-2.5 text-left text-xs bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 font-mono text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] font-bold flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Tap the <strong>Share</strong> button at bottom of Safari</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] font-bold flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Scroll down &amp; tap <strong>"Add to Home Screen"</strong></span>
                </div>
              </div>

              <button
                onClick={() => setShowIosGuide(false)}
                className="w-full py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
