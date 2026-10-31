import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import JoinUsForm from "../components/JoinUsForm";
import "../form.css";
import logo from "../assets/images/logo.png";
export default function JoinUs() {
  useEffect(() => {
    document.title = "Join Us · GenAI Lab";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="join-page">
      {/* ── Navbar (same as the rest of your site) ── */}
      <nav
        id="nav"
        className="scrolled"
        aria-label="Primary"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <Link to="/" className="nav-logo" aria-label="GARIL Home">
          <img src={logo} alt="GARIL" className="nav-logo-img" />
        </Link>
        <div className="nav-right">
          <Link to="/" className="btn-nav">
            <i
              className="fas fa-arrow-left"
              style={{ marginRight: 6 }}
              aria-hidden="true"
            />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* ── Hero banner ── */}
      <section className="join-hero">
        <div className="join-hero-inner">
          <span className="section-tag">Join Us</span>
          <h1>
            Build the future of AI <span>with us</span>
          </h1>
          <p>
            We're always looking for curious students, researchers, and interns
            who want to work on real generative AI problems.
          </p>
        </div>
      </section>

      {/* ── Main content: pitch + form ── */}
      <section className="join-us">
        <div className="join-inner">
          <div className="join-text">
            <h2>Why join GAIRL?</h2>
            <p>
              GAIRL is the Generative AI Research & Innovation Lab at NCAI, UET
              Lahore. We work on applied AI, publish research, and help students
              build careers in the field.
            </p>

            <ul className="join-perks">
              <li>
                <i className="fa-solid fa-flask" />
                Hands-on research with real-world impact
              </li>
              <li>
                <i className="fa-solid fa-users" />
                Mentorship from senior researchers
              </li>
              <li>
                <i className="fa-solid fa-certificate" />
                Certificate and publication opportunities
              </li>
              <li>
                <i className="fa-solid fa-rocket" />
                Access to compute, datasets, and tools
              </li>
            </ul>

            <div className="join-contact">
              <h3>Questions?</h3>

              <p>
                Email us at{" "}
                <a href="mailto:airl@kics.edu.pk">airl@kics.edu.pk</a> and we'll
                respond within a few days.
              </p>
            </div>
          </div>

          <JoinUsForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
