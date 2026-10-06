import { BEGIN_PATH } from "../constants/navigation";
import {
  WATERFALL_LABEL,
  WATERFALL_TITLE,
  waterfallDeliveryWindow,
  waterfallExchange,
  waterfallPathShape,
  waterfallTagline,
} from "../data/waterfallCopy";

/* The one visible invitation into the Guided Path, per
   docs/canonical/SHAKTI-WATERFALL-LEAD-PATH-2026-10-06.md §4.

   WHY IT SITS BELOW THE HERO RATHER THAN INSIDE IT. The hero is founder-
   approved as "five things and nothing else" — name, what it is, a question,
   who it is for, two doors — from the 25 September direction. A sixth element
   would quietly overturn a decision Sheetal made. This takes the first
   position after the fold instead, so it is the first thing a visitor meets
   on scrolling, and the hero's two doors still lead where they led.

   The brief also says this must not turn the homepage into a long sales page,
   so it is one short band: label, title, one line of hers, the exchange, the
   honest delivery window, one CTA. No countdown, no scarcity, no modal —
   §4 forbids all three. */
export function WaterfallInvitation() {
  return (
    <section
      className="section waterfall-invitation"
      aria-labelledby="waterfall-invitation-title"
    >
      <div className="container">
        <div className="waterfall-card">
          <p className="waterfall-label">{WATERFALL_LABEL}</p>

          <h2 id="waterfall-invitation-title" className="waterfall-title">
            {WATERFALL_TITLE}
          </h2>

          <p className="waterfall-tagline">{waterfallTagline}</p>

          <p className="waterfall-exchange">{waterfallExchange}</p>

          <p className="waterfall-meta">
            {waterfallPathShape} {waterfallDeliveryWindow}
          </p>

          {/* §4 recommends this exact CTA, with a shorter fallback permitted
              only if layout forces it. It does not here, so the full promise
              stays in the button and the visitor is never asked to infer the
              exchange from nearby copy. */}
          <a className="waterfall-cta" href={BEGIN_PATH}>
            Begin Your Path + Receive the Practice
          </a>
        </div>
      </div>
    </section>
  );
}
