"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Lock, ShieldCheck, Key, ArrowRight, AlertCircle } from "lucide-react";
import { verifyPasscode, AuthRole } from "../../lib/supabase";

interface AdminPasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: AuthRole) => void;
}

export default function AdminPasscodeModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminPasscodeModalProps) {
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;

    setIsVerifying(true);
    setErrorMsg("");

    setTimeout(() => {
      const res = verifyPasscode(pin);
      if (res.valid && res.role) {
        setPin("");
        setIsVerifying(false);
        onSuccess(res.role);
      } else {
        setErrorMsg("Invalid Security Passcode. Access Denied.");
        setIsVerifying(false);
      }
    }, 400);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-sm bg-white text-black p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xl my-auto space-y-6">
        
        {/* Prominent Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white text-zinc-600 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon & Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="relative w-12 h-12 m-auto flex items-center justify-center bg-black text-white rounded-2xl shadow-lg">
            <Lock className="w-6 h-6 text-[#d4af37]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
              Restricted Leadership Area
            </span>
            <h3 className="font-serif-headline text-2xl text-zinc-950">
              Admin & Usher Access
            </h3>
            <p className="text-xs text-zinc-500 font-light">
              Enter your Master Convener or Protocol PIN to view Sunday Headcount.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold block text-center">
              Enter Access PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              maxLength={12}
              placeholder="••••"
              autoFocus
              className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3 rounded-2xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-gray-50/50 transition-all"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-2 text-xs font-mono text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying || !pin}
            className="w-full py-3.5 rounded-full bg-black text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-40"
          >
            <span>{isVerifying ? "Verifying..." : "Unlock Dashboard"}</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </button>
        </form>

        {/* Footer Hint */}
        <div className="text-center border-t border-gray-100 pt-3 text-[10px] font-mono text-zinc-400">
          ● Master Convener & Protocol Gate Authentication
        </div>

      </div>
    </div>
  );
}
