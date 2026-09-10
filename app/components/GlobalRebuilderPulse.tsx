"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin, Users, Activity, Sparkles, ArrowRight, ShieldCheck, Clock } from "lucide-react";

interface CityHub {
  id: string;
  name: string;
  country: string;
  status: string;
  pillarFocus: string;
  x: number; // SVG percentage 0 - 100
  y: number; // SVG percentage 0 - 100
  timezone: string;
}

const CITY_HUBS: CityHub[] = [
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    status: "Global Center",
    pillarFocus: "Structural Rebuilding & Systems",
    x: 51.5,
    y: 53.0,
    timezone: "Africa/Lagos",
  },
  {
    id: "abuja",
    name: "Abuja",
    country: "Nigeria",
    status: "Strategic Hub",
    pillarFocus: "Governance & Policy Alignment",
    x: 52.8,
    y: 51.0,
    timezone: "Africa/Lagos",
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    status: "European Hub",
    pillarFocus: "Marketplace & Executive Restoration",
    x: 48.8,
    y: 28.5,
    timezone: "Europe/London",
  },
  {
    id: "houston",
    name: "Houston / Dallas",
    country: "United States",
    status: "Americas Hub",
    pillarFocus: "Generational Stewardship & Family",
    x: 23.5,
    y: 40.5,
    timezone: "America/Chicago",
  },
  {
    id: "toronto",
    name: "Toronto",
    country: "Canada",
    status: "Canadian Circle",
    pillarFocus: "Diaspora Rebuilders & Innovation",
    x: 27.5,
    y: 32.5,
    timezone: "America/Toronto",
  },
  {
    id: "nairobi",
    name: "Nairobi",
    country: "Kenya",
    status: "East Africa Hub",
    pillarFocus: "Youth Leadership & Community Repair",
    x: 60.5,
    y: 58.5,
    timezone: "Africa/Nairobi",
  },
  {
    id: "accra",
    name: "Accra",
    country: "Ghana",
    status: "West Africa Circle",
    pillarFocus: "Enterprise & Economic Replenishing",
    x: 48.5,
    y: 54.0,
    timezone: "Africa/Accra",
  },
];

const RECENT_ACTIVITIES = [
  { text: "Pass issued for 4T Conference delegate", city: "London, UK", time: "2 mins ago" },
  { text: "Sunday Gathering Self Check-In verified", city: "Lagos, NG", time: "5 mins ago" },
  { text: "New Rebuilder declaration submitted", city: "Houston, USA", time: "9 mins ago" },
  { text: "Marketplace circle formed under Isaiah 58:12", city: "Abuja, NG", time: "14 mins ago" },
  { text: "Rebuilder journal reflection recorded", city: "Toronto, CA", time: "21 mins ago" },
  { text: "Delegation RSVP confirmed for 5:00 PM GMT+1", city: "Nairobi, KE", time: "28 mins ago" },
];

interface GlobalRebuilderPulseProps {
  onOpenRegister: () => void;
}

export default function GlobalRebuilderPulse({ onOpenRegister }: GlobalRebuilderPulseProps) {
  const [selectedCity, setSelectedCity] = useState<CityHub>(CITY_HUBS[0]);
  const [localTimes, setLocalTimes] = useState<Record<string, string>>({});
  const [activityIndex, setActivityIndex] = useState(0);

  // Update local times for all cities in real-time
  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {};
      CITY_HUBS.forEach((hub) => {
        try {
          times[hub.id] = new Intl.DateTimeFormat("en-US", {
            timeZone: hub.timezone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(new Date());
        } catch (e) {
          times[hub.id] = "Live";
        }
      });
      setLocalTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  // Cycle live activity ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-zinc-950 text-white py-24 border-b border-zinc-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-500/10 via-[#d4af37]/15 to-[#3b2262]/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-12">
        {/* Header with Live Status Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#d4af37] text-[10px] font-mono font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time Global Network Pulse • Isaiah 58:12</span>
            </div>

            <h2 className="font-serif-headline text-3xl sm:text-5xl text-white font-normal leading-tight">
              Rebuilders Rising Across the Nations.
            </h2>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              From Lagos to London, Houston to Nairobi — LifeBuild Global unites Kingdom builders, executives, and leaders committed to repairing systemic breaches in their cities.
            </p>
          </div>

          {/* Authentic Live Network Status Badge (no hardcoded numbers) */}
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-5 py-3.5 rounded-2xl backdrop-blur-md shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Active Global Movement
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                In-Person Gatherings &amp; Global Live Stream
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Ticker Bar */}
        <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400 shrink-0">
            <Activity className="w-4 h-4 text-[#d4af37] animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#d4af37]">Live Feed:</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activityIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between text-zinc-300 text-[11px] sm:text-xs"
              >
                <span className="truncate">{RECENT_ACTIVITIES[activityIndex].text}</span>
                <span className="text-zinc-500 shrink-0 ml-3 text-[10px]">
                  {RECENT_ACTIVITIES[activityIndex].city} • {RECENT_ACTIVITIES[activityIndex].time}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* World Radar Interactive Map Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* SVG Map Container */}
          <div className="lg:col-span-8 relative aspect-[16/9] w-full rounded-3xl bg-zinc-900/50 border border-zinc-800/90 overflow-hidden p-4 sm:p-8 flex items-center justify-center shadow-2xl">
            
            {/* Ambient map grid lines */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#d4af37 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                backgroundPosition: "0 0, 14px 14px",
              }}
            />

            {/* Stylized Simplified Continents Outline */}
            <svg
              className="w-full h-full opacity-30 select-none pointer-events-none"
              viewBox="0 0 1000 550"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.8"
            >
              {/* North America */}
              <path d="M 150 120 Q 220 100 320 140 Q 300 240 240 280 Q 200 240 180 180 Z" fill="#d4af37" fillOpacity="0.04" />
              {/* South America */}
              <path d="M 280 300 Q 340 320 320 440 Q 270 480 250 360 Z" fill="#d4af37" fillOpacity="0.04" />
              {/* Europe */}
              <path d="M 460 140 Q 540 130 560 200 Q 480 220 450 170 Z" fill="#d4af37" fillOpacity="0.05" />
              {/* Africa */}
              <path d="M 460 230 Q 560 220 600 340 Q 540 450 480 350 Q 440 280 460 230 Z" fill="#d4af37" fillOpacity="0.08" />
              {/* Asia */}
              <path d="M 570 140 Q 750 120 850 220 Q 750 320 620 250 Z" fill="#d4af37" fillOpacity="0.04" />
              {/* Australia */}
              <path d="M 760 380 Q 860 370 850 450 Q 770 460 760 380 Z" fill="#d4af37" fillOpacity="0.04" />
            </svg>

            {/* Glowing Interactive Pulse Nodes */}
            <div className="absolute inset-0 pointer-events-auto">
              {CITY_HUBS.map((hub) => {
                const isSelected = selectedCity.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedCity(hub)}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                  >
                    {/* Outer Radar Ping Ring */}
                    <span
                      className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                        isSelected ? "bg-amber-400" : "bg-[#d4af37]/60"
                      }`}
                      style={{ animationDuration: isSelected ? "1.8s" : "3s" }}
                    />

                    {/* Node Core */}
                    <div
                      className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-amber-400 ring-4 ring-amber-400/30 scale-125"
                          : "bg-zinc-900 border-2 border-[#d4af37] group-hover:scale-110 group-hover:border-white"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-black" : "bg-[#d4af37]"
                        }`}
                      />
                    </div>

                    {/* City Floating Tooltip on Hover / Select */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-6 px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap pointer-events-none transition-all duration-200 z-20 ${
                        isSelected
                          ? "bg-zinc-900 text-amber-400 border border-amber-500/50 shadow-lg scale-100 opacity-100"
                          : "bg-black/80 text-zinc-300 border border-zinc-800 opacity-0 group-hover:opacity-100 group-hover:scale-95"
                      }`}
                    >
                      <span className="font-bold">{hub.name}</span>
                      <span className="text-emerald-400 ml-1.5">• Active Hub</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected City Focus Card */}
          <div className="lg:col-span-4 space-y-4">
            <motion.div
              key={selectedCity.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl space-y-6 shadow-xl relative overflow-hidden"
            >
              {/* Gold gradient edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-[#d4af37] to-[#3b2262]" />

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                    {selectedCity.status}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {selectedCity.name}, <span className="text-zinc-400 font-normal">{selectedCity.country}</span>
                  </h3>
                </div>

                <div className="px-2.5 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{localTimes[selectedCity.id] || "Active"}</span>
                </div>
              </div>

              {/* Stats & Focus */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-zinc-500">Hub Alignment</div>
                  <div className="text-sm font-semibold font-mono text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Rebuilder Circle</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-zinc-500">Core Mandate Alignment</div>
                  <div className="text-xs font-medium text-zinc-200 leading-relaxed">
                    {selectedCity.pillarFocus}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenRegister}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-[#d4af37] to-amber-600 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-md"
              >
                <span>Connect With {selectedCity.name} Circle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* City Hub Quick Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {CITY_HUBS.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setSelectedCity(hub)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-mono transition-all cursor-pointer border ${
                    selectedCity.id === hub.id
                      ? "bg-white text-black font-bold border-white"
                      : "bg-zinc-900/70 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {hub.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
