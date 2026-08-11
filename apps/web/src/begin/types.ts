export type PathType = 'CIRCLE' | 'ONE_ON_ONE' | 'CONTAINER' | 'RETREAT';

export interface Choice {
  id: string;
  text: string;
  scores: Partial<Record<PathType, number>>;
}

export interface AppState {
  currentScreen: number;
  scores: Record<PathType, number>;
  selections: Record<number, string>;
  longings: string[];
  reflection: string;
}

export const PATH_RESULTS: Record<PathType, {
  headline: string;
  reflection: string;
  nextStep: string;
  primaryCTA: string;
  secondaryCTA: string;
}> = {
  CIRCLE: {
    headline: "Your clearest doorway may be rhythm.",
    reflection: "You may be seeking a place to return — steady practice, shared presence, and community rhythm without needing to enter the deepest work all at once.",
    nextStep: "Weekly Shakti Circle",
    primaryCTA: "Explore the Weekly Circle",
    secondaryCTA: "Begin with the Self-Audit"
  },
  ONE_ON_ONE: {
    headline: "Your clearest doorway may be focused support.",
    reflection: "You may be moving through something specific that wants personal attention, reflection, and a space where your body can be met with care.",
    nextStep: "1:1 Somatic / Shadow Support",
    primaryCTA: "Explore 1:1 Support",
    secondaryCTA: "Begin with the Self-Audit"
  },
  CONTAINER: {
    headline: "Your clearest doorway may be structured depth.",
    reflection: "You may be ready for a more committed container where shadow, somatics, and Shakti practice can unfold with steadiness.",
    nextStep: "9-Session Shakti Shadow & Somatics Container",
    primaryCTA: "Learn About the Container",
    secondaryCTA: "Begin with the Self-Audit"
  },
  RETREAT: {
    headline: "Retreat may be calling — and readiness matters.",
    reflection: "You may feel the pull toward immersion. The next step is to discern whether your body, schedule, and life season are ready to be held by that depth.",
    nextStep: "Retreat Readiness Pathway",
    primaryCTA: "See if Retreat Is Aligned",
    secondaryCTA: "Begin with the Self-Audit"
  }
};
