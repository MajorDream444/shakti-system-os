import { offerCategories, offerPathways, trustLinks } from "../data/offerings";

export function OfferPathGateway() {
  return (
    <section className="section offer-gateway" id="offerings-gateway" aria-labelledby="offer-gateway-title">
      <div className="container offer-gateway-layout">
        <div className="offer-gateway-copy">
          <p className="label">Work With Sheetal</p>
          <h2 id="offer-gateway-title">Two clear ways into the work.</h2>
          <p>
            If you already know what you are seeking, go directly to the public
            offerings. If you need discernment, begin privately and let the
            pathway reveal the next doorway.
          </p>
          <div className="offer-gateway-actions" aria-label="Offer path choices">
            {offerPathways.map((pathway) => (
              <a className="offer-path-card" href={pathway.href} key={pathway.title}>
                <span>{pathway.title}</span>
                <p>{pathway.body}</p>
                <strong>{pathway.cta}</strong>
              </a>
            ))}
          </div>
        </div>
        <div className="offer-category-rail" aria-label="Offering categories">
          {offerCategories.map((category) => (
            <a className={`offer-rail-item offer-rail-${category.id}`} href={`/offerings#${category.id}`} key={category.id}>
              <span>{category.label}</span>
              <small>{category.accessState}</small>
            </a>
          ))}
        </div>
        <div className="trust-link-row" aria-label="Trust and orientation links">
          {trustLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
