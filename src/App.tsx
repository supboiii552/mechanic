import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { ServicesBento } from './components/ServicesBento';
import { BookingQuoteEngine } from './components/BookingQuoteEngine';
import { DiagnosticSymptomsFAQ } from './components/DiagnosticSymptomsFAQ';
import { CommunityQA } from './components/CommunityQA';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { BookingAppointment } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeAppointmentsCount, setActiveAppointmentsCount] = useState<number>(0);

  // Sync dark class on documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Read saved appointments count
  useEffect(() => {
    try {
      const saved = localStorage.getItem('apex_auto_appointments');
      if (saved) {
        const parsed = JSON.parse(saved);
        setActiveAppointmentsCount(parsed.length);
      }
    } catch (e) {
      console.warn('Could not read appointments from localStorage', e);
    }
  }, []);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    handleNavigate('booking');
    addToast('info', 'Service Added to Quote', 'Your selected service is now included in the estimate.');
  };

  const handleAppointmentCreated = (appt: BookingAppointment) => {
    setActiveAppointmentsCount((prev) => prev + 1);
    addToast('success', `Appointment Confirmed (#${appt.id})`, `Dedicated bay slot locked in for ${appt.date} at ${appt.timeSlot}.`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-amber-500 selection:text-black">
      
      {/* Top Bar Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleNavigate('booking')}
        activeAppointmentsCount={activeAppointmentsCount}
      />

      {/* Main Content Container */}
      <main>
        {/* Hero Section */}
        <Hero
          onStartQuote={() => handleNavigate('booking')}
          onExploreWeather={() => handleNavigate('weather')}
          onExploreServices={() => handleNavigate('services')}
        />

        {/* Live Open-Meteo Weather Advisory Engine */}
        <WeatherAdvisory
          onPreselectService={handleSelectServiceForBooking}
        />

        {/* Services & Diagnostics Bento Grid */}
        <ServicesBento
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Interactive Multi-Step Booking & Instant Quote Calculator */}
        <BookingQuoteEngine
          preselectedServiceId={preselectedServiceId}
          onClearPreselectedService={() => setPreselectedServiceId(null)}
          onAppointmentCreated={handleAppointmentCreated}
        />

        {/* Master Tech Diagnostic Field Guide / Accordion */}
        <DiagnosticSymptomsFAQ
          onSelectService={handleSelectServiceForBooking}
        />

        {/* JSONPlaceholder Master Tech Case Records & Community Q&A */}
        <CommunityQA />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
