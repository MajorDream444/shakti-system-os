export type PathType = 'CIRCLE' | 'ONE_ON_ONE' | 'CONTAINER' | 'RETREAT';

export interface Choice {
  id: string;
  text: string;
  scores: Partial<Record<PathType, number>>;
}

export interface AppState {
  beginSessionId: string;
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
  /* Shakti Moon Circles, fortnightly — NOT the weekly circle this said until
     29 September.

     Her own seeker email (SSSEMAILS_27Sep_SK) describes it as "Shakti Moon
     Circles, our gathering every fortnight around the lunar cycle." The site
     said "Weekly Shakti Circle". Two different offers, and the older one was
     wrong: a woman routed here would have been told to expect a gathering
     twice as often as it happens.

     Her copy is the newer source, and it is the one she is sending, so it
     wins. The rhythm is also the point — fortnightly IS the lunar cycle, new
     moon to full, which "weekly" severs from the thing that gives it meaning. */
  CIRCLE: {
    headline: "Your clearest doorway may be rhythm.",
    reflection: "You may be seeking a place to return — steady practice, shared presence, and community rhythm without needing to enter the deepest work all at once.",
    nextStep: "Shakti Moon Circles",
    primaryCTA: "Explore the Moon Circles",
    secondaryCTA: "Begin Where You Are"
  },
  ONE_ON_ONE: {
    headline: "Your clearest doorway may be focused support.",
    reflection: "You may be moving through something specific that wants personal attention, reflection, and a space where your body can be met with care.",
    nextStep: "Private Work With Sheetal",
    primaryCTA: "Request a Private Container",
    secondaryCTA: "Begin Where You Are"
  },
  CONTAINER: {
    headline: "Your clearest doorway may be structured depth.",
    reflection: "You may be ready for a more committed container where shadow, somatics, and Shakti practice can unfold with steadiness.",
    nextStep: "9-Session Shakti Shadow & Somatics Container",
    primaryCTA: "Learn About the Container",
    secondaryCTA: "Begin Where You Are"
  },
  RETREAT: {
    headline: "Retreat may be calling — and readiness matters.",
    reflection: "You may feel the pull toward immersion. The next step is to discern whether your body, schedule, and life season are ready to be held by that depth.",
    nextStep: "Retreat Readiness Pathway",
    primaryCTA: "See if Retreat Is Aligned",
    secondaryCTA: "Begin Where You Are"
  }
};
