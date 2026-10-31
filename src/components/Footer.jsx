import { footer } from "../data/content";
import { Link } from "react-router-dom";
import "../index.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-brand">
            <div className="footer-logo">
              Gen<span>AI</span> Lab
            </div>
            <p>{footer.about}</p>
            <div className="footer-social">
              {footer.social.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}>
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
            <Link to="/join" className="footer-join-btn">
              Join Us
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          {/* Contact column */}
          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              {footer.contact.map((c) => (
                <li key={c.text}>
                  {c.href ? (
                    <a href={c.href}>
                      <i className={c.icon} aria-hidden="true" />
                      {c.text}
                    </a>
                  ) : (
                    <span className="footer-contact-static">
                      <i className={c.icon} aria-hidden="true" />
                      {c.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bot">
          <p>
            GenAI Lab · Research in generative artificial intelligence © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
