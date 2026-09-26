import { type CSSProperties } from "react";
import { BEGIN_PATH, DANCING_WITH_DURGA_PATH } from "../constants/navigation";
import { portalCopy } from "../data/portalCopy";
import { portalImages } from "./PortalImageSlots";

/* Founder-approved homepage hero, 2026-09-25 (direction A).

   The brief was a ten-second test: a stranger should know what this is, who it
   is for, and where to go, without scrolling. So the hero carries five things
   and nothing else — name, what it is, a question, who it is for, two doors.

   Two deliberate absences. There is no photograph of Sheetal above the fold:
   "I don't care about people coming because of me, they should come because of
   the vision." And the image is a real place rather than a render: "that first
   page should be simple and realistic", with the stylised imagery kept for
   deeper in, once someone has already leaned in. */
export function Hero() {
  return (
    <section className="hero hero-threshold" id="hero">
      <div
        className="hero-threshold-visual"
        aria-hidden="true"
        style={{ "--hero-image": `url(${portalImages.founderHolySpring})` } as CSSProperties}
      />
      <div className="hero-threshold-scrim" aria-hidden="true" />

      <div className="hero-threshold-content">
        <h1 className="hero-threshold-title">{portalCopy.hero.headline}</h1>
        <p className="hero-threshold-descriptor">{portalCopy.hero.eyebrow}</p>
        <p className="hero-threshold-question">{portalCopy.hero.subheadline}</p>
        <p className="hero-threshold-body">{portalCopy.hero.body}</p>

        <div className="hero-threshold-doors" aria-label="Two ways to enter">
          <a className="hero-door hero-door-primary" href={BEGIN_PATH}>
            {portalCopy.hero.primaryCta}
          </a>
          <a className="hero-door hero-door-secondary" href={DANCING_WITH_DURGA_PATH}>
            {portalCopy.hero.secondaryCta}
          </a>
        </div>
      </div>

      <p className="hero-threshold-season">{portalCopy.hero.seasonalLine}</p>
    </section>
  );
}
