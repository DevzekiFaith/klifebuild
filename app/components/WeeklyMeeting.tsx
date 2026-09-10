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

  const [nextEventType, setNextEventType] = useState("2nd Sunday Gathering");

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let targetDate: Date | null = null;
      let eventName = "2nd Sunday Gathering";

      for (let i = 0; i < 35; i++) {
        const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 17, 0, 0, 0);
        if (candidate.getDay() === 0 && candidate.getTime() > now.getTime()) {
          const dateNum = candidate.getDate();
          const isSecondSunday = dateNum >= 8 && dateNum <= 14;
          
          // Check if it's the last Sunday of the month
          const nextWeek = new Date(candidate);
          nextWeek.setDate(nextWeek.getDate() + 7);
          const isLastSunday = nextWeek.getMonth() !== candidate.getMonth();

          if (isSecondSunday) {
            targetDate = candidate;
            eventName = "2nd Sunday Gathering";
            break;
          } else if (isLastSunday) {
            targetDate = candidate;
            eventName = "Last Sunday Activation";
            break;
          }
        }
      }

      if (!targetDate) {
        targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 17, 0, 0, 0);
      }

      setNextEventType(eventName);

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
    const title = encodeURIComponent("LifeBuild Global Gathering & Activation (Isaiah 58:12)");
    const details = encodeURIComponent(
      "Join the LifeBuild Global gathering (2nd Sunday) and special activation program (Last Sunday) at 5:00 PM GMT+1 for spiritual alignment, capacity development, and practical rebuilding."
    );
    const location = encodeURIComponent("LifeBuild Global Center & Global Live Stream");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
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
          src="/images/logo_icon_nobg.png"
          alt="LifeBuild Overlay"
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
            EXPRESSIONS OF THE VISION • GATHERINGS &amp; ACTIVATIONS
          </span>
          
          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            The Gathering Serves the Mission.
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            <strong className="text-black font-medium">The Gathering is an expression of Lifebuild, not the definition of Lifebuild.</strong> It exists to prepare and equip people for the real work of rebuilding beyond the gathering — in homes, workplaces, businesses, and communities.
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
              Preparation • Alignment • Activation
            </span>

            <h3 className="font-serif-headline text-2xl sm:text-3xl text-white font-normal leading-tight">
              A Space for Builders to Recharge &amp; Align.
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
                <span className="text-zinc-400">{nextEventType}:</span>
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
                  Join the Gathering
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenScanner}
                  className="px-5 py-2.5 rounded-full border border-zinc-800 hover:border-white text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer bg-zinc-900"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Check-In Pass</span>
                </motion.button>

                {onOpenNotes && (
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenNotes}
                    className="px-5 py-2.5 rounded-full border border-zinc-700 hover:border-white text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer bg-zinc-900"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Rebuilder Journal</span>
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

        {/* 2-Column Gathering Rhythm & 6-Stage Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Monthly Gathering Rhythm */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="border-b border-gray-200 pb-3">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
                The Ecosystem
              </span>
              <h3 className="font-heading font-bold text-2xl text-black">
                Monthly Gathering Rhythm
              </h3>
            </div>

            {/* Rhythm Card 1: 2nd Sunday */}
            <div className="p-6 border border-gray-200 rounded-2xl hover:border-black hover:shadow-md transition-all space-y-2 bg-white">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-black uppercase tracking-wider">
                  2ND SUNDAY
                </span>
                <span className="text-[#3b2262] font-semibold">5:00 PM GMT+1 (90 Mins)</span>
              </div>
              <h4 className="font-serif-headline text-lg text-black font-normal">
                Lifebuild Movement Gathering
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                The regular gathering of Rebuilders to encounter God, understand the principles of rebuilding, connect with other builders, develop practical capacity, receive direction, and be commissioned into real environments.
              </p>
            </div>

            {/* Rhythm Card 2: Last Sunday */}
            <div className="p-6 border border-gray-200 rounded-2xl hover:border-black hover:shadow-md transition-all space-y-2 bg-white">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-black uppercase tracking-wider">
                  LAST SUNDAY
                </span>
                <span className="text-amber-700 font-semibold">Special Focus</span>
              </div>
              <h4 className="font-serif-headline text-lg text-black font-normal">
                Lifebuild Activation / Special Program
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                A focused application program addressing practical areas of rebuilding: People, Work, Family, Leadership, Business, Community, Economic realities, and Systems. Highly targeted toward real-life solutions.
              </p>
            </div>

            {/* Rhythm Card 3: Quarterly Conference */}
            <div className="p-6 bg-zinc-950 text-white rounded-2xl space-y-3 border border-zinc-800 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#d4af37] font-bold uppercase tracking-widest">
                  QUARTERLY
                </span>
                <span className="text-zinc-400">Flagship Expression</span>
              </div>
              <h4 className="font-serif-headline text-xl text-white font-normal">
                Lifebuild Conference
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                The larger, deeper activation point within the movement: strategic conversations, leadership workshops, cross-sector networking, intensive teaching, and commissioning across regions.
              </p>
              <div className="pt-1">
                <button
                  onClick={onOpenConference || onOpenRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#d4af37] transition-colors cursor-pointer font-bold uppercase tracking-wider"
                >
                  <span>Request Conference Pass</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Secondary Logistics Note */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-zinc-500 flex items-center justify-between">
              <span>Format: Hybrid (In-Person &amp; Stream)</span>
              <span>Scripture: Isaiah 58:12</span>
            </div>

          </motion.div>

          {/* Right Column: 6-Stage Gathering Blueprint */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="border-b border-gray-200 pb-3">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
                The Progression
              </span>
              <h3 className="font-heading text-lg font-bold text-black flex items-center gap-2">
                <Zap className="w-4 h-4 text-black" />
                Encounter → Understand → Connect → Develop → Commission → Go
              </h3>
            </div>

            <div className="space-y-3">
              {/* Step 01 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                className="p-5 border border-gray-200 rounded-2xl hover:border-black hover:shadow-sm transition-all space-y-1 bg-white"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-bold text-black">01 / ENCOUNTER</span>
                  <span>Worship &amp; Alignment</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-black">Worship, Prayer &amp; Scripture</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Centering mind and heart in reverent worship, prayer, and deep alignment with God’s presence and divine perspective.
                </p>
              </motion.div>

              {/* Step 02 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                className="p-5 border border-gray-200 rounded-2xl hover:border-black hover:shadow-sm transition-all space-y-1 bg-white"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-bold text-black">02 / UNDERSTAND</span>
                  <span>Teaching &amp; Vision</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-black">Teaching on Rebuilding &amp; 4T Principles</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Actionable understanding around purpose, work, character, and the 4T framework (Rebuild, Restore, Repair, Replenish).
                </p>
              </motion.div>

              {/* Step 03 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                className="p-5 border border-gray-200 rounded-2xl hover:border-black hover:shadow-sm transition-all space-y-1 bg-white"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-bold text-black">03 / CONNECT</span>
                  <span>Authentic Fellowship</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-black">Relational Fellowship with Rebuilders</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Forging genuine relationships and mutual accountability with other builders committed to societal transformation.
                </p>
              </motion.div>

              {/* Step 04 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                className="p-5 border border-gray-200 rounded-2xl hover:border-black hover:shadow-sm transition-all space-y-1 bg-white"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-bold text-black">04 / DEVELOP</span>
                  <span>Capacity Building</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-black">Practical Discussion &amp; Reflection</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Interactive dialogue, case studies, and practical exercises designed to expand wisdom and operational competence.
                </p>
              </motion.div>

              {/* Step 05 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                className="p-5 border border-gray-200 rounded-2xl hover:border-black hover:shadow-sm transition-all space-y-1 bg-white"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-bold text-black">05 / COMMISSION</span>
                  <span>Direction &amp; Prayer</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-black">Identifying What Needs Rebuilding</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Receiving strategic prayer, clarity on assignment, and commissioning to address breaches in your sphere of influence.
                </p>
              </motion.div>

              {/* Step 06 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                className="p-5 border border-black rounded-2xl hover:shadow-md transition-all space-y-1 bg-zinc-50"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-bold text-black">06 / GO</span>
                  <span>Marketplace &amp; Civic Action</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-black">Return to Everyday Environments Equipped</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Stepping back into your workplace, company, household, and community actively executing the rebuilding mandate.
                </p>
              </motion.div>

            </div>

          </motion.div>

        </div>

        {/* Programme Architecture Teaser Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-zinc-100 border border-gray-200 rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                Lifebuild Programme Architecture
              </span>
              <p className="text-xs font-mono font-semibold text-black">
                GATHER • ACTIVATE • CONFERENCE • DEVELOP • CONNECT • DEPLOY
              </p>
            </div>
            <span className="text-xs text-zinc-500 font-light max-w-md">
              A flexible ecosystem supporting continuous development and real-world transformation beyond meetings.
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
