export interface VehicleInfo {
  year: number;
  make: string;
  model: string;
  mileage: number;
  engineType: 'Gasoline' | 'Turbocharged' | 'Hybrid' | 'Diesel' | 'Electric';
}

export type ServiceCategory = 
  | 'diagnostics'
  | 'powertrain'
  | 'brakes'
  | 'suspension'
  | 'electrical'
  | 'fluids';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  partsPrice: number;
  laborHours: number;
  warrantyMonths: number;
  turnaround: string;
  recommendedMileageInterval?: number;
  iconName: string;
  diagnosticSteps: string[];
}

export interface BookingAppointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicle: VehicleInfo;
  serviceIds: string[];
  date: string;
  timeSlot: string;
  notes?: string;
  partsTotal: number;
  laborTotal: number;
  tax: number;
  grandTotal: number;
  status: 'confirmed' | 'in-bay' | 'completed';
  createdAt: string;
}

export interface WeatherData {
  city: string;
  latitude: number;
  longitude: number;
  temperature: number; // Fahrenheit
  apparentTemperature: number;
  relativeHumidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  units: {
    temperature: string;
    precipitation: string;
  };
  advisories: {
    batteryHealth: {
      status: 'optimal' | 'moderate-risk' | 'high-risk';
      crankingEfficiency: number; // percentage (e.g. 65% in sub-freezing)
      message: string;
    };
    tires: {
      psiDelta: number; // e.g. -3.5 PSI
      recommendedAction: string;
      roadHazardLevel: 'low' | 'moderate' | 'high';
    };
    wipersAndFluids: {
      wiperCondition: 'good' | 'inspect' | 'replace';
      fluidFreezeRisk: boolean;
      message: string;
    };
    seasonalSummary: string;
  };
}

export interface CommunityPost {
  id: number;
  title: string;
  body: string;
  author: string;
  vehicleModel: string;
  serviceCategory: string;
  mileage: number;
  verifiedRepair: boolean;
  repliesCount: number;
  solved: boolean;
  date: string;
  comments: CommunityComment[];
}

export interface CommunityComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  isMasterTech: boolean;
  badge?: string;
}
