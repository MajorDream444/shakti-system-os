import { BEGIN_PATH } from "../constants/navigation";
import { dancingWithDurga } from "../data/dancingWithDurga";
import { PageShell } from "./PageShell";
import { portalImages } from "./PortalImageSlots";

export function DancingWithDurgaPage() {
  return (
    <PageShell className="durga-page">
      <section className="durga-hero" aria-labelledby="durga-title">
        <div className="durga-hero-flame" aria-hidden="true" />
        <div className="container durga-hero-grid">
          <div className="durga-hero-copy">
            <p className="label">Navratri 2026 / Founder-confirmed launch foundation</p>
            <h1 id="durga-title">{dancingWithDurga.title}</h1>
            <p className="durga-subtitle">{dancingWithDurga.subtitle}</p>
            <p>
              A bold, devotional Maa Durga container for women learning to trust
              the body, stand up, say no, protect what is sacred, and stop
              abandoning themselves.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={`${BEGIN_PATH}?intent=community`}>
                {dancingWithDurga.cta}
              </a>
            </div>
            <p className="durga-boundary">{dancingWithDurga.boundary}</p>
          </div>

          <aside className="durga-experience-panel" aria-label="Dancing with Durga experience">
            <div className="durga-sacred-slot" aria-hidden="true">
              <span className="durga-trident-mark" aria-hidden="true" />
            </div>
            <div className="durga-panel-altar" aria-hidden="true">
              <span />
              <i />
            </div>
            <span>{dancingWithDurga.campaignLine}</span>
            <ul>
              <li>{dancingWithDurga.audience}</li>
              <li>{dancingWithDurga.format}</li>
              <li>{dancingWithDurga.timing}</li>
              <li>{dancingWithDurga.practices.join(" · ")}</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section durga-founder-field" aria-labelledby="durga-founder-title">
        <div className="container durga-founder-grid">
          <figure className="durga-founder-portrait">
            <img
              src={portalImages.durgaFounder}
              alt="Sheetal Kandola in a green field"
              loading="lazy"
            />
          </figure>
          <div className="durga-founder-copy">
            <p className="label">Practitioner Presence</p>
            <h2 id="durga-founder-title">Held by Sheetal. Centered on Maa Durga.</h2>
            <p>{dancingWithDurga.founderRole}</p>
            <div className="durga-motif-line" aria-label="Campaign motifs">
              {dancingWithDurga.motifs.map((motif) => (
                <span key={motif}>{motif}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section durga-message" aria-labelledby="durga-message-title">
        <div className="container durga-message-grid">
          <div className="section-copy">
            <p className="label">Central Message</p>
            <h2 id="durga-message-title">Durga teaches devotion with a spine.</h2>
          </div>
          <div className="durga-essence-list">
            {dancingWithDurga.essence.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section durga-gates" aria-labelledby="durga-gates-title">
        <div className="container">
          <div className="section-heading">
            <p className="label">Nine Nights / Five Live Gates</p>
            <h2 id="durga-gates-title">A Navratri rhythm through the Navadurgas.</h2>
            <p>
              The five live gatherings carry the spine of the container. The
              four non-live nights receive shorter mantra, audio transmission,
              reflection, or embodiment practice so all nine forms are honored
              without requiring a live gathering every evening.
            </p>
          </div>
          <div className="durga-gate-list">
            {dancingWithDurga.liveGates.map((gate, index) => (
              <article
                className="durga-gate-card"
                data-element={dancingWithDurga.gateElements[index]}
                key={`${gate.date}-${gate.goddess}`}
              >
                <i aria-hidden="true" />
                <span>{gate.date}</span>
                <h3>{gate.gate}</h3>
                <strong>{gate.goddess}</strong>
                <p>{gate.themes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section durga-investment" aria-labelledby="durga-investment-title">
        <div className="container durga-investment-grid">
          <div className="section-copy">
            <p className="label">Investment / Access</p>
            <h2 id="durga-investment-title">Accessible entry, held carefully.</h2>
            <p>
              Early Devotion is available for the first nine women in each region.
              Registration and payment are not open yet.
            </p>
          </div>
          <div className="durga-price-panel">
            {dancingWithDurga.investment.map((price) => (
              <article key={price.region}>
                <span>{price.region}</span>
                <strong>{price.early}</strong>
                <p>{price.standard}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="container durga-access-list" aria-label="Access notes">
          {dancingWithDurga.access.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="section durga-shala-doorway" aria-labelledby="durga-doorway-title">
        <div className="container durga-doorway-grid">
          <div className="durga-doorway-visual" aria-hidden="true">
            <span />
          </div>
          <div className="section-copy">
            <p className="label">Shakti Shala Doorway</p>
            <h2 id="durga-doorway-title">Experience first. Discern what continues.</h2>
            <p>
              Dancing with Durga opens temporary community and Shala space during
              the journey. Continuing into Shakti Shala remains a separate
              invitation, simple application, human discernment, and paid
              membership.
            </p>
          </div>
        </div>
      </section>

      <section className="section durga-visual-world" aria-labelledby="durga-visual-title">
        <div className="container durga-visual-grid">
          <div className="section-copy">
            <p className="label">Visual World</p>
            <h2 id="durga-visual-title">Durga. Durga. Durga.</h2>
            <p>
              The campaign should feel powerful, earthy, visceral, and devotional.
              Maa Durga remains at the center. Generated imagery and sacred
              depictions are review references only until Sheetal approves the
              final assets.
            </p>
          </div>
          <div className="durga-rule-grid">
            {dancingWithDurga.visualRules.map((rule) => (
              <span key={rule}>{rule}</span>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
