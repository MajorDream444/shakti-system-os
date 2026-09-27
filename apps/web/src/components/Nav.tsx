import { useState } from "react";
import { BEGIN_PATH, NAV_TARGETS } from "../constants/navigation";
import { SCROLLED_NAV_THRESHOLD } from "../constants/animation";
import { portalCopy } from "../data/portalCopy";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useScrollState } from "../hooks/useScrollState";
import { RitualService } from "../services/RitualService";
import { SOCIAL_LINKS } from "../constants/social";

/* Instagram, drawn inline. One external icon font or SVG sprite for two links
   is not worth the request, and inline means it inherits the nav's gold. */
function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollState(SCROLLED_NAV_THRESHOLD);

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () =>
    setIsMenuOpen((isOpen) =>
      RitualService.closeSanctuaryMenu({ isMenuOpen: isOpen }).isMenuOpen,
    );

  return (
    <>
      <nav className={`site-nav ${isScrolled ? "scrolled" : ""}`}>
        <a className="nav-logo" href="/" onClick={closeMenu}>
          Sri Shakti Shala
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          {portalCopy.nav.map((item) => (
            <a href={NAV_TARGETS[item]} key={item}>
              {item}
            </a>
          ))}
        </div>
        {/* Both accounts. Labelled rather than icon-only, because two
            identical marks side by side tell a screen reader nothing about
            which is the Shala and which is Sheetal. rel="me" states the
            ownership link; noopener because they are cross-origin. */}
        <div className="nav-social" aria-label="Social channels">
          {SOCIAL_LINKS.map((link) => (
            <a
              className="nav-social-link"
              href={link.href}
              key={link.id}
              aria-label={link.label}
              title={link.label}
              target="_blank"
              rel="me noopener noreferrer"
            >
              <InstagramMark />
            </a>
          ))}
        </div>
        <a className="nav-start" href={BEGIN_PATH}>
          Start Path
        </a>
        <button
          className={`menu-button ${isMenuOpen ? "active" : ""}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() =>
            setIsMenuOpen((isOpen) =>
              RitualService.toggleSanctuaryMenu({ isMenuOpen: isOpen })
                .isMenuOpen,
            )
          }
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        {portalCopy.nav.map((item) => (
          <a
            className="mobile-link"
            href={NAV_TARGETS[item]}
            key={item}
            onClick={closeMenu}
          >
            {item}
          </a>
        ))}
        <div className="mobile-social">
          {SOCIAL_LINKS.map((link) => (
            <a
              className="mobile-social-link"
              href={link.href}
              key={link.id}
              target="_blank"
              rel="me noopener noreferrer"
              onClick={closeMenu}
            >
              <InstagramMark />
              <span>{link.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
