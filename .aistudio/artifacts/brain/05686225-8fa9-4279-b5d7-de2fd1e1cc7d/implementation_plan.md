# Apex Precision Auto Care — Full-Service Mechanical & Diagnostics

A high-performance, precision-engineered web application for a premier full-service automotive repair, maintenance, and computer diagnostics center. The platform pairs a sleek, automotive-grade aesthetic (inspired by shadcn/ui clean typography, Radix functional primitives, and UIverse tactile micro-interactions) with real-time live data integrations from Open-Meteo and JSONPlaceholder.

### User Review & Critical Decisions

> [!IMPORTANT]
> The core requirements and user preferences confirmed in Phase 1 have been directly woven into the architectural blueprint:

- **Confirmed Shop Specialty**: Full-service mechanical repair, maintenance, and diagnostics (engine, transmission, electrical, suspension, brakes, computerized OBD-II scans).
- **Confirmed Weather Integration**: Live Open-Meteo API connection providing seasonal tire pressure, wiper blade degradation, and battery cranking health advisories based on local temperatures and freeze cycles.
- **Confirmed Primary Feature**: Interactive multi-step appointment booking engine with an instant dynamic quote calculator and real-time bay scheduling.
- **Additional Design Directives**: Modern shadcn/Radix-grade components (accessible modals, accordions, segmented controls, toast system) with UIverse-inspired tactile buttons, ambient card glows, and dark/light dual-theme support.

---

### 1. Overview & Core Concept

**Apex Precision Auto Care** delivers an uncompromising digital experience for vehicle owners seeking transparent, high-standard mechanical care. The platform bridges the gap between mechanical engineering rigor and modern software design:

- **What It Does**: Provides live vehicle diagnostic estimates, transparent parts/labor quote breakdowns, automated weather-based vehicle preventative maintenance advisories, authenticated-style technician logs and community Q&A, and interactive bay appointment scheduling.
- **Target Audience**: Car owners, fleet managers, and performance enthusiasts looking for reliable, high-end diagnostics and certified mechanics without typical garage opacity.
- **Key Value**: Instant clarity on repair costs, proactive weather-driven maintenance alerts before breakdowns occur, and friction-free online booking.

---

### 2. User Experience & Visual Design

#### Visual Identity & Theme
- **Aesthetic Direction**: High-precision engineering & automotive atelier. Sleek, confident slate/carbon backdrop with laser-cut hairline borders, subtle metallic highlights, and electric amber/cobalt accents (`#F59E0B` / `#2563EB`).
- **Typography**: 
  - Display/Headings: `Plus Jakarta Sans` with tight tracking (`tracking-tight`) and balanced headlines.
  - Body: `DM Sans` for clean, high-legibility service descriptions and form inputs.
  - Telemetry & Financials: Monospace tabular numerals (`font-mono tabular-nums`) for quote breakdowns, temperatures, torque/pressure readings, and bay times.
- **Color Discipline (60-30-10)**:
  - *60% Canvas*: Rich obsidian/slate-950 deep canvas (dark mode default) and crisp arctic slate-50 (light mode).
  - *30% Structural*: Slate-900 / white elevated cards with 1px hairline zinc borders (`border-neutral-200 dark:border-neutral-800/80`).
  - *10% Accents*: Industrial amber and high-visibility cobalt reserved for primary booking actions, live weather warnings, and quote totals.
- **Top Bar Contract**:
  - Zone 1: Wordmark `APEX AUTO CARE` (single text element, zero badges).
  - Zone 2: Single-line navigation links (`Services`, `Weather Advisory`, `Quote & Book`, `Diagnostic Q&A`, `Reviews`).
  - Zone 3: Single primary action (`Book Service`).

#### Key User Flows & Interactive Sections

1. **Top Bar & Dynamic Hero**:
   - Hero headline sized `clamp(2.25rem, 4vw, 3.75rem)` paired with an authentic automotive workshop image generated via `generate_image`.
   - Real-time shop bay status badge, warranty guarantee, and 1-click jump to the Instant Quote engine.
2. **Open-Meteo Seasonal Vehicle Health Monitor**:
   - Live weather fetch from `https://api.open-meteo.com/v1/forecast` based on selected city (e.g., Chicago, Denver, Seattle, New York, Austin) or GPS.
   - Algorithms calculate:
     - **Battery Cranking Health**: Cold-crank amperage drop calculation when temps dip below 32°F / 0°C.
     - **Tire Pressure Advisory**: Rule-of-thumb delta (1 PSI loss per 10°F drop) with recommended PSI top-offs.
     - **Wiper & Fluid Degradation**: Rain/snow precipitation flags recommending washer fluid freeze-rating and wiper blade replacements.
3. **Core Mechanical Capabilities (Asymmetric Bento Grid)**:
   - `01. Computer Diagnostics & ECU Scans` (OBD-II, CAN bus, sensor telemetry)
   - `02. Powertrain & Engine Overhauls` (Timing belts, turbochargers, cylinder heads)
   - `03. Precision Brake & Hydraulic Systems` (Rotors, ceramic pads, ABS bleed)
   - `04. Suspension, Steering & Wheel Alignment` (Struts, bushings, 4-wheel laser alignment)
   - `05. Electrical & Hybrid Battery Systems` (Alternators, starters, high-voltage diagnostics)
   - `06. Preventative Climate & Fluid Care` (R134a/R1234yf recharge, transmission flush)
4. **Interactive Multi-Step Booking & Instant Quote Calculator**:
   - **Step 1: Vehicle Profile**: Year, Make, Model, Mileage, Engine Type.
   - **Step 2: Service Selection**: Category filtering, multi-service checkbox selection with live estimated parts and labor costs.
   - **Step 3: Instant Estimate & Schedule**: Transparent itemized quote, bay time duration estimate, date and time slot selector, technician notes.
   - **Step 4: Confirmation & Receipt**: Interactive summary card with booking reference code, calendar export, and localStorage persistence.
5. **Live Customer Feedback & Community Q&A (JSONPlaceholder Integration)**:
   - Fetches live posts and comments from `jsonplaceholder.typicode.com`, mapped into verified vehicle repair work orders, technician responses, and owner reviews.
   - Interactive search and "Ask a Master Tech" question submission form with immediate optimistic response handling.
6. **Transparent Diagnostic Pricing Matrix & FAQ**:
   - Accordion component built with Radix-style state handling for common diagnostic symptoms (e.g. check engine codes, brake squeal, steering pull).

---

### 3. Key Product Decisions & Trade-Offs

- **Real Open-Meteo API Grounding**:
  - *Chosen Approach*: Direct client fetch to Open-Meteo's open, high-frequency hourly and daily weather forecast API without requiring private API keys.
  - *Why*: Instant live data, responsive to city selection, and powers realistic automotive physics calculations (tire pressure, battery CCA loss).
- **JSONPlaceholder API Integration**:
  - *Chosen Approach*: Real `fetch` to JSONPlaceholder endpoints for community questions and service records, merged seamlessly with local state so users can submit real questions and receive simulated master mechanic replies.
  - *Why*: Satisfies API requirement while guaranteeing 100% uptime and realistic data volume without mock fallbacks.
- **Client-authoritative Booking Store (localStorage)**:
  - *Chosen Approach*: In-browser reactive store with local persistence.
  - *Why*: Enables immediate booking flow completion, instant quote editing, and persistent appointment management without waiting on server migrations.
- **Curated Asset Generation (`generate_image`)**:
  - *Chosen Approach*: Parallel batch generation of 3 authentic images (modern high-tech workshop bay, diagnostic technician at work, precision engine bay) using the exact prompt recipes from the `frontend-design` skill.

---

### 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│  (Theme Provider, Global State, Toast Notifications, Active Section)   │
└────────────┬─────────────────────────┬─────────────────────────┬───────┘
             │                         │                         │
             ▼                         ▼                         ▼
┌─────────────────────────┐  ┌─────────────────────┐  ┌──────────────────┐
│        Navbar           │  │   Hero & Bay Strip  │  │  WeatherMonitor  │
│ - Brand Wordmark        │  │ - Headline & Hero   │  │ - Open-Meteo API │
│ - 4 Clean Nav Links     │  │   Visual Asset      │  │ - Battery/Tire/  │
│ - Theme Switcher        │  │ - Trust Metric Strip│  │   Wiper Advisory │
│ - Primary Book CTA      │  │ - Quick Estimator   │  │ - City Selector  │
└─────────────────────────┘  └─────────────────────┘  └──────────────────┘
             │                         │                         │
             ▼                         ▼                         ▼
┌─────────────────────────┐  ┌─────────────────────┐  ┌──────────────────┐
│     ServicesBento       │  │   BookingEngine     │  │  CommunityQA     │
│ - 6 Mechanical Tiers    │  │ - Step 1: Vehicle   │  │ - JSONPlaceholder│
│ - Editorial 01-06 List  │  │ - Step 2: Services  │  │   Feed & Comments│
│ - Dynamic Price Preview │  │ - Step 3: Schedule  │  │ - Search & Filter│
│ - Details Modal         │  │ - Step 4: Receipt   │  │ - Ask Tech Form  │
└─────────────────────────┘  └─────────────────────┘  └──────────────────┘
                                       │
                                       ▼
                             ┌─────────────────────┐
                             │       Footer        │
                             │ - Hours, Loc, Links │
                             │ - Legal & Copyright │
                             └─────────────────────┘
```

#### State & Data Flow
- `weatherState`: `{ city, coords, temp, apparentTemp, precip, windSpeed, weatherCode, advisory: { battery, tires, wipers } }`
- `quoteState`: `{ vehicle: { make, model, year, mileage }, selectedServices: string[], customNotes: string, laborRate: 125 }`
- `appointmentsState`: Stored in `localStorage['apex_appointments']` for booking history.
- `communityPosts`: Live from `https://jsonplaceholder.typicode.com/posts?_limit=6` populated with comments from `jsonplaceholder.typicode.com/comments`.
