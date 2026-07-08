import type {
  FinalCtaCopy,
  PathwayCopy,
  ReadinessCopy,
} from "../types/content";

export const practicePillars = [
  "Neuroscience",
  "Somatics",
  "Shadow Work",
  "Classical Tantra",
  "Diaspora Identity",
  "Retreat Practice",
];

export const readiness: ReadinessCopy = {
  label: "Readiness Map",
  headline: "A path before the retreat.",
  copy:
    "The retreat should not be the first commitment. It should be the deeper initiation inside a relationship that has already begun.",
  dashboardTitle: "Readiness Map",
  dashboardField: "Private Field",
  cards: [
    {
      title: "Body Signal",
      body: "Breath · Nervous System · Somatic Awareness",
    },
    {
      title: "Shadow Pattern",
      body: "The hidden material beneath the surface",
    },
    {
      title: "Lineage Thread",
      body: "Mantra · Yantra · Classical Shakti Tantra",
    },
    {
      title: "Community Field",
      body: "Moon cycles · Weekly rhythm · Practice",
    },
    {
      title: "Retreat Readiness",
      body: "Warm · Aligned · Prepared",
    },
    {
      title: "Next Threshold",
      body: "Start Your Shakti Path",
      cta: true,
    },
  ],
};

export const pathway: PathwayCopy = {
  label: "The Pathway",
  headline: "Self-Audit -> Community -> Container -> Retreat",
  copy:
    "The path begins with reflection, warms through rhythm, deepens through container, and arrives at retreat prepared.",
  steps: [
    {
      title: "Self-Audit",
      body: "Name the pattern and locate what the body already knows.",
    },
    {
      title: "Community",
      body: "Enter a field of rhythm, witnessing, and shared practice.",
    },
    {
      title: "Container",
      body: "Deepen through guided shadow work and somatic integration.",
    },
    {
      title: "Retreat",
      body: "Arrive prepared for a deeper initiation, not a first encounter.",
    },
  ],
};

export const finalCta: FinalCtaCopy = {
  label: "Begin",
  headline: "Begin Your Shakti Path.",
  body: "Start with the self-audit. Let the path reveal the next threshold.",
};
