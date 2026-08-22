import { useRef } from "react";
import { portalCopy } from "../data/portalCopy";
import { usePlaneProgress } from "../hooks/usePlaneProgress";

export function ReadinessMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePlaneProgress(rootRef);

  return (
    <section className="section readiness-section" aria-label="Readiness Map">
      <div className="container readiness-layout">
        <div className="section-copy readiness-copy">
          <p className="label">{portalCopy.readiness.label}</p>
          <h2>{portalCopy.readiness.headline}</h2>
          <p>{portalCopy.readiness.copy}</p>
        </div>
        <div className="perspective-root" ref={rootRef}>
          <div className="readiness-plane">
            <div className="readiness-map-header">
              <span className="readiness-map-dot" />
              <h3>{portalCopy.readiness.dashboardTitle}</h3>
              <span>{portalCopy.readiness.dashboardField}</span>
            </div>
            <p className="readiness-map-note">
              This is an illustration, not you. It does not score, rank, or diagnose a seeker.
            </p>
            <div className="readiness-map-grid">
              {portalCopy.readiness.cards.map((card) => (
                <article
                  className={`readiness-map-card ${card.cta ? "readiness-map-card-cta" : ""}`}
                  key={card.title}
                >
                  <span>{card.title}</span>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
