export type RoomType =
  | 'GATES'
  | 'COURTYARD'
  | 'FIRE_CIRCLE'
  | 'LIBRARY'
  | 'GODDESS_CHAMBERS'
  | 'PRACTICE_ROOM'
  | 'REFLECTION_POOL'
  | 'JOURNEY'
  | 'RETREAT';

export interface SeekerState {
  name: string;
  accessLevel: 'Visitor' | 'Seeker' | 'Practitioner' | 'Initiate' | 'Temple Circle';
  hoursInStillness: number;
  currentPathway: string;
  pathwayDay: number;
  pathwayTotalDays: number;
  lastActiveDate: string | null;
  journalEntries: JournalEntry[];
  completedPractices: string[]; // practice IDs
  // Environmental Memory state
  litLamps?: string[]; // IDs of lit lamps, e.g. ["GATES", "COURTYARD", "FIRE_CIRCLE", etc.]
  prayerFlagsCount?: number; // total prayer flags added across the mountain
  birdsReturnedCount?: number; // birds returned to the courtyard / gates based on practice
  dailyIntentions?: string[]; // array of saved daily intentions
  ritualGrowthLevel?: number; // 0 to 10 visual progression level for plant growth and temple glow
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

export interface Practice {
  id: string;
  title: string;
  duration: string;
  category: string;
  goddess?: string;
  description: string;
  audioUrl?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  practices: Practice[];
}

export interface GoddessChamber {
  id: string;
  name: string;
  title: string;
  description: string;
  materials: string;
  light: string;
  sound: string;
  movement: string;
  atmosphere: string; // e.g. 'Warm', 'Cool'
  colorTheme: string; // Tailwind gradient/classes
  bgGradient: string;
  bgImage?: string;
}
