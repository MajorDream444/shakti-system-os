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
    id: "shakti",
    title: "Shakti",
    symbol: "Mountain",
    accent: "gold",
    summary: "Energy and inner power are treated as living material.",
    deeper:
      "Shakti names the living current of power and energy within the work. The question is not how to perform power, but how to relate to it with awareness, capacity, and devotion.",
    why:
      "When energy is noticed rather than suppressed or spilled, the seeker can begin to direct it with more discernment.",
    example:
      "A woman may notice where her energy leaks, where it gathers, and what actually nourishes rather than drains her.",
    fromSheetal:
      "Shakti remains the central current of the sanctuary and the method.",
    connectedTo: ["Shakti Waterfall", "Practice", "Sovereignty"],
    nextLabel: "Continue to Shadow",
  },
  {
    id: "shadow",
    title: "Shadow",
    symbol: "Fire",
    accent: "rajas",
    summary: "Hidden material is approached as doorway, not identity.",
    deeper:
      "Shadow work meets fear, shame, guilt, anger, grief, and bypassed material without turning pain into performance.",
    why:
      "The work asks a woman to meet what is actually there while remaining connected to the body and to enough containment.",
    example:
      "A repeated pattern may be named gently, then returned to sensation, relationship, and a next practical doorway.",
    fromSheetal:
      "The shadow is not the problem. It is the doorway.",
    connectedTo: ["Somatics", "Containment", "Integration"],
    nextLabel: "Continue to Sensuality",
  },
  {
    id: "sensuality",
    title: "Sensuality",
    symbol: "Lotus",
    accent: "pink",
    summary: "The senses are part of practice, not a marketing costume.",
    deeper:
      "Sensuality is held as sensory life, felt experience, pleasure, aliveness, and embodied contact. It stays connected to dignity and practice.",
    why:
      "The body is not only a place of pain or regulation. It is also where tenderness, desire, beauty, and choice become knowable.",
    example:
      "A movement or dance practice may help a woman feel, express, and transmute what has been held in the body.",
    fromSheetal:
      "Sensuality belongs to the senses and to embodied life; it is not flattened into sexuality marketing.",
    connectedTo: ["Body", "Movement", "Dance"],
    nextLabel: "Continue to Somatics",
  },
  {
    id: "somatics",
    title: "Somatics",
    symbol: "Water",
    accent: "water",
    summary: "The body becomes a place of listening, not performance.",
    deeper:
      "Somatic practice here means embodied awareness, pacing, nervous-system literacy, and truthful contact with what is present.",
    why:
      "When the body is included, a seeker can meet depth without abandoning herself to an idea of transformation.",
    example:
      "A practice may begin with grounding, sensation, and a small honest choice before moving toward larger insight.",
    fromSheetal:
      "The sanctuary holds somatic work as part of Shakti Shadow & Somatics, connected to care, shadow, and integration.",
    connectedTo: ["Nervous System", "Capacity", "Embodiment"],
    nextLabel: "Continue to Sovereignty",
  },
  {
    id: "sovereignty",
    title: "Sovereignty",
    symbol: "Temple Threshold",
    accent: "leaf",
    summary: "Sovereignty is a pillar and a direction, not a promise.",
    deeper:
      "Sovereignty points toward capacity, tools, landing space, inner power, and less dependence on external rescue without shaming dependency or promising transformation.",
    why:
      "The work does not ask a woman to become untouchable. It supports the practice of meeting life with more awareness, choice, and inner ground.",
    example:
      "A woman may begin to notice the moment before abandoning herself, then choose a steadier response.",
    fromSheetal:
      "Sovereignty is held as a direction of practice, not as a guaranteed outcome or superiority claim.",
    connectedTo: ["Shakti Waterfall", "Container", "Practice"],
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
  connectedTo: ["Shakti", "Shadow", "Sensuality", "Somatics", "Sovereignty"],
  nextLabel: "Explore the five pillars",
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
