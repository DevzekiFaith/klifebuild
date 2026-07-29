"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSolarSystem from "./components/HeroSolarSystem";
import SundaySelfCheckInBanner from "./components/SundaySelfCheckInBanner";
import JoinQRCodeBanner from "./components/JoinQRCodeBanner";
import FellowshipStory from "./components/FellowshipStory";
import FounderSection from "./components/FounderSection";
import WeeklyMeeting from "./components/WeeklyMeeting";
import TransformationPathway from "./components/TransformationPathway";
import RebuildVisionWall from "./components/RebuildVisionWall";
import RegistrationForm, { MemberData } from "./components/RegistrationForm";
import AttendancePassModal from "./components/AttendancePassModal";
import QRScannerModal from "./components/QRScannerModal";
import AdminAttendanceDashboard from "./components/AdminAttendanceDashboard";
import AdminPasscodeModal from "./components/AdminPasscodeModal";
import Footer from "./components/Footer";
import { getStoredAuthRole, AuthRole, logoutAuthRole } from "../lib/supabase";
import { Hammer, Key, HeartHandshake, RefreshCw, ArrowUpRight } from "lucide-react";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isPasscodeOpen, setIsPasscodeOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [authRole, setAuthRole] = useState<AuthRole>(null);
  const [currentMember, setCurrentMember] = useState<MemberData | null>(null);

  useEffect(() => {
    try {
      const savedPass = localStorage.getItem("lifebuild_member_pass");
      if (savedPass) {
        setCurrentMember(JSON.parse(savedPass));
      }
      setAuthRole(getStoredAuthRole());
    } catch (err) {
      console.error("Error reading saved pass:", err);
    }
  }, []);

  const handleRegistrationSuccess = (newMember: MemberData) => {
    setCurrentMember(newMember);
    setIsRegisterOpen(false);
    setIsPassOpen(true);
  };

  const handleOpenDashboardRequest = () => {
    const role = getStoredAuthRole();
    if (role) {
      setAuthRole(role);
      setIsDashboardOpen(true);
    } else {
      setIsPasscodeOpen(true);
    }
  };

  const handlePasscodeSuccess = (role: AuthRole) => {
    setAuthRole(role);
    setIsPasscodeOpen(false);
    setIsDashboardOpen(true);
  };

  const handleDashboardLogout = () => {
    logoutAuthRole();
    setAuthRole(null);
    setIsDashboardOpen(false);
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-[#d4af37]">
      {/* Navbar */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenPass={() => setIsPassOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenDashboard={handleOpenDashboardRequest}
        hasPass={!!currentMember}
      />

      {/* Live Sunday 1-Click Self Check-In Banner */}
      <div className="pt-20">
        <SundaySelfCheckInBanner
          currentMember={currentMember}
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenPass={() => setIsPassOpen(true)}
        />
      </div>

      {/* Hero Solar System Section */}
      <HeroSolarSystem
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* High-Impact Scan QR Code To Join Banner (Below Hero Section) */}
      <JoinQRCodeBanner
        onOpenRegister={() => setIsRegisterOpen(true)}
        compact={true}
      />

      {/* High-Contrast Featured Showcase Block with 4T Emblem */}
      <FellowshipStory
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenPass={() => setIsPassOpen(true)}
      />

      {/* Feature 4: The 4T Transformation Pathway (Interactive Roadmap) */}
      <TransformationPathway
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Founder Zeki Ubor Section */}
      <FounderSection
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Weekly Meeting & 4T Conference */}
      <WeeklyMeeting
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Feature 3: Interactive Global Rebuilding Vision Wall */}
      <RebuildVisionWall />

      {/* Core 4T Pillars Section (Clean White Editorial Grid with Watermark Overlay) */}
      <section id="pillars" className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden">
        {/* Background Watermark Overlay */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03] pointer-events-none select-none">
          <Image
            src="/images/logo_icon_nobg.png"
            alt="Lifebuild Overlay"
            fill
            className="object-contain filter grayscale"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest block">
              Isaiah 58:12 • 4Tribe Network
            </span>

            <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
              The 4T Pillars of Lifebuild.
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
              Driven by Isaiah 58:12, our core mission is focused on rebuilding broken walls across four foundational pillars: Rebuilding, Restoring, Repairing, and Replenishing.
            </p>
          </div>

          {/* 4T Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pillar 01: REBUILDING */}
            <div className="p-8 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-4 bg-gray-50/40">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="font-bold text-black flex items-center gap-1.5">
                  <Hammer className="w-4 h-4 text-amber-800" />
                  01 / REBUILDING
                </span>
                <span>ISAIAH 58:12</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-black">Rebuilding Walls & Systems</h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-light">
                Reconstructing broken walls, organizational systems, business models, and economic foundations. Raising up the foundations of many generations.
              </p>
            </div>

            {/* Pillar 02: RESTORING */}
            <div className="p-8 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-4 bg-gray-50/40">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="font-bold text-black flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-blue-800" />
                  02 / RESTORING
                </span>
                <span>ISAIAH 61:3</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-black">Restoring Identity & Calling</h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-light">
                Unlocking divine keys to human identity, restoring dignity, spiritual authority, and peace to leaders, families, and communities.
              </p>
            </div>

            {/* Pillar 03: REPAIRING */}
            <div className="p-8 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-4 bg-gray-50/40">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="font-bold text-black flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-800" />
                  03 / REPAIRING
                </span>
                <span>NEHEMIAH 4:6</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-black">Repairing Breaches & Community</h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-light">
                Repairing systemic breaches, unifying builders, healing character gaps, and weaving a strong community fabric for mutual accountability.
              </p>
            </div>

            {/* Pillar 04: REPLENISHING */}
            <div className="p-8 border border-gray-200 rounded-2xl hover:border-black transition-colors space-y-4 bg-gray-50/40">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="font-bold text-black flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-yellow-800" />
                  04 / REPLENISHING
                </span>
                <span>PSALMS 112:3</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-black">Replenishing Overflow & Legacy</h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-light">
                Unlocking sustainable stewardship, economic overflow, and generational inheritance that outlasts your lifetime for decades ahead.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Scan QR Code To Join Banner (Before Footer) */}
      <JoinQRCodeBanner
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Footer */}
      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenPass={() => (currentMember ? setIsPassOpen(true) : setIsRegisterOpen(true))}
        onOpenDashboard={handleOpenDashboardRequest}
      />

      {/* Modals */}
      <RegistrationForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />

      <AttendancePassModal
        isOpen={isPassOpen}
        member={currentMember}
        onClose={() => setIsPassOpen(false)}
        onOpenScanner={() => {
          setIsPassOpen(false);
          setIsScannerOpen(true);
        }}
      />

      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        currentMember={currentMember}
      />

      <AdminPasscodeModal
        isOpen={isPasscodeOpen}
        onClose={() => setIsPasscodeOpen(false)}
        onSuccess={handlePasscodeSuccess}
      />

      <AdminAttendanceDashboard
        isOpen={isDashboardOpen}
        authRole={authRole}
        onClose={() => setIsDashboardOpen(false)}
        onLogout={handleDashboardLogout}
      />
    </main>
  );
}
