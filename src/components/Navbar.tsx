import React from 'react';
import { Sun, Moon, Wrench, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  activeAppointmentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  onNavigate,
  onOpenBooking,
  activeAppointmentsCount
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-neutral-950/85 dark:bg-neutral-950/85 bg-white/85 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-left text-neutral-900 dark:text-neutral-50 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            APEX AUTO CARE
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <button
            onClick={() => onNavigate('services')}
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Services & Diagnostics
          </button>
          <button
            onClick={() => onNavigate('weather')}
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            Weather Advisory
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Quote & Booking
          </button>
          <button
            onClick={() => onNavigate('symptoms')}
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Diagnostic Guide
          </button>
          <button
            onClick={() => onNavigate('community')}
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Tech Case Logs
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Book Service</span>
            {activeAppointmentsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-neutral-950 text-amber-400 text-[10px] font-bold flex items-center justify-center">
                {activeAppointmentsCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
