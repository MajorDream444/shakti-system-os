import type { CSSProperties } from "react";
import { BEGIN_PATH } from "../constants/navigation";
import { offerCategories, offerPathways, receivingLadder } from "../data/offerings";
import { DANCING_WITH_DURGA_PATH, SHALA_PATH } from "../constants/navigation";
import { PageShell } from "./PageShell";
import { portalImages } from "./PortalImageSlots";
import { LivingForm } from "./LivingPortal";
import { trackAnonymousEvent } from "../services/AnonymousAnalytics";

export function OfferingsPage() {
  return (
    <PageShell className="offerings-page">
      <section className="public-hero offerings-hero">
        <div
          className="public-hero-image"
          style={{ "--public-image": `url(${portalImages.water})` } as CSSProperties}
          aria-hidden="true"
        />
        <div className="container public-hero-grid">
          <div className="public-hero-copy">
            <p className="label">Offerings</p>
            <h1>Work With Sheetal</h1>
            <p>
              One body of work. Different ways to enter through proximity,
              rhythm, depth, and readiness.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={BEGIN_PATH}>
                Start Your Shakti Path
              </a>
              <a className="button button-secondary" href="#private-work">
                Request Private Work
              </a>
            </div>
          </div>
          <div className="public-choice-panel" aria-label="Two offer pathways">
            {offerPathways.map((pathway) => (
              <a href={pathway.href} key={pathway.title}>
                <span>{pathway.title}</span>
                <p>{pathway.body}</p>
                <strong>{pathway.cta}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section offerings-list" aria-labelledby="offerings-list-title">
        <div className="container">
          <div className="section-heading">
            <p className="label">Current Doorways</p>
            <h2 id="offerings-list-title">Begin free, request human support, or prepare for deeper work.</h2>
            <p>
              Pricing and payment are shown only when Sheetal's team has approved
              the exact offer. Until then, the next step is clearly marked as
              open, request-based, preparation-based, or invitation-based.
              Current founder-approved payment choices appear inside the doorway
              they belong to, while deeper access still follows the stated human
              and readiness boundaries.
            </p>
            <nav className="commerce-doorways" aria-label="Current ways to enter">
              <a href={DANCING_WITH_DURGA_PATH}>
                <span>Current Ceremony</span>
                <strong>Dancing with Durga</strong>
              </a>
              <a href="#private-work">
                <span>Work Directly With Sheetal</span>
                <strong>1:1 Shakti Embodiment</strong>
              </a>
              <a href={`${SHALA_PATH}#membership`}>
                <span>Enter the Ongoing Shala</span>
                <strong>Sri Shakti Shala Founding Membership</strong>
              </a>
            </nav>
            <div className="receiving-ladder offerings-ladder living-concepts" aria-label="Offerings by depth and proximity">
              {receivingLadder.map((item, index) => (
                <div key={item.level}>
                  <LivingForm variant={index} />

                  <span>{item.level}</span>
                  <p>{item.doorway}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="offering-cards">
            {offerCategories.map((category) => (
              <article className={`offering-card offering-card-${category.id}`} id={category.id} key={category.id}>
                <figure>
                  <img src={category.image} alt="" loading="lazy" />
                </figure>
                <div className="offering-card-copy">
                  <p className="label">{category.label}</p>
                  <h3>{category.title}</h3>
                  <p>{category.summary}</p>
                  <dl>
                    <div>
                      <dt>Access</dt>
                      <dd>{category.accessState}</dd>
                    </div>
                    <div>
                      <dt>Investment</dt>
                      <dd>{category.investment}</dd>
                    </div>
                  </dl>
                  <ul>
                    {category.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="offering-next">{category.nextStep}</p>
                  <a className="button button-primary" href={category.href}>
                    {category.cta}
                  </a>
                  {category.purchaseOptions && (
                    <div
                      className="offering-purchase-family"
                      id={category.id === "self-guided" ? "membership" : undefined}
                    >
                      <div className="offering-purchase-family-heading">
                        <p className="label">Available now</p>
                        <h4>
                          {category.id === "private-work"
                            ? "1:1 Shakti Embodiment"
                            : "Sri Shakti Shala Founding Membership"}
                        </h4>
                      </div>
                      <div className="offering-purchase-options">
                        {category.purchaseOptions.map((offer) => (
                          <article className="offering-purchase" key={offer.id}>
                      <div>
                        <h4>{offer.label}</h4>
                            {offer.detail && <p>{offer.detail}</p>}
                            {offer.promo && <p className="offering-promo">{offer.promo}</p>}
                      </div>
                      <div className="offering-purchase-action">
                        <strong>{offer.price}</strong>
                        <a
                          className="button button-secondary"
                          href={offer.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAnonymousEvent("stripe_storefront_clicked")}
                        >
                          {offer.cta}
                        </a>
                      </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section payment-state" aria-labelledby="payment-state-title">
        <div className="container payment-state-grid">
          <div className="section-copy">
            <p className="label">Payment State</p>
            <h2 id="payment-state-title">Checkout appears only for founder-approved offers.</h2>
            <p>
              Dancing with Durga, approved 1:1 Shakti Embodiment choices, and
              founding memberships use secure external payment pages. Retreats,
              initiation, and restricted access remain request-based.
            </p>
          </div>
          <div className="payment-status-list">
            <article>
              <span>Current State</span>
              <h3>Most deeper work still begins with conversation.</h3>
              <p>
                Circles, retreats, and restricted next steps are held through
                conversation or application before commitment.
              </p>
            </article>
            <article>
              <span>Clear Boundary</span>
              <h3>Payment does not grant deeper access.</h3>
              <p>
                A browser action cannot approve retreat readiness, initiation,
                restricted access, or private work with Sheetal.
              </p>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
