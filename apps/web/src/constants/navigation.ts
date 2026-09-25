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
export const DANCING_WITH_DURGA_PATH = "/dancing-with-durga";

/* Five items. Pathway and Retreat were anchors into the home page rather than
   destinations, and Shala is reached from Offerings, so they are no longer top
   level. /work-with-sheetal is not listed because the router serves it as an
   alias of /offerings — it was never a separate page. */
export const NAV_ITEMS: NavItem[] = [
  "About",
  "Offerings",
  "Dancing with Durga",
  "Begin",
];

export const NAV_TARGETS: Record<NavItem, string> = {
  About: ABOUT_SHEETAL_PATH,
  Offerings: OFFERINGS_PATH,
  "Dancing with Durga": DANCING_WITH_DURGA_PATH,
  Begin: BEGIN_PATH,
  Pathway: SECTION_ANCHORS.pathway,
  Retreat: SECTION_ANCHORS.retreat,
  Shala: SHALA_PATH,
};
