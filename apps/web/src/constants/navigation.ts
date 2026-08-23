import type { NavItem } from "../types/content";

export const SECTION_ANCHORS = {
  hero: "/",
  explore: "/#explore",
  method: "/#method",
  shadow: "/#shadow",
  pathway: "/#pathway",
  retreat: "/#retreat",
  begin: "/#begin",
} as const;

export const BEGIN_PATH = "/begin";
export const SHALA_PATH = "/shala";
export const OFFERINGS_PATH = "/offerings";
export const ABOUT_SHEETAL_PATH = "/about-sheetal";
export const TESTIMONIALS_PATH = "/testimonials";

export const NAV_ITEMS: NavItem[] = [
  "Offerings",
  "About",
  "Pathway",
  "Retreat",
  "Begin",
  "Shala",
];

export const NAV_TARGETS: Record<NavItem, string> = {
  Offerings: OFFERINGS_PATH,
  About: ABOUT_SHEETAL_PATH,
  Pathway: SECTION_ANCHORS.pathway,
  Retreat: SECTION_ANCHORS.retreat,
  Begin: BEGIN_PATH,
  Shala: SHALA_PATH,
};
