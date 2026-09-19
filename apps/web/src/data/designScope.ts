export const publicReviewRoutes = ["/", "/begin", "/shala", "/offerings", "/about-sheetal", "/testimonials", "/dancing-with-durga"] as const;

// System decisions require route-wide evidence, not just a component screenshot.
export const designScope = [
  "living-form", "shakti-portal", "sacred-threshold", "readability",
  "symbol-provenance", "image-repetition",
].map(id => ({ id, scope: "SYSTEM" as const, routes: publicReviewRoutes }));
