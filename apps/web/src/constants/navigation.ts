import type { NavItem } from "../types/content";

export const SECTION_ANCHORS = {
  hero: "#hero",
  method: "#method",
  shadow: "#shadow",
  pathway: "#pathway",
  retreat: "#retreat",
  begin: "#begin",
} as const;

export const SHALA_PATH = "/shala";

export const NAV_ITEMS: NavItem[] = [
  "Method",
  "Shadow",
  "Pathway",
  "Retreat",
  "Begin",
];

export const NAV_TARGETS: Record<NavItem, string> = {
  Method: SECTION_ANCHORS.method,
  Shadow: SECTION_ANCHORS.shadow,
  Pathway: SECTION_ANCHORS.pathway,
  Retreat: SECTION_ANCHORS.retreat,
  Begin: SHALA_PATH,
};
