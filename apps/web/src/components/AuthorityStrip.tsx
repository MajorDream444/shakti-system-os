import { portalCopy } from "../data/portalCopy";

export function AuthorityStrip() {
  return (
    <section className="authority-section" aria-label="Authority pillars">
      <div className="container authority-grid">
        {portalCopy.pillars.map((pillar, index) => (
          <article className="authority-pillar" key={pillar}>
            <span>0{index + 1}</span>
            <h3>{pillar}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
