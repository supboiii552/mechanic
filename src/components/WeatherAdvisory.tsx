import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Battery, 
  Disc, 
  Wind, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle2, 
  Navigation, 
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WeatherData } from '../types';
import { PRESET_CITIES, CityOption, fetchLiveWeatherData } from '../services/weather';

interface WeatherAdvisoryProps {
  onPreselectService: (serviceId: string) => void;
}

export const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({ onPreselectService }) => {
  const [selectedCity, setSelectedCity] = useState<CityOption>(PRESET_CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState<boolean>(false);

  const loadWeather = async (city: CityOption) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveWeatherData(city);
      setWeather(data);
    } catch (err: unknown) {
      console.error('Failed to load weather:', err);
      setError('Unable to fetch live forecast from Open-Meteo. Please try another location.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedCity);
  }, [selectedCity]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const customCity: CityOption = {
          name: 'Your Location',
          region: 'GPS',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        setSelectedCity(customCity);
        setLocating(false);
      },
      (err) => {
        console.warn('Geolocation denied or failed:', err);
        setLocating(false);
        // Fall back gracefully
      }
    );
  };

  return (
    <section id="weather" className="py-16 lg:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <Thermometer className="w-4 h-4" />
              <span>Real-Time Open-Meteo Diagnostics Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 [text-wrap:balance]">
              Seasonal Climate & Automotive Health Advisory
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Ambient temperature and precipitation dramatically impact battery electrochemistry, tire contact patch pressure, and fluid viscosity. Check how current local climate affects your car.
            </p>
          </div>

          {/* City Selector & Geolocation */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-neutral-200/60 dark:bg-neutral-800/80 rounded-lg">
              {PRESET_CITIES.map((city) => {
                const isActive = selectedCity.name === city.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 shadow-sm' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleUseLocation}
              disabled={locating}
              className="p-2 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Detect Current Location"
            >
              <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">GPS</span>
            </button>

            <button
              onClick={() => loadWeather(selectedCity)}
              disabled={loading}
              className="p-2 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Refresh Forecast"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Display */}
        {loading && !weather ? (
          <div className="p-12 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mb-3" />
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Querying Open-Meteo Satellite & Meteorological Model...</p>
            <p className="text-xs text-neutral-500 mt-1">Calculating cold-cranking draw and tire pressure variations for {selectedCity.name}</p>
          </div>
        ) : error ? (
          <div className="p-8 rounded-2xl border border-rose-500/30 bg-rose-500/5 text-rose-500 dark:text-rose-400 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
            <button
              onClick={() => loadWeather(selectedCity)}
              className="px-3 py-1.5 text-xs font-medium bg-rose-500 text-white rounded-md cursor-pointer hover:bg-rose-600"
            >
              Retry Connection
            </button>
          </div>
        ) : weather ? (
          <div className="space-y-6">
            
            {/* Top Weather Conditions Bar */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Thermometer className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50">
                      {weather.temperature}{weather.units.temperature}
                    </span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
                      Feels like {weather.apparentTemperature}{weather.units.temperature}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                    {weather.city} · Live Sensor Readings
                  </p>
                </div>
              </div>

              {/* Weather Telemetry Chips */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
                  <Wind className="w-4 h-4 text-sky-500" />
                  <span>Wind: {weather.windSpeed} mph</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
                  <CloudRain className="w-4 h-4 text-blue-500" />
                  <span>Precip: {weather.precipitation} {weather.units.precipitation}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
                  <span className="text-neutral-400">Humidity:</span>
                  <span>{weather.relativeHumidity}%</span>
                </div>
              </div>
            </div>

            {/* 3 Specialized Automotive Advisories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 1. Battery Cranking Health */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                        <Battery className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        Battery Cranking Amperage
                      </h3>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      weather.advisories.batteryHealth.status === 'high-risk'
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        : weather.advisories.batteryHealth.status === 'moderate-risk'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {weather.advisories.batteryHealth.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500 dark:text-neutral-400">Chemical Cold Output</span>
                      <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                        {weather.advisories.batteryHealth.crankingEfficiency}%
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          weather.advisories.batteryHealth.crankingEfficiency < 60
                            ? 'bg-rose-500'
                            : weather.advisories.batteryHealth.crankingEfficiency < 85
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${weather.advisories.batteryHealth.crankingEfficiency}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {weather.advisories.batteryHealth.message}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => onPreselectService('battery-charging')}
                    className="w-full py-2 px-3 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-500 bg-amber-500/5 hover:bg-amber-500/10 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Book AGM Battery Load Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2. Tire Pressure Physics */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                        <Disc className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        Tire Pressure Calibration
                      </h3>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      weather.advisories.tires.roadHazardLevel === 'high'
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        : weather.advisories.tires.roadHazardLevel === 'moderate'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {weather.advisories.tires.roadHazardLevel.toUpperCase()} HAZARD
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 mb-3 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Estimated PSI Drift</span>
                    <span className={`text-base font-bold font-mono ${
                      weather.advisories.tires.psiDelta < 0 ? 'text-rose-500' : 'text-neutral-900 dark:text-white'
                    }`}>
                      {weather.advisories.tires.psiDelta > 0 ? `+${weather.advisories.tires.psiDelta}` : weather.advisories.tires.psiDelta} PSI
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {weather.advisories.tires.recommendedAction}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => onPreselectService('suspension-align')}
                    className="w-full py-2 px-3 text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500 bg-sky-500/5 hover:bg-sky-500/10 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Schedule 4-Wheel Laser Alignment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3. Wipers and Fluids Assessment */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                        <CloudRain className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        Wipers & Thermal Fluids
                      </h3>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      weather.advisories.wipersAndFluids.fluidFreezeRisk
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {weather.advisories.wipersAndFluids.fluidFreezeRisk ? 'FREEZE RISK' : 'NORMAL'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 mb-3 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Coolant Freeze Point</span>
                    <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-white">
                      {weather.temperature <= 32 ? 'Requires -34°F Glycol Check' : 'Nominal 50/50 Blend'}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {weather.advisories.wipersAndFluids.message}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => onPreselectService('fluid-flush')}
                    className="w-full py-2 px-3 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 bg-indigo-500/5 hover:bg-indigo-500/10 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Book Full Synthetic Fluid Flush</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Weather Seasonal Banner */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-3 text-xs text-neutral-800 dark:text-neutral-200">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{weather.advisories.seasonalSummary}</span>
            </div>

          </div>
        ) : null}

      </div>
    </section>
  );
};
