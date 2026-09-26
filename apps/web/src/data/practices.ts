import type {
  FinalCtaCopy,
  PathwayCopy,
  ReadinessCopy,
} from "../types/content";

export const practicePillars = [
  "Shakti",
  "Shadow",
  "Sensuality",
  "Somatics",
  "Sovereignty",
];

export const readiness: ReadinessCopy = {
  label: "Readiness Map",
  headline: "A path before the retreat.",
  copy:
    "The retreat should not be the first commitment. It should be the deeper initiation inside a relationship that has already begun.",
  dashboardTitle: "Public Readiness Map",
  dashboardField: "Illustrative only",
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
      body: "Mantra · Yantra · Classical Shakta Tantra",
    },
    {
      title: "Community Field",
      body: "Moon cycles · Weekly rhythm · Practice",
    },
    {
      title: "Retreat Readiness",
      body: "Interest · Preparation · Human discernment",
    },
    {
      title: "Next Threshold",
      body: "Begin privately when you are ready",
      cta: true,
    },
  ],
};

export const pathway: PathwayCopy = {
  label: "The Pathway",
  /* The hero already asks "Is the goddess calling you?" — asking almost the
     same question again two screens later is the repetition the founder
     reported. This section's job is the four stages, so it says that. */
  headline: "How the work deepens.",
  copy:
    "The most powerful path is not always the most intense one.",
  steps: [
    {
      title: "Where You Are Now",
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
  body: "Start where you are. Let the path reveal the next threshold.",
};
