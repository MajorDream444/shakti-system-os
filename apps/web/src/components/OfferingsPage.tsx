import type { CSSProperties } from "react";
import { BEGIN_PATH } from "../constants/navigation";
import { offerCategories, offerPathways, receivingLadder } from "../data/offerings";
import { PageShell } from "./PageShell";
import { portalImages } from "./PortalImageSlots";

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
              Private work is container-based: 6, 9, or 12 sessions, with 3
              sessions only by exception.
            </p>
            <div className="receiving-ladder offerings-ladder" aria-label="Offerings by depth and proximity">
              {receivingLadder.map((item) => (
                <div key={item.level}>
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
            <h2 id="payment-state-title">No browser checkout is active in this release.</h2>
            <p>
              The public site can help a seeker find the right doorway. It does
              not complete deposits, paid initiation, retreat approval, or private
              access in the browser.
            </p>
          </div>
          <div className="payment-status-list">
            <article>
              <span>Current State</span>
              <h3>Request before commitment.</h3>
              <p>
                Private work, circles, and retreat next steps are held through
                conversation or application before any financial commitment is
                made.
              </p>
            </article>
            <article>
              <span>Clear Boundary</span>
              <h3>No instant paid access.</h3>
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
