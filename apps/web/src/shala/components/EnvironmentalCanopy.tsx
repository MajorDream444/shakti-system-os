import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Wind, CloudSnow, Flame, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { startSanctuaryAudio, stopSanctuaryAudio, setSanctuaryAcoustics, playResonantBell } from '../lib/audio';

export type TimeOfDay = 'MORNING' | 'AFTERNOON' | 'SUNSET' | 'NIGHT';
export type WeatherCondition = 'MIST' | 'LIGHT_SNOW' | 'RAIN' | 'CLEAR' | 'CLOUDS';
export type MountainSeason = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

interface EnvironmentalCanopyProps {
  timeOfDay: TimeOfDay;
  weather: WeatherCondition;
  season: MountainSeason;
  soundActive: boolean;
  activeRoom: string;
  onTimeChange: (time: TimeOfDay) => void;
  onWeatherChange: (weather: WeatherCondition) => void;
  onSeasonChange: (season: MountainSeason) => void;
  onSoundToggle: (active: boolean) => void;
}

export const EnvironmentalCanopy: React.FC<EnvironmentalCanopyProps> = ({
  timeOfDay,
  weather,
  season,
  soundActive,
  activeRoom,
  onTimeChange,
  onWeatherChange,
  onSeasonChange,
  onSoundToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Sound Engine synchronization
  useEffect(() => {
    if (soundActive) {
      startSanctuaryAudio();
      setSanctuaryAcoustics(activeRoom, weather);
    } else {
      stopSanctuaryAudio();
    }
  }, [soundActive, activeRoom, weather]);

  // Handle bell strike feedback
  const handleBellStrike = () => {
    playResonantBell();
  };

  const times: { id: TimeOfDay; icon: React.ReactNode; label: string }[] = [
    { id: 'MORNING', icon: <Sun className="w-3.5 h-3.5" />, label: 'Morning Light' },
    { id: 'AFTERNOON', icon: <Sun className="w-3.5 h-3.5 fill-current" />, label: 'Noonday Stone' },
    { id: 'SUNSET', icon: <Flame className="w-3.5 h-3.5 text-amber-500" />, label: 'Prayer Amber' },
    { id: 'NIGHT', icon: <Moon className="w-3.5 h-3.5" />, label: 'Nocturnal Moon' },
  ];

  const weathers: { id: WeatherCondition; icon: React.ReactNode; label: string }[] = [
    { id: 'CLEAR', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Clear Skies' },
    { id: 'MIST', icon: <Wind className="w-3.5 h-3.5" />, label: 'Temple Mist' },
    { id: 'LIGHT_SNOW', icon: <CloudSnow className="w-3.5 h-3.5" />, label: 'High Pass Snow' },
    { id: 'RAIN', icon: <Wind className="w-3.5 h-3.5 rotate-90" />, label: 'Mountain Rain' },
    { id: 'CLOUDS', icon: <Wind className="w-3.5 h-3.5 opacity-60" />, label: 'Drifting Clouds' },
  ];

  const seasons: { id: MountainSeason; label: string; desc: string }[] = [
    { id: 'SPRING', label: 'Spring', desc: 'New blossoms' },
    { id: 'SUMMER', label: 'Summer', desc: 'Clear azure skies' },
    { id: 'AUTUMN', label: 'Autumn', desc: 'Golden cedar leaves' },
    { id: 'WINTER', label: 'Winter', desc: 'Snow on ancient roofs' },
  ];

  return (
    <>
      <div
        className={`sanctuary-ambient-field sanctuary-${timeOfDay.toLowerCase()} sanctuary-${weather.toLowerCase()} sanctuary-${season.toLowerCase()}`}
        aria-hidden="true"
      />

      {/* Floating Sound Toggle - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-2">
        <button
          id="sound-toggle-btn"
          onClick={() => {
            onSoundToggle(!soundActive);
            if (!soundActive) handleBellStrike();
          }}
          className={`flex items-center gap-2 p-2 px-3 rounded-full border text-[10px] font-sans font-semibold tracking-[0.16em] text-transform: uppercase transition-all duration-300 ${
            soundActive
              ? 'border-[#E27A3F]/40 bg-[#090707]/80 text-[#E27A3F]'
              : 'border-white/10 bg-[#090707]/60 text-[#8b949e] hover:border-white/20'
          }`}
          title={soundActive ? 'Enter Deep Silence' : 'Listen to Mountain Acoustics'}
        >
          {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundActive ? 'Listening' : 'Silence'}</span>
        </button>

        {/* Resonant Prayer Bell */}
        {soundActive && (
          <button
            id="resonant-bell-strike-btn"
            onClick={handleBellStrike}
            className="p-2 rounded-full border border-white/10 bg-[#090707]/80 hover:bg-[#090707]/100 hover:border-[#E27A3F]/30 text-[#D8C5B0] text-[10px] font-sans font-semibold tracking-[0.16em] text-transform: uppercase transition-all duration-300"
            title="Strike Prayer Bell"
          >
            🔔 Bell
          </button>
        )}
      </div>

      {/* Atmospheric Astrological Controller (Oil Lantern Dial) - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          id="toggle-canopy-controls"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full border transition-all duration-500 shadow-xl flex items-center justify-center ${
            isOpen
              ? 'border-[#E27A3F] bg-gradient-to-tr from-[#3a1d17] to-[#120E0F] text-[#F6EFE7] rotate-95 scale-105'
              : 'border-white/10 bg-[#090707]/80 hover:border-white/30 text-[#8b949e] hover:text-[#F6EFE7]'
          }`}
          title="Sanctuary Environment Settings"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="canopy-controls-hud"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute right-0 bottom-14 w-80 bg-gradient-to-t from-[#090707] to-[#141011] border border-[#D8C5B0]/10 rounded-[24px] p-5 shadow-2xl select-none"
            >
              {/* Dial Title */}
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/5">
                <div className="w-2 h-2 rounded-full bg-[#E27A3F]" />
                <span className="font-sans font-bold text-[10px] tracking-[0.24em] text-transform: uppercase text-[#E27A3F]">
                  MOUNTAIN CANOPY
                </span>
              </div>

              {/* Seasons Grid */}
              <div className="mb-4">
                <label className="block font-sans text-[9px] tracking-[0.16em] text-transform: uppercase text-[#6b5f52] mb-2">
                  Mountain Season
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {seasons.map((s) => {
                    const isSelected = season === s.id;
                    return (
                      <button
                        key={s.id}
                        id={`hud-season-${s.id.toLowerCase()}`}
                        onClick={() => onSeasonChange(s.id)}
                        className={`py-1.5 rounded-lg border text-[10px] font-semibold tracking-wider transition-all ${
                          isSelected
                            ? 'border-[#E27A3F]/40 bg-[#E27A3F]/10 text-[#F6EFE7]'
                            : 'border-white/5 bg-white/[0.01] text-[#6b5f52] hover:border-white/15'
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time of Day Grid */}
              <div className="mb-4">
                <label className="block font-sans text-[9px] tracking-[0.16em] text-transform: uppercase text-[#6b5f52] mb-2">
                  Sanctuary Time
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {times.map((t) => {
                    const isSelected = timeOfDay === t.id;
                    return (
                      <button
                        key={t.id}
                        id={`hud-time-${t.id.toLowerCase()}`}
                        onClick={() => onTimeChange(t.id)}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-left text-[10px] font-semibold transition-all ${
                          isSelected
                            ? 'border-[#E27A3F]/40 bg-[#E27A3F]/10 text-[#F6EFE7]'
                            : 'border-white/5 bg-white/[0.01] text-[#6b5f52] hover:border-white/15'
                        }`}
                      >
                        {t.icon}
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weather Conditions */}
              <div>
                <label className="block font-sans text-[9px] tracking-[0.16em] text-transform: uppercase text-[#6b5f52] mb-2">
                  Weather Atmosphere
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {weathers.map((w) => {
                    const isSelected = weather === w.id;
                    return (
                      <button
                        key={w.id}
                        id={`hud-weather-${w.id.toLowerCase()}`}
                        onClick={() => onWeatherChange(w.id)}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-left text-[10px] font-semibold transition-all ${
                          isSelected
                            ? 'border-[#E27A3F]/40 bg-[#E27A3F]/10 text-[#F6EFE7]'
                            : 'border-white/5 bg-white/[0.01] text-[#6b5f52] hover:border-white/15'
                        }`}
                      >
                        {w.icon}
                        <span>{w.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
