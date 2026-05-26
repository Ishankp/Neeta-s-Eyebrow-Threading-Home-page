/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Clock, CheckCircle2, MoreHorizontal, X, FileText, HelpCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_SERVICES, Service } from '../constants';
import { getFaqsForService, getAftercareForService } from '../data/careData';

type Category = "Threading" | "Tinting" | "Deal Prices" | "Permanent" | "Eyelash Extensions" | "Lamination" | "Facials" | "Body Wax";

const CATEGORIES: Category[] = [
  "Threading",
  "Tinting",
  "Deal Prices",
  "Permanent",
  "Eyelash Extensions",
  "Lamination",
  "Facials",
  "Body Wax"
];

interface ServiceDetail {
  postCare?: {
    title: string;
    path: string;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
}


export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "">("");
  const [selectedService, setSelectedService] = useState<(Service & { details: ServiceDetail }) | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update active category on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id as Category);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    CATEGORIES.forEach((category) => {
      const element = document.getElementById(category);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Sync horizontal scroll of categories bar
  useEffect(() => {
    if (activeCategory && navRef.current) {
      const activeBtn = navRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeCategory]);

  const groupedServices = CATEGORIES.reduce((acc, category) => {
    const services = ALL_SERVICES.filter(s => s.category === category);
    if (services.length > 0) {
      acc[category] = services;
    }
    return acc;
  }, {} as Record<Category, Service[]>);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Account for both navbars
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-brand-200 selection:text-brand-900 pb-20">
      {/* Top Navbar */}
      <nav className="bg-white py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-brand-600 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-brand-900">Neeta's <span className="font-normal text-stone-500">Beauty</span></span>
          </div>
        </div>
      </nav>

      {/* Category Navigation Bar - Fixed below main nav */}
      <div className="bg-white/90 backdrop-blur-md border-b border-stone-100 sticky top-[64px] z-40">
        {/* Scroll Indicators (Fade) */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>
        
        <div 
          className="overflow-x-auto no-scrollbar py-3" 
          ref={navRef}
        >
          <div className="flex gap-2 px-6 min-w-max">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                data-category={category}
                onClick={() => scrollToSection(category)}
                className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20 scale-105' 
                    : 'bg-stone-50 text-stone-400 hover:text-stone-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="py-16 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-stone-900"
          >
            Service <span className="italic font-serif text-brand-700">Menu</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-xl mx-auto text-sm"
          >
            Our complete collection of beauty rituals. Selected categories will highlight as you scroll.
          </motion.p>
        </div>
      </header>

      {/* Services List by Category */}
      <main className="max-w-4xl mx-auto px-6 mt-16">
        {CATEGORIES.map((category) => (
          groupedServices[category] && (
            <section key={category} id={category} className="mb-20 scroll-mt-40">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-bold text-stone-900 tracking-tight uppercase tracking-widest">{category}</h2>
                <div className="h-px bg-stone-200 flex-1"></div>
              </div>
              
              <div className="space-y-1">
                {groupedServices[category].map((service, index) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="group py-6 flex justify-between items-start gap-8 border-b border-stone-50 hover:bg-stone-50/50 px-4 -mx-4 rounded-xl transition-colors relative"
                  >
                    <div className="flex-1 pr-12">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="text-lg font-bold text-stone-800 group-hover:text-brand-700 transition-colors">{service.name}</h3>
                      </div>
                      <p className="text-stone-400 text-sm leading-relaxed max-w-xl">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg font-black text-brand-600 block">{service.price}</span>
                      <div className="text-[10px] font-bold text-stone-300 uppercase tracking-tighter mt-1 mb-8">20m</div>
                    </div>

                    {(() => {
                      const postCare = getAftercareForService(service.id);
                      const faqs = getFaqsForService(service.id);
                      const hasDetails = !!postCare || faqs.length > 0;

                      if (!hasDetails) return null;

                      return (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedService({
                              ...service,
                              details: {
                                postCare: postCare ? {
                                  title: postCare.title,
                                  path: `/aftercare/${postCare.id}`
                                } : undefined,
                                faqs: faqs.map(f => ({ question: f.question, answer: f.answer }))
                              }
                            });
                          }}
                          className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-stone-50 hover:bg-brand-50 border border-stone-200 hover:border-brand-300 flex items-center justify-center text-stone-500 hover:text-brand-600 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                          title="View FAQ & Aftercare Guide"
                        >
                          <MoreHorizontal className="w-5 h-5 pointer-events-none" />
                        </button>
                      );
                    })()}
                  </motion.div>
                ))}
              </div>
            </section>
          )
        ))}

        {/* Global CTA */}
        <div className="mt-20 text-center bg-stone-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
          <h2 className="text-3xl font-bold mb-4 relative z-10">Ready for your visit?</h2>
          <p className="text-stone-400 mb-8 relative z-10 max-w-md mx-auto text-sm">
            Quick online booking available through our Square portal.
          </p>
          <a 
            href="https://square.site/book/SKFJHMBQK1YXY/neeta-s-eyebrow-threading-and-beauty-care-winter-garden-fl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-500 text-white px-8 py-4 rounded-xl font-bold transition-all hover:bg-brand-400 shadow-xl relative z-10"
          >
            Book Appointment
          </a>
        </div>
      </main>

      <footer className="mt-24 py-12 text-center text-stone-300 text-xs">
        &copy; {new Date().getFullYear()} Neeta's Eyebrow Threading & Beauty Salon
      </footer>

      {/* Info Modal / progressive disclosure drawer */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh] z-10"
            >
              {/* Header */}
              <div className="p-8 border-b border-stone-100 relative">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-50 hover:bg-stone-100 text-stone-400 hover:text-stone-900 flex items-center justify-center transition-colors border border-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-md">
                    {selectedService.category} Detail
                  </span>
                </div>
                <h3 className="text-2xl font-black text-stone-950 pr-10">{selectedService.name}</h3>
                <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto space-y-6 flex-1 no-scrollbar">
                {/* Post-Care Document Link */}
                {selectedService.details.postCare && (
                  <div className="bg-brand-50/50 border border-brand-100 rounded-[1.5rem] p-6 flex items-start gap-4">
                    <div className="p-3 bg-brand-600 text-white rounded-xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-1">Post-Care Guide</h4>
                      <p className="text-xs text-stone-600 leading-normal mb-3 font-medium">
                        Proper preparation and post-care ensures perfect long-term results.
                      </p>
                      <Link
                        to={selectedService.details.postCare.path}
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-700 hover:text-brand-900 transition-colors"
                      >
                        View Guide <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {selectedService.details.faqs && selectedService.details.faqs.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-stone-400 flex items-center gap-2 mb-2">
                      <HelpCircle className="w-4 h-4 text-brand-600" /> Related Frequently Asked Questions
                    </h4>
                    <div className="space-y-3">
                      {selectedService.details.faqs.map((faq, i) => (
                        <div key={i} className="bg-stone-50 border border-stone-200/60 rounded-[1.5rem] p-5">
                          <h5 className="font-black text-sm text-stone-950 leading-snug mb-2">{faq.question}</h5>
                          <p className="text-stone-600 text-xs leading-relaxed font-semibold">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Visual context awareness disclaimer to address information overload question */}
                <div className="pt-2 text-center">
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                    ✨ Selected Care Details &bull; Quick Reference ✨
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Investment</span>
                  <span className="text-2xl font-black text-brand-600">{selectedService.price}</span>
                </div>
                <a
                  href="https://square.site/book/SKFJHMBQK1YXY/neeta-s-eyebrow-threading-and-beauty-care-winter-garden-fl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Book Securely
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
