import type { NavItem } from "../types/content";

/* Preview mode.

   A static preview — an artifact, a file:// open, anything without a server
   that can rewrite unknown paths to index.html — has no router. Every route
   would 404 and the nav would navigate straight out of the preview.

   With VITE_HASH_ROUTES=true the same routes are emitted as hash fragments,
   which need no server at all. Production is unaffected: the flag is unset,
   every path stays exactly as it was, and this collapses to a no-op.

   Build a preview with:  VITE_HASH_ROUTES=true npx vite build --base ./ */
const HASH_ROUTES = import.meta.env?.VITE_HASH_ROUTES === "true";

/** Route path for the current mode. `/begin` stays `/begin`, or becomes `#/begin`. */
export const routePath = (path: string): string =>
  HASH_ROUTES ? `#${path}` : path;

export const SECTION_ANCHORS = {
  hero: routePath("/"),
  explore: "/#explore",
  method: "/#method",
  shadow: "/#shadow",
  pathway: "/#pathway",
  retreat: "/#retreat",
  begin: "/#begin",
} as const;

export const BEGIN_PATH = routePath("/begin");
export const SHALA_PATH = routePath("/shala");
export const OFFERINGS_PATH = routePath("/offerings");
export const ABOUT_SHEETAL_PATH = routePath("/about-sheetal");
export const TESTIMONIALS_PATH = routePath("/testimonials");
export const DANCING_WITH_DURGA_PATH = routePath("/dancing-with-durga");

/* Five items. Pathway and Retreat were anchors into the home page rather than
   destinations, and Shala is reached from Offerings, so they are no longer top
   level. /work-with-sheetal is not listed because the router serves it as an
   alias of /offerings — it was never a separate page. */
export const NAV_ITEMS: NavItem[] = [
  "About",
  "Offerings",
  "Dancing with Durga Devi",
  "Begin",
];

export const NAV_TARGETS: Record<NavItem, string> = {
  About: ABOUT_SHEETAL_PATH,
  Offerings: OFFERINGS_PATH,
  "Dancing with Durga Devi": DANCING_WITH_DURGA_PATH,
  Begin: BEGIN_PATH,
  Pathway: SECTION_ANCHORS.pathway,
  Retreat: SECTION_ANCHORS.retreat,
  Shala: SHALA_PATH,
};
