import { WeatherData } from '../types';

export interface CityOption {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export const PRESET_CITIES: CityOption[] = [
  { name: 'Chicago', region: 'IL', latitude: 41.8781, longitude: -87.6298 },
  { name: 'Denver', region: 'CO', latitude: 39.7392, longitude: -104.9903 },
  { name: 'Minneapolis', region: 'MN', latitude: 44.9778, longitude: -93.2650 },
  { name: 'Seattle', region: 'WA', latitude: 47.6062, longitude: -122.3321 },
  { name: 'New York', region: 'NY', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Austin', region: 'TX', latitude: 30.2672, longitude: -97.7431 }
];

export async function fetchLiveWeatherData(city: CityOption): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather service responded with status ${response.status}`);
  }

  const json = await response.json();
  const current = json.current;
  const temp = Math.round(current.temperature_2m);
  const apparentTemp = Math.round(current.apparent_temperature);
  const humidity = current.relative_humidity_2m;
  const precip = current.precipitation;
  const weatherCode = current.weather_code;
  const windSpeed = Math.round(current.wind_speed_10m);

  // 1. Battery Health Assessment
  let batteryStatus: 'optimal' | 'moderate-risk' | 'high-risk' = 'optimal';
  let crankingEff = 100;
  let batteryMsg = 'Battery electrochemical reaction is operating at nominal power output.';

  if (temp <= 25) {
    batteryStatus = 'high-risk';
    crankingEff = Math.max(35, Math.round(50 + (temp / 2)));
    batteryMsg = `Sub-freezing cold has reduced available cold-cranking amperage by ${100 - crankingEff}%. Batteries over 3 years old are in danger of sudden morning no-start failure.`;
  } else if (temp <= 45) {
    batteryStatus = 'moderate-risk';
    crankingEff = Math.round(75 + (temp - 25) * 0.75);
    batteryMsg = `Chilled morning temperatures increase engine starter resistance while slightly diminishing battery cell kinetics (${crankingEff}% efficiency).`;
  } else if (temp >= 90) {
    batteryStatus = 'moderate-risk';
    crankingEff = 85;
    batteryMsg = `High ambient summer heat accelerates electrolyte evaporation and lead-plate grid corrosion.`;
  }

  // 2. Tire Pressure Physics (1 PSI loss per 10°F drop from 70°F standard calibration)
  const tempDeltaFromStandard = temp - 70;
  const psiDelta = Math.round((tempDeltaFromStandard / 10) * 10) / 10;
  let tireAction = 'Tire pressures are stable within manufacturer baseline tolerance.';
  let roadHazard: 'low' | 'moderate' | 'high' = 'low';

  if (psiDelta <= -3) {
    tireAction = `Cold ambient temperature has lowered tire pressure by approx ${Math.abs(psiDelta)} PSI. Top off tires to factory door-jamb placard specs to avoid shoulder tread wear and increased stopping distance.`;
    roadHazard = precip > 0.05 ? 'high' : 'moderate';
  } else if (psiDelta >= 3) {
    tireAction = `Hot ambient temperature has inflated pressure by +${psiDelta} PSI. Check pressure cold before long highway runs to prevent center-tread crowning.`;
  }

  if (precip > 0.1 || weatherCode >= 70) {
    roadHazard = temp <= 32 ? 'high' : 'moderate';
  }

  // 3. Wipers and Fluids Assessment
  let wiperCond: 'good' | 'inspect' | 'replace' = 'good';
  let fluidFreezeRisk = temp <= 32;
  let wiperMsg = 'Wiper squeegee rubber is pliable. Fluid reservoir operating within safe fluid limits.';

  if (temp <= 32 && precip > 0) {
    wiperCond = 'replace';
    wiperMsg = 'Freezing precipitation actively tearing aged rubber blades. Ensure washer fluid is rated to -20°F to prevent reservoir and nozzle cracking.';
  } else if (precip > 0.2) {
    wiperCond = 'inspect';
    wiperMsg = 'Active rainfall demands clean blade sweeps without chatter or streaking for clear driver sightlines.';
  } else if (temp > 85) {
    wiperMsg = 'Direct UV solar exposure hardens synthetic wiper rubber. Inspect edges for micro-cracks before seasonal downpours.';
  }

  // Seasonal Summary
  let seasonalSummary = '';
  if (temp <= 32) {
    seasonalSummary = `Winter Cold Advisory active for ${city.name} (${temp}°F). Starter load is elevated, tire pressures are deflated by ~${Math.abs(psiDelta)} PSI, and non-winter fluids risk freezing.`;
  } else if (temp >= 85) {
    seasonalSummary = `High Heat Advisory in ${city.name} (${temp}°F). Cooling system pressures and AC compressor thermal stress are at peak load.`;
  } else {
    seasonalSummary = `Mild driving conditions in ${city.name} (${temp}°F). Ideal window for routine mechanical inspections, alignment calibrations, and preventative fluid exchange.`;
  }

  return {
    city: `${city.name}, ${city.region}`,
    latitude: city.latitude,
    longitude: city.longitude,
    temperature: temp,
    apparentTemperature: apparentTemp,
    relativeHumidity: humidity,
    precipitation: precip,
    weatherCode: weatherCode,
    windSpeed: windSpeed,
    units: {
      temperature: '°F',
      precipitation: 'in'
    },
    advisories: {
      batteryHealth: {
        status: batteryStatus,
        crankingEfficiency: crankingEff,
        message: batteryMsg
      },
      tires: {
        psiDelta: psiDelta,
        recommendedAction: tireAction,
        roadHazardLevel: roadHazard
      },
      wipersAndFluids: {
        wiperCondition: wiperCond,
        fluidFreezeRisk: fluidFreezeRisk,
        message: wiperMsg
      },
      seasonalSummary: seasonalSummary
    }
  };
}
