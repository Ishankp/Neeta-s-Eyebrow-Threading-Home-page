/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Scissors, 
  Sparkles, 
  Clock, 
  Menu, 
  X,
  ExternalLink,
  ChevronDown,
  Palette,
  Eye,
  Wand2,
  Flame,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  Check,
  Send,
  ThumbsUp,
  Filter,
  MessageSquare,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_SERVICES } from './constants';
import ServicesPage from './pages/ServicesPage';
import AftercarePage from './pages/AftercarePage';
import { FAQS, AFTERCARE_GUIDES } from './data/careData';
import { RatingStars } from './components/RatingStars';
import { getRelativeDateString } from './utils/date';

// Types
interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  timestamp?: number;
}

// Components
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Aftercare', href: '#aftercare' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className={`text-xl font-medium tracking-tight ${isScrolled ? 'text-brand-900' : 'text-white'}`}>
            <span className="font-bold">Neeta's</span> Eyebrow Threading
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium hover:text-brand-500 transition-colors ${
                isScrolled ? 'text-stone-600' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://square.site/book/SKFJHMBQK1YXY/neeta-s-eyebrow-threading-and-beauty-care-winter-garden-fl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/20"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-brand-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-brand-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden border-t border-stone-100"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-stone-800 font-medium py-2 border-b border-stone-50"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://square.site/book/SKFJHMBQK1YXY/neeta-s-eyebrow-threading-and-beauty-care-winter-garden-fl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-600 text-white text-center py-3 rounded-xl font-bold mt-2"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ stats }: { stats: { rating: number; total: number } }) => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=2070" 
          alt="Salon background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-brand-900/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <div className="inline-flex flex-wrap items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl mb-6 shadow-xl border border-white text-stone-900 max-w-full">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-sm font-black text-brand-900">{stats.rating}</span>
              <RatingStars rating={stats.rating} size={14} />
            </div>
            <span className="h-4.5 w-[1px] bg-stone-200 hidden min-[380px]:block"></span>
            <span className="text-xs font-bold text-stone-600 tracking-wide uppercase leading-none">
              {stats.total} Google Reviews
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
            Elegance <br />
            <span className="text-brand-300">Redefined.</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-50 drop-shadow-sm mb-8 max-w-lg leading-relaxed">
            Professional eyebrow threading and holistic beauty treatments at Neeta's. 
            Experience the art of precision and the touch of luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://square.site/book/SKFJHMBQK1YXY/neeta-s-eyebrow-threading-and-beauty-care-winter-garden-fl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group shadow-xl shadow-brand-900/40"
            >
              Book Your Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link 
              to="/services" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-2xl font-bold flex items-center justify-center transition-all"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const SHOWCASE_CATEGORIES = [
  {
    name: "Threading or Waxing",
    description: "Our signature organic hair removal services mapped precisely to define and lift your natural symmetry.",
    highlights: ["Custom Eyebrow Mapping", "Upper Lip, Chin & Sideburns", "Full Face Gentle Care"],
    startingPrice: "From $4",
    linkHash: "Threading or Waxing",
    icon: Scissors,
    colorClass: "text-amber-700 bg-amber-50 border-amber-200"
  },
  {
    name: "Tinting",
    description: "Safe, botanical semi-permanent dyes that enrich the depth, volume, and definition of lashes and brows.",
    highlights: ["Eyebrow Deep-Hues", "Eyelash Darkening", "Rich Color for 4-6 Weeks"],
    startingPrice: "From $25",
    linkHash: "Tinting",
    icon: Palette,
    colorClass: "text-purple-700 bg-purple-50 border-purple-200"
  },
  {
    name: "Lamination & Lift",
    description: "Advanced structural solutions that redirect eyebrow fluff and lift lash roots upwards for a bright-eyed gaze.",
    highlights: ["Natural Eyelash Lift Curls", "Feathered Brow Lamination", "Up to 8 Weeks Shape Retention"],
    linkHash: "Lamination and Lift",
    startingPrice: "From $85",
    icon: Wand2,
    colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200"
  },
  {
    name: "Facials",
    description: "Rejuvenating, multi-phase skin therapies using premium steam, exfoliating scrubs, massages, and clarifying masks.",
    highlights: ["Mini 30m Micro-Glow", "Deluxe 60m Skin Massage", "Deep Hydrating Treatments"],
    startingPrice: "From $49",
    linkHash: "Facials",
    icon: Sparkles,
    colorClass: "text-sky-700 bg-sky-50 border-sky-200"
  },
  {
    name: "Permanent Makeup",
    description: "Premium cosmetic shading or soft ombre powder brows for flawless beauty.",
    highlights: ["Soft Ombre Shaded Brows", "Defined Powder Makeup Looks", "Long-lasting 1-3 Years Style"],
    startingPrice: "From $299",
    linkHash: "Permanent Makeup",
    icon: Wand2,
    colorClass: "text-amber-800 bg-amber-50 border-amber-200"
  },
  {
    name: "Eyelash Extension",
    description: "Classic lashes, gorgeous strips, or temporary fillers compiled to elevate your lash volume instantly.",
    highlights: ["Eyelash Extensions Set", "Temporary Strip Application", "Quick 10m Lash Touch-Ups"],
    startingPrice: "From $15",
    linkHash: "Eyelash Extension",
    icon: Eye,
    colorClass: "text-rose-700 bg-rose-50 border-rose-200"
  },
  {
    name: "Body Waxing",
    description: "Smooth, clean body care using premium low-temperature resin wax applied with hygiene and expert technique.",
    highlights: ["Full & Half Leg Options", "Underarms & Arms Care", "Genten Brazilian Sessions"],
    startingPrice: "From $25",
    linkHash: "Body Wax",
    icon: Flame,
    colorClass: "text-stone-700 bg-stone-50 border-stone-200"
  }
];

const Services = () => {
  const navigate = useNavigate();
  return (
    <section id="services" className="py-16 bg-stone-50/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2">
               <Sparkles className="w-4 h-4" /> Treatment Menu
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Explore Our <span className="italic font-serif text-brand-700">Services</span>.
            </h3>
          </div>
          <p className="text-stone-500 max-w-sm mb-2 text-sm">
            Discover our tailored beauty treatments. Tap any category to view full service details, aftercare guides, and exact timing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SHOWCASE_CATEGORIES.map((category, index) => {
            return (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => navigate(`/services#${category.linkHash}`)}
                className="group bg-white p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-stone-150 hover:border-brand-200 transition-all shadow-sm hover:shadow-xl hover:shadow-brand-600/5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Category Details */}
                  <h4 className="text-base md:text-xl font-bold text-stone-900 group-hover:text-brand-800 transition-colors leading-tight mb-2 md:mb-3">
                    {category.name}
                  </h4>
                  <p className="text-[11px] md:text-xs text-stone-500 leading-relaxed mb-4 md:mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Explore Action Link */}
                <div 
                  className="pt-3 md:pt-4 border-t border-stone-50 flex items-center justify-between text-brand-700 font-bold text-[11px] md:text-xs hover:text-brand-800 transition-colors group/link"
                >
                  <span>
                    <span className="hidden sm:inline">View Services Menu</span>
                    <span className="sm:hidden">View Menu</span>
                  </span>
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-stone-50 flex items-center justify-center border border-stone-200 group-hover/link:bg-brand-600 group-hover/link:text-white group-hover/link:border-brand-600 transition-all">
                    <ChevronRight className="w-3 md:w-3.5 h-3 md:h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-600 transition-all shadow-xl hover:-translate-y-1 group"
          >
            See Full Menu & Deals <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Aftercare = () => {
  return (
    <section id="aftercare" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">Post-Treatment</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">After Care Instructions</h3>
        <p className="text-stone-500 max-w-2xl mx-auto mb-8 text-sm">
          Proper aftercare is essential to achieving long-lasting, beautifully defined results. 
          Select one of our popular services below to view step-by-step guidelines.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {AFTERCARE_GUIDES.map((guide) => (
            <Link 
              key={guide.id}
              to={`/aftercare/${guide.id}`}
              className="group bg-stone-50 border border-stone-200 hover:border-brand-300 p-8 rounded-[2rem] transition-all shadow-md hover:shadow-xl hover:-translate-y-1 text-left flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-brand-600 font-bold text-[10px] uppercase tracking-widest block mb-2">{guide.category}</span>
                <h4 className="text-xl font-bold text-stone-900 group-hover:text-brand-700 transition-colors">{guide.title}</h4>
              </div>
              <div className="flex items-center gap-2 text-stone-400 group-hover:text-brand-500 transition-colors text-xs font-bold uppercase tracking-widest mt-6">
                View Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(4.9);
  const [totalReviews, setTotalReviews] = useState(850);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const fetchReviewsData = async () => {
      try {
        const res = await fetch(`/api/reviews?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (active) {
            setReviews(data.reviews || []);
            setRating(data.rating || 4.9);
            setTotalReviews(data.totalReviews || 850);
          }
        }
      } catch (err) {
        console.error('Failed to load reviews from API:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchReviewsData();
    return () => {
      active = false;
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-20 bg-stone-50 relative overflow-hidden">
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-100 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Simple & Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
            <span>Verified Google Reviews</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-medium text-stone-900 mb-4 tracking-tight leading-tight">
            Loved by Our <span className="font-serif italic text-brand-700">Community</span>
          </h2>
          
          <div className="flex items-center justify-center gap-2.5 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-800 text-lg">{rating.toFixed(1)}</span>
              <RatingStars rating={rating} size={15} />
            </div>
            <span className="text-stone-300">|</span>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{totalReviews}+ Google Reviews</span>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative group">
            {/* Scroll Control Buttons (Visible on desktop/hover) */}
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-11 bg-white hover:bg-brand-50 text-stone-800 w-12 h-12 rounded-full border border-stone-200 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden hover:scale-105 active:scale-95"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-6 h-6 text-stone-700" />
            </button>
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-11 bg-white hover:bg-brand-50 text-stone-800 w-12 h-12 rounded-full border border-stone-200 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden hover:scale-105 active:scale-95"
              aria-label="Next Review"
            >
              <ChevronRight className="w-6 h-6 text-stone-700" />
            </button>

            {/* Horizontal Scroll Swiper List */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-4 -mx-4 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {reviews.map((review) => (
                <div 
                  key={review.id}
                  className="flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] bg-white p-8 rounded-3xl border border-stone-200/80 shadow-md snap-center flex flex-col justify-between hover:shadow-xl hover:border-brand-100/40 transition-all duration-300"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Header line */}
                      <div className="flex items-center gap-3.5 mb-4">
                        <img 
                          src={review.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                          alt={review.author} 
                          className="w-11 h-11 rounded-full object-cover border border-stone-100 shadow-sm flex-shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-stone-900 leading-tight">
                            {review.author}
                          </h4>
                          <p className="text-[10px] text-stone-400 mt-0.5">
                            {getRelativeDateString(review.timestamp, review.date)}
                          </p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="mb-4">
                        <RatingStars rating={review.rating} size={11} />
                      </div>

                      {/* Verified Review Text */}
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic line-clamp-5">
                        "{review.comment}"
                      </p>
                    </div>

                    {/* Foot Line */}
                    <div className="mt-6 pt-4 border-t border-stone-100/80 flex items-center justify-between text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 fill-brand-100" />
                        Verified 5-Star Visit
                      </span>
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                        alt="Google" 
                        className="w-3.5 h-3.5 opacity-90"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Swiper Hint Indicators */}
            <div className="flex justify-center gap-1.5 mt-2">
              {reviews.map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full bg-stone-300"
                />
              ))}
            </div>

          </div>
        )}

        {/* View all button */}
        <div className="text-center mt-12 pt-6 border-t border-stone-200/50">
          <a
            href="https://www.google.com/search?q=Neeta%27s+Eyebrow+Threading+and+Beauty+Salon+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-stone-800 font-bold hover:text-brand-600 transition-all py-1.5 border-b-2 border-brand-200 hover:border-brand-500 text-xs sm:text-sm"
          >
            Read all {totalReviews}+ reviews on Google <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

const BookingBanner = () => {
  return (
    <section className="bg-brand-900 py-12 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-brand-800 rounded-full blur-[120px] opacity-20"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Ready to Reveal Your Best Self?</h2>
        <p className="text-brand-100/80 mb-6 text-base">
          Secure your spot today and let Neeta provide you with a beauty experience 
          that leaves you feeling refreshed, confident, and beautiful.
        </p>
        <a 
          href="https://square.site/book/SKFJHMBQK1YXY/neeta-s-eyebrow-threading-and-beauty-care-winter-garden-fl" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-brand-900 px-8 py-4 rounded-xl font-black text-base hover:bg-brand-50 transition-all shadow-2xl hover:scale-105"
        >
          Book via Square <ArrowRight className="w-6 h-6" />
        </a>
        <p className="mt-6 text-brand-300 text-xs font-bold uppercase tracking-widest">
          Walk-ins Welcome!
        </p>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200/80 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-6 flex justify-between items-center text-left gap-6 hover:text-brand-600 transition-colors group"
      >
        <span className="font-bold text-lg md:text-xl text-stone-900 group-hover:text-brand-800 transition-colors leading-snug">
          {question}
        </span>
        <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-500 group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all flex-shrink-0">
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12 text-stone-500 font-medium leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-stone-50/30 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-4 block">Frequently Asked Questions</span>
          <h3 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">Got Questions?</h3>
        </div>

        <div className="bg-white border border-stone-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <div className="divide-y divide-stone-100">
            {FAQS.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">Find Us</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-stone-900 mb-10 tracking-tight">Visit the <span className="italic font-serif text-brand-700">Salon</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center max-w-3xl mx-auto pb-12 border-b border-stone-200">
          <div className="flex flex-col items-center">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Neeta%27s+Eyebrow+Threading+1201+Winter+Garden+Vineland+Rd+Winter+Garden+FL+34787"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-50 group-hover:border-brand-300 transition-colors duration-300">
                <MapPin className="text-brand-600 w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-stone-900 mb-2 group-hover:text-brand-700 transition-colors duration-200">Location</h4>
              <p className="text-stone-500 text-sm leading-relaxed group-hover:text-brand-600 transition-colors duration-200">
                1201 Winter Garden Vineland Rd,<br />Winter Garden, FL 34787
              </p>
            </a>
          </div>
          
          <div className="flex flex-col items-center">
            <a 
              href="tel:4076148138"
              className="group flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-50 group-hover:border-brand-300 transition-colors duration-300">
                <Phone className="text-brand-600 w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-stone-900 mb-2 group-hover:text-brand-700 transition-colors duration-200">Phone</h4>
              <p className="text-stone-500 text-sm leading-relaxed group-hover:text-brand-600 transition-colors duration-200">
                (407) 614-8138
              </p>
            </a>
          </div>
        </div>

        <div className="pt-12 flex justify-center gap-4">
          <a 
            href="https://www.instagram.com/neetaseyebrowthreading/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 transition-colors shadow-sm"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://www.facebook.com/neetaseyebrowthreading/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 transition-colors shadow-sm"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-white pt-20 pb-12 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Logo & Bio Column */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-900/20">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Neeta's <span className="text-brand-400 font-normal">Eyebrow Threading</span>
                </span>
              </div>
              <p className="text-stone-400 text-sm max-w-md mb-8 leading-relaxed font-medium">
                Sleek contours, timeless precision, and luxurious beauty care. We specialize in threading, tinting, and advanced beauty curation designed to elevate your aesthetic with clinical hygiene and meticulous craft.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-xs text-stone-500 tracking-wider font-mono uppercase">
                ESTABLISHED 2012 &bull; WINTER GARDEN, FL
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/neetaseyebrowthreading/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 border border-stone-800 text-stone-400 rounded-xl flex items-center justify-center hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300 hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.facebook.com/neetaseyebrowthreading/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 border border-stone-800 text-stone-400 rounded-xl flex items-center justify-center hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300 hover:-translate-y-0.5"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Details Column */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-400 mb-6 font-mono">Salon Location</h4>
            <div className="space-y-5 text-sm">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Neeta%27s+Eyebrow+Threading+1201+Winter+Garden+Vineland+Rd+Winter+Garden+FL+34787"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 text-stone-400 hover:text-white transition-colors"
              >
                <MapPin className="text-brand-500 w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-stone-300 font-medium">
                  1201 Winter Garden Vineland Rd,<br />
                  Winter Garden, FL 34787
                </span>
              </a>
              <a 
                href="tel:4076148138"
                className="group flex gap-3 text-stone-400 hover:text-white transition-colors items-center"
              >
                <Phone className="text-brand-500 w-4 h-4 shrink-0" />
                <span className="text-stone-300 font-medium">(407) 614-8138</span>
              </a>
              <div className="p-3.5 bg-stone-900/50 border border-stone-800/80 rounded-2xl max-w-[240px] text-center mt-2 animate-pulse-slow">
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-400 block mb-1 font-mono">Service Policy</span>
                <span className="text-[11px] text-stone-400 font-medium leading-normal block">Walk-ins Welcome &bull; Appointments Recommended</span>
              </div>
            </div>
          </div>

          {/* Explore Column */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-400 mb-6 font-mono">Explore</h4>
            <ul className="space-y-3.5 text-sm font-medium text-stone-400">
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Services
                </a>
              </li>
              <li>
                <a href="#aftercare" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Aftercare Guides
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Frequently Asked
                </a>
              </li>
            </ul>
          </div>
          
          {/* Salon Hours Column */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-400 mb-6 font-mono">Salon Hours</h4>
            <ul className="space-y-3 text-xs font-medium text-stone-300 font-mono">
              <li className="flex justify-between pb-2 border-b border-stone-900/80">
                <span className="text-stone-400">Mon - Wed</span>
                <span>10am - 6pm</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-stone-900/80">
                <span className="text-stone-400">Thu - Fri</span>
                <span>10am - 7pm</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-stone-900/80">
                <span className="text-stone-400">Saturday</span>
                <span>10am - 5pm</span>
              </li>
              <li className="flex justify-between pb-1">
                <span className="text-stone-400">Sunday</span>
                <span className="text-brand-400 uppercase tracking-widest font-extrabold text-[10px]">Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Fine Print Bottom Bar */}
        <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} Neeta's Eyebrow Threading. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-stone-500">
            <a href="#" className="hover:text-brand-400 hover:underline transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-400 hover:underline transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function HomePage() {
  const stats = { rating: 4.9, total: 850 };

  return (
    <>
      <Navbar />
      <Hero stats={stats} />
      <Services />
      <BookingBanner />
      <Aftercare />
      <FAQ />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-brand-200 selection:text-brand-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/aftercare/:id" element={<AftercarePage />} />
        </Routes>
      </div>
    </Router>
  );
}
