import { useRef } from "react";
import { SECTION_ANCHORS, SHALA_PATH } from "../constants/navigation";
import { portalCopy } from "../data/portalCopy";
import { useHeroParallax } from "../hooks/useHeroParallax";
import { MaskedHeadline } from "./MaskedHeadline";

export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  useHeroParallax(visualRef);

  return (
    <section className="hero" id="hero">
      <div className="hero-visual" ref={visualRef} aria-hidden="true" />
      <div className="hero-veils" aria-hidden="true" />
      <div className="hero-content">
        <p className="label ember-label">{portalCopy.hero.eyebrow}</p>
        <MaskedHeadline text={portalCopy.hero.headline} />
        <p className="hero-subheadline">{portalCopy.hero.subheadline}</p>
        <p className="hero-body">{portalCopy.hero.body}</p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href={SHALA_PATH}>
            {portalCopy.hero.primaryCta}
          </a>
          <a className="button button-secondary" href={SECTION_ANCHORS.method}>
            {portalCopy.hero.secondaryCta}
          </a>
        </div>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
