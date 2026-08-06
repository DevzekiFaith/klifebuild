"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <section
      id="live-review"
      className="relative w-full bg-[#1a0f32] text-white py-28 border-b border-[#3f2275] overflow-hidden"
    >
      {/* Background Lifebuild Logo Watermark Overlay */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/images/logo_icon_nobg.png"
          alt="Lifebuild Overlay"
          fill
          sizes="600px"
          className="object-contain filter invert"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#3f2275]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#241544] border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase flex items-center gap-1.5 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                Live Response Feed
              </span>
              <span className="text-xs font-mono text-purple-300/80 uppercase tracking-widest hidden sm:inline-block">
                Isaiah 58:12 Community Reviews
              </span>
            </div>

            <h2 className="font-serif-headline text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
              Share Your Experience & See Live Reviews.
            </h2>

            <p className="text-purple-200/80 text-base leading-relaxed font-light">
              Submit your live review or scan the mobile QR code to give feedback directly from your phone. Responses update in real-time for everyone across the network.
            </p>
          </div>

          {/* Quick Metrics Badge (Solid variation) */}
          <div className="flex items-center gap-6 p-5 bg-[#241544] border border-[#3f2275] rounded-2xl shadow-xl">
            <div className="text-center border-r border-[#3f2275] pr-6">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-amber-400 font-mono">
                <span>{avgRating}</span>
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[11px] font-mono text-purple-300/80 uppercase tracking-wider block mt-0.5 font-semibold">
                Avg Rating
              </span>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-white font-mono">{totalReviews}</div>
              <span className="text-[11px] font-mono text-purple-300/80 uppercase tracking-wider block mt-0.5 font-semibold">
                Verified Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Main 3-Column Grid Layout: Form (7 cols) + Mobile QR Banner & Analytics (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form + Live Stream (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Interactive Review Form Card */}
            <div
              ref={formRef}
              className="p-8 sm:p-10 bg-[#241544] border border-[#3f2275] rounded-3xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Submit a Live Review</h3>
                    <p className="text-xs text-purple-300/80 font-light">
                      Instant live sync across mobile and desktop
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-[#1a0f32] hover:bg-[#2d1954] border border-[#3f2275] text-xs font-mono text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? "Link Copied!" : "Share Link"}
                </button>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-400/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Review Submitted Live!</h4>
                  <p className="text-sm text-emerald-200/90 max-w-md mx-auto font-light">
                    Thank you for strengthening the Lifebuild community. Your review is now live in the stream below.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Star Rating Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-purple-300/90 uppercase tracking-wider block font-semibold">
                      Overall Rating <span className="text-amber-400">*</span>
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
                                  ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                                  : "text-purple-900/80 hover:text-amber-400"
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-3 text-xs font-mono text-amber-300 font-bold uppercase">
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
                      <label className="text-xs font-mono text-purple-300/90 uppercase tracking-wider block font-semibold">
                        Your Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Dr. Emmanuel Vance"
                        className="w-full px-4 py-3 bg-[#1a0f32] border border-[#3f2275] rounded-xl text-sm text-white placeholder:text-purple-400/50 focus:bg-[#1f123c] focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-purple-300/90 uppercase tracking-wider block font-semibold">
                        Your Community Role
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1a0f32] border border-[#3f2275] rounded-xl text-sm text-white focus:bg-[#1f123c] focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                      >
                        <option value="Member" className="bg-[#1a0f32] text-white">Member</option>
                        <option value="First-Time Guest" className="bg-[#1a0f32] text-white">First-Time Guest</option>
                        <option value="Kingdom Leader" className="bg-[#1a0f32] text-white">Kingdom Leader</option>
                        <option value="Youth Builder" className="bg-[#1a0f32] text-white">Youth Builder</option>
                        <option value="Conference Delegate" className="bg-[#1a0f32] text-white">Conference Delegate</option>
                        <option value="Volunteer / Usher" className="bg-[#1a0f32] text-white">Volunteer / Usher</option>
                      </select>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-purple-300/90 uppercase tracking-wider block font-semibold">
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
                              ? "bg-[#d4af37] border-[#d4af37] text-zinc-950 font-bold shadow-sm"
                              : "bg-[#1a0f32] border-[#3f2275] text-purple-300/90 hover:border-purple-600 hover:bg-[#2d1954] hover:text-white"
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
                      <label className="text-xs font-mono text-purple-300/90 uppercase tracking-wider block font-semibold">
                        Your Review / Feedback <span className="text-amber-400">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-purple-400/70">
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
                      className="w-full px-4 py-3 bg-[#1a0f32] border border-[#3f2275] rounded-xl text-sm text-white placeholder:text-purple-400/50 focus:bg-[#1f123c] focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none leading-relaxed"
                    />

                    {/* Quick Prompts */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[11px] text-purple-300/80 flex items-center gap-1 font-mono">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Quick prompts:
                      </span>
                      {quickPrompts.map((p, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setReviewText(p)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-[#1a0f32] border border-[#3f2275] hover:bg-[#2d1954] text-purple-300 hover:text-white transition-colors text-left truncate max-w-[260px] cursor-pointer"
                        >
                          "{p}"
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button (Solid Gold) */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !authorName.trim() || !reviewText.trim()}
                    className="w-full py-4 bg-[#d4af37] hover:bg-amber-400 text-zinc-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
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

            {/* Live Response Feed Stream Header */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Live Responses</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Realtime Sync
                  </span>
                </div>

                {/* Category Filters (Solid) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    "ALL",
                    "Sunday Gathering",
                    "4T Transformation",
                    "Fellowship & Community",
                    "General Experience"
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                        activeCategory === cat
                          ? "bg-[#d4af37] text-zinc-950 font-bold shadow-md"
                          : "bg-[#1a0f32] border border-[#3f2275] text-purple-200 hover:text-white hover:bg-[#2d1954]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed Items */}
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {filteredReviews.length === 0 ? (
                    <div className="p-8 bg-[#241544] border border-[#3f2275] rounded-2xl text-center text-purple-300/80 font-light">
                      No reviews submitted in this category yet. Be the first!
                    </div>
                  ) : (
                    filteredReviews.map((rev) => (
                      <motion.div
                        key={rev.id}
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="p-6 bg-[#241544] border border-[#3f2275] hover:border-purple-600/80 shadow-xl rounded-2xl transition-all space-y-3 relative group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#3f2275] border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold font-serif text-base">
                              {rev.authorName.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white">{rev.authorName}</h4>
                                <span className="px-2 py-0.5 rounded bg-[#1a0f32] border border-[#3f2275] text-[10px] font-mono text-purple-300 font-medium">
                                  {rev.role}
                                </span>
                              </div>
                              <span className="text-[11px] text-purple-300/70 font-mono">
                                {rev.createdAt}
                              </span>
                            </div>
                          </div>

                          {/* Star Rating Badge */}
                          <div className="flex items-center gap-1 bg-[#1a0f32] border border-amber-500/30 px-2.5 py-1 rounded-lg">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-mono font-bold text-amber-300">
                              {rev.rating}.0
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-purple-100/90 leading-relaxed font-light">
                          "{rev.reviewText}"
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-[#3f2275] text-xs font-mono">
                          <span className="text-[11px] text-amber-300 font-medium bg-[#1a0f32] px-2 py-0.5 rounded border border-amber-500/30">
                            {rev.category}
                          </span>

                          <button
                            onClick={() => handleLike(rev.id)}
                            className="flex items-center gap-1.5 text-purple-300/80 hover:text-amber-300 transition-colors py-1 px-2.5 rounded-lg hover:bg-[#1a0f32] cursor-pointer"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Helpful ({rev.likes})</span>
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Dark QR Code Card & Analytics (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            {/* Scan QR Code To Review On Mobile Card (Solid Dark Purple variation) */}
            <div className="p-8 bg-[#150a2a] border border-amber-500/40 rounded-3xl shadow-2xl relative overflow-hidden space-y-6 text-white">
              
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
                  className="p-2 rounded-xl bg-[#241544] hover:bg-[#3f2275] text-purple-200 hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  Scan to Review on Mobile
                </h3>
                <p className="text-xs text-purple-300/80 font-light max-w-xs mx-auto">
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241544] border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>www.lifebuildglobal.com.ng/#live-review</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241544] border border-[#3f2275] text-purple-200 text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No App Download Required</span>
                </div>

                <p className="text-[11px] text-purple-300/70 font-mono block">
                  Scanned mobile reviews automatically stream to this live feed in real-time.
                </p>
              </div>
            </div>

            {/* Community Rating Breakdown Analytics Card (Solid Card Variation) */}
            <div className="p-6 bg-[#241544] border border-[#3f2275] rounded-3xl shadow-xl space-y-5 text-white">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Community Satisfaction
                </h4>
                <span className="text-xs font-mono text-purple-300/80 font-medium">{totalReviews} Ratings</span>
              </div>

              {/* Star Progress Bars */}
              <div className="space-y-2.5 font-mono text-xs">
                {[5, 4, 3, 2, 1].map((star, idx) => {
                  const count = ratingCounts[idx];
                  const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-10 text-purple-200 font-medium">
                        <span>{star}</span>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </div>

                      <div className="flex-1 h-2 bg-[#1a0f32] border border-[#3f2275] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#d4af37] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <span className="w-10 text-right text-purple-300/80">{pct}%</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#3f2275] flex items-center justify-between text-xs font-mono text-purple-200">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  100% Verified Lifebuilder Feedback
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Full-Screen Presentation QR Modal */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-[#1a0f32] border border-amber-500/40 rounded-3xl p-8 space-y-6 text-center relative shadow-2xl text-white"
            >
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#241544] hover:bg-[#3f2275] text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#241544] border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider font-bold">
                  Auditorium & Live Stream Presentation QR
                </span>
                <h3 className="text-2xl font-bold text-white">Scan with Mobile Phone</h3>
                <p className="text-xs text-purple-300/80 font-light">
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
                <p className="text-xs font-mono text-amber-300 truncate px-4 py-2 bg-[#241544] rounded-xl border border-[#3f2275] font-bold">
                  {liveUrl}
                </p>

                <button
                  onClick={handleCopyLink}
                  className="w-full py-3 bg-[#d4af37] hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-950" /> : <Share2 className="w-4 h-4 text-zinc-950" />}
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
