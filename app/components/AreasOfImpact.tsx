"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Briefcase, Globe, ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";

interface AreasOfImpactProps {
  onOpenRegister?: () => void;
}

export default function AreasOfImpact({ onOpenRegister }: AreasOfImpactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const impactSpheres = [
    {
      id: "people",
      number: "01",
      title: "PEOPLE",
      subtitle: "Personal Foundations & Capacity",
      image: "/images/gathering_rebuilders.jpg",
      imageAlt: "Lifebuild Rebuilders in alignment and dialogue",
      icon: User,
      scope: [
        "Identity & Spiritual Authority",
        "Character, Integrity & Dignity",
        "Purpose & Divine Assignment",
        "Leadership Acumen & Discernment",
        "Relationships, Health & Family Systems",
      ],
      description:
        "Transformation starts from within. We focus on rebuilding broken internal foundations, restoring God-given identity, and equipping individuals with the character and competence needed to sustain influence.",
    },
    {
      id: "work",
      number: "02",
      title: "WORK",
      subtitle: "Enterprise, Systems & Economics",
      image: "/images/speaker_stage.jpg",
      imageAlt: "Marketplace leaders and builders operating with vision and competence",
      icon: Briefcase,
      scope: [
        "Careers, Professions & Marketplace Influence",
        "Business Models, Governance & Ethics",
        "Organisational Systems & Culture",
        "Economic Participation & Stewardship",
        "Institutional Solutions to Real Problems",
      ],
      description:
        "Where faith meets execution. We equip professionals, entrepreneurs, and builders to reconstruct workplace systems, operate with excellence, and generate economic vitality that serves the common good.",
    },
    {
      id: "community",
      number: "03",
      title: "COMMUNITY",
      subtitle: "Societal Fabric & Generational Legacy",
      image: "/images/welcome_happy_builders.jpg",
      imageAlt: "Families and community builders gathering in joy and unity",
      icon: Globe,
      scope: [
        "Families & Multi-Generational Stability",
        "Neighbourhoods & Social Institutions",
        "Civic Engagement & Societal Restoration",
        "Economic Ecosystems & Community Assets",
        "Lasting Cultural & Generational Inheritance",
      ],
      description:
        "Rebuilding broken walls across society. When equipped individuals and healthy enterprises unite, entire communities and cities experience tangible restoration, safe paths, and lasting hope.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="impact-areas"
      className="relative w-full bg-white text-black py-28 border-b border-gray-100 overflow-hidden"
    >
      {/* Background Watermark Overlay with Parallax Motion */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.03] pointer-events-none select-none"
      >
        <Image
          src="/images/logo_icon_nobg.png"
          alt="Lifebuild Overlay"
          fill
          sizes="550px"
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-gray-200 text-zinc-700 text-xs font-mono uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#3b2262]" />
            <span>Where Rebuilding Happens</span>
          </div>

          <h2 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-tight">
            Three Areas of Impact.
          </h2>

          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-light">
            <strong className="text-black font-medium">What happens inside a person eventually affects what they build around them.</strong> Lifebuild establishes three major environments where real transformation takes root and expands.
          </p>
        </motion.div>

        {/* 3 Impact Areas Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {impactSpheres.map((sphere) => {
            const Icon = sphere.icon;
            return (
              <motion.div
                key={sphere.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="border border-gray-200 rounded-3xl hover:border-black hover:shadow-xl transition-all bg-white overflow-hidden flex flex-col justify-between group"
              >
                {/* Category Image Header */}
                <Link href={`/impact/${sphere.id}`} className="block relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden cursor-pointer">
                  <Image
                    src={sphere.image}
                    alt={sphere.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Area Tag */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    <span>AREA {sphere.number}</span>
                  </div>

                  {/* Icon Indicator */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                </Link>

                {/* Card Content Body */}
                <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <Link href={`/impact/${sphere.id}`} className="group-hover:text-[#3b2262] transition-colors">
                        <h3 className="font-serif-headline text-2xl sm:text-3xl text-black font-normal">
                          {sphere.title}
                        </h3>
                      </Link>
                      <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider pt-1">
                        {sphere.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed font-light">
                      {sphere.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-gray-100">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-semibold">
                        Key Expressions
                      </span>
                      <ul className="space-y-1.5">
                        {sphere.scope.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-gray-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Isaiah 58:12 Domain</span>
                    <Link
                      href={`/impact/${sphere.id}`}
                      className="inline-flex items-center gap-1.5 font-bold text-black hover:text-[#3b2262] transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Explore {sphere.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Closing Truth Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-zinc-950 text-white border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-1 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
              The Movement Continuity
            </span>
            <h4 className="font-serif-headline text-xl sm:text-2xl text-white font-normal">
              Internal Transformation Leading to Tangible Societal Reconstruction.
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              When people are restored in their God-given identity, their work becomes a vehicle for righteousness, and their communities inherit lasting peace.
            </p>
          </div>

          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-md"
            >
              <span>Become a Rebuilder</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          )}
        </motion.div>

      </div>
    </section>
  );
}
