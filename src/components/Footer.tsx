import React from 'react';
import { Wrench, Phone, MapPin, Clock, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-base font-bold tracking-tight">
                APEX AUTO CARE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Full-service mechanical repair, precision diagnostics, and weather-driven automotive health monitoring.
            </p>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-mono">
              ASE Master Certified · Bosch Service Partner
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Services & Diagnostics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('weather')}
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Weather Advisory Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Quote Calculator & Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('symptoms')}
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Diagnostic Field Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('community')}
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Master Tech Case Logs
                </button>
              </li>
            </ul>
          </div>

          {/* Facility Location & Hours */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              Facility Hours & Location
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>1420 Precision Way, Performance District, Suite 100</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p>Monday – Friday: 7:00 AM – 6:30 PM</p>
                  <p>Saturday: 8:00 AM – 3:00 PM</p>
                  <p className="text-neutral-400">Sunday: Closed for Track Testing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Warranty */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              Direct Service Desk
            </h4>
            <div className="space-y-2 text-xs mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="font-mono">(555) 438-2739</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>service@apexautocare.com</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500">
              <div className="flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>24-Month / 24,000-Mile Warranty</span>
              </div>
              <span>Covered on all installed OEM components and mechanical labor nationwide.</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Apex Precision Auto Care LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">Warranty Terms</span>
            <span>·</span>
            <span className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">EPA Disposal Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
