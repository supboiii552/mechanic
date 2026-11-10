import React, { useState } from 'react';
import { 
  ChevronDown, 
  AlertTriangle, 
  ShieldAlert, 
  HelpCircle, 
  Wrench, 
  ArrowRight,
  Disc,
  Zap,
  Activity
} from 'lucide-react';
import { DIAGNOSTIC_SYMPTOMS_FAQ } from '../data/services';

interface DiagnosticSymptomsFAQProps {
  onSelectService: (serviceId: string) => void;
}

export const DiagnosticSymptomsFAQ: React.FC<DiagnosticSymptomsFAQProps> = ({ onSelectService }) => {
  const [openId, setOpenId] = useState<string>('check-engine-light');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  const getUrgencyBadge = (urgency: string) => {
    if (urgency.toLowerCase().includes('critical') || urgency.toLowerCase().includes('high')) {
      return (
        <span className="text-[11px] font-semibold font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
          {urgency.toUpperCase()} ATTENTION
        </span>
      );
    }
    return (
      <span className="text-[11px] font-semibold font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
        {urgency.toUpperCase()} ATTENTION
      </span>
    );
  };

  return (
    <section id="symptoms" className="py-16 lg:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <Activity className="w-4 h-4" />
            <span>Master Tech Diagnostic Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 [text-wrap:balance]">
            Vehicle Symptoms & Diagnostic Field Guide
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Decode warning lights, unusual sounds, and vibrational harmonics before they result in secondary component damage.
          </p>
        </div>

        {/* Radix / Shadcn Style Accordion System */}
        <div className="space-y-3">
          {DIAGNOSTIC_SYMPTOMS_FAQ.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-sm'
                    : 'bg-white/60 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-wide">
                      {item.system}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {item.symptom}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {getUrgencyBadge(item.urgency)}
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-neutral-100 dark:border-neutral-800/80 animate-in fade-in-50 duration-200">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                      {item.explanation}
                    </p>

                    <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-2.5">
                        <Wrench className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 block">
                            Recommended Action:
                          </span>
                          <span className="text-xs text-neutral-600 dark:text-neutral-400">
                            {item.actionRequired}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectService(
                          item.id === 'check-engine-light' ? 'comp-diag' :
                          item.id === 'brake-squeal-grind' ? 'brake-system' :
                          item.id === 'steering-vibration' ? 'suspension-align' :
                          item.id === 'slow-crank-cold' ? 'battery-charging' : 'comp-diag'
                        )}
                        className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                      >
                        <span>Estimate Repair</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
