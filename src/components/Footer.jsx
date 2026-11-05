import { footer } from "../data/content";
import { Link } from "react-router-dom";
import "../index.css";

export default function Footer() {
  // Map the service index to the specific ID on the Research page
  const researchLinks = [
    "agentic-ai",
    "agriculture",
    "medical",
    "education",
    "bioinformatics",
    "cyber-security",
  ];

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          {/* 1. Brand column */}
          <div className="footer-brand">
            <div className="footer-logo">
              Gen<span>AI</span> Lab
            </div>
            <p>{footer.about}</p>
            <div className="footer-social">
              {footer.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
            <Link to="/join" className="footer-join-btn">
              Join Us
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          {/* 2. Services column */}
          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              {footer.services.map((s, index) => {
                // Link to the specific research section ID
                const targetUrl = `/researchpage#${researchLinks[index] || "services"}`;

                return (
                  <li key={s.text}>
                    <Link to={targetUrl}>
                      <i
                        className="fa-solid fa-angle-right"
                        style={{ fontSize: "0.8rem", marginTop: "4px" }}
                        aria-hidden="true"
                      />
                      {s.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 3. Contact column */}
          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              {footer.contact.map((c) => (
                <li key={c.text}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        c.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <i className={c.icon} aria-hidden="true" />
                      {c.text}
                      {c.href.startsWith("http") && (
                        <i
                          className="fa-solid fa-arrow-up-right-from-square"
                          style={{
                            fontSize: "0.7rem",
                            marginLeft: "4px",
                            opacity: 0.6,
                          }}
                        ></i>
                      )}
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

            {/* Google Map */}
            <div className="footer-map-wrapper">
              <iframe
                src="https://maps.google.com/maps?q=31.577167,74.357167&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GenAI Lab Location"
              ></iframe>
            </div>
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
