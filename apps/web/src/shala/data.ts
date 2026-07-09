import { GoddessChamber, Collection, Practice } from './types';

// Import high-fidelity environmental art
import gatesBg from './assets/images/temple_gates_1783418503682.jpg';
import stillnessBg from './assets/images/stillness_valley_1783418518708.jpg';
import libraryBg from './assets/images/temple_library_1783418534244.jpg';
import poolBg from './assets/images/reflection_pool_1783418551833.jpg';
import observatoryBg from './assets/images/moon_observatory_1783418572292.jpg';
import pilgrimsBg from './assets/images/pilgrims_hall_1783418591416.jpg';
import fireCircleBg from './assets/images/fire_circle_1783418610473.jpg';
import kaliBg from './assets/images/kali_chamber_1783418638784.jpg';
import lakshmiBg from './assets/images/lakshmi_chamber_1783418659266.jpg';
import saraswatiBg from './assets/images/saraswati_chamber_1783418674807.jpg';
import durgaBg from './assets/images/durga_chamber_1783418694116.jpg';

export const SANCTUARY_LANDMARKS = {
  GATES: gatesBg,
  COURTYARD: stillnessBg, // The Courtyard transitions into the Valley of Stillness
  PRACTICE_ROOM: stillnessBg, // Daily Practice is held in the Valley of Stillness
  LIBRARY: libraryBg, // The Archive of Lineage
  REFLECTION_POOL: poolBg, // The Reflection Pool
  MOON_OBSERVATORY: observatoryBg, // Moon Rhythm
  RETREAT: pilgrimsBg, // The Pilgrim's Hall
  FIRE_CIRCLE: fireCircleBg, // The Fire Circle
};

export const GODDESS_CHAMBERS: GoddessChamber[] = [
  {
    id: 'kali',
    name: 'Kali',
    title: 'Release what no longer serves',
    description: 'Chamber I. The quiet ash where the old fire is consumed to let the new arise.',
    materials: 'Obsidian stone, volcanic glass, dark clay',
    light: 'Deep indigo ember, low candle niches',
    sound: 'A low volcanic hum, then heavy stillness',
    movement: 'Slow, deep exhalations, complete stillness',
    atmosphere: 'Warm',
    colorTheme: 'from-[#1b1436] via-[#0d0a18] to-[#060409]',
    bgGradient: 'radial-gradient(90% 60% at 50% 26%, #1b1436 0%, #0d0a18 52%, #060409 100%)',
    bgImage: kaliBg,
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    title: 'Abundance without excess',
    description: 'Chamber II. The pristine water that flows steadily without greed or retention.',
    materials: 'Warm sandstone, smooth river stones, gold foil',
    light: 'Golden morning light, reflections off still water',
    sound: 'Water moving slowly over stone, soft brass bell',
    movement: 'Receptive palms open, breathing with flow',
    atmosphere: 'Warm',
    colorTheme: 'from-[#332415] via-[#2a1e14] to-[#0c0806]',
    bgGradient: 'radial-gradient(90% 55% at 50% 22%, #332415 0%, #2a1e14 20%, #17110b 60%, #0c0806 100%)',
    bgImage: lakshmiBg,
  },
  {
    id: 'saraswati',
    name: 'Saraswati',
    title: 'The clear, moving stream of knowing',
    description: 'Chamber III. The quiet temple room of clear discernment and high mountain silence.',
    materials: 'Aged paper, dark ink, cold slate, old cedar wood',
    light: 'Cool morning mist, indirect sky light',
    sound: 'The deep hush of a library, a page turning',
    movement: 'Focused spine, clear inner gaze',
    atmosphere: 'Cool',
    colorTheme: 'from-[#251f16] via-[#1a150e] to-[#100c08]',
    bgGradient: 'radial-gradient(90% 55% at 50% 20%, #251f16 0%, #1a150e 58%, #100c08 100%)',
    bgImage: saraswatiBg,
  },
  {
    id: 'durga',
    name: 'Durga',
    title: 'The fierce protector within',
    description: 'Chamber IV. The fortress of sovereign boundaries. You are protected, you are safe.',
    materials: 'Weathered ironwood, rough-cut granite, copper shields',
    light: 'Noon-day glare filtered by heavy timbers, central hearth',
    sound: 'Steady deep drum beat (60bpm), mountain wind outside',
    movement: 'Planted feet, unwavering posture, the breath of life',
    atmosphere: 'Steady',
    colorTheme: 'from-[#421d18] via-[#241110] to-[#0d0606]',
    bgGradient: 'radial-gradient(90% 55% at 50% 20%, #421d18 0%, #241110 58%, #0d0606 100%)',
    bgImage: durgaBg,
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'foundations',
    title: 'Foundations of Shakti',
    description: 'The elemental practices to establish the container of the physical body.',
    practices: [
      {
        id: 'grounding',
        title: 'Grounding with the Earth',
        duration: '12 min',
        category: 'Foundations',
        description: 'Establish roots in the heavy clay beneath the temple. Let the nervous system settle into geological time.'
      },
      {
        id: 'breath_bandha',
        title: 'The First Breath',
        duration: '15 min',
        category: 'Foundations',
        description: 'Unlocking the lower pelvic locks (Mula Bandha) to stabilize the core energy flow.'
      },
      {
        id: 'mountain_stillness',
        title: 'Mountain Pose Meditation',
        duration: '10 min',
        category: 'Foundations',
        description: 'Imitate the posture of the Himalaya. Still, vast, weathering all storms without movement.'
      }
    ]
  },
  {
    id: 'breath_bandha_coll',
    title: 'Breath & Bandha',
    description: 'Advanced breath control and energetic locks to direct internal medicine.',
    practices: [
      {
        id: 'pranayama_intro',
        title: 'Nadi Shodhana',
        duration: '15 min',
        category: 'Breathwork',
        description: 'Channel purification through alternate nostrils, clearing the path of central wisdom.'
      },
      {
        id: 'uddiyana',
        title: 'Uddiyana Bandha Prep',
        duration: '8 min',
        category: 'Breathwork',
        description: 'The upward abdominal lock to draw energy from the earth up to the solar plexus.'
      }
    ]
  },
  {
    id: 'shadow_somatics',
    title: 'Shadow & Somatics',
    description: 'Tending to the dense emotional storehouses of the body with gentle awareness.',
    practices: [
      {
        id: 'emotional_release',
        title: 'Somatic Release',
        duration: '20 min',
        category: 'Somatics',
        description: 'Letting tension leave the jaw, shoulders, and hips. Moving the held trauma through low sound.'
      },
      {
        id: 'shadow_integration',
        title: 'Welcoming the Darkness',
        duration: '18 min',
        category: 'Meditation',
        description: 'Chamber of Kali integration. Welcoming the aspects of self we have cast out into the cold.'
      }
    ]
  }
];

export const ALL_PRACTICES: Practice[] = COLLECTIONS.reduce((acc, curr) => {
  return [...acc, ...curr.practices];
}, [] as Practice[]);
