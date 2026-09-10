import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, User, Briefcase, Globe, Compass, Hammer } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export interface ImpactData {
  slug: string;
  number: string;
  title: string;
  headline: string;
  tagline: string;
  scripture: {
    verse: string;
    text: string;
  };
  image: string;
  imageAlt: string;
  overview: string;
  coreTruth: string;
  pillars: {
    title: string;
    description: string;
  }[];
  practicalOutcomes: string[];
  reflectionPrompt: string;
}

const IMPACT_DATA: Record<string, ImpactData> = {
  people: {
    slug: "people",
    number: "01",
    title: "PEOPLE",
    headline: "Rebuilding Character, Identity & Internal Capacity.",
    tagline: "Personal Transformation as the Bedrock of Rebuilding",
    scripture: {
      verse: "Isaiah 61:3",
      text: "To appoint unto them that mourn in Zion, to give unto them beauty for ashes... that they might be called trees of righteousness, the planting of the Lord, that he might be glorified.",
    },
    image: "/images/gathering_rebuilders.jpg",
    imageAlt: "Rebuilders in alignment and dialogue focusing on personal transformation",
    overview:
      "All external collapse begins with broken internal foundations. In Lifebuild, we do not view people merely as participants or spectators; we see each individual as a potential Rebuilder whose divine identity, spiritual authority, and moral character must be restored before they can rebuild anything around them.",
    coreTruth:
      "What happens inside a person eventually affects what they build around them. You cannot build a durable society with fractured people.",
    pillars: [
      {
        title: "Restoring Identity & Dignity",
        description:
          "Stripping away identity crises, fear, and cultural disorientation. Anchoring self-worth firmly in God's eternal blueprint and original assignment.",
      },
      {
        title: "Cultivating Character & Integrity",
        description:
          "Developing the emotional resilience, spiritual discipline, and moral backbone required to sustain influence without compromising values.",
      },
      {
        title: "Discerning Divine Placement",
        description:
          "Clarifying unique giftings, callings, and responsibilities. Understanding why you are placed where you are and what is entrusted to your hands.",
      },
      {
        title: "Generational Capacity",
        description:
          "Equipping people to lead healthy households, foster life-giving relationships, and pass down emotional and spiritual health to the next generation.",
      },
    ],
    practicalOutcomes: [
      "Clarity on God-given assignment and personal purpose",
      "Healing of character gaps and restoration of moral authority",
      "Capacity to withstand pressure and crisis in high-stakes environments",
      "Stronger, resilient family systems centered on love and stewardship",
    ],
    reflectionPrompt:
      "What internal foundations in your life need to be repaired before you can build lasting influence in the world?",
  },
  work: {
    slug: "work",
    number: "02",
    title: "WORK",
    headline: "Rebuilding Careers, Enterprises & Economic Systems.",
    tagline: "Marketplace Execution Rooted in Kingdom Wisdom",
    scripture: {
      verse: "Nehemiah 4:6",
      text: "So built we the wall; and all the wall was joined together unto the half thereof: for the people had a mind to work.",
    },
    image: "/images/speaker_stage.jpg",
    imageAlt: "Marketplace leaders and builders operating with vision and competence",
    overview:
      "Work is not a punishment or a secondary distraction from faith; it is the primary arena where rebuilding becomes visible. Lifebuild equips professionals, founders, and executives to bring ethical rigor, structural excellence, and innovative solutions into their vocations.",
    coreTruth:
      "Your career, business, and profession are vehicles of transformation. When builders operate with competence and righteousness, systems shift.",
  pillars: [
      {
        title: "Marketplace Integrity & Ethics",
        description:
          "Refusing corruption and shortcuts. Establishing transparent governance, fair compensation, and stewardship that honors God and blesses stakeholders.",
      },
      {
        title: "Excellence in Craft & Competence",
        description:
          "Mastering skills, technology, and strategic thinking. High spiritual conviction must be matched with world-class operational execution.",
      },
      {
        title: "Reconstructing Broken Systems",
        description:
          "Identifying organizational breaches, obsolete models, and toxic work cultures, and introducing regenerative, humane, and sustainable structures.",
      },
      {
        title: "Economic Vitality & Stewardship",
        description:
          "Creating sustainable economic value, fostering employment, and stewarding capital to advance community wellbeing and generational inheritance.",
      },
    ],
    practicalOutcomes: [
      "Operating your career or enterprise as a dedicated vehicle for rebuilding",
      "Implementing resilient operational frameworks that outlive market shocks",
      "Establishing workplace cultures defined by dignity, growth, and fairness",
      "Unlocking ethical wealth creation that serves society and families",
    ],
    reflectionPrompt:
      "What breaches or broken systems exist in your workplace or industry that God has equipped you to rebuild?",
  },
  community: {
    slug: "community",
    number: "03",
    title: "COMMUNITY",
    headline: "Rebuilding Families, Neighbourhoods & Societal Fabric.",
    tagline: "Restoring Streets with Dwellings and Generational Hope",
    scripture: {
      verse: "Isaiah 58:12",
      text: "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in.",
    },
    image: "/images/welcome_happy_builders.jpg",
    imageAlt: "Families and community builders gathering in joy and unity",
    overview:
      "The ultimate validation of rebuilt people and ethical work is a thriving community. Lifebuild mobilizes builders to repair social breaches, support vulnerable families, revitalize civic environments, and raise up foundations that outlast their lifetimes.",
    coreTruth:
      "Societal restoration happens when transformed individuals bring their skills, resources, and compassion into the places where people live, work, and grow.",
    pillars: [
      {
        title: "Strengthening Family Foundations",
        description:
          "Revitalizing households as sanctuaries of peace, moral instruction, and mutual support. Protecting the core unit of civilization.",
      },
      {
        title: "Healing Societal Breaches",
        description:
          "Uniting across cultural, social, and economic divides. Becoming mediators and peace-builders in polarized and fragmented environments.",
      },
      {
        title: "Civic & Institutional Regeneration",
        description:
          "Investing time, advocacy, and resources into local schools, civic institutions, healthcare, and neighbourhood infrastructure.",
      },
      {
        title: "Multi-Generational Legacy",
        description:
          "Thinking 50 to 100 years ahead. Planting trees whose shade you may never sit under, leaving an inheritance of peace and stability.",
      },
    ],
    practicalOutcomes: [
      "Active participation in neighbourhood and community restoration projects",
      "Safer, healthier environments for children and elders to dwell in",
      "Collaborative networks solving local housing, food, and social needs",
      "A lasting legacy of civic and spiritual renewal across generations",
    ],
    reflectionPrompt:
      "What old waste place or fractured relationship in your community is calling for your rebuilding hands?",
  },
};

export function generateStaticParams() {
  return [
    { slug: "people" },
    { slug: "work" },
    { slug: "community" },
  ];
}

export default async function ImpactDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();
  const data = IMPACT_DATA[slug];

  if (!data) {
    notFound();
  }

  const allSpheres = Object.values(IMPACT_DATA);

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-[#d4af37]">
      
      {/* Top Breadcrumb Header */}
      <div className="pt-28 pb-12 border-b border-gray-100 bg-zinc-50/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <Link
              href="/#impact-areas"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 hover:text-black transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Impact Sphere</span>
              <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-xs font-mono font-bold">
                {data.number} / 03
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Header */}
      <section className="py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-gray-200 text-zinc-800 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#3b2262]" />
                <span>Area {data.number} • {data.title}</span>
              </div>

              <h1 className="font-serif-headline text-4xl sm:text-6xl text-zinc-950 font-normal leading-[1.08] tracking-tight">
                {data.headline}
              </h1>

              <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-light">
                {data.overview}
              </p>

              {/* Core Truth Block */}
              <div className="p-6 bg-purple-50/60 border border-purple-200/70 rounded-2xl space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#3b2262] font-bold block">
                  The Core Rebuilding Principle
                </span>
                <p className="font-serif-headline italic text-base sm:text-lg text-zinc-900 leading-snug">
                  "{data.coreTruth}"
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/#declarations"
                  className="px-6 py-3 rounded-full bg-black text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Declare Rebuilding in {data.title}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Editorial Category Image */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-zinc-900 group">
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block font-bold">
                    Scriptural Anchor • {data.scripture.verse}
                  </span>
                  <p className="text-xs text-zinc-300 font-light italic leading-relaxed">
                    "{data.scripture.text}"
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4 Pillars of Reconstruction in this Domain */}
      <section className="py-20 sm:py-28 border-b border-gray-100 bg-zinc-50/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
              Execution Architecture
            </span>
            <h2 className="font-serif-headline text-3xl sm:text-5xl text-zinc-950 font-normal leading-tight">
              Dimensions of Rebuilding in {data.title}.
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-light leading-relaxed">
              How the 4T framework actively translates into real-world reconstruction for this domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 bg-white border border-gray-200 rounded-3xl hover:border-black hover:shadow-lg transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-bold text-black group-hover:text-[#3b2262] transition-colors">
                    DIMENSION 0{idx + 1}
                  </span>
                  <span>DOMAIN FOCUS</span>
                </div>
                <h3 className="font-serif-headline text-2xl text-black font-normal">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-600 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Practical Outcomes & Reflection */}
      <section className="py-20 sm:py-28 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Tangible Outcomes Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
                Evidence of Reconstruction
              </span>
              <h3 className="font-serif-headline text-3xl sm:text-4xl text-black font-normal leading-tight">
                What a Rebuilder Builds in this Space.
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
                Transformation is measured by tangible fruit. Here is what emerges when builders carry the Lifebuild mandate into {data.title.toLowerCase()}:
              </p>

              <div className="space-y-3 pt-2">
                {data.practicalOutcomes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-800 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Personal Reflection Prompt Box */}
            <div className="lg:col-span-5">
              <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-xl space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold block">
                  The Rebuilder's Inquiry
                </span>
                
                <h4 className="font-serif-headline text-2xl text-white font-normal leading-snug">
                  "{data.reflectionPrompt}"
                </h4>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Every Sunday gathering and monthly activation program is designed to give you clarity and tools to answer this question and step into real action.
                </p>

                <div className="pt-2">
                  <Link
                    href="/#gathering"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors shadow-sm"
                  >
                    <span>Attend Next Gathering</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Switch to Other Impact Spheres */}
      <section className="py-20 bg-zinc-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest block">
                Explore All Spheres
              </span>
              <h3 className="font-serif-headline text-2xl sm:text-3xl text-black font-normal">
                Other Areas of Impact
              </h3>
            </div>
            <Link
              href="/#impact-areas"
              className="text-xs font-mono font-bold text-black hover:underline"
            >
              View Full Overview →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allSpheres.map((sphere) => {
              const isCurrent = sphere.slug === slug;
              return (
                <Link
                  key={sphere.slug}
                  href={`/impact/${sphere.slug}`}
                  className={`p-6 rounded-2xl border transition-all ${
                    isCurrent
                      ? "bg-black text-white border-black shadow-md pointer-events-none"
                      : "bg-white text-black border-gray-200 hover:border-black hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className={isCurrent ? "text-[#d4af37]" : "text-zinc-400"}>
                      AREA {sphere.number}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-mono uppercase bg-zinc-800 px-2 py-0.5 rounded text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif-headline text-xl font-normal">
                    {sphere.title}
                  </h4>
                  <p className={`text-xs font-light mt-1 ${isCurrent ? "text-zinc-300" : "text-zinc-600"}`}>
                    {sphere.headline}
                  </p>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-xs font-mono text-zinc-500">
        <p>© 2009 - {new Date().getFullYear()} LifeBuild Global. Rebuilding Everywhere You Go.</p>
        <div className="pt-2">
          <Link href="/" className="hover:text-black transition-colors underline">
            Return to Homepage
          </Link>
        </div>
      </footer>

    </main>
  );
}
