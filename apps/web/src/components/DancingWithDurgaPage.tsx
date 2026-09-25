import { BEGIN_PATH } from "../constants/navigation";
import { dancingWithDurga } from "../data/dancingWithDurga";
import { PageShell } from "./PageShell";
import { portalImages } from "./PortalImageSlots";
import { trackAnonymousEvent } from "../services/AnonymousAnalytics";
import { CeremonialForm } from "./CeremonialForm";

/* One line per option, stating plainly who it is for. Derived from the option
   id rather than added to commerce.ts, so the frozen commerce release is not
   edited for display copy. */
const PAYMENT_AUDIENCE: Record<string, string> = {
  global: "Outside India",
  india: "Indian citizens",
};

function PaymentOptions({ heading = "Reserve your place" }: { heading?: string }) {
  return (
    <div className="durga-payment">
      <p className="durga-payment-heading">{heading}</p>
      <div className="durga-payment-cards">
        {dancingWithDurga.paymentOptions.map((option) => (
          <div className="durga-payment-card" key={option.id}>
            <p className="durga-payment-audience">{PAYMENT_AUDIENCE[option.id]}</p>
            <p className="durga-payment-price">{option.price}</p>
            <a
              className="durga-payment-action"
              data-payment-region={option.id}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAnonymousEvent("stripe_storefront_clicked")}
            >
              Pay now <span aria-hidden="true">→</span>
            </a>
          </div>
        ))}
      </div>
      <p className="durga-payment-help">
        Secure payment via Stripe. Questions first?{" "}
        <a
          href={`${BEGIN_PATH}?intent=community`}
          onClick={() => trackAnonymousEvent("request_details_clicked")}
        >
          {dancingWithDurga.cta}
        </a>
      </p>
    </div>
  );
}

/* The data title carries both the name and the teaching ("Dancing with Durga:
   Devotion with a Spine"). Shown as two lines so the name stays the headline
   and the teaching does not force a four-line hero. */
const [DURGA_NAME, DURGA_TEACHING] = (() => {
  const [name, ...rest] = dancingWithDurga.title.split(":");
  return [name.trim(), rest.join(":").trim()];
})();

export function DancingWithDurgaPage() {
  return (
    <PageShell className="durga-page">
      <section className="durga-hero" aria-labelledby="durga-title">
        <div className="durga-hero-flame" aria-hidden="true" />
        <div className="container durga-hero-grid">
          {/* Source order is title, artwork, details. On desktop the grid
              lifts the artwork into its own column; on a phone the page reads
              in this order, so the artwork sits directly under the title
              instead of below the checkout. */}
          <div className="durga-hero-title">
            <p className="label">Navratri 2026 · {dancingWithDurga.campaignLine}</p>
            <h1 id="durga-title">
              {DURGA_NAME}
              <span>{DURGA_TEACHING}</span>
            </h1>
            <p className="durga-subtitle">{dancingWithDurga.subtitle}</p>
          </div>

          <figure className="durga-hero-art">
            <div className="durga-hero-art-frame">
              <img
                src={portalImages.durgaApprovedArtwork}
                alt="Traditional devotional artwork of Maa Durga with her lion and accompanying deities"
              />
            </div>
            <figcaption>
              May the fierce and tender grace of Maa Durga awaken what is yours
              to reclaim.
            </figcaption>
          </figure>

          <div className="durga-hero-copy">
            <p>
              A devotional Maa Durga container for women learning to trust the
              body, stand up, say no, and protect what is sacred.
            </p>
            <ul className="durga-hero-facts" aria-label="Dancing with Durga format">
              <li><span>Container</span>{dancingWithDurga.audience}</li>
              <li><span>Rhythm</span>{dancingWithDurga.format}</li>
              <li><span>Time</span>{dancingWithDurga.timing}</li>
              <li><span>Practice</span>{dancingWithDurga.practices.join(" · ")}</li>
            </ul>
            <PaymentOptions />
          </div>

        </div>
      </section>

      <section className="section durga-founder-field" aria-labelledby="durga-founder-title">
        <div className="container durga-founder-grid">
          <figure className="durga-founder-portrait">
            <img
              src={portalImages.durgaFounder}
              alt="Sheetal Kandola wearing a red veil"
              loading="lazy"
            />
          </figure>
          <div className="durga-founder-copy">
            <p className="label">Practitioner Presence</p>
            <h2 id="durga-founder-title">Held by Sheetal. Centered on Maa Durga.</h2>
            <p>{dancingWithDurga.founderRole}</p>
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
          <div className="durga-teaching-note">
            <p>{dancingWithDurga.teachingEmphasis}</p>
            <blockquote>{dancingWithDurga.lotusSword}</blockquote>
            <p>
              Durga holds lotus and sword together: love with a spine,
              devotion with discernment, and feminine power in service of Dharma.
            </p>
          </div>
        </div>
      </section>

      <section className="section durga-gates" aria-labelledby="durga-gates-title">
        <div className="container">
          <div className="durga-nine-forms-intro">
            <div className="section-heading">
              <p className="label">Nine Nights / Four Live Gatherings</p>
              <h2 id="durga-gates-title">A Navratri rhythm through the Navadurgas.</h2>
              <p>
                The four live gatherings carry the spine of the container. The
                five practice nights receive shorter mantra, audio transmission,
                reflection, or embodiment practice so all nine forms are honored
                without requiring a live gathering every evening.
              </p>
            </div>
            <figure className="durga-nine-forms-art">
              <img
                src={portalImages.durgaNineFormsArtwork}
                alt="Traditional devotional artwork showing the nine forms of Durga"
                loading="lazy"
              />
            </figure>
          </div>
          <div className="durga-gate-list">
            {dancingWithDurga.ritualGates.map((gate, index) => (
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
            <p className="label">Investment</p>
            <h2 id="durga-investment-title">Accessible entry, held carefully.</h2>
            <PaymentOptions heading="Choose the option that applies to you" />
          </div>
        </div>
        <div className="container durga-access-list ceremonial-sequence ceremonial-sequence--five" aria-label="Access notes">
          {dancingWithDurga.access.map((item, index) => (
            <CeremonialForm key={item} className="durga-access-form" tone="durga" variant={index}>
              <p>{item}</p>
            </CeremonialForm>
          ))}
        </div>
      </section>

      <section className="section durga-shala-doorway" aria-labelledby="durga-doorway-title">
        <div className="container durga-doorway-grid">
          <div className="durga-doorway-visual" aria-hidden="true">
            <span />
          </div>
          <div className="section-copy">
            <p className="label">Sri Shakti Shala Doorway</p>
            <h2 id="durga-doorway-title">Experience first. Discern what continues.</h2>
            <p>
              Dancing with Durga opens temporary community and Sri Shakti Shala space during
              the journey. Continuing into Sri Shakti Shala remains a separate
              invitation, simple application, human discernment, and paid
              membership.
            </p>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
