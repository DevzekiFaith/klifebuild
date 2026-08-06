"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import {
  Star,
  MessageSquare,
  QrCode,
  Send,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  Filter,
  Maximize2,
  X,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Radio,
  Share2,
  Copy,
  Check,
  Globe
} from "lucide-react";
import {
  ReviewData,
  fetchReviews,
  submitReview,
  likeReview,
  subscribeToLiveReviews,
  DEFAULT_REVIEWS
} from "../../lib/supabase";

interface LiveReviewSectionProps {
  currentMemberName?: string;
}

// 3D Mouse Parallax Tilt Card Component
function TiltCard({
  children,
  className = "",
  maxTilt = 6
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 250,
    damping: 20
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 250,
    damping: 20
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function LiveReviewSection({ currentMemberName }: LiveReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewData[]>(DEFAULT_REVIEWS);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form states
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState<string>("");
  const [role, setRole] = useState<string>("Member");
  const [category, setCategory] = useState<
    "Sunday Gathering" | "4T Transformation" | "Fellowship & Community" | "General Experience"
  >("Sunday Gathering");
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Production QR URL state pointing directly to live review form on domain
  const PROD_DOMAIN = "https://www.lifebuildglobal.com.ng";
  const [liveUrl, setLiveUrl] = useState<string>("https://www.lifebuildglobal.com.ng/#live-review");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep official domain for QR code scan so mobile users are routed to www.lifebuildglobal.com.ng/#live-review
    setLiveUrl(`${PROD_DOMAIN}/#live-review`);
  }, []);

  useEffect(() => {
    if (currentMemberName && !authorName) {
      setAuthorName(currentMemberName);
    }
  }, [currentMemberName, authorName]);

  // Load reviews & set up real-time listener
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadData = async () => {
      const data = await fetchReviews();
      setReviews(data);
    };

    loadData();

    // Real-time listener
    unsubscribe = subscribeToLiveReviews((newRev) => {
      setReviews((prev) => {
        if (prev.some((r) => r.id === newRev.id)) return prev;
        return [newRev, ...prev];
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    setIsSubmitting(true);

    try {
      const newReview = await submitReview(
        authorName.trim(),
        role,
        rating,
        category,
        reviewText.trim()
      );

      // Trigger Confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#fbbf24", "#3b2262", "#ffffff"]
      });

      setReviews((prev) => [newReview, ...prev.filter((r) => r.id !== newReview.id)]);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
        setReviewText("");
      }, 3000);
    } catch (err) {
      console.error("Submit review error:", err);
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
    await likeReview(id);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(liveUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Quick prompt templates
  const quickPrompts = [
    "Loved the powerful worship atmosphere and community spirit!",
    "The 4T Pillars vision gave me clear direction for leadership.",
    "Seamless QR pass check-in made joining Sunday gathering so smooth!",
    "Inspiring message and warm fellowship from day one."
  ];

  const filteredReviews = reviews.filter((r) => {
    if (activeCategory === "ALL") return true;
    return r.category === activeCategory;
  });

  // Calculate analytics metrics
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
      : "5.0";

  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => Math.round(r.rating) === star).length
  );

  // Section Mouse Parallax 3D Tilt Values
  const sectionX = useMotionValue(0);
  const sectionY = useMotionValue(0);
  const sectionRotateX = useSpring(useTransform(sectionY, [-0.5, 0.5], [2, -2]), { stiffness: 200, damping: 25 });
  const sectionRotateY = useSpring(useTransform(sectionX, [-0.5, 0.5], [-2, 2]), { stiffness: 200, damping: 25 });

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sectionX.set((e.clientX - rect.left) / rect.width - 0.5);
    sectionY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleSectionMouseLeave = () => {
    sectionX.set(0);
    sectionY.set(0);
  };

  return (
    <section
      id="live-review"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative w-full bg-[#faf9fb] text-zinc-950 py-28 border-b border-zinc-200/80 overflow-hidden perspective-1000"
    >
      {/* Background Subtle Ambient Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/5 via-[#d4af37]/5 to-purple-600/5 blur-[120px] pointer-events-none select-none" />

      <motion.div
        style={{
          rotateX: sectionRotateX,
          rotateY: sectionRotateY,
          transformStyle: "preserve-3d",
        }}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-16"
      >
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-zinc-200/80">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-mono tracking-wider uppercase flex items-center gap-1.5 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-600" />
                Live Response Feed
              </span>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
                Isaiah 58:12 Community Reviews
              </span>
            </div>

            <h2 className="font-serif-headline text-4xl sm:text-5xl lg:text-6xl font-normal text-zinc-950 leading-tight">
              Share Your Experience & See Live Reviews.
            </h2>

            <p className="text-zinc-600 text-base leading-relaxed font-light">
              Submit your live review or scan the mobile QR code to give feedback directly from your phone. Responses update in real-time for everyone across the network.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-6 p-5 bg-white border border-zinc-200/90 rounded-2xl shadow-sm">
            <div className="text-center border-r border-zinc-200 pr-6">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-amber-600 font-mono">
                <span>{avgRating}</span>
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mt-0.5 font-semibold">
                Avg Rating
              </span>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-950 font-mono">{totalReviews}</div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mt-0.5 font-semibold">
                Verified Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Main 3-Column Grid Layout: Form (7 cols) + Mobile QR Banner & Analytics (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form + Live Stream (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Interactive Review Form Card with 3D Tilt */}
            <TiltCard maxTilt={5}>
              <div
                ref={formRef}
                className="p-8 sm:p-10 bg-white border border-zinc-200/90 rounded-3xl shadow-xl shadow-zinc-200/60 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-950">Submit a Live Review</h3>
                      <p className="text-xs text-zinc-500 font-light">
                        Instant live sync across mobile and desktop
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/80 text-xs font-mono text-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? "Link Copied!" : "Share Link"}
                  </button>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4"
                  >
                    <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-emerald-950">Review Submitted Live!</h4>
                    <p className="text-sm text-emerald-800 max-w-md mx-auto font-light">
                      Thank you for strengthening the Lifebuild community. Your review is now live in the stream below.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Star Rating Picker */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-600 uppercase tracking-wider block font-semibold">
                        Overall Rating <span className="text-amber-600">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = star <= (hoverRating || rating);
                          return (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                            >
                              <Star
                                className={`w-7 h-7 transition-colors ${
                                  active
                                    ? "fill-amber-400 text-amber-500 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
                                    : "text-zinc-300 hover:text-amber-400"
                                }`}
                              />
                            </button>
                          );
                        })}
                        <span className="ml-3 text-xs font-mono text-amber-700 font-bold uppercase">
                          {rating === 5 && "Outstanding (5/5)"}
                          {rating === 4 && "Very Good (4/5)"}
                          {rating === 3 && "Good (3/5)"}
                          {rating === 2 && "Fair (2/5)"}
                          {rating === 1 && "Needs Improvement (1/5)"}
                        </span>
                      </div>
                    </div>

                    {/* Name & Role Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-600 uppercase tracking-wider block font-semibold">
                          Your Full Name <span className="text-amber-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="e.g. Dr. Emmanuel Vance"
                          className="w-full px-4 py-3 bg-zinc-50/80 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-600 uppercase tracking-wider block font-semibold">
                          Your Community Role
                        </label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50/80 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                        >
                          <option value="Member">Member</option>
                          <option value="First-Time Guest">First-Time Guest</option>
                          <option value="Kingdom Leader">Kingdom Leader</option>
                          <option value="Youth Builder">Youth Builder</option>
                          <option value="Conference Delegate">Conference Delegate</option>
                          <option value="Volunteer / Usher">Volunteer / Usher</option>
                        </select>
                      </div>
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-600 uppercase tracking-wider block font-semibold">
                        Review Category
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          "Sunday Gathering",
                          "4T Transformation",
                          "Fellowship & Community",
                          "General Experience"
                        ].map((cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setCategory(cat as any)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${
                              category === cat
                                ? "bg-amber-500/15 border-amber-500 text-amber-950 font-bold shadow-xs"
                                : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-zinc-600 uppercase tracking-wider block font-semibold">
                          Your Review / Feedback <span className="text-amber-600">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {reviewText.length}/500
                        </span>
                      </div>

                      <textarea
                        required
                        maxLength={500}
                        rows={4}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your authentic experience, testimony, or feedback..."
                        className="w-full px-4 py-3 bg-zinc-50/80 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none leading-relaxed"
                      />

                      {/* Quick Prompts */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          Quick prompts:
                        </span>
                        {quickPrompts.map((p, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setReviewText(p)}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/80 text-zinc-600 hover:text-zinc-900 transition-colors text-left truncate max-w-[260px] cursor-pointer"
                          >
                            "{p}"
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !authorName.trim() || !reviewText.trim()}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 via-[#d4af37] to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          Publish Live Review
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </TiltCard>

            {/* Live Response Feed Stream Header */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-zinc-950">Live Responses</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Realtime Sync
                  </span>
                </div>

                {/* Category Filters (Smooth Motion Buttons like RebuildVisionWall) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    "ALL",
                    "Sunday Gathering",
                    "4T Transformation",
                    "Fellowship & Community",
                    "General Experience"
                  ].map((cat) => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors cursor-pointer border ${
                        activeCategory === cat
                          ? "bg-zinc-950 border-zinc-950 text-white font-bold shadow-sm"
                          : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                      }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Feed Items (Smooth 3D Tilt Card hover items) */}
              <div className="min-h-[360px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    {filteredReviews.length === 0 ? (
                      <div className="p-8 bg-white border border-zinc-200/90 rounded-2xl text-center text-zinc-500 font-light shadow-xs">
                        No reviews submitted in this category yet. Be the first!
                      </div>
                    ) : (
                      filteredReviews.map((rev) => (
                        <motion.div
                          key={rev.id}
                          whileHover={{ scale: 1.015, y: -3, rotateX: -1.5, rotateY: 1.5 }}
                          transition={{ duration: 0.2 }}
                          className="p-6 bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-xs hover:shadow-lg rounded-2xl space-y-3 relative group"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-600/20 border border-amber-500/30 flex items-center justify-center text-amber-800 font-bold font-serif text-base">
                                {rev.authorName.charAt(0).toUpperCase()}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-zinc-950">{rev.authorName}</h4>
                                  <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200/80 text-[10px] font-mono text-zinc-600 font-medium">
                                    {rev.role}
                                  </span>
                                </div>
                                <span className="text-[11px] text-zinc-400 font-mono">
                                  {rev.createdAt}
                                </span>
                              </div>
                            </div>

                            {/* Star Rating Badge */}
                            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span className="text-xs font-mono font-bold text-amber-800">
                                {rev.rating}.0
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-zinc-700 leading-relaxed font-light">
                            "{rev.reviewText}"
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs font-mono">
                            <span className="text-[11px] text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                              {rev.category}
                            </span>

                            <button
                              onClick={() => handleLike(rev.id)}
                              className="flex items-center gap-1.5 text-zinc-500 hover:text-amber-800 transition-colors py-1 px-2.5 rounded-lg hover:bg-zinc-100 cursor-pointer"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>Helpful ({rev.likes})</span>
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Dark QR Code Card & Analytics (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            {/* Scan QR Code To Review On Mobile Card with 3D Tilt */}
            <TiltCard maxTilt={6}>
              <div className="p-8 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border border-amber-500/30 rounded-3xl shadow-2xl relative overflow-hidden space-y-6 text-white">
                
                {/* Top Banner Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      Mobile Responsiveness QR
                    </span>
                  </div>

                  <button
                    onClick={() => setIsQrModalOpen(true)}
                    title="Expand QR Code"
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Scan to Review on Mobile
                  </h3>
                  <p className="text-xs text-zinc-400 font-light max-w-xs mx-auto">
                    Point your smartphone camera at this QR code to instantly open the mobile live review form on your phone!
                  </p>
                </div>

                {/* High Contrast QR Code Container */}
                <div className="p-5 bg-white rounded-2xl w-fit mx-auto shadow-2xl border-4 border-amber-400/40 relative group cursor-pointer"
                     onClick={() => setIsQrModalOpen(true)}>
                  <QRCodeSVG
                    value={liveUrl}
                    size={190}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: "/images/logo_icon_nobg.png",
                      x: undefined,
                      y: undefined,
                      height: 38,
                      width: 38,
                      excavate: true,
                    }}
                  />
                  
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col items-center justify-center text-white text-xs font-mono space-y-1">
                    <Maximize2 className="w-6 h-6 text-amber-400" />
                    <span>Click to Expand</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>www.lifebuildglobal.com.ng/#live-review</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/60 border border-zinc-700 text-zinc-300 text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>No App Download Required</span>
                  </div>

                  <p className="text-[11px] text-zinc-500 font-mono block">
                    Scanned mobile reviews automatically stream to this live feed in real-time.
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Community Rating Breakdown Analytics Card with 3D Tilt */}
            <TiltCard maxTilt={5}>
              <div className="p-6 bg-white border border-zinc-200/90 rounded-3xl shadow-sm space-y-5 text-zinc-950">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-zinc-950 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    Community Satisfaction
                  </h4>
                  <span className="text-xs font-mono text-zinc-500 font-medium">{totalReviews} Ratings</span>
                </div>

                {/* Star Progress Bars */}
                <div className="space-y-2.5 font-mono text-xs">
                  {[5, 4, 3, 2, 1].map((star, idx) => {
                    const count = ratingCounts[idx];
                    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-10 text-zinc-600 font-medium">
                          <span>{star}</span>
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        </div>

                        <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-[#d4af37] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <span className="w-10 text-right text-zinc-500">{pct}%</span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-600">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    100% Verified Lifebuilder Feedback
                  </span>
                </div>
              </div>
            </TiltCard>

          </div>

        </div>

      </motion.div>

      {/* Full-Screen Presentation QR Modal */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-white border border-amber-500/40 rounded-3xl p-8 space-y-6 text-center relative shadow-2xl text-zinc-950"
            >
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono uppercase tracking-wider font-bold">
                  Auditorium & Live Stream Presentation QR
                </span>
                <h3 className="text-2xl font-bold text-zinc-950">Scan with Mobile Phone</h3>
                <p className="text-xs text-zinc-600 font-light">
                  Submit live reviews and feedback directly from your mobile browser.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl inline-block border-4 border-amber-400 shadow-xl">
                <QRCodeSVG
                  value={liveUrl}
                  size={260}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: "/images/logo_icon_nobg.png",
                    x: undefined,
                    y: undefined,
                    height: 52,
                    width: 52,
                    excavate: true,
                  }}
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono text-amber-900 truncate px-4 py-2 bg-amber-50 rounded-xl border border-amber-200/80 font-bold">
                  {liveUrl}
                </p>

                <button
                  onClick={handleCopyLink}
                  className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-900 text-white font-semibold rounded-xl text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
                  {copiedLink ? "Link Copied to Clipboard" : "Copy Review Link"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
