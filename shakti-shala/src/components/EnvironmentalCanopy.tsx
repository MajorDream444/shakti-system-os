import React, { useEffect, useRef, useState } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

  // Handle high-performance dynamic weather particles on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle class representing atmospheric elements
    class Particle {
      x: number = Math.random() * width;
      y: number = Math.random() * height;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      alpha: number = Math.random() * 0.5 + 0.1;
      rotation: number = Math.random() * Math.PI * 2;
      rotationSpeed: number = (Math.random() - 0.5) * 0.02;
      type: 'snow' | 'rain' | 'petal' | 'leaf' | 'mist_puff' = 'snow';

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -20;
        this.alpha = Math.random() * 0.5 + 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;

        if (weather === 'LIGHT_SNOW') {
          this.type = 'snow';
          this.size = Math.random() * 2.2 + 0.8;
          this.speedY = Math.random() * 0.6 + 0.3;
          this.speedX = Math.random() * 0.4 - 0.2;
        } else if (weather === 'RAIN') {
          this.type = 'rain';
          this.size = Math.random() * 1.5 + 0.5;
          this.speedY = Math.random() * 6 + 4;
          this.speedX = -1.2; // slanted mountain downpour
        } else if (season === 'SPRING' && weather === 'CLEAR') {
          // Elegant soft pink cherry/rhododendron petals drifting
          this.type = 'petal';
          this.size = Math.random() * 4 + 3;
          this.speedY = Math.random() * 0.5 + 0.4;
          this.speedX = Math.random() * 0.6 + 0.1;
        } else if (season === 'AUTUMN' && weather === 'CLEAR') {
          // Warm golden-copper oak leaves gliding slowly
          this.type = 'leaf';
          this.size = Math.random() * 4 + 4;
          this.speedY = Math.random() * 0.6 + 0.3;
          this.speedX = Math.random() * 0.4 + 0.1;
        } else if (weather === 'MIST' || weather === 'CLOUDS') {
          this.type = 'mist_puff';
          this.size = Math.random() * 80 + 40;
          this.speedY = (Math.random() - 0.5) * 0.05;
          this.speedX = Math.random() * 0.15 + 0.05;
          this.alpha = Math.random() * 0.08 + 0.02;
        } else {
          // Minimal high-altitude dust motes floating in clear light
          this.type = 'snow';
          this.size = Math.random() * 1.0 + 0.3;
          this.speedY = (Math.random() - 0.5) * 0.1;
          this.speedX = (Math.random() - 0.5) * 0.1;
          this.alpha = Math.random() * 0.2;
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset if drifted off-canvas
        if (this.y > height + 20 || this.x > width + 20 || this.x < -20) {
          this.reset(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;

        if (this.type === 'snow') {
          c.fillStyle = '#FFFFFF';
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          c.fill();
        } else if (this.type === 'rain') {
          c.strokeStyle = '#9ca3af';
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(this.x, this.y);
          c.lineTo(this.x + this.speedX * 1.5, this.y + this.speedY * 1.5);
          c.stroke();
        } else if (this.type === 'petal') {
          // Draw soft pink mountain petals
          c.translate(this.x, this.y);
          c.rotate(this.rotation);
          c.fillStyle = '#fbcfe8'; // delicate pink
          c.beginPath();
          c.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
          c.fill();
        } else if (this.type === 'leaf') {
          // Draw rich golden leaves
          c.translate(this.x, this.y);
          c.rotate(this.rotation);
          c.fillStyle = '#ca8a04'; // warm gold/amber
          c.beginPath();
          c.ellipse(0, 0, this.size, this.size * 0.5, Math.PI / 4, 0, Math.PI * 2);
          c.fill();
        } else if (this.type === 'mist_puff') {
          // Draw slow moving ambient vapor
          c.fillStyle = '#e2e8f0';
          const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
          grad.addColorStop(0, `rgba(226, 232, 240, ${this.alpha})`);
          grad.addColorStop(1, 'rgba(226, 232, 240, 0)');
          c.fillStyle = grad;
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          c.fill();
        }
        c.restore();
      }
    }

    const maxParticles = weather === 'RAIN' ? 95 : weather === 'MIST' ? 12 : 55;
    const particlesArray: Particle[] = [];
    for (let i = 0; i < maxParticles; i++) {
      particlesArray.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render atmosphere tint layer depending on Time of Day
      if (timeOfDay === 'MORNING') {
        // Soft pink/peach sunrise mist underlay
        ctx.fillStyle = 'rgba(244, 63, 94, 0.02)';
        ctx.fillRect(0, 0, width, height);
      } else if (timeOfDay === 'SUNSET') {
        // Deep warm amber and terracotta tint
        ctx.fillStyle = 'rgba(245, 158, 11, 0.03)';
        ctx.fillRect(0, 0, width, height);
      } else if (timeOfDay === 'NIGHT') {
        // Celestial dark cobalt dust underlay
        ctx.fillStyle = 'rgba(30, 41, 59, 0.02)';
        ctx.fillRect(0, 0, width, height);
      }

      particlesArray.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [weather, season, timeOfDay]);

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
      {/* High-Performance Canvas Particles overlaying the architecture */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none select-none"
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
