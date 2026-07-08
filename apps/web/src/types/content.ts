export type NavItem = "Method" | "Shadow" | "Pathway" | "Retreat" | "Begin";

export type CtaCopy = {
  label: string;
  href: string;
};

export type HeroCopy = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
};

export type PhilosophyCopy = {
  label: string;
  headline: string;
  paragraphs: string[];
};

export type RitualCardCopy = {
  kicker: string;
  headline: string;
  body: string;
};

export type ReadinessCard = {
  title: string;
  body: string;
  cta?: boolean;
};

export type ReadinessCopy = {
  label: string;
  headline: string;
  copy: string;
  dashboardTitle: string;
  dashboardField: string;
  cards: ReadinessCard[];
};

export type PathwayStep = {
  title: string;
  body: string;
};

export type PathwayCopy = {
  label: string;
  headline: string;
  copy: string;
  steps: PathwayStep[];
};

export type Retreat = {
  title: string;
  body: string;
  image: string;
};

export type RetreatCopy = {
  label: string;
  headline: string;
  items: Retreat[];
};

export type FinalCtaCopy = {
  label: string;
  headline: string;
  body: string;
};

export type FooterCopy = {
  title: string;
  guide: string;
  method: string;
  pathway: string;
};
