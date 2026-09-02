export type LivingDoorway = {
  id: string;
  title: string;
  symbol: string;
  accent: "leaf" | "gold" | "pink" | "water" | "rajas";
  summary: string;
  deeper: string;
  why: string;
  example: string;
  fromSheetal: string;
  connectedTo: string[];
  nextLabel: string;
};

export const knowledgeDoorways: LivingDoorway[] = [
  {
    id: "neuroscience",
    title: "Neuroscience",
    symbol: "Mountain",
    accent: "gold",
    summary: "The body is not treated as a problem to override.",
    deeper:
      "This doorway names the nervous system as part of the path: breath, rhythm, protection, capacity, and integration are held together before a seeker is asked to go deeper.",
    why:
      "Depth work becomes safer when the seeker can notice activation and pacing instead of mistaking intensity for readiness.",
    example:
      "A woman may feel a strong pull toward retreat, but the first invitation may be steadiness, practice, and relationship before immersion.",
    fromSheetal:
      "Sheetal's work keeps spiritual depth in conversation with nervous-system literacy and lived discernment.",
    connectedTo: ["Self-Audit", "Container", "Retreat Practice"],
    nextLabel: "Continue to Somatics",
  },
  {
    id: "somatics",
    title: "Somatics",
    symbol: "Water",
    accent: "water",
    summary: "The body becomes a place of listening, not performance.",
    deeper:
      "Somatic practice here means embodied awareness, pacing, and truthful contact with what is present. It is not spectacle and it is not a generic wellness technique.",
    why:
      "When the body is included, a seeker can meet shadow material without abandoning herself to an idea of transformation.",
    example:
      "A practice may begin with grounding, sensation, and a small honest choice before moving toward larger insight.",
    fromSheetal:
      "The sanctuary holds somatic work as part of Shakti Shadow & Somatics, connected to care, shadow, and integration.",
    connectedTo: ["Neuroscience", "Shadow Work", "Self-Audit"],
    nextLabel: "Continue to Shadow Work",
  },
  {
    id: "shadow-work",
    title: "Shadow Work",
    symbol: "Fire",
    accent: "rajas",
    summary: "The shadow is approached as doorway, not identity.",
    deeper:
      "Shadow work is present but not over-indexed. The point is not to dramatize pain; it is to make hidden material visible enough to be met with steadiness.",
    why:
      "A seeker needs language and containment before intensity. The system keeps shadow connected to body, relationship, and preparation.",
    example:
      "A repeated pattern may be named gently, then returned to the body and the next practical doorway.",
    fromSheetal:
      "The public language remains restrained: truthful self-encounter, not performance or spiritual urgency.",
    connectedTo: ["Somatics", "Container", "Community"],
    nextLabel: "Continue to Classical Shakta Tantra",
  },
  {
    id: "classical-shakti-tantra",
    title: "Classical Shakta Tantra",
    symbol: "Sacred Geometry",
    accent: "pink",
    summary: "Lineage is treated with precision and restraint.",
    deeper:
      "This doorway holds mantra, yantra, goddess pathways, and devotional intelligence as approved teaching material, never as generated invention.",
    why:
      "Sacred symbols carry meaning. They are placed intentionally, not used as wallpaper or generic spiritual decoration.",
    example:
      "Approved sacred geometry will appear only after source and founder review, held as a doorway into union rather than a decorative motif.",
    fromSheetal:
      "The teaching stays precise: goddess, mantra, and symbol are approached with reverence, context, and restraint.",
    connectedTo: ["Goddess Pathways", "Temple Library", "Shala Threshold"],
    nextLabel: "Continue to Diaspora Identity",
  },
  {
    id: "diaspora-identity",
    title: "Diaspora Identity",
    symbol: "Lotus",
    accent: "leaf",
    summary: "Culture and lived place belong in the doorway.",
    deeper:
      "This chamber is intentionally held lightly until Sheetal's direct source material can carry the depth of this subject.",
    why:
      "The system names lived cultural context with care, without turning identity into a flattened teaching claim.",
    example:
      "The public doorway can name culture, migration, and belonging without reducing them to a single story.",
    fromSheetal:
      "Lineage, place, and belonging are treated as living context, not brand decoration.",
    connectedTo: ["Founder Presence", "Community", "Retreat Practice"],
    nextLabel: "Continue to Retreat Practice",
  },
  {
    id: "retreat-practice",
    title: "Retreat Practice",
    symbol: "Temple Threshold",
    accent: "gold",
    summary: "Interest is not the same as readiness.",
    deeper:
      "Retreat is framed as a deeper embodied container that asks for preparation, relationship, and human discernment.",
    why:
      "A living sanctuary does not turn spiritual depth into instant consumption. The doorway can be requested, but readiness is held by people.",
    example:
      "A seeker can express interest and receive the next preparation path without being told she is approved for retreat.",
    fromSheetal:
      "The retreat doorway remains careful: preparation before invitation, human review before deeper access.",
    connectedTo: ["Container", "Readiness Map", "Shakti Shala"],
    nextLabel: "Return to the front door",
  },
];

export const methodDoorway: LivingDoorway = {
  id: "method",
  title: "The Method",
  symbol: "Body · Shadow · Lineage",
  accent: "gold",
  summary: "Shakti Shadow & Somatics is the bridge, not a slogan.",
  deeper:
    "The method holds nervous-system literacy, somatic practice, shadow integration, and Shakti practice together so the seeker is not asked to split clinical clarity from devotion.",
  why:
    "The path needs enough structure to be trustworthy and enough softness to remain human.",
  example:
    "A seeker may begin with reflection, meet a body signal, notice a shadow pattern, and be returned to a doorway that matches capacity.",
  fromSheetal:
    "This work begins beneath surface wellness and returns the seeker to truth in the body.",
    connectedTo: ["Neuroscience", "Somatics", "Shadow Work", "Classical Shakta Tantra"],
  nextLabel: "Explore the six doorways",
};

export const pathwayDoorways: LivingDoorway[] = [
  {
    id: "self-audit",
    title: "Self-Audit",
    symbol: "Water",
    accent: "water",
    summary: "Orientation, not diagnosis.",
    deeper:
      "The self-audit asks enough to return a doorway with care. It does not rank the seeker, label her, or expose scores.",
    why:
      "Reflection should create continuity without becoming surveillance.",
    example:
      "After Begin, the seeker sees language like 'Based on what you've shared,' not a number or an authority claim.",
    fromSheetal:
      "The path begins by listening before asking a seeker to enter anything deeper.",
    connectedTo: ["Begin", "Personal Shakti Path Reflection", "Privacy"],
    nextLabel: "Start Your Shakti Path",
  },
  {
    id: "community",
    title: "Community",
    symbol: "Moon",
    accent: "leaf",
    summary: "Rhythm, relationship, and shared practice.",
    deeper:
      "Community is not a generic membership layer. It is a held rhythm for witnessing, practice, and orientation.",
    why:
      "A seeker may need relationship and repetition before a deeper container is appropriate.",
    example:
      "Moon rhythm can provide context, but it does not become spiritual authority or automated approval.",
    fromSheetal:
      "The community doorway stays human and relational.",
    connectedTo: ["Practice", "Moon Rhythm", "Fire Circle"],
    nextLabel: "Explore Container",
  },
  {
    id: "container",
    title: "Container",
    symbol: "Temple Threshold",
    accent: "pink",
    summary: "Deeper work requires preparation.",
    deeper:
      "The container doorway explains why access is not instant consumption: deeper work asks for pacing, relationship, and discernment.",
    why:
      "A strong container protects intimacy from becoming automation.",
    example:
      "A guide request may begin human review, but the client cannot grant herself access through the browser.",
    fromSheetal:
      "The practitioner teaches. AI prepares. Humans steward.",
    connectedTo: ["Guide Request", "Shala", "Access States"],
    nextLabel: "Explore Retreat",
  },
  {
    id: "retreat",
    title: "Retreat",
    symbol: "Mountain",
    accent: "gold",
    summary: "A request, not a checkout.",
    deeper:
      "Retreat interest can be expressed, but readiness remains a human discernment process. The public doorway explains preparation without promising approval.",
    why:
      "Retreat is a deeper embodied container, not a generic funnel or instant transaction.",
    example:
      "The system may receive a signal for review; it must not create retreat approval, payment state, or initiation access.",
    fromSheetal:
      "Interest is welcomed. Readiness is held with care.",
    connectedTo: ["Retreat Practice", "Requests & Signals", "Human Review"],
    nextLabel: "Request the next conversation",
  },
];
