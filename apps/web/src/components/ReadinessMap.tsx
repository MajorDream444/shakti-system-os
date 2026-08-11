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
          <div className="plane">
            <div className="dashboard-header">
              <span className="interface-dot" />
              <h3>{portalCopy.readiness.dashboardTitle}</h3>
              <span>{portalCopy.readiness.dashboardField}</span>
            </div>
            <div className="dashboard-grid">
              {portalCopy.readiness.cards.map((card) => (
                <article
                  className={`dashboard-card gradient-shell ${card.cta ? "cta-card" : ""}`}
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
