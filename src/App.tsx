/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  Mail, 
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
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_SERVICES } from './constants';
import ServicesPage from './pages/ServicesPage';
import AftercarePage from './pages/AftercarePage';
import { FAQS, AFTERCARE_GUIDES } from './data/careData';

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

const Hero = () => {
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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest italic">Top Rated Beauty Salon in the Area</span>
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
                className="group bg-white p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-stone-150 hover:border-brand-200 transition-all shadow-sm hover:shadow-xl hover:shadow-brand-600/5 flex flex-col justify-between"
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
                <Link 
                  to={`/services#${category.linkHash}`}
                  className="pt-3 md:pt-4 border-t border-stone-50 flex items-center justify-between text-brand-700 font-bold text-[11px] md:text-xs hover:text-brand-800 transition-colors group/link"
                >
                  <span>
                    <span className="hidden sm:inline">View Services Menu</span>
                    <span className="sm:hidden">View Menu</span>
                  </span>
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-stone-50 flex items-center justify-center border border-stone-200 group-hover/link:bg-brand-600 group-hover/link:text-white group-hover/link:border-brand-600 transition-all">
                    <ChevronRight className="w-3 md:w-3.5 h-3 md:h-3.5" />
                  </div>
                </Link>
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

const REVIEWS: Review[] = [
    {
      id: 'r1',
      author: 'Sarah Jenkins',
      rating: 5,
      comment: "Neeta is a true artist! I've been getting my eyebrows threaded for years and I've never found anyone as precise and gentle as her. The salon is beautiful and so calming.",
      date: '2 weeks ago',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
      id: 'r2',
      author: 'Michael Chen',
      rating: 5,
      comment: "Great experience every time. The atmosphere is professional yet welcoming. My skin has never looked better after the facial treatments here. Highly recommended!",
      date: '1 month ago',
      avatar: 'https://i.pravatar.cc/150?u=michael'
    },
    {
      id: 'r3',
      author: 'Aria Thompson',
      rating: 5,
      comment: "The only place I trust with my brows! Neeta takes her time and really listens to what you want. The mapping technique she uses is second to none.",
      date: '3 weeks ago',
      avatar: 'https://i.pravatar.cc/150?u=aria'
    },
    {
      id: 'r4',
      author: 'Jessica Miller',
      rating: 5,
      comment: "Super professional and the results are always consistent. I drive 30 minutes just to see Neeta because nobody else gets my shape quite right.",
      date: '1 week ago',
      avatar: 'https://i.pravatar.cc/150?u=jess'
    },
    {
      id: 'r5',
      author: 'David Wilson',
      rating: 5,
      comment: "Brought my daughter here for her first brow threading. Neeta was so patient and explained everything. She's now a customer for life!",
      date: '2 months ago',
      avatar: 'https://i.pravatar.cc/150?u=david'
    },
    {
      id: 'r6',
      author: 'Linda Garcia',
      rating: 5,
      comment: "The facial treatments are pure bliss. I feel like a new person after every visit. The attention to detail is truly remarkable.",
      date: '5 days ago',
      avatar: 'https://i.pravatar.cc/150?u=linda'
    }
  ];

const Reviews = () => {
  const [showAll, setShowAll] = useState(false);
  const [liveReviews, setLiveReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ rating: 4.9, total: 520 });
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          if (data.reviews && data.reviews.length > 0) {
            setLiveReviews(data.reviews);
            setStats({ 
              rating: data.rating || 4.9, 
              total: data.totalReviews || 520 
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const reviewsToDisplay = liveReviews.length > 0 ? liveReviews : REVIEWS;
  const initialReviewsCount = reviewsToDisplay.length;
  // Duplicate reviews 4 times for a very long strip to ensure seamlessness
  const tripleReviews = [...reviewsToDisplay, ...reviewsToDisplay, ...reviewsToDisplay, ...reviewsToDisplay];

  // Logic for seamless infinite scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // One set of reviews width (approximate)
    const singleSetWidth = scrollWidth / 4;

    // If near the end (into the 4th set), jump back to the 2nd set
    if (scrollLeft + clientWidth >= scrollWidth - 100) {
      scrollRef.current.scrollLeft = singleSetWidth;
    }
    // If near the beginning (into the 1st set), jump forward to the 3rd set
    else if (scrollLeft <= 100) {
      scrollRef.current.scrollLeft = singleSetWidth * 2;
    }
  };

  // Initial scroll position to the middle
  useEffect(() => {
    if (scrollRef.current) {
      const singleSetWidth = scrollRef.current.scrollWidth / 4;
      scrollRef.current.scrollLeft = singleSetWidth;
    }
  }, [liveReviews, showAll]);

  return (
    <section id="reviews" className="py-16 bg-stone-100/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-stone-200 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-stone-200 mb-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-stone-900">{stats.rating} / 5.0</span>
            <span className="text-stone-300">|</span>
            <span className="text-xs font-bold text-brand-600 uppercase">{stats.total}+ Google Reviews</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">Loved by Our Community</h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            Real reviews from our Google Business profile, featuring only our 5-star experiences.
          </p>
        </div>

        <div className="relative group">
          {/* Subtle scroll indicators for indications */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-100/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-100/80 to-transparent z-10 pointer-events-none"></div>

          {/* Marquee Container */}
          <div 
            className="flex overflow-x-auto no-scrollbar gap-6 pb-12 snap-x snap-mandatory px-4 -mx-4 scroll-smooth"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {tripleReviews.map((review, index) => (
              <motion.div 
                key={`${review.id}-${index}`} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % initialReviewsCount) * 0.05 }}
                className="flex-shrink-0 w-[75vw] md:w-[400px] bg-white p-8 rounded-[2.5rem] shadow-lg border border-stone-200 snap-center hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src={review.avatar || 'https://i.pravatar.cc/150'} alt={review.author} className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shadow-sm" />
                    <div className="absolute -bottom-1 -right-1 bg-brand-500 text-white p-1 rounded-lg shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900">{review.author}</h5>
                    <p className="text-xs text-stone-400 italic">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm italic leading-relaxed h-[80px] line-clamp-4">
                  "{review.comment}"
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-brand-600 uppercase tracking-widest pt-4 border-t border-stone-50">
                  Verified Google Review
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          {!showAll && reviewsToDisplay.length > 3 && (
            <button 
              onClick={() => setShowAll(true)}
              className="bg-brand-100 text-brand-700 px-8 py-3 rounded-2xl font-bold hover:bg-brand-200 transition-colors flex items-center gap-2 group"
            >
              Load More Reviews <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          )}
          
          <a 
            href="https://www.google.com/search?q=Neeta%27s+Eyebrow+Threading+and+Beauty+Salon+reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-stone-800 font-bold hover:text-brand-600 transition-colors py-2 border-b-2 border-brand-200"
          >
            View all 520+ reviews on Google <ExternalLink className="w-4 h-4" />
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto pb-12 border-b border-stone-200">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="text-brand-600 w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-stone-900 mb-2">Location</h4>
            <p className="text-stone-500 text-sm leading-relaxed">1201 Winter Garden Vineland Rd,<br />Winter Garden, FL 34787</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-center mb-6">
              <Phone className="text-brand-600 w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-stone-900 mb-2">Phone</h4>
            <p className="text-stone-500 text-sm leading-relaxed">(555) 123-4567</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="text-brand-600 w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-stone-900 mb-2">Email</h4>
            <p className="text-stone-500 text-sm leading-relaxed">hello@neetasbeauty.com</p>
          </div>
        </div>

        <div className="pt-12 flex justify-center gap-4">
          <a href="#" className="w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 transition-colors shadow-sm">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 transition-colors shadow-sm">
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Neeta's <span className="text-brand-400">Eyebrow Threading</span></span>
            </div>
            <p className="text-stone-400 max-w-sm mb-6 leading-relaxed">
              We specialize in the timeless art of threading and holistic beauty 
              treatments designed to enhance your natural features without compromise.
            </p>
            <div className="text-sm text-stone-500 font-mono">
              ESTABLISHED 2012 / WINTER GARDEN, FL
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-brand-400 transition-colors">Services</a></li>
              <li><a href="#reviews" className="hover:text-brand-400 transition-colors">Reviews</a></li>
              <li><a href="#aftercare" className="hover:text-brand-400 transition-colors">Aftercare</a></li>
              <li><a href="#faq" className="hover:text-brand-400 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-brand-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Salon Hours</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="flex justify-between"><span>Mon - Wed</span> <span>10am - 6pm</span></li>
              <li className="flex justify-between"><span>Thu - Fri</span> <span>10am - 7pm</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>10pm - 5am</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="text-stone-500 font-bold uppercase tracking-wider">Closed</span></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} Neeta's Eyebrow Threading. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-stone-500">
            <a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
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
