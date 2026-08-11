"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTaglineProps {
  className?: string;
  phrases?: string[];
  intervalMs?: number;
  prefix?: string;
  suffix?: string;
}

export default function RotatingTagline({
  className = "text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-medium",
  phrases = ["Rebuilding Everywhere You Go", "Rebuilding in the Marketplace"],
  intervalMs = 3200,
  prefix = "",
  suffix = "",
}: RotatingTaglineProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [phrases.length, intervalMs]);

  if (!mounted) {
    return <span className={className}>{prefix}{phrases[0]}{suffix}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {prefix && <span>{prefix}</span>}
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="inline-block whitespace-nowrap"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
