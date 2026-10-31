import { features } from "../data/content";

export default function Features() {
  return (
    <section className="features">
      <div className="features-hdr">
        <div>
          <div className="section-tag">What We Do</div>
          <h2 className="section-h2">
            Four pillars of our <span>lab</span>
          </h2>
        </div>
      </div>

      <div className="features-grid">
        {features.map((f) => (
          <div className={`feat-card ${f.cls}`} key={f.title}>
            <div className={`feat-icon ${f.cls}`}>
              <i className={f.icon} aria-hidden="true" />
            </div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
