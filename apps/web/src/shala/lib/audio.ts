// Shakti Shala OS V4 - Sacred Himalayan Sound Synthesis Engine
// Pure client-side Web Audio API to prevent external file dependencies and load failures.

let audioCtx: AudioContext | null = null;

// Nodes references
let droneOsc1: OscillatorNode | null = null;
let droneOsc2: OscillatorNode | null = null;
let masterGain: GainNode | null = null;
let weatherNoiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
let weatherFilter: BiquadFilterNode | null = null;
let weatherGain: GainNode | null = null;
let windLfo: OscillatorNode | null = null;
let windLfoGain: GainNode | null = null;

// Sound Generator for White Noise (for rain, wind, water, fire crackle)
function createNoiseNode(ctx: AudioContext): ScriptProcessorNode {
  const noiseNode = ctx.createScriptProcessor(4096, 0, 1);

  noiseNode.onaudioprocess = (e) => {
    const outputBuffer = e.outputBuffer;
    const channelData = outputBuffer.getChannelData(0);
    for (let i = 0; i < outputBuffer.length; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }
  };

  return noiseNode;
}

export function startSanctuaryAudio() {
  try {
    if (audioCtx) {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (
        window as Window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }
    audioCtx = new AudioContextClass();

    // Master Gain
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.0, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // --- Sacred Singing Bowl Drone ---
    // Deep fundamental at 108Hz (sacred number)
    droneOsc1 = audioCtx.createOscillator();
    droneOsc1.type = 'sine';
    droneOsc1.frequency.setValueAtTime(108, audioCtx.currentTime);

    // Warm fifth harmonic at 162Hz (golden ratio-ish fifth)
    droneOsc2 = audioCtx.createOscillator();
    droneOsc2.type = 'triangle';
    droneOsc2.frequency.setValueAtTime(162, audioCtx.currentTime);

    const droneGain1 = audioCtx.createGain();
    droneGain1.gain.setValueAtTime(0.08, audioCtx.currentTime);

    const droneGain2 = audioCtx.createGain();
    droneGain2.gain.setValueAtTime(0.02, audioCtx.currentTime);

    // Lowpass filter to keep drone warm and subterranean
    const droneFilter = audioCtx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(250, audioCtx.currentTime);

    droneOsc1.connect(droneGain1);
    droneOsc2.connect(droneGain2);

    droneGain1.connect(droneFilter);
    droneGain2.connect(droneFilter);

    droneFilter.connect(masterGain);

    droneOsc1.start();
    droneOsc2.start();

    // --- Himalayan Mountain Wind / Rain (Procedural Weather Generator) ---
    weatherNoiseNode = createNoiseNode(audioCtx);
    weatherFilter = audioCtx.createBiquadFilter();
    weatherFilter.type = 'bandpass';
    weatherFilter.frequency.setValueAtTime(400, audioCtx.currentTime);
    weatherFilter.Q.setValueAtTime(2.0, audioCtx.currentTime);

    weatherGain = audioCtx.createGain();
    weatherGain.gain.setValueAtTime(0.03, audioCtx.currentTime);

    // Modulate the wind with a slow LFO to mimic breathing gusts of wind
    windLfo = audioCtx.createOscillator();
    windLfo.type = 'sine';
    windLfo.frequency.setValueAtTime(0.07, audioCtx.currentTime); // very slow breathing cycle

    windLfoGain = audioCtx.createGain();
    windLfoGain.gain.setValueAtTime(180, audioCtx.currentTime); // sweep range

    windLfo.connect(windLfoGain);
    if (windLfoGain && weatherFilter) {
      windLfoGain.connect(weatherFilter.frequency);
    }

    weatherNoiseNode.connect(weatherFilter);
    weatherFilter.connect(weatherGain);
    weatherGain.connect(masterGain);

    windLfo.start();

    // Fade in master gain smoothly
    masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 3.0);
  } catch (error) {
    console.warn('Web Audio API not supported or blocked:', error);
  }
}

export function stopSanctuaryAudio() {
  if (masterGain && audioCtx) {
    masterGain.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 1.0);
    setTimeout(() => {
      if (audioCtx && audioCtx.state === 'running') {
        audioCtx.suspend();
      }
    }, 1100);
  }
}

export function setSanctuaryAcoustics(room: string, weather: string) {
  if (!audioCtx || !masterGain || !weatherFilter || !weatherGain) return;

  const now = audioCtx.currentTime;

  // Adapt overall drone pitch and mix based on rooms
  if (room === 'FIRE_CIRCLE') {
    // Crackling warmth: raise the volume of high-pass noise spikes, slightly warmer drone
    weatherFilter.type = 'highpass';
    weatherFilter.frequency.exponentialRampToValueAtTime(800, now + 1.5);
    weatherGain.gain.linearRampToValueAtTime(0.04, now + 1.5);
    if (droneOsc1 && droneOsc2) {
      droneOsc1.frequency.exponentialRampToValueAtTime(112, now + 2.0);
      droneOsc2.frequency.exponentialRampToValueAtTime(168, now + 2.0);
    }
  } else if (room === 'REFLECTION_POOL') {
    // Soft aquatic flow: low bandpass, calm rhythmic wind
    weatherFilter.type = 'bandpass';
    weatherFilter.frequency.exponentialRampToValueAtTime(320, now + 2.0);
    weatherGain.gain.linearRampToValueAtTime(0.06, now + 2.0);
    if (droneOsc1 && droneOsc2) {
      droneOsc1.frequency.exponentialRampToValueAtTime(96, now + 2.0);
      droneOsc2.frequency.exponentialRampToValueAtTime(144, now + 2.0);
    }
  } else if (room === 'LIBRARY') {
    // Quiet dusty archive: almost silent, narrow filters
    weatherFilter.type = 'bandpass';
    weatherFilter.frequency.exponentialRampToValueAtTime(600, now + 2.0);
    weatherGain.gain.linearRampToValueAtTime(0.015, now + 2.0);
    if (droneOsc1 && droneOsc2) {
      droneOsc1.frequency.exponentialRampToValueAtTime(108, now + 2.0);
      droneOsc2.frequency.exponentialRampToValueAtTime(162, now + 2.0);
    }
  } else {
    // Default Himalayan majestic wind
    weatherFilter.type = 'bandpass';
    weatherFilter.frequency.exponentialRampToValueAtTime(450, now + 2.0);

    // Adjust weather noise based on conditions
    if (weather === 'CLEAR') {
      weatherGain.gain.linearRampToValueAtTime(0.015, now + 2.0);
    } else if (weather === 'LIGHT_SNOW') {
      weatherGain.gain.linearRampToValueAtTime(0.04, now + 2.0);
    } else if (weather === 'RAIN') {
      weatherGain.gain.linearRampToValueAtTime(0.08, now + 2.0);
    } else {
      weatherGain.gain.linearRampToValueAtTime(0.03, now + 2.0);
    }

    if (droneOsc1 && droneOsc2) {
      droneOsc1.frequency.exponentialRampToValueAtTime(108, now + 2.0);
      droneOsc2.frequency.exponentialRampToValueAtTime(162, now + 2.0);
    }
  }
}

export function playResonantBell() {
  if (!audioCtx || !masterGain) return;

  const now = audioCtx.currentTime;
  const bellOsc = audioCtx.createOscillator();
  const bellGain = audioCtx.createGain();
  const bellFilter = audioCtx.createBiquadFilter();

  bellOsc.type = 'sine';
  bellOsc.frequency.setValueAtTime(432, now); // Beautiful warm 432Hz tuning

  bellFilter.type = 'bandpass';
  bellFilter.frequency.setValueAtTime(432, now);
  bellFilter.Q.setValueAtTime(10.0, now);

  bellGain.gain.setValueAtTime(0.0, now);
  bellGain.gain.linearRampToValueAtTime(0.12, now + 0.05);
  bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5); // long resonance decay

  bellOsc.connect(bellFilter);
  bellFilter.connect(bellGain);
  bellGain.connect(masterGain);

  bellOsc.start();
  bellOsc.stop(now + 5.0);
}
