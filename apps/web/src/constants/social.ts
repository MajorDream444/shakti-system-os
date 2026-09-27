/* Her public channels.

   Founder direction, 2026-09-27: "Connect the socials — the socials also give
   a lot of information." Two Instagram accounts: the Shala's and her own.

   The Shala comes first. The site is the school's front door, and her own
   direction was that people should come for the vision rather than for her.

   Substack is expected but not listed yet — the details are still to come
   from her, and a dead icon is worse than a missing one. */
export type SocialLink = {
  id: string;
  label: string;
  href: string;
  handle: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram-shala",
    label: "Sri Shakti Shala on Instagram",
    href: "https://www.instagram.com/srishaktishala/",
    handle: "@srishaktishala",
  },
  {
    id: "instagram-sheetal",
    label: "Sheetal Kandola on Instagram",
    href: "https://www.instagram.com/sheetalkandola/",
    handle: "@sheetalkandola",
  },
];
