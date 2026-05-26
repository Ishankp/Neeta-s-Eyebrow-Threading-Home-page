import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, AlertTriangle, Calendar, Heart } from 'lucide-react';
import { getAftercareById } from '../data/careData';

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
        <div className="max-w-4xl mx-auto flex justify-between items-center">
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
              Neeta's Beauty
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <section className="bg-white border-b border-stone-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-100 px-4 py-1.5 rounded-full inline-block mb-4">
            Post-Treatment Guide &bull; {data.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-950 mb-4 capitalize">
            {title}
          </h1>
          <p className="text-stone-500 text-lg max-w-2xl leading-relaxed">
            {data.description}
          </p>
        </div>
      </section>

      {/* Main Content Areas */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-12">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-stone-200 p-6 rounded-3xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider mb-1">Critical Phase</h3>
                <p className="text-xs text-stone-500">
                  {data.criticalPhase}
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-3xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider mb-1">Expected Results</h3>
                <p className="text-xs text-stone-500">
                  {data.expectedResults}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Structure */}
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-600" /> Step-by-Step Care Guide
            </h2>
            <div className="relative border-l border-stone-200 pl-6 space-y-10 ml-3">
              {data.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Point */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-600 border-4 border-white shadow-sm ring-1 ring-brand-100"></div>
                  
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-md">
                    {step.time}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-2 mb-1">{step.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed max-w-2xl">{step.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Things to Avoid */}
          <div className="bg-red-50/50 border border-red-100 rounded-[2rem] p-8">
            <h2 className="text-lg font-bold text-red-950 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" /> Important Things to Avoid
            </h2>
            <ul className="space-y-3">
              {data.avoid.map((item, idx) => (
                <li key={idx} className="text-stone-700 text-sm flex gap-3 items-start">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Information */}
          <div className="bg-stone-900 text-white rounded-[2rem] p-8 text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/40 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="font-extrabold text-xl mb-2">Have Questions About Healing?</h3>
              <p className="text-stone-300 text-sm mb-6 max-w-md mx-auto">
                If you experience any abnormal redness, severe itching, or persistent swelling, please reach out to us immediately. We're here for you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:5551234567"
                  className="bg-brand-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-500 transition-colors"
                >
                  Call the Salon
                </a>
                <button 
                  onClick={() => navigate('/')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-colors"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
