import { useRef, type CSSProperties } from "react";
import { BEGIN_PATH, OFFERINGS_PATH, SHALA_PATH } from "../constants/navigation";
import { portalCopy } from "../data/portalCopy";
import { useHeroParallax } from "../hooks/useHeroParallax";
import { PortalImageGallery, portalImages } from "./PortalImageSlots";

export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  useHeroParallax(visualRef);

  return (
    <section className="hero" id="hero">
      <div
        className="hero-visual"
        ref={visualRef}
        aria-hidden="true"
        style={{ "--hero-image": `url(${portalImages.hero})` } as CSSProperties}
      />
      <div className="hero-veils" aria-hidden="true" />
      <div className="hero-content">
        <p className="label ember-label">{portalCopy.hero.eyebrow}</p>
        <div className="hero-lotus-seal" aria-hidden="true" />
        <h1 className="hero-title">{portalCopy.hero.headline}</h1>
        <p className="hero-subheadline">{portalCopy.hero.subheadline}</p>
        <PortalImageGallery />
        <div className="hero-invitation-fork" aria-label="Two ways to enter the work">
          <a className="invitation-door" href={BEGIN_PATH}>
            <span>Start Your Shakti Path</span>
            <small>Enter the eight-station threshold privately.</small>
          </a>
          <a className="invitation-door" href={OFFERINGS_PATH}>
            <span>Work With Sheetal</span>
            <small>See free, self-guided, group, private, and retreat doorways.</small>
          </a>
        </div>
        <p className="hero-body">{portalCopy.hero.body}</p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href={BEGIN_PATH}>
            {portalCopy.hero.primaryCta}
          </a>
          <a className="button button-secondary" href={OFFERINGS_PATH}>
            {portalCopy.hero.secondaryCta}
          </a>
          <a className="button button-tertiary" href={SHALA_PATH}>
            Enter Shakti Shala
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
