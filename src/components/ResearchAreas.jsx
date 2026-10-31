import { Link } from "react-router-dom";
import Img from "./Img";
import { services, servicesImage } from "../data/content";

// "Research Areas" section (id="services" - the nav's "Research" link).
export default function ResearchAreas() {
  return (
    <section className="services" id="services">
      <div className="services-inner">
        <div className="services-hdr">
          <div>
            <div className="section-tag">Research Areas</div>
            <h2 className="section-h2">
              The Best <span>Research Services</span>
            </h2>
            <p className="section-sub">
              Core areas of generative AI, from theoretical foundations to
              practical applications.
            </p>
          </div>
          <Link to="/researchpage" className="section-link">
            Explore all areas{" "}
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
        <div className="services-layout">
          <div className="svc-grid">
            {services.map((s, i) => (
              <div className="svc-card" key={s.title}>
                <span className="svc-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
