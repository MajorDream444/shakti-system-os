import { BEGIN_PATH } from "../constants/navigation";
import { dancingWithDurga } from "../data/dancingWithDurga";
import { PageShell } from "./PageShell";
import { portalImages } from "./PortalImageSlots";
import { trackAnonymousEvent } from "../services/AnonymousAnalytics";
import { CeremonialForm } from "./CeremonialForm";

/* Who each option is for. Derived from the option id rather than added to
   commerce.ts, so the frozen commerce release is not edited for display copy. */
const PAYMENT_AUDIENCE: Record<string, string> = {
  global: "For participants outside India",
  india: "For Indian citizens",
};

function PaymentOptions() {
  return (
    <div className="durga-payment">
      <p className="durga-payment-heading">Choose your payment option</p>
      <div className="durga-payment-cards">
        {dancingWithDurga.paymentOptions.map((option) => (
          <div className="durga-payment-card" key={option.id}>
            <p className="durga-payment-label">{option.label}</p>
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
            <p className="durga-payment-audience">{PAYMENT_AUDIENCE[option.id]}</p>
          </div>
        ))}
      </div>
      <div className="durga-payment-help">
        <p>
          If you are unsure which option is right for you, or you have questions,
          start with the request details form.
        </p>
        <a
          className="durga-payment-help-action"
          href={`${BEGIN_PATH}?intent=community`}
          onClick={() => trackAnonymousEvent("request_details_clicked")}
        >
          {dancingWithDurga.cta}
        </a>
      </div>
    </div>
  );
}

export function DancingWithDurgaPage() {
  return (
    <PageShell className="durga-page">
      <section className="durga-hero" aria-labelledby="durga-title">
        <div className="durga-hero-flame" aria-hidden="true" />
        <div className="container durga-hero-grid">
          <figure className="durga-hero-art">
            <div className="durga-hero-art-frame">
              <img
                src={portalImages.durgaApprovedArtwork}
                alt="Traditional devotional artwork of Maa Durga with her lion and accompanying deities"
                data-asset-status="FOUNDER_APPROVED"
              />
            </div>
            <figcaption>{dancingWithDurga.campaignLine}</figcaption>
          </figure>

          <div className="durga-hero-copy">
            <p className="label">Navratri 2026</p>
            <h1 id="durga-title">{dancingWithDurga.title}</h1>
            <p className="durga-subtitle">{dancingWithDurga.subtitle}</p>
            <p>
              A bold, devotional Maa Durga container for women learning to trust
              the body, stand up, say no, protect what is sacred, and stop
              abandoning themselves.
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
                data-asset-status="FOUNDER_APPROVED"
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
            <p className="label">Investment / Access</p>
            <h2 id="durga-investment-title">Accessible entry, held carefully.</h2>
            <p>
              Choose the option that applies to you. You will continue to
              Sri Shakti Shala's secure payment page.
            </p>
            <PaymentOptions />
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
