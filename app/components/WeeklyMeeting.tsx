"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Zap, ShieldCheck, QrCode, Calendar, Clock, BookOpen, Video, MapPin, CheckCircle2 } from "lucide-react";

interface WeeklyMeetingProps {
  onOpenRegister?: () => void;
  onOpenScanner?: () => void;
  onOpenNotes?: () => void;
  onOpenConference?: () => void;
}

export default function WeeklyMeeting({ onOpenRegister, onOpenScanner, onOpenNotes, onOpenConference }: WeeklyMeetingProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [meetingMode, setMeetingMode] = useState<"in-person" | "global-stream">("in-person");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      // Calculate next 2nd or 4th Sunday
      let targetDate: Date | null = null;

      for (let i = 0; i < 35; i++) {
        const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 17, 0, 0, 0);
        if (candidate.getDay() === 0) {
          if (candidate.getTime() > now.getTime()) {
            const dateNum = candidate.getDate();
            const isSecondSunday = dateNum >= 8 && dateNum <= 14;
            const isFourthSunday = dateNum >= 22 && dateNum <= 28;

            if (isSecondSunday || isFourthSunday) {
              targetDate = candidate;
              break;
            }
          }
        }
      }

      if (!targetDate) {
        targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 17, 0, 0, 0);
      }

      const diffMs = targetDate.getTime() - now.getTime();
      if (diffMs > 0) {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diffMs / 1000 / 60) % 60);
        const secs = Math.floor((diffMs / 1000) % 60);
        setTimeLeft({ days, hours, mins, secs });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Lifebuild Sanctuary & 4T Gathering (Isaiah 58:12)");
    const details = encodeURIComponent(
      "Join us on the 2nd & 4th Sundays at 5:00 PM GMT+1 for 60 minutes of spiritual grounding, Kingdom strategic teaching, and iron-sharpening fellowship anchored in Isaiah 58:12."
    );
    const location = encodeURIComponent("Lifebuild Sanctuary & Global Live Stream");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&recur=RRULE:FREQ=MONTHLY;BYDAY=2SU,4SU`;
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section
      ref={sectionRef}
      id="fellowship"
      className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden"
    >
      
      {/* Background Watermark Overlay with Parallax Displacement */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03] pointer-events-none select-none"
      >
        <Image
          src="/images/logo_icon.jpg"
          alt="Lifebuild Overlay"
          fill
          sizes="500px"
          className="object-contain filter grayscale"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest block">
            Bi-Weekly Gathering (2nd & 4th Sundays) & 4T Conference
          </span>
          
          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            The Founder's Sanctuary. <br />
            Bi-Weekly Gathering & Annual 4T Conference.
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            Every 2nd and 4th Sunday at 5:00 PM GMT+1, founders and leaders gather for 60 minutes of spiritual grounding, Kingdom strategic teaching, and iron-sharpening fellowship anchored in Isaiah 58:12.
          </p>
        </motion.div>

        {/* Featured Modern Minimalist Worship Artwork Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden border border-gray-200 bg-zinc-950 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          
          {/* Left Side: Worship Image */}
          <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[400px] w-full group overflow-hidden">
            <Image
              src="/images/worship_nigerian_african.png"
              alt="Single Black African Nigerian Worshipper in Reverence to God"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/90 lg:to-zinc-950 pointer-events-none"></div>
          </div>

          {/* Right Side: Text & Scriptural Mandate */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#d4af37] text-[10px] font-mono font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              Presence • Alignment • Impact
            </span>

            <h3 className="font-serif-headline text-2xl sm:text-3xl text-white font-normal leading-tight">
              A Sacred Space for Builders to Recharge.
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in."
            </p>

            <div className="pt-2 text-xs font-mono text-[#d4af37] font-bold">
              — Isaiah 58:12
            </div>

            {/* Live Countdown & Sanctuary Action Buttons */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
                <Clock className="w-4 h-4 text-[#d4af37] animate-pulse shrink-0" />
                <span className="text-zinc-400">Next Sanctuary Gathering:</span>
                <span className="font-bold text-white tracking-wider">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenRegister}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors cursor-pointer shadow-sm"
                >
                  Join Fellowship
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenScanner}
                  className="px-5 py-2.5 rounded-full border border-zinc-800 hover:border-white text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer bg-zinc-900"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Entrance Pass</span>
                </motion.button>

                {onOpenNotes && (
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenNotes}
                    className="px-5 py-2.5 rounded-full border border-zinc-700 hover:border-white text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer bg-zinc-900"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Take Sanctuary Notes</span>
                  </motion.button>
                )}

                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-zinc-700 hover:border-[#d4af37] text-zinc-300 hover:text-[#d4af37] font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer bg-zinc-950"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Add to Calendar</span>
                </motion.a>
              </div>
            </div>

          </div>

        </motion.div>

        {/* 2-Column Info & 60-Minute Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Meeting Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4 border-b border-gray-200 pb-8">
              <h3 className="font-heading font-bold text-2xl text-black">
                Meeting Mechanics
              </h3>
              <ul className="space-y-3 text-sm text-zinc-600 font-light">
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Frequency</span>
                  <span className="font-medium text-black">Bi-Weekly (2nd & 4th Sundays)</span>
                </li>
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Off-Week Rhythm</span>
                  <span className="font-medium text-black">Weekly 4T Marketplace Action Notes</span>
                </li>
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Time</span>
                  <span className="font-medium text-black">5:00 PM – 6:00 PM (GMT+1)</span>
                </li>
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Duration</span>
                  <span className="font-medium text-black">60 Minutes</span>
                </li>
                <li className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Format</span>
                  <span className="font-medium text-black">Hybrid (In-Person & Global Stream)</span>
                </li>
                <li className="flex items-start justify-between pb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase">Anchor Scripture</span>
                  <span className="font-medium text-black font-mono text-xs">Isaiah 58:12</span>
                </li>
              </ul>
            </div>

            {/* Annual 4T Conference Teaser Block */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 bg-zinc-950 text-white rounded-3xl space-y-4 border border-zinc-800 shadow-lg"
            >
              <span className="text-xs font-mono uppercase text-[#d4af37] tracking-widest block">
                Annual Flagship Gathering
              </span>
              <h4 className="font-serif-headline text-2xl text-white">The 4T Conference</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Our annual gathering of Kingdom builders, investors, conveners, and societal leaders across the 4Tribe Network. 3 days of intensive commissioning and strategic reconstruction.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenConference || onOpenRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#d4af37] transition-colors cursor-pointer font-bold uppercase tracking-wider"
                >
                  <span>Request Conference Pass</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: 4-Step 60-Minute Meeting Blueprint */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-heading text-lg font-bold text-black flex items-center gap-2">
                <Zap className="w-4 h-4 text-black" />
                60-Minute Meeting Blueprint
              </h3>
            </div>

            <div className="space-y-4">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4 }}
                className="p-6 border border-gray-200 rounded-2xl hover:border-black hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 01</span>
                  <span>10 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Grounding & Devotional Focus</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Stripping away workweek noise. Centering mind and spirit in worship, gratitude, and divine perspective under Isaiah 58:12.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4 }}
                className="p-6 border border-gray-200 rounded-2xl hover:border-black hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 02</span>
                  <span>30 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">4T Teaching & Kingdom Principles</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Actionable teaching on Rebuilding, Restoring, Repairing, and Replenishing broken systems and leaders.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4 }}
                className="p-6 border border-gray-200 rounded-2xl hover:border-black hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 03</span>
                  <span>10 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Rebuilder's Prayer & Strategy</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Targeted prayer, faith declarations, and strategic alignment across the 4Tribe Network. Iron sharpening iron.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4 }}
                className="p-6 border border-gray-200 rounded-2xl hover:border-black hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STEP 04</span>
                  <span>10 MINS</span>
                </div>
                <h4 className="font-heading font-bold text-base text-black">Commissioning & Prophetic Alignment</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Final blessing, weekly commissioning, and sending forth leaders into their spheres of impact with authority.
                </p>
              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
