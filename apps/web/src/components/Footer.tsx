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
        </div>
      </div>
    </footer>
  );
}
