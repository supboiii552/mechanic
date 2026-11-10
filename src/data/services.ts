import { ServiceItem } from '../types';

export const LABOR_RATE_PER_HOUR = 125;

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'comp-diag',
    title: 'Comprehensive OBD-II & ECU Scan',
    category: 'diagnostics',
    description: 'Deep digital scan of engine control modules, CAN-bus networks, live sensor telemetry, and pinpoint trouble code isolation.',
    partsPrice: 0,
    laborHours: 1.0,
    warrantyMonths: 12,
    turnaround: '45 mins',
    iconName: 'Cpu',
    diagnosticSteps: [
      'Bidirectional ECU health and error code scan',
      'Live fuel trim and oxygen sensor waveform inspection',
      'Ignition timing and cylinder misfire counters check',
      'Digital diagnostic test report with master technician findings'
    ]
  },
  {
    id: 'brake-system',
    title: 'Ceramic Brake Pad & Rotor Replacement',
    category: 'brakes',
    description: 'Full axle brake service using low-dust ceramic pads, OEM vented rotors, caliper slide pin lubrication, and rotor runout calibration.',
    partsPrice: 195,
    laborHours: 1.8,
    warrantyMonths: 24,
    turnaround: '2.5 hrs',
    recommendedMileageInterval: 35000,
    iconName: 'Disc',
    diagnosticSteps: [
      'Digital micrometer measurement of rotor thickness and runout',
      'Inspection of hydraulic lines, banjo fittings, and bleeder valves',
      'Ceramic pad bedding and anti-squeal hardware replacement',
      'High-pressure ABS hydraulic system bleed'
    ]
  },
  {
    id: 'engine-tune',
    title: 'Engine Ignition & Spark Tune-Up',
    category: 'powertrain',
    description: 'Iridium spark plug replacement, ignition coil resistance testing, throttle body cleaning, and intake leak smoke test.',
    partsPrice: 130,
    laborHours: 1.5,
    warrantyMonths: 24,
    turnaround: '2 hrs',
    recommendedMileageInterval: 60000,
    iconName: 'Zap',
    diagnosticSteps: [
      'Resistance testing across all primary and secondary ignition coils',
      'Torque-spec installation of laser-welded iridium spark plugs',
      'Ultrasonic electronic throttle body carbon cleansing',
      'Fuel injector duty cycle and spray pattern calibration'
    ]
  },
  {
    id: 'suspension-align',
    title: '4-Wheel Laser Alignment & Strut Check',
    category: 'suspension',
    description: 'Computerized laser alignment of camber, caster, and toe to factory specs, plus ball joint and control arm bushing load test.',
    partsPrice: 40,
    laborHours: 1.2,
    warrantyMonths: 12,
    turnaround: '1.5 hrs',
    recommendedMileageInterval: 15000,
    iconName: 'Maximize2',
    diagnosticSteps: [
      'High-resolution multi-camera laser reflector wheel mounting',
      'Independent subframe and steering rack centering verification',
      'Camber, caster, and thrust angle fine-adjustment',
      'Before & After alignment geometry printout'
    ]
  },
  {
    id: 'battery-charging',
    title: 'Heavy-Duty AGM Battery & Alternator Service',
    category: 'electrical',
    description: 'Cold-crank load testing, parasitic drain amp probe, alternator ripple voltage check, and terminal corrosion sealing.',
    partsPrice: 220,
    laborHours: 0.8,
    warrantyMonths: 36,
    turnaround: '1 hr',
    iconName: 'BatteryCharging',
    diagnosticSteps: [
      'Conductance load test simulating cold winter engine start',
      'Alternator diode ripple voltage and charging current measurement',
      'Parasitic dark-current drain testing (< 50mA benchmark)',
      'Anti-corrosion terminal treatment and ECU memory retention preservation'
    ]
  },
  {
    id: 'fluid-flush',
    title: 'Full Synthetic Fluid & Filter Exchange',
    category: 'fluids',
    description: 'High-grade full synthetic engine oil, OEM filter, transmission fluid exchange, and glycol coolant refractometer check.',
    partsPrice: 85,
    laborHours: 0.7,
    warrantyMonths: 6,
    turnaround: '45 mins',
    recommendedMileageInterval: 7500,
    iconName: 'Droplet',
    diagnosticSteps: [
      'Refractometer freeze-point and boiling-point coolant evaluation',
      'Full synthetic API-SP rated motor oil refill',
      'Magnetic drain plug inspection for metallic wear debris',
      '21-point multi-system fluid inspection checklist'
    ]
  },
  {
    id: 'timing-belt',
    title: 'Timing Belt & Water Pump Overhaul',
    category: 'powertrain',
    description: 'Complete timing kit replacement including hydraulic tensioner, idler pulleys, cam/crank seals, and new water pump.',
    partsPrice: 340,
    laborHours: 4.5,
    warrantyMonths: 24,
    turnaround: '6 hrs',
    recommendedMileageInterval: 90000,
    iconName: 'Settings',
    diagnosticSteps: [
      'TDC alignment verification and cam gear backlash inspection',
      'Complete pulley, hydraulic tensioner, and belt replacement',
      'Water pump gasket seal and cooling jacket flush',
      'Variable valve timing (VVT) solenoid response check'
    ]
  },
  {
    id: 'ac-climate',
    title: 'A/C Evacuation, UV Dye Leak Test & Recharge',
    category: 'fluids',
    description: 'Complete refrigerant recovery, vacuum decay leak test, UV dye injection, and factory-weight R134a/R1234yf recharge.',
    partsPrice: 95,
    laborHours: 1.5,
    warrantyMonths: 12,
    turnaround: '2 hrs',
    iconName: 'Wind',
    diagnosticSteps: [
      'Dual manifold high and low side operating pressure diagnosis',
      'Deep 30-minute vacuum hold to boil out internal moisture',
      'UV fluorescent dye injection and electronic halogen leak sniff',
      'Vent temperature verification (targeting 38°F - 45°F drop)'
    ]
  }
];

export const POPULAR_VEHICLES = [
  { make: 'BMW', models: ['330i', 'M340i', '540i', 'X3', 'X5', 'M3'] },
  { make: 'Toyota', models: ['Camry', 'RAV4', 'Highlander', 'Tacoma', 'Corolla', 'Tundra'] },
  { make: 'Honda', models: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey'] },
  { make: 'Ford', models: ['F-150', 'Mustang', 'Explorer', 'Bronco', 'Edge'] },
  { make: 'Audi', models: ['A4', 'A6', 'Q5', 'Q7', 'S5', 'RS3'] },
  { make: 'Mercedes-Benz', models: ['C300', 'E350', 'GLC 300', 'GLE 350', 'S580'] },
  { make: 'Subaru', models: ['Outback', 'Forester', 'Crosstrek', 'WRX', 'Ascent'] },
  { make: 'Porsche', models: ['911 Carrera', 'Macan', 'Cayenne', 'Panamera', '718 Cayman'] }
];

export const DIAGNOSTIC_SYMPTOMS_FAQ = [
  {
    id: 'check-engine-light',
    symptom: 'Check Engine Light is On or Flashing',
    urgency: 'High',
    system: 'Powertrain & Emissions',
    explanation: 'A steady yellow engine light indicates an emissions, ignition, or sensor fault stored in the ECU (such as an O2 sensor or EVAP leak). A FLASHING light indicates an active severe cylinder misfire that dumps unburnt fuel into the catalytic converter, risking fire and catastrophic damage.',
    actionRequired: 'If flashing, pull over safely and stop the engine. If steady, book our OBD-II Computer Diagnostics scan within 48 hours.'
  },
  {
    id: 'brake-squeal-grind',
    symptom: 'High-Pitched Squeal or Metal-on-Metal Grinding When Braking',
    urgency: 'Medium to Critical',
    system: 'Brake System',
    explanation: 'High-pitched squealing is engineered into modern brake pads via metallic wear indicators warning you that pad friction material is below 3mm. A harsh grinding noise means pad material is completely gone and steel backing plates are gouging into your brake rotors.',
    actionRequired: 'Schedule Ceramic Brake Pad & Rotor Service immediately to avoid replacing entire caliper assemblies.'
  },
  {
    id: 'steering-vibration',
    symptom: 'Steering Wheel Shaking at Highway Speeds (55 - 70 MPH)',
    urgency: 'Medium',
    system: 'Wheels & Suspension',
    explanation: 'High-speed steering wobble is almost always caused by dynamic wheel imbalance (thrown wheel weights) or radial tire out-of-round force variations. Vibration occurring strictly under braking indicates warped brake rotors.',
    actionRequired: 'Book a 4-Wheel Laser Alignment and high-speed road-force wheel balance.'
  },
  {
    id: 'slow-crank-cold',
    symptom: 'Sluggish Engine Cranking on Cold Mornings',
    urgency: 'High',
    system: 'Electrical / Battery',
    explanation: 'As ambient temperatures drop toward freezing (32°F / 0°C), automotive lead-acid and AGM battery capacity drops by up to 35-50%, while thicker cold engine oil requires up to twice the cranking amperage from the starter motor.',
    actionRequired: 'View our real-time Weather Advisory section to check your local battery risk, or book an immediate AGM Battery & Alternator load test.'
  },
  {
    id: 'sweet-syrup-smell',
    symptom: 'Sweet Maple Syrup Odor Inside Cabin or Under Hood',
    urgency: 'High',
    system: 'Cooling System',
    explanation: 'Ethylene glycol engine coolant produces an unmistakable sweet aroma when vaporized on hot engine surfaces or leaking from the cabin heater core. Running low on coolant causes rapid cylinder head warping.',
    actionRequired: 'Do NOT open the radiator cap when hot. Book a cooling system pressure test and coolant refractometer check.'
  }
];
