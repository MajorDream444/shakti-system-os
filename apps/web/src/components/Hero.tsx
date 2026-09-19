import { type CSSProperties } from "react";
import {
  BEGIN_PATH,
  DANCING_WITH_DURGA_PATH,
  OFFERINGS_PATH,
  SHALA_PATH,
} from "../constants/navigation";
import { dancingWithDurga } from "../data/dancingWithDurga";
import { portalCopy } from "../data/portalCopy";
import { PortalImageGallery } from "./PortalImageSlots";
import { portalImages } from "./PortalImageSlots";
import { LivingPortal } from "./LivingPortal";

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div
        className="hero-visual"
        aria-hidden="true"
        data-image-gate="founder-visual-source-v2-approved-candidate"
        data-asset-status="APPROVED_CANDIDATE"
        style={{ "--hero-image": `url(${portalImages.homeWorldCandidate})` } as CSSProperties}
      />
      <div className="hero-veils" aria-hidden="true" />
      <div className="hero-content">
        <p className="label ember-label">{portalCopy.hero.eyebrow}</p>
        {/* Exact founder-approved sacred asset remains gated. No substitute seal. */}
        <h1 className="hero-title">{portalCopy.hero.headline}</h1>
        <p className="hero-subheadline">{portalCopy.hero.subheadline}</p>
        <PortalImageGallery />
        <div className="hero-invitation-fork" aria-label="Two ways to enter the work">
          <a className="invitation-door" href={BEGIN_PATH}>
            <LivingPortal variant={2} />
            <span>Start Your Shakti Path</span>
            <small>Enter the eight-station threshold privately.</small>
          </a>
          <a className="invitation-door" href={OFFERINGS_PATH}>
            <LivingPortal variant={1} />
            <span>Work With Sheetal</span>
            <small>See free, self-guided, group, private, and retreat doorways.</small>
          </a>
        </div>
        <p className="hero-body">{portalCopy.hero.body}</p>
        <a className="hero-seasonal-doorway" href={DANCING_WITH_DURGA_PATH}>
          <span>
            <small>Navratri 2026</small>
            <strong>Dancing with Durga</strong>
          </span>
          <span>
            {dancingWithDurga.format} · {dancingWithDurga.timing}
          </span>
          <b>Enter the devotional container</b>
        </a>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href={BEGIN_PATH}>
            {portalCopy.hero.primaryCta}
          </a>
          <a className="button button-secondary" href={OFFERINGS_PATH}>
            {portalCopy.hero.secondaryCta}
          </a>
          <a className="button button-tertiary" href={SHALA_PATH}>
            Enter Sri Shakti Shala
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
