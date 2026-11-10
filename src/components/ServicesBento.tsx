import React, { useState } from 'react';
import { 
  Cpu, 
  Disc, 
  Zap, 
  Maximize2, 
  BatteryCharging, 
  Droplet, 
  Settings, 
  Wind,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  X,
  Plus
} from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES_CATALOG, LABOR_RATE_PER_HOUR } from '../data/services';

interface ServicesBentoProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectServiceForBooking }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Disc': return <Disc className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Maximize2': return <Maximize2 className="w-5 h-5" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5" />;
      case 'Droplet': return <Droplet className="w-5 h-5" />;
      case 'Settings': return <Settings className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <span>Specialized Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Zero Guesswork Diagnostics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 [text-wrap:balance]">
            Full-Service Mechanical Repair & Factory Calibration
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
            Every repair follows strict manufacturer tolerances. We pair high-resolution digital telemetry with certified mechanical precision, backed by our 24-month nationwide warranty.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Diagnostic Feature Card with Technician Photo (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm card-glow-hover flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-12 h-full">
              
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amber-500 tracking-wider">
                      01. DIAGNOSTICS & ECU SCANS
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      Turnaround: 45 mins
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                    {SERVICES_CATALOG[0].title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                    {SERVICES_CATALOG[0].description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {SERVICES_CATALOG[0].diagnosticSteps.slice(0, 3).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Diagnostic Fee</span>
                    <span className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-50">
                      ${SERVICES_CATALOG[0].laborHours * LABOR_RATE_PER_HOUR}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalService(SERVICES_CATALOG[0])}
                      className="px-3.5 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect Checklist
                    </button>
                    <button
                      onClick={() => onSelectServiceForBooking(SERVICES_CATALOG[0].id)}
                      className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Quote</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Photo Column */}
              <div className="md:col-span-5 relative min-h-[240px] md:min-h-full bg-neutral-950">
                <img
                  src="/src/assets/images/technician_diagnostic_1794316446401.jpg"
                  alt="ASE Certified master diagnostic technician testing engine computer data"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 text-[11px] font-mono text-neutral-300">
                  OBD-II Oscilloscope Telemetry
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Brakes */}
          <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm card-glow-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-500 tracking-wider">
                  02. HYDRAULIC & BRAKES
                </span>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  {getServiceIcon('Disc')}
                </div>
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                {SERVICES_CATALOG[1].title}
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {SERVICES_CATALOG[1].description}
              </p>

              <div className="space-y-1.5 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Turnaround: {SERVICES_CATALOG[1].turnaround}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Warranty: {SERVICES_CATALOG[1].warrantyMonths} Months Parts & Labor</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Parts + Labor</span>
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-neutral-50">
                  ${SERVICES_CATALOG[1].partsPrice + SERVICES_CATALOG[1].laborHours * LABOR_RATE_PER_HOUR}
                </span>
              </div>
              <button
                onClick={() => onSelectServiceForBooking(SERVICES_CATALOG[1].id)}
                className="px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Select</span>
              </button>
            </div>
          </div>

          {/* Card 3: Powertrain & Engine Bay (Card with High-Performance Engine Photo) */}
          <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm card-glow-hover flex flex-col justify-between">
            <div className="relative h-44 bg-neutral-950 overflow-hidden">
              <img
                src="/src/assets/images/precision_engine_bay_1794316445997.jpg"
                alt="Precision high-performance vehicle engine bay overhaul"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-mono font-bold text-amber-400">
                  03. POWERTRAIN PRECISION
                </span>
                <span className="text-[11px] font-mono text-neutral-300">
                  OEM Timing & Intake
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                  {SERVICES_CATALOG[2].title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  {SERVICES_CATALOG[2].description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Total Est.</span>
                  <span className="text-lg font-bold font-mono text-neutral-900 dark:text-neutral-50">
                    ${SERVICES_CATALOG[2].partsPrice + SERVICES_CATALOG[2].laborHours * LABOR_RATE_PER_HOUR}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalService(SERVICES_CATALOG[2])}
                    className="p-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                    title="View details"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onSelectServiceForBooking(SERVICES_CATALOG[2].id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Select</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Laser Alignment & Suspension */}
          <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm card-glow-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-500 tracking-wider">
                  04. CHASSIS & GEOMETRY
                </span>
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                  {getServiceIcon('Maximize2')}
                </div>
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                {SERVICES_CATALOG[3].title}
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {SERVICES_CATALOG[3].description}
              </p>

              <div className="space-y-1.5 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Turnaround: {SERVICES_CATALOG[3].turnaround}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>High-resolution laser target alignment</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Calibration Fee</span>
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-neutral-50">
                  ${SERVICES_CATALOG[3].partsPrice + SERVICES_CATALOG[3].laborHours * LABOR_RATE_PER_HOUR}
                </span>
              </div>
              <button
                onClick={() => onSelectServiceForBooking(SERVICES_CATALOG[3].id)}
                className="px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Select</span>
              </button>
            </div>
          </div>

          {/* Card 5: Heavy-Duty AGM Battery & Electrical */}
          <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm card-glow-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-500 tracking-wider">
                  05. ELECTRICAL & CHARGING
                </span>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  {getServiceIcon('BatteryCharging')}
                </div>
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                {SERVICES_CATALOG[4].title}
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {SERVICES_CATALOG[4].description}
              </p>

              <div className="space-y-1.5 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Turnaround: {SERVICES_CATALOG[4].turnaround}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>36-Month Free Replacement Battery Warranty</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Complete AGM Service</span>
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-neutral-50">
                  ${SERVICES_CATALOG[4].partsPrice + SERVICES_CATALOG[4].laborHours * LABOR_RATE_PER_HOUR}
                </span>
              </div>
              <button
                onClick={() => onSelectServiceForBooking(SERVICES_CATALOG[4].id)}
                className="px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Select</span>
              </button>
            </div>
          </div>

          {/* Card 6: Fluids & Maintenance */}
          <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm card-glow-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-500 tracking-wider">
                  06. SYNTHETIC FLUIDS & FILTER
                </span>
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                  {getServiceIcon('Droplet')}
                </div>
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                {SERVICES_CATALOG[5].title}
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {SERVICES_CATALOG[5].description}
              </p>

              <div className="space-y-1.5 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Turnaround: {SERVICES_CATALOG[5].turnaround}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>API-SP Synthetic & OEM Filter Included</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Package Price</span>
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-neutral-50">
                  ${SERVICES_CATALOG[5].partsPrice + SERVICES_CATALOG[5].laborHours * LABOR_RATE_PER_HOUR}
                </span>
              </div>
              <button
                onClick={() => onSelectServiceForBooking(SERVICES_CATALOG[5].id)}
                className="px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Select</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal for Service Checklist Inspection */}
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl relative">
              
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {getServiceIcon(activeModalService.iconName)}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                    Factory Specification Protocol
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                    {activeModalService.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                {activeModalService.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  Diagnostic & Repair Procedure Steps
                </h4>
                <div className="space-y-2.5">
                  {activeModalService.diagnosticSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-normal">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 mb-6 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block">Parts Cost</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    ${activeModalService.partsPrice}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block">Labor ({activeModalService.laborHours}h)</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    ${activeModalService.laborHours * LABOR_RATE_PER_HOUR}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block">Turnaround</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {activeModalService.turnaround}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="flex-1 py-2.5 px-4 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  Close Inspection
                </button>
                <button
                  onClick={() => {
                    onSelectServiceForBooking(activeModalService.id);
                    setActiveModalService(null);
                  }}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Booking Quote</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
