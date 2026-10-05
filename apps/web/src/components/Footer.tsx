import { LEGAL_PATH } from "../constants/navigation";
import { portalCopy } from "../data/portalCopy";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2>{portalCopy.footer.title}</h2>
          <p>{portalCopy.footer.guide}</p>
        </div>
        <div>
          <p>{portalCopy.footer.method}</p>
          <p>{portalCopy.footer.pathway}</p>
          <p>
            <a href="/offerings">Offerings</a> · <a href="/about-sheetal">About Sheetal</a>
          </p>
          {/* Reachable from every page. A disclaimer nobody can find is not a
              disclaimer. */}
          <p className="footer-legal">
            <a href={LEGAL_PATH}>Important information</a>
            <span> — what this work is and is not, booking terms, and your information</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
