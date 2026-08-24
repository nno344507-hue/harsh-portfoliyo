import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Smartphone, Sparkles, Volume2, Star, CheckCircle2, Quote, Plus, X, Send, Users, Activity, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLIENTS } from '../../data/projectsData';
import { useAudio } from '../../context/AudioContext';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export const AboutSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();

  // Review modal / form state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Reviews starting at 0 (persisting in localStorage if submitted)
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('harsh_editor_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Calculate live average score from actual reviews
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    playClickSound();

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Client',
      company: company.trim() || 'Creative Partner',
      rating: rating,
      comment: comment.trim(),
      date: 'Just now',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80`,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('harsh_editor_reviews', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#38bdf8', '#ffffff', '#10b981'],
    });

    setTimeout(() => {
      setName('');
      setRole('');
      setCompany('');
      setComment('');
      setRating(5);
      setSubmitted(false);
      setIsReviewModalOpen(false);
    }, 2000);
  };

  const capabilities = [
    {
      icon: Video,
      title: 'YouTube & Long-Form',
      desc: 'Engaging video pacing, smooth cuts, B-roll placement, meme/hook timing, and high audience retention editing.',
      accent: '#f59e0b',
    },
    {
      icon: Smartphone,
      title: 'Reels & Shorts',
      desc: 'Dynamic vertical videos, animated subtitles, trending sound sync, fast transitions, and viral hook delivery.',
      accent: '#38bdf8',
    },
    {
      icon: Sparkles,
      title: 'AI Videos & B-Roll',
      desc: 'Generative AI video creation, prompt-to-video scenes, cinematic AI B-roll generation, and AI-assisted visual enhancement.',
      accent: '#a855f7',
    },
    {
      icon: Volume2,
      title: 'Color & Sound Mix',
      desc: 'Clean skin tones, vibrant look enhancement, crystal-clear vocal audio, background music sync, and punchy SFX.',
      accent: '#10b981',
    },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-12 md:px-16 z-10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Manifesto Statement */}
        <div className="mb-16 sm:mb-24 p-6 sm:p-12 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-3 sm:mb-4">
            OUR ETHOS // FRAME & MOTION
          </span>
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.2] max-w-4xl drop-shadow-md">
            We work where storytelling meets motion, blending <span className="text-amber-400 font-extrabold drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)]">sharp editing</span> with <span className="text-cyan-400 font-extrabold drop-shadow-[0_2px_12px_rgba(34,211,238,0.35)]">creative direction</span> to craft visuals that <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-extrabold">feel extraordinary.</span>
          </h2>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={playHoverSound}
                className="p-8 rounded-3xl bg-[#0f0f13]/95 border border-white/15 hover:border-amber-400/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{cap.title}</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">{cap.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Visitor Counter & Interactive Reviews Section (Clean Zero-Start State) */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-[#0f0f13]/95 border border-white/15 backdrop-blur-xl shadow-2xl space-y-10">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-400/20 text-emerald-400 border border-emerald-400/40 font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Audience Analytics</span>
                </span>
                <span className="text-xs font-mono text-zinc-400">Verified System</span>
              </div>
              <h4 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Live Visitor Counter & Client Reviews
              </h4>
            </div>

            {/* Leave a Review Button */}
            <button
              onClick={() => {
                playClickSound();
                setIsReviewModalOpen(true);
              }}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 group flex-shrink-0"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Real-time Visitor & Analytics Counters Grid (Clean Real Initial Values) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Visits Counter */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <span className="text-xs font-mono uppercase font-semibold">Total Portfolio Visits</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-amber-400 font-mono tracking-tight">
                0
              </span>
              <span className="text-[10px] text-zinc-400 font-mono mt-2">Initial Launch</span>
            </div>

            {/* Live Active Online */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <span className="text-xs font-mono uppercase font-semibold">Active Right Now</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono">
                  0
                </span>
                <span className="text-xs text-zinc-400 font-mono">viewers</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono mt-2">Realtime Session</span>
            </div>

            {/* Average Rating Score */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <span className="text-xs font-mono uppercase font-semibold">Average Client Score</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-3xl sm:text-4xl font-bold text-white font-mono">
                  {avgRating}
                </span>
                <span className="text-xs text-zinc-400 font-mono">/ 5.0</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono mt-2">
                {reviews.length === 0 ? 'No Ratings Yet' : `${reviews.length} Verified Rating(s)`}
              </span>
            </div>

            {/* Total Reviews Count */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <span className="text-xs font-mono uppercase font-semibold">Verified Testimonials</span>
                <MessageSquare className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-cyan-400 font-mono">
                {reviews.length}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono mt-2">Client Reviews</span>
            </div>
          </div>

          {/* Testimonials Display Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                <Quote className="w-4 h-4 text-amber-400" />
                <span>Client Feedback & Testimonials ({reviews.length})</span>
              </div>
              <span className="text-xs text-zinc-400 font-mono">Real-Time Client Submission</span>
            </div>

            {reviews.length === 0 ? (
              /* Empty State when 0 reviews exist */
              <div className="p-10 rounded-2xl bg-white/[0.02] border border-dashed border-white/15 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-base font-bold text-white mb-1">No Reviews Published Yet</h5>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Be the first client to work with The Harsh Editor and leave a verified review.
                  </p>
                </div>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black border border-white/20 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write the First Review</span>
                </button>
              </div>
            ) : (
              /* Populated Reviews Grid */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((rev, idx) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onMouseEnter={playHoverSound}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg group"
                  >
                    <div>
                      {/* Rating stars & date */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">{rev.date}</span>
                      </div>
                      {/* Comment */}
                      <p className="text-sm text-zinc-200 leading-relaxed font-normal italic">
                        "{rev.comment}"
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-white">{rev.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                        </div>
                        <span className="text-[11px] text-zinc-400 block font-mono">{rev.role}, {rev.company}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Interactive "Write a Review" Modal */}
        <AnimatePresence>
          {isReviewModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-lg w-full bg-[#111116] border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                    Client Feedback
                  </span>
                  <h3 className="text-2xl font-bold text-white">Write Your Review</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Share your experience working with The Harsh Editor.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-xl font-bold text-white">Thank You for Your Review!</h4>
                    <p className="text-xs text-zinc-300">Your feedback is now live on the website.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {/* Star Rating Picker */}
                    <div>
                      <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-semibold">
                        Your Rating
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-125"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                (hoverRating || rating) >= star
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-zinc-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* Role & Company */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-semibold">
                          Role / Title
                        </label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g. Founder / Producer"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-semibold">
                          Company / Brand
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Studio X"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Review Comment */}
                    <div>
                      <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-semibold">
                        Review / Experience *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about the project, editing quality, turnaround speed..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Publish Review</span>
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trusted By Client Marquee */}
        <div className="relative overflow-hidden py-8 border-y border-white/15 bg-black/40 backdrop-blur-lg rounded-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 text-center mb-6 font-semibold">
            Collaborating with world-class partners
          </div>
          <div className="flex animate-marquee space-x-12">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <span
                key={i}
                className="text-2xl sm:text-3xl font-bold text-zinc-400 hover:text-white transition-colors cursor-default whitespace-nowrap tracking-wider font-mono uppercase"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
