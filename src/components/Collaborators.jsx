import { collaborators } from "../data/content";

export default function Collaborators() {
  return (
    <section className="collab-sec" id="collaborators">
      <div className="collab-inner">
        <header className="collab-hdr">
          <span className="section-tag">Collaborators</span>
          <h2 className="section-h2">
            Trusted by teams <span>and partners</span>
          </h2>
          <p className="section-sub">
            Our research grows through open partnerships with universities,
            hospitals, and research institutions worldwide.
          </p>
        </header>

        <div className="collab-grid">
          {collaborators.map((p) => (
            <a
              key={p.name}
              className="collab-card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
            >
              <div className="collab-logo-wrap">
                <img src={p.logo} alt={p.name} loading="lazy" />
              </div>
              <span className="collab-name">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
