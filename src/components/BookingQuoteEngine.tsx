import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Wrench, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  Printer, 
  Download, 
  ShieldCheck,
  Plus,
  X,
  FileText
} from 'lucide-react';
import { VehicleInfo, BookingAppointment, ServiceCategory, ServiceItem } from '../types';
import { SERVICES_CATALOG, LABOR_RATE_PER_HOUR, POPULAR_VEHICLES } from '../data/services';

interface BookingQuoteEngineProps {
  preselectedServiceId?: string | null;
  onClearPreselectedService?: () => void;
  onAppointmentCreated: (appt: BookingAppointment) => void;
}

const STORAGE_KEY = 'apex_auto_appointments';

export const BookingQuoteEngine: React.FC<BookingQuoteEngineProps> = ({
  preselectedServiceId,
  onClearPreselectedService,
  onAppointmentCreated
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Step 1: Vehicle State
  const [vehicle, setVehicle] = useState<VehicleInfo>({
    year: 2022,
    make: 'BMW',
    model: 'M340i',
    mileage: 45000,
    engineType: 'Turbocharged'
  });

  // Step 2: Services Selected
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['comp-diag']);

  // Step 3: Scheduling & Customer Info
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30 AM');
  const [loanerCarNeeded, setLoanerCarNeeded] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [technicianNotes, setTechnicianNotes] = useState<string>('');

  // Step 4: Confirmed Booking
  const [latestBooking, setLatestBooking] = useState<BookingAppointment | null>(null);
  const [pastBookings, setPastBookings] = useState<BookingAppointment[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  // Handle incoming preselected service from Weather or Services Bento
  useEffect(() => {
    if (preselectedServiceId) {
      if (!selectedServiceIds.includes(preselectedServiceId)) {
        setSelectedServiceIds((prev) => [...prev, preselectedServiceId]);
      }
      setCurrentStep(2);
      if (onClearPreselectedService) onClearPreselectedService();
    }
  }, [preselectedServiceId]);

  // Load past appointments from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPastBookings(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read appointments from localStorage', e);
    }
  }, []);

  const saveAppointmentToLocal = (newAppt: BookingAppointment) => {
    try {
      const updated = [newAppt, ...pastBookings];
      setPastBookings(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not write appointments to localStorage', e);
    }
  };

  const handleCancelAppointment = (id: string) => {
    const updated = pastBookings.filter((b) => b.id !== id);
    setPastBookings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Calculations
  const selectedServices = SERVICES_CATALOG.filter((s) => selectedServiceIds.includes(s.id));
  const partsTotal = selectedServices.reduce((sum, s) => sum + s.partsPrice, 0);
  const totalLaborHours = selectedServices.reduce((sum, s) => sum + s.laborHours, 0);
  const laborTotal = totalLaborHours * LABOR_RATE_PER_HOUR;
  const shopSupplies = selectedServices.length > 0 ? 18.50 : 0;
  const subtotal = partsTotal + laborTotal + shopSupplies;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const grandTotal = Math.round((subtotal + tax) * 100) / 100;

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length === 1) return; // keep at least 1
      setSelectedServiceIds(selectedServiceIds.filter((item) => item !== id));
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const filteredCatalog = activeCategory === 'all' 
    ? SERVICES_CATALOG 
    : SERVICES_CATALOG.filter((s) => s.category === activeCategory);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      alert('Please complete all contact fields.');
      return;
    }

    const bookingId = `APX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: BookingAppointment = {
      id: bookingId,
      customerName,
      customerEmail,
      customerPhone,
      vehicle,
      serviceIds: selectedServiceIds,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes: technicianNotes + (loanerCarNeeded ? ' [Loaner Vehicle Requested]' : ''),
      partsTotal,
      laborTotal,
      tax,
      grandTotal,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setLatestBooking(newAppointment);
    saveAppointmentToLocal(newAppointment);
    onAppointmentCreated(newAppointment);
    setCurrentStep(4);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const timeSlots = [
    '08:00 AM', '09:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'
  ];

  return (
    <section id="booking" className="py-16 lg:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <Wrench className="w-4 h-4" />
              <span>Transparent Service Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 [text-wrap:balance]">
              Instant Quote Calculator & Bay Booking
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Configure your vehicle, select verified mechanical repairs, review exact itemized parts and labor totals, and reserve a dedicated diagnostic bay.
            </p>
          </div>

          {pastBookings.length > 0 && (
            <button
              onClick={() => setShowHistoryModal(true)}
              className="px-4 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-colors cursor-pointer flex items-center gap-2 self-start md:self-auto"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Active Bookings ({pastBookings.length})</span>
            </button>
          )}
        </div>

        {/* Step Indicator Bar */}
        <div className="mb-10 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between max-w-3xl mx-auto">
          {[
            { num: 1, label: 'Vehicle Profile' },
            { num: 2, label: 'Service Selection' },
            { num: 3, label: 'Schedule & Bay' },
            { num: 4, label: 'Quote Receipt' }
          ].map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => {
                  // Only allow clicking back or to current if ready
                  if (step.num < currentStep || (step.num === 2 && vehicle.make) || (step.num === 3 && selectedServiceIds.length > 0)) {
                    setCurrentStep(step.num);
                  }
                }}
                disabled={step.num > currentStep && currentStep !== 4}
                className={`flex-1 py-2 px-2 text-center rounded-lg transition-all text-xs font-medium cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : isCompleted
                    ? 'text-neutral-900 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                    : 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                }`}
              >
                <span className="hidden sm:inline mr-1">{step.num}.</span>
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Wizard Main Content Grid: Left forms, Right sticky quote receipt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Wizard Form Area (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm">
            
            {/* STEP 1: VEHICLE SPECIFICATION */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                    Step 1: Enter Vehicle Specifications
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Accurate year, engine, and mileage calibrate torque specs and parts fitment.
                  </p>
                </div>

                {/* Popular Make Quick Select */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
                    Quick Select Vehicle Make
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_VEHICLES.map((v) => (
                      <button
                        key={v.make}
                        type="button"
                        onClick={() => {
                          setVehicle({
                            ...vehicle,
                            make: v.make,
                            model: v.models[0]
                          });
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          vehicle.make === v.make
                            ? 'bg-amber-500/10 border-amber-500 text-amber-500 font-semibold'
                            : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        {v.make}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Model Year
                    </label>
                    <select
                      value={vehicle.year}
                      onChange={(e) => setVehicle({ ...vehicle, year: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {Array.from({ length: 25 }, (_, i) => 2026 - i).map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Vehicle Make
                    </label>
                    <input
                      type="text"
                      value={vehicle.make}
                      onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                      placeholder="e.g. BMW, Toyota, Porsche"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Model / Trim
                    </label>
                    <input
                      type="text"
                      value={vehicle.model}
                      onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                      placeholder="e.g. M340i, RAV4 Hybrid, 911"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Powertrain Configuration
                    </label>
                    <select
                      value={vehicle.engineType}
                      onChange={(e) => setVehicle({ ...vehicle, engineType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Turbocharged">Turbocharged / Twin-Turbo Gas</option>
                      <option value="Gasoline">Naturally Aspirated Gas</option>
                      <option value="Hybrid">Hybrid / Plug-in Hybrid (PHEV)</option>
                      <option value="Electric">Battery Electric (EV)</option>
                      <option value="Diesel">Turbo Diesel</option>
                    </select>
                  </div>
                </div>

                {/* Mileage Slider & Input */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Odometer Mileage
                    </label>
                    <span className="text-sm font-mono font-bold text-amber-500">
                      {vehicle.mileage.toLocaleString()} miles
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="200000"
                    step="1000"
                    value={vehicle.mileage}
                    onChange={(e) => setVehicle({ ...vehicle, mileage: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-500 mt-1 font-mono">
                    <span>1,000 mi</span>
                    <span>100,000 mi</span>
                    <span>200,000+ mi</span>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Services</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SERVICE SELECTION */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                      Step 2: Select Required Services
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Targeted for your {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.mileage.toLocaleString()} mi)
                    </p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shrink-0">
                    {selectedServiceIds.length} Selected
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg text-xs font-medium">
                  {[
                    { id: 'all', label: 'All Repairs' },
                    { id: 'diagnostics', label: 'Diagnostics' },
                    { id: 'powertrain', label: 'Powertrain' },
                    { id: 'brakes', label: 'Brakes' },
                    { id: 'suspension', label: 'Suspension' },
                    { id: 'electrical', label: 'Electrical' },
                    { id: 'fluids', label: 'Fluids' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                        activeCategory === cat.id
                          ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-sm font-semibold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Services Catalog Checkbox List */}
                <div className="space-y-3">
                  {filteredCatalog.map((service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    const itemTotal = service.partsPrice + service.laborHours * LABOR_RATE_PER_HOUR;
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          isSelected
                            ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/50 shadow-sm'
                            : 'bg-neutral-50/50 dark:bg-neutral-800/30 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // handled by parent div
                            className="mt-1 w-4 h-4 accent-amber-500 rounded cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                {service.title}
                              </h4>
                              {service.recommendedMileageInterval && vehicle.mileage >= service.recommendedMileageInterval && (
                                <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded">
                                  Due by Mileage
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                              <span>Parts: ${service.partsPrice}</span>
                              <span>·</span>
                              <span>Labor: {service.laborHours}h (${service.laborHours * LABOR_RATE_PER_HOUR})</span>
                              <span>·</span>
                              <span>Est. Time: {service.turnaround}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white block">
                            ${itemTotal}
                          </span>
                          <span className="text-[10px] text-emerald-500 font-medium">
                            {service.warrantyMonths} Mo Warranty
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Vehicle</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={selectedServiceIds.length === 0}
                    className="px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Proceed to Bay Scheduling</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SCHEDULING & CONTACT */}
            {currentStep === 3 && (
              <form onSubmit={handleConfirmBooking} className="space-y-6">
                <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                    Step 3: Select Bay Date & Contact Info
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Reserve dedicated bay time and receive real-time technician SMS/email progress updates.
                  </p>
                </div>

                {/* Date & Time Slot Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Service Date
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Arrival Time Slot
                    </label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts} (Bay Slot)</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Customer Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Cole"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 234-5678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Notes and Loaner Car Checkbox */}
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                    Specific Symptoms or Master Tech Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={technicianNotes}
                    onChange={(e) => setTechnicianNotes(e.target.value)}
                    placeholder="e.g. Rattling noise under acceleration near 2500 RPM, intermittent check engine code P0300..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="loaner"
                      checked={loanerCarNeeded}
                      onChange={(e) => setLoanerCarNeeded(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <label htmlFor="loaner" className="text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer">
                      Complimentary Loaner Vehicle / Local Shuttle Service Needed
                    </label>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-500 font-semibold">$0.00</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Services</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lock In Bay & Confirm Quote</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: CONFIRMATION RECEIPT */}
            {currentStep === 4 && latestBooking && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                    Appointment & Quote Confirmed
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    Your bay has been reserved. A copy has been saved to your browser and sent to {latestBooking.customerEmail}.
                  </p>
                  <p className="mt-3 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    BOOKING REFERENCE: {latestBooking.id}
                  </p>
                </div>

                {/* Printable Digital Work Order Receipt */}
                <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700/60 pb-3">
                    <div>
                      <span className="text-xs text-neutral-500 uppercase font-mono">Customer</span>
                      <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{latestBooking.customerName}</p>
                      <p className="text-xs text-neutral-500">{latestBooking.customerPhone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-neutral-500 uppercase font-mono">Assigned Slot</span>
                      <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{latestBooking.date}</p>
                      <p className="text-xs text-amber-500 font-mono font-medium">{latestBooking.timeSlot}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 uppercase font-mono block mb-1">Vehicle On File</span>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {latestBooking.vehicle.year} {latestBooking.vehicle.make} {latestBooking.vehicle.model} ({latestBooking.vehicle.engineType})
                    </p>
                    <p className="text-xs text-neutral-500 font-mono">{latestBooking.vehicle.mileage.toLocaleString()} Recorded Miles</p>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 uppercase font-mono block mb-2">Itemized Services</span>
                    <div className="space-y-1.5">
                      {selectedServices.map((s) => (
                        <div key={s.id} className="flex justify-between text-xs text-neutral-700 dark:text-neutral-300">
                          <span>{s.title}</span>
                          <span className="font-mono">${s.partsPrice + s.laborHours * LABOR_RATE_PER_HOUR}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-neutral-200 dark:border-neutral-700/60 pt-3 space-y-1 text-xs">
                    <div className="flex justify-between text-neutral-500">
                      <span>Parts Subtotal</span>
                      <span className="font-mono">${latestBooking.partsTotal}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Certified Labor Subtotal</span>
                      <span className="font-mono">${latestBooking.laborTotal}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Shop Supplies & Environmental</span>
                      <span className="font-mono">$18.50</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Estimated Sales Tax</span>
                      <span className="font-mono">${latestBooking.tax}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-neutral-900 dark:text-neutral-50 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                      <span>Guaranteed Quote Total</span>
                      <span className="font-mono text-amber-500">${latestBooking.grandTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setLatestBooking(null);
                    }}
                    className="px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 cursor-pointer"
                  >
                    Create Another Estimate
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintReceipt}
                      className="px-4 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-700 rounded-lg hover:bg-neutral-300 cursor-pointer flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Receipt</span>
                    </button>
                    <button
                      onClick={() => setShowHistoryModal(true)}
                      className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg cursor-pointer flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View My Bookings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Sidebar: Real-Time Dynamic Quote & Bay Status (4 cols) */}
          <div className="lg:col-span-4 sticky top-20 rounded-2xl bg-neutral-950 text-white border border-neutral-800 p-6 shadow-xl space-y-6">
            
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                Live Cost Estimator
              </span>
              <h4 className="text-lg font-bold text-neutral-50">
                Itemized Work Order
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            </div>

            {/* Selected Items Roster */}
            <div>
              <span className="text-xs text-neutral-400 uppercase font-mono block mb-2">
                Selected Operations ({selectedServices.length})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex items-start justify-between text-xs py-1.5 border-b border-neutral-800/60">
                    <div className="pr-2">
                      <p className="font-medium text-neutral-200">{service.title}</p>
                      <span className="text-[10px] text-neutral-500 font-mono">{service.turnaround} · {service.laborHours}h labor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-neutral-100">
                        ${service.partsPrice + service.laborHours * LABOR_RATE_PER_HOUR}
                      </span>
                      {selectedServiceIds.length > 1 && (
                        <button
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Calculation Breakdown */}
            <div className="space-y-2 border-t border-neutral-800 pt-4 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Parts & Materials</span>
                <span className="font-mono text-neutral-200">${partsTotal}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Certified Labor ({totalLaborHours.toFixed(1)}h @ $125/h)</span>
                <span className="font-mono text-neutral-200">${laborTotal}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shop Supplies & EPA Disposal</span>
                <span className="font-mono text-neutral-200">${shopSupplies}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Est. Sales Tax (7%)</span>
                <span className="font-mono text-neutral-200">${tax}</span>
              </div>

              {/* Total Callout */}
              <div className="pt-3 border-t border-neutral-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-mono text-amber-400 block font-semibold">Total Estimate</span>
                  <span className="text-[10px] text-neutral-400">24-Mo Guarantee Included</span>
                </div>
                <span className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
                  ${grandTotal}
                </span>
              </div>
            </div>

            {/* Bay Service Guarantee */}
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No work begins until you inspect and approve our digital teardown report.</span>
            </div>

            {/* Quick Action when on Step 1 or 2 */}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <span>Continue to {currentStep === 1 ? 'Services' : 'Schedule'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>

        {/* Modal: View Active & Past Stored Bookings */}
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
              
              <button
                onClick={() => setShowHistoryModal(false)}
                className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                    Your Saved Bookings & Quotes
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Stored securely in your browser cache.
                  </p>
                </div>
              </div>

              {pastBookings.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">
                  <Car className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
                  <p className="text-sm font-medium">No appointments booked yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pastBookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-amber-500">{b.id}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold uppercase">
                            {b.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                          {b.vehicle.year} {b.vehicle.make} {b.vehicle.model}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          Date: {b.date} · {b.timeSlot} · Customer: {b.customerName}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1 font-mono">
                          {b.serviceIds.length} service(s) requested
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-200 dark:border-neutral-700">
                        <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                          ${b.grandTotal}
                        </span>
                        <button
                          onClick={() => handleCancelAppointment(b.id)}
                          className="text-xs text-rose-500 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel Booking</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-4 py-2 text-xs font-medium bg-neutral-200 dark:bg-neutral-800 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer text-neutral-800 dark:text-neutral-200"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
