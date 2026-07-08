import { portalCopy } from "../data/portalCopy";

export function RetreatVision() {
  return (
    <section className="section retreat" id="retreat">
      <div className="container">
        <div className="section-heading">
          <p className="label">{portalCopy.retreatVision.label}</p>
          <h2>{portalCopy.retreatVision.headline}</h2>
        </div>
        <div className="retreat-bento">
          {portalCopy.retreatVision.items.map((item, index) => (
            <article
              className={`bento-card bento-${index + 1}`}
              key={item.title}
            >
              <img src={item.image} alt="" loading="lazy" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
