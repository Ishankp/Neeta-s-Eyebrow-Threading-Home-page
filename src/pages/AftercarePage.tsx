import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, AlertTriangle, Calendar, Heart, ExternalLink, Shield, Sun, FileDown } from 'lucide-react';
import { motion } from 'motion/react';
import { getAftercareById } from '../data/careData';
import { generateAftercarePDF } from '../utils/pdfGenerator';

interface AftercarePageProps {
  title?: string;
  type?: string;
}

export default function AftercarePage({ title: propTitle, type: propType }: AftercarePageProps) {
  const navigate = useNavigate();
  const { id: routeId } = useParams<{ id: string }>();

  // Determine the active ID from props or path parameter
  const activeId = propType || routeId || '';
  const data = getAftercareById(activeId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="text-stone-400 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">Aftercare Guide Not Found</h2>
        <p className="text-stone-500 text-sm mb-6 max-w-sm">
          We couldn't find the aftercare guide you are looking for. It may be under development or moved.
        </p>
        <Link 
          to="/" 
          className="bg-brand-600 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-brand-500 transition-colors"
        >
          Return to Hompage
        </Link>
      </div>
    );
  }

  const title = propTitle || data.title;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-brand-200 selection:text-brand-900">
      {/* Top Header/Navigation */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-stone-200 z-50 py-4 px-6 shadow-sm">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center">
              <Sparkles className="text-white w-3 h-3" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-tight text-brand-900">
              Neeta's Eyebrow Threading
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <section className="bg-white border-b border-stone-200 py-16 px-6">
        <div className="max-w-3xl mx-auto text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-100 px-4 py-1.5 rounded-full inline-block">
                Post-Treatment Guide &bull; {data.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-950 capitalize font-serif italic">
                {title}
              </h1>
              <p className="text-stone-500 text-lg leading-relaxed font-medium">
                {data.description}
              </p>
            </div>
            <div className="shrink-0">
              <button 
                onClick={() => generateAftercarePDF(data, title)}
                className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 duration-200 cursor-pointer"
              >
                <FileDown className="w-5 h-5" /> Download PDF Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Areas */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-12">
          
          {data.id === 'microblading' ? (
            <div className="space-y-12">
              {/* SECTION 1: Day 1-14 After Care */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-stone-200">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <Calendar className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">
                      1. Day 1-14 After Care
                    </h2>
                    <p className="text-[10px] text-brand-600 font-bold tracking-widest uppercase">
                      ACTIVE RECOVERY TIMELINE &bull; PRINCIPLE STEPS
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.timeline.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-stone-50/50 rounded-2xl border border-stone-150 relative overflow-hidden group hover:bg-stone-55 hover:border-brand-250 transition-all duration-300">
                      <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-850 flex items-center justify-center text-xs font-black shrink-0 group-hover:scale-110 transition-all duration-300">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-stone-900 text-sm mb-1">{step.title}</h3>
                        <p className="text-stone-600 text-xs leading-relaxed font-semibold">{step.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* SECTION 2: Things to Avoid */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="bg-red-50/20 border border-red-200/60 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-red-100">
                  <div className="w-10 h-10 rounded-2xl bg-red-100/50 flex items-center justify-center text-red-600 shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-red-950 uppercase tracking-tight">
                      2. Things to Avoid
                    </h2>
                    <p className="text-[10px] text-red-600/90 font-bold tracking-widest uppercase">
                      DO NOT CANCEL RECOVERY PROGRESS &bull; STAGE 1 RESTRICTIONS
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.avoid.map((item, idx) => {
                    const colonIndex = item.indexOf(':');
                    const label = colonIndex !== -1 ? item.substring(0, colonIndex) : '';
                    const text = colonIndex !== -1 ? item.substring(colonIndex + 1) : item;

                    return (
                      <div key={idx} className="flex gap-3 items-start p-4 rounded-xl bg-white/60 border border-red-100 hover:border-red-200 transition-all">
                        <span className="w-5 h-5 rounded-lg bg-red-100 text-red-700 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          ✕
                        </span>
                        <span className="text-stone-700 text-xs leading-relaxed font-semibold">
                          {label ? (
                            <>
                              <strong className="text-red-950 font-extrabold mr-1">{label}:</strong>
                              {text}
                            </>
                          ) : item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* SECTION 3: What to Expect */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-stone-200">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-605 shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">
                      3. What to Expect
                    </h2>
                    <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase">
                      HEALING MATRIX &bull; WEEK-BY-WEEK CYCLES
                    </p>
                  </div>
                </div>

                {/* Expectation Timeline steps */}
                <div className="relative border-l border-amber-100 ml-4 pl-6 md:ml-6 md:pl-8 space-y-8 mb-10">
                  {data.whatToExpect?.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px] font-black text-amber-750 transition-all duration-300 shadow-sm group-hover:scale-110">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-2 border bg-amber-50 text-amber-800 border-amber-200/50">
                          {item.time}
                        </span>
                        <div className="space-y-1.5">
                          {item.bullets.map((bullet, bidx) => (
                            <div key={bidx} className="flex gap-2.5 items-start">
                              <span className="text-amber-500 font-black text-xs shrink-0 mt-0.5">&bull;</span>
                              <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                                {bullet}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-section: Possible Healing Outcomes */}
                {data.healingOutcomes && (
                  <div className="pt-6 border-t border-stone-250">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="w-4 h-4 text-brand-600" />
                      <h4 className="text-sm font-black text-stone-900 uppercase tracking-wider">
                        Possible Healing Outcomes
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {data.healingOutcomes.map((outcome, idx) => {
                        let statusBg = "bg-emerald-50/40 border-emerald-200";
                        let numBg = "bg-emerald-100 text-emerald-800";
                        if (outcome.status === "light") {
                          statusBg = "bg-amber-50/30 border-amber-200";
                          numBg = "bg-amber-100 text-amber-800";
                        } else if (outcome.status === "touchup") {
                          statusBg = "bg-stone-50 border-stone-200";
                          numBg = "bg-stone-200 text-stone-700";
                        }

                        return (
                          <div key={idx} className={`border rounded-2xl p-4 ${statusBg} transition-all duration-300 hover:scale-[1.02]`}>
                            <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${numBg}`}>
                              {outcome.title}
                            </span>
                            <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                              {outcome.details}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* SECTION 4: Long Term Care */}
              {data.longTermCare && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 }}
                  className="bg-brand-50/10 border border-brand-200/60 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-brand-100">
                    <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-700 shrink-0">
                      <Shield className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">
                        4. Long Term Care
                      </h2>
                      <p className="text-[10px] text-brand-600 font-bold tracking-widest uppercase">
                        PREVENT FADING &amp; SECURE PIGMENT LONGEVITY
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.longTermCare.map((item, idx) => (
                      <div key={idx} className="p-5 bg-white border border-brand-100 rounded-2xl hover:border-brand-300 transition-all duration-300 flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-xl bg-brand-100/60 text-brand-750 flex items-center justify-center shrink-0 mt-0.5">
                          {idx === 0 ? <Sun className="w-4 h-4 text-brand-600" /> : <Shield className="w-4 h-4 text-brand-600" />}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-stone-900 text-sm mb-1">{item.title}</h3>
                          <p className="text-stone-600 text-xs leading-relaxed font-semibold">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {/* Chronological Step-by-Step Aftercare Timeline */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-stone-200">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <Calendar className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-stone-900 uppercase tracking-tight">
                      Step-by-Step Instruction Timeline
                    </h2>
                    <p className="text-[10px] text-brand-600 font-bold tracking-widest">
                      CHRONOLOGICAL RECOVERY PROTOCOL &bull; FOLLOW DILIGENTLY
                    </p>
                  </div>
                </div>

                <div className="relative border-l border-stone-200 ml-4 pl-6 md:ml-6 md:pl-8 space-y-10">
                  {data.timeline.map((step, idx) => {
                    const timeLower = step.time.toLowerCase();
                    let badgeStyle = "bg-stone-50 text-stone-600 border-stone-200/50";
                    let numColor = "border-stone-300 text-stone-500 group-hover:border-stone-800 group-hover:text-stone-850";

                    // High priority immediate healing coloring
                    if (
                      timeLower.includes('24') || 
                      timeLower.includes('day 1 -') || 
                      timeLower.includes('day 1-') || 
                      timeLower.includes('days 1-') || 
                      timeLower.includes('days 1 -')
                    ) {
                      badgeStyle = "bg-red-50 text-red-700 border-red-200/60";
                      numColor = "border-red-300 text-red-650 group-hover:border-red-650 group-hover:bg-red-50";
                    } 
                    // Mid sensitivity phase
                    else if (
                      timeLower.includes('48') || 
                      timeLower.includes('day 3') || 
                      timeLower.includes('day 2') ||
                      timeLower.includes('day 3 - 7') ||
                      timeLower.includes('day 3-7')
                    ) {
                      badgeStyle = "bg-amber-50 text-amber-700 border-amber-200/50";
                      numColor = "border-amber-300 text-amber-650 group-hover:border-amber-650 group-hover:bg-amber-50";
                    } 
                    // Maturity or long term care
                    else if (
                      timeLower.includes('ongoing') || 
                      timeLower.includes('long term') || 
                      timeLower.includes('daily') ||
                      timeLower.includes('day 7')
                    ) {
                      badgeStyle = "bg-brand-50 text-brand-700 border-brand-200/50";
                      numColor = "border-brand-300 text-brand-700 group-hover:border-brand-600 group-hover:bg-brand-50";
                    }

                    return (
                      <div key={idx} className="relative group">
                        {/* Circle timeline index marker */}
                        <div className={`absolute -left-[35px] md:-left-[43px] top-1 w-6 h-6 rounded-full bg-white border flex items-center justify-center text-[10px] font-black tracking-tight transition-all duration-300 shadow-sm ${numColor}`}>
                          {idx + 1}
                        </div>

                        <div>
                          <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-2 border ${badgeStyle}`}>
                            {step.time}
                          </span>
                          <h3 className="text-base font-extrabold text-stone-900 mb-1 group-hover:text-brand-600 transition-colors duration-200">
                            {step.title}
                          </h3>
                          <p className="text-stone-500 text-sm leading-relaxed max-w-2xl font-semibold">
                            {step.details}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Important Things to Avoid Section */}
              {data.avoid && data.avoid.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  className="bg-red-50/30 border border-red-200/60 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-red-100">
                    <div className="w-10 h-10 rounded-2xl bg-red-100/50 flex items-center justify-center text-red-600 shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-red-950 uppercase tracking-tight">
                        Strict Guidelines: Things to Avoid
                      </h2>
                      <p className="text-[10px] text-red-700/80 font-bold tracking-widest">
                        DO NOT DISRUPT THE HEALING SKIN OR RECOVERY MATRIX
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.avoid.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-white/40 border border-stone-200/50">
                        <span className="w-5 h-5 rounded-lg bg-red-100 text-red-700 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          ✕
                        </span>
                        <span className="text-stone-700 text-xs leading-relaxed font-semibold">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Possible Healing Outcomes Section - Specific for Microblading or any service that defines it */}
              {data.healingOutcomes && data.healingOutcomes.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 }}
                  className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-stone-200">
                    <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                      <Heart className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-stone-900 uppercase tracking-tight">
                        Possible Healing Outcomes
                      </h2>
                      <p className="text-[10px] text-brand-600 font-bold tracking-widest">
                        WHAT TO EXPECT DURING RECOVERY
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.healingOutcomes.map((outcome, idx) => {
                      let statusBg = "bg-emerald-50/50 border-emerald-200";
                      let numBg = "bg-emerald-100 text-emerald-800";
                      if (outcome.status === "light") {
                        statusBg = "bg-amber-50/40 border-amber-200";
                        numBg = "bg-amber-100 text-amber-800";
                      } else if (outcome.status === "touchup") {
                        statusBg = "bg-stone-50 border-stone-200";
                        numBg = "bg-stone-200 text-stone-700";
                      }

                      return (
                        <div key={idx} className={`border rounded-2xl p-5 ${statusBg} transition-all hover:scale-[1.02] duration-300`}>
                          <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mb-3 ${numBg}`}>
                            {outcome.title}
                          </span>
                          <p className="text-stone-600 text-xs leading-relaxed font-semibold">{outcome.details}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Support Information */}
          <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-transparent to-stone-900/10 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="text-left mb-8 pb-6 border-b border-white/10">
                <h3 className="font-black text-2xl md:text-3xl mb-3 tracking-tight">Your Satisfaction & Comfort is Our Main Goal</h3>
                <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
                  If you have any questions, concerns, or if you notice anything about your skin that doesn't seem to be settling down, please don't hesitate to reach out to us.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Have Questions Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center hover:bg-white/[0.08] transition-all">
                  <a 
                    href="tel:4076148138"
                    className="w-full text-center bg-brand-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-brand-500 transition-colors inline-block"
                  >
                    Call us if any question: (407) 614-8138
                  </a>
                </div>

                {/* Schedule Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center hover:bg-white/[0.08] transition-all">
                  <a 
                    href="https://square.site/book/SKFJHMBQK1YXY/neeta-s-eyebrow-threading-and-beauty-care-winter-garden-fl" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full text-center bg-white text-stone-900 font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-stone-100 transition-colors inline-block"
                  >
                    Book Next Appointment
                  </a>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <button 
                  onClick={() => generateAftercarePDF(data, title)}
                  className="inline-flex items-center gap-2 border border-brand-500 bg-brand-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all hover:bg-brand-500 cursor-pointer"
                >
                  <FileDown className="w-4 h-4" /> Download PDF Guide
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
