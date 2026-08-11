import { BEGIN_PATH, SECTION_ANCHORS } from "../constants/navigation";
import { portalCopy } from "../data/portalCopy";

export function FinalCTA() {
  return (
    <section className="final-cta" id="begin">
      <div className="final-bg" aria-hidden="true" />
      <div className="final-content">
        <p className="label">{portalCopy.finalCta.label}</p>
        <h2>{portalCopy.finalCta.headline}</h2>
        <p>{portalCopy.finalCta.body}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={BEGIN_PATH}>
            {portalCopy.hero.primaryCta}
          </a>
          <a className="button button-secondary" href={SECTION_ANCHORS.method}>
            {portalCopy.hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
