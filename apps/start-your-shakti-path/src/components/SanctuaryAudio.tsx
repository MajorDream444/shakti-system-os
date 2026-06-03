import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SanctuaryAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Audio node references for garbage collection and real-time tweaks
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  
  // Drone oscillators
  const oscRef1 = useRef<OscillatorNode | null>(null);
  const oscRef2 = useRef<OscillatorNode | null>(null);
  const oscRef3 = useRef<OscillatorNode | null>(null);
  const oscRef4 = useRef<OscillatorNode | null>(null); // Shimmer bell resonance
  
  // Soma Breath LFOs
  const breathOscRef = useRef<OscillatorNode | null>(null);
  const breathGainRef = useRef<GainNode | null>(null);

  // Crackling candle fire hearth
  const noiseNodeRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const fireIntervalRef = useRef<any>(null);

  const startAudio = async () => {
    if (isInitializing) return;
    setIsInitializing(true);

    try {
      // Create audio context (handle Safari compatibility)
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Resume context if suspended (required due to browser autoplay policies)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // 1. Master Output Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      // Beautiful slow fade-in over 2.5 seconds to establish deep focus
      masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 2.5);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 2. High-quality lowpass filter to muddy and warm up the cave space
      const warmFilter = ctx.createBiquadFilter();
      warmFilter.type = 'lowpass';
      warmFilter.frequency.setValueAtTime(140, ctx.currentTime); // Keep only the deep base-energy
      warmFilter.Q.setValueAtTime(1.5, ctx.currentTime);
      warmFilter.connect(masterGain);

      // 3. Deep Root Drone (F1 - Sub-base energy of Kali) at 43.65 Hz
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(43.65, ctx.currentTime);
      
      // 4. Detuned Perfect Fifth drone (C2 - Anchor) at 65.41 Hz
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle'; // Warm harmonics
      osc2.frequency.setValueAtTime(65.41, ctx.currentTime);
      
      // 5. Higher Octave (F2 - Sacred Hearth) at 87.31 Hz with slight pitch drift
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(87.31, ctx.currentTime);

      // Create individual oscillators volume balances
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();

      gain1.gain.setValueAtTime(0.45, ctx.currentTime);
      gain2.gain.setValueAtTime(0.22, ctx.currentTime);
      gain3.gain.setValueAtTime(0.18, ctx.currentTime);

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(warmFilter);
      gain2.connect(warmFilter);
      gain3.connect(warmFilter);

      // 6. Slow Somatic Breathing Cycle (8s cycle: 4s in, 4s out) via low-frequency modulator (LFO)
      const breathOsc = ctx.createOscillator();
      breathOsc.type = 'sine';
      breathOsc.frequency.setValueAtTime(0.125, ctx.currentTime); // 0.125 Hz = 8 seconds period

      const breathGain = ctx.createGain();
      breathGain.gain.setValueAtTime(0.15, ctx.currentTime); // depth of the breathing swells

      // Connect LFO is modulating the volume of primary sub-base drone
      breathOsc.connect(breathGain);
      breathGain.connect(gain1.gain); // Sway the master volume slightly

      // 7. Shimmering Gold Temple Bowls (Very high, extremely resonant sine wave that fades in/out)
      const osc4 = ctx.createOscillator();
      osc4.type = 'sine';
      osc4.frequency.setValueAtTime(261.63, ctx.currentTime); // Middle C harmonic shimmer

      const bowlFilter = ctx.createBiquadFilter();
      bowlFilter.type = 'bandpass';
      bowlFilter.frequency.setValueAtTime(523.25, ctx.currentTime);
      bowlFilter.Q.setValueAtTime(25, ctx.currentTime); // ultra tight resonant filter

      const gain4 = ctx.createGain();
      gain4.gain.setValueAtTime(0.015, ctx.currentTime);

      osc4.connect(bowlFilter);
      bowlFilter.connect(gain4);
      gain4.connect(masterGain);

      // 8. Dynamic organic fire wood crackling / flame embers
      // Since AudioWorklet can be heavy to bootstrap, we create a very light procedural white noise oscillator node
      const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise buffer
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const fireFilter = ctx.createBiquadFilter();
      fireFilter.type = 'bandpass';
      fireFilter.frequency.setValueAtTime(800, ctx.currentTime);
      fireFilter.Q.setValueAtTime(3, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.008, ctx.currentTime);

      noiseSource.connect(fireFilter);
      fireFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      // Start all sound engines
      osc1.start(0);
      osc2.start(0);
      osc3.start(0);
      osc4.start(0);
      breathOsc.start(0);
      noiseSource.start(0);

      // Keep references to clean up later
      oscRef1.current = osc1;
      oscRef2.current = osc2;
      oscRef3.current = osc3;
      oscRef4.current = osc4;
      breathOscRef.current = breathOsc;
      breathGainRef.current = breathGain;
      noiseGainRef.current = noiseGain;

      // Simulate micro-crackle pops of the living temple lamp using a randomized gain envelope
      fireIntervalRef.current = setInterval(() => {
        if (!ctx || ctx.state === 'suspended') return;
        const currentT = ctx.currentTime;
        
        // Random volume impulses mimicking fire drafts
        const nextVolume = 0.003 + Math.random() * 0.009;
        const frequencySway = 650 + Math.random() * 500;
        
        noiseGain.gain.cancelScheduledValues(currentT);
        noiseGain.gain.linearRampToValueAtTime(nextVolume, currentT + 0.04);
        
        fireFilter.frequency.setValueAtTime(frequencySway, currentT);
      }, 95);

      setIsPlaying(true);
    } catch (e) {
      console.error("Fidelity Temple soundscape failed to initialize:", e);
    } finally {
      setIsInitializing(false);
    }
  };

  const stopAudio = () => {
    if (!audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    
    try {
      // Elegant fade-out over 1.2 seconds to prevent abrasive sound cutoff
      if (masterGainRef.current) {
        masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      }
      
      // Delay closing or stopping nodes until the fade-out fully finishes
      setTimeout(() => {
        if (oscRef1.current) { oscRef1.current.stop(); oscRef1.current.disconnect(); }
        if (oscRef2.current) { oscRef2.current.stop(); oscRef2.current.disconnect(); }
        if (oscRef3.current) { oscRef3.current.stop(); oscRef3.current.disconnect(); }
        if (oscRef4.current) { oscRef4.current.stop(); oscRef4.current.disconnect(); }
        if (breathOscRef.current) { breathOscRef.current.stop(); breathOscRef.current.disconnect(); }
        if (fireIntervalRef.current) clearInterval(fireIntervalRef.current);
        
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }

        oscRef1.current = null;
        oscRef2.current = null;
        oscRef3.current = null;
        oscRef4.current = null;
        breathOscRef.current = null;
        breathGainRef.current = null;
        noiseGainRef.current = null;
        masterGainRef.current = null;
        setIsPlaying(false);
      }, 1250);
    } catch (err) {
      console.warn("Audio teardown completed with warning:", err);
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Clean up resource on unmount
  useEffect(() => {
    return () => {
      if (fireIntervalRef.current) clearInterval(fireIntervalRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-1.5 h-full pointer-events-auto select-none">
      <motion.button
        onClick={toggleSound}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-full transition-all duration-700 uppercase tracking-[0.25em] text-[8px] font-semibold cursor-pointer ${
          isPlaying 
            ? 'bg-red-950/20 border-red-800 text-red-400 font-bold shadow-[0_0_10px_rgba(157,23,29,0.25)]' 
            : 'bg-stone-900/10 border-ash/10 text-ash/40 hover:text-stone-300 hover:border-ash/25'
        }`}
        title="Sanctuary Temple Drone"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1"
            >
              <Volume2 className="w-2.5 h-2.5 text-red-500 animate-pulse" />
              <div className="flex items-end gap-[1px] h-2">
                <span className="w-[1px] bg-red-400 animate-[pulse_1.0s_infinite_ease-in-out]" style={{ height: '50%' }} />
                <span className="w-[1px] bg-red-400 animate-[pulse_0.7s_infinite_ease-in-out_delay-100]" style={{ height: '100%' }} />
                <span className="w-[1px] bg-red-400 animate-[pulse_1.2s_infinite_ease-in-out_delay-200]" style={{ height: '70%' }} />
              </div>
              <span className="ml-1 tracking-[0.2em]">Sanctuary: ON</span>
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1"
            >
              <VolumeX className="w-2.5 h-2.5 text-ash/30" />
              <span className="tracking-[0.2em]">Sanctuary: OFF</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
