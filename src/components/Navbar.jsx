import { useEffect, useState } from "react";
import { navLinks } from "../data/content";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 200) {
        setActive("#home");
        return;
      }
      setScrolled(window.scrollY > 40);

      const sections = [];
      for (const link of navLinks) {
        const href = String(link.href ?? "");
        if (!href.startsWith("#") || href.length < 2) continue;
        const el = document.getElementById(href.slice(1));
        if (el) sections.push(el);
      }

      // Viewport center
      const viewportCenter = window.innerHeight / 2;

      let closest = null;
      let closestDist = Infinity;

      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = sec;
        }
      }

      if (closest) setActive(`#${closest.id}`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const classes = [scrolled && "scrolled", open && "nav-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Dimmed backdrop for side panel (Root Level) */}
      <div
        className={`nav-backdrop ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Side panel drawer for mobile/tablet (Root Level, outside of <nav>) */}
      <aside
        id="mobile-nav-panel"
        className={`nav-side-panel ${open ? "open" : ""}`}
        aria-label="Mobile Navigation"
      >
        <div className="side-panel-header">
          <span className="side-panel-title">Menu</span>
          <button
            type="button"
            className="side-panel-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>

        <ul className="side-panel-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={active === link.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="side-panel-footer">
          <a
            href="#contact"
            className="btn-nav side-panel-btn"
            onClick={() => setOpen(false)}
          >
            <span>Contact Us</span>
          </a>
        </div>
      </aside>

      {/* Main Navbar */}
      <nav id="nav" className={classes} aria-label="Primary">
        <a href="#home" className="nav-logo" aria-label="GARIL Home">
          <img src={logo} alt="GARIL" className="nav-logo-img" />
        </a>

        {/* Desktop Links (Hidden on mobile) */}
        <ul className="nav-links" id="nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={active === link.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a href="#contact" className="btn-nav desktop-cta">
            <span>Contact Us</span>
          </a>

          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>
    </>
  );
}
