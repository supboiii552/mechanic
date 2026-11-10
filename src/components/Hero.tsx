import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Gauge, Clock, Award, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartQuote: () => void;
  onExploreWeather: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuote,
  onExploreWeather,
  onExploreServices
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Proposition & Action */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              {/* Clean Unboxed Metadata Kicker */}
              <div className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400 mb-4 tracking-wide uppercase">
                <span>ASE Master Certified Technicians</span>
                <span aria-hidden="true">·</span>
                <span>Dealer-Level Diagnostics</span>
                <span aria-hidden="true">·</span>
                <span>OEM Spec Warranty</span>
              </div>

              {/* Headline with text-wrap: balance */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.15] mb-6 [text-wrap:balance]">
                Precision Mechanical Care & Digital Diagnostics for Discerning Drivers.
              </h1>

              {/* Concrete Value Proposition */}
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 max-w-xl">
                We combine aerospace-grade diagnostic telemetry with master mechanical craftsmanship. Get upfront itemized quotes, real-time weather-driven maintenance advisories, and a 24-month warranty on every repair.
              </p>

              {/* Primary Single-Line CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <button
                  onClick={onStartQuote}
                  className="px-6 py-3 text-sm font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <span>Calculate Instant Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreWeather}
                  className="px-5 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Live Weather Advisory
                </button>
              </div>
            </div>

            {/* Quiet Trust Markers */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>24-Month / 24,000-Mile Nationwide Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>Zero Hidden Fees or Surprise Invoices</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 min-h-[340px] lg:min-h-[460px] flex items-stretch">
            {!imageError ? (
              <img
                src="/src/assets/images/hero_workshop_bay_1794316443876.jpg"
                alt="Apex Precision Auto Care ultra-modern repair atelier with hydraulic vehicle lifts"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 text-neutral-300">
                <Gauge className="w-12 h-12 text-amber-500 mb-3" />
                <span className="font-semibold text-lg text-white">Apex Precision Facility</span>
                <span className="text-xs text-neutral-400 mt-1">State-of-the-art diagnostic bays</span>
              </div>
            )}

            {/* Ambient Scrim & Overlay Spec Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-neutral-950/75 border border-neutral-800/80 text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Facility Live Bay Status</p>
                <p className="text-sm font-medium text-neutral-100">4 of 6 Service Bays Operating · 2 Rapid Slots Open Today</p>
              </div>
              <button
                onClick={onStartQuote}
                className="text-xs font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
              >
                Claim Slot
              </button>
            </div>
          </div>

        </div>

        {/* 4-Column KPI Trust Strip below hero split */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/60">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Master Techs</span>
            </div>
            <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50">100%</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">ASE certified master mechanics</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/60">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Diagnostic Speed</span>
            </div>
            <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50">45 Min</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Average digital scan turnaround</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/60">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Warranty</span>
            </div>
            <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50">24 Mo / 24K</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Parts and labor guaranteed</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/60">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Gauge className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Customer Rating</span>
            </div>
            <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50">4.96 / 5.0</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Across 1,240+ verified repairs</p>
          </div>
        </div>

      </div>
    </section>
  );
};
