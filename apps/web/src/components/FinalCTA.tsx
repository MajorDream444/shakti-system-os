import type { CSSProperties } from "react";
import { BEGIN_PATH, OFFERINGS_PATH } from "../constants/navigation";
import { portalCopy } from "../data/portalCopy";
import { portalImages } from "./PortalImageSlots";

export function FinalCTA() {
  return (
    <section className="final-cta" id="begin">
      <div
        className="final-bg"
        aria-hidden="true"
        style={{ "--final-image": `url(${portalImages.water})` } as CSSProperties}
      />
      <div className="final-content">
        <p className="label">{portalCopy.finalCta.label}</p>
        <h2>{portalCopy.finalCta.headline}</h2>
        <p>{portalCopy.finalCta.body}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={BEGIN_PATH}>
            {portalCopy.hero.primaryCta}
          </a>
          <a className="button button-secondary" href={OFFERINGS_PATH}>
            {portalCopy.hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
