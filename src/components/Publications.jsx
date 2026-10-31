import AnimatedNumber from "./AnimatedNumber";
import { papers, researchImage, testimonial } from "../data/content";

// Publications + stats panel (id="research").
export default function Publications() {
  return (
    <section className="research-sec" id="research">
      <div className="research-inner">
        <div className="research-text">
          <div className="section-tag">Publications</div>
          <h2 className="section-h2">
            Nothing Advances Knowledge better than{" "}
            <span>Rigorous Research</span>
          </h2>
          <p>
            Methods and applications across generative artificial intelligence,
            newest first. Our lab produces peer-reviewed work with real-world
            impact.
          </p>

          <div className="paper-list">
            {papers.map((paper) => (
              <a
                key={paper.title}
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-row"
              >
                <div className="py">{paper.year}</div>
                <div className="pi">
                  <strong>{paper.title}</strong>
                  <span className="pi-link">
                    Read the research <i className="fas fa-arrow-right" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 26 }}>
            <a
              href="https://scholar.google.com/citations?user=WM9A5m4AAAAJ&hl=en"
              className="btn-solid"
              style={{ width: "fit-content" }}
            >
              <i className="fas fa-book-open" aria-hidden="true" />
              View all publications
            </a>
          </div>
        </div>

        {/* Right side — research impact panel */}
        <div className="res-visual">
          <aside className="impact-panel">
            <header className="impact-panel__head">
              <span className="impact-panel__label">Research impact</span>
              <h3 className="impact-panel__title">
                Measured by the work that matters.
              </h3>
            </header>

            <ul className="impact-panel__stats">
              <li>
                <span className="stat-number">
                  <AnimatedNumber value="25+" />
                </span>
                <span>Published papers</span>
              </li>
              <li>
                <span className="stat-number">
                  <AnimatedNumber value="450+" />
                </span>
                <span>Total citations</span>
              </li>
              <li>
                <span className="stat-number">
                  <AnimatedNumber value="12" />
                </span>
                <span>Research partners</span>
              </li>
              <li>
                <span className="stat-number">
                  <AnimatedNumber value="8" />
                </span>
                <span>Countries reached</span>
              </li>
            </ul>

            <footer className="impact-panel__foot">
              <div className="impact-panel__badge">
                <i className="fas fa-award" aria-hidden="true" />
                Peer-reviewed
              </div>
            </footer>
          </aside>
        </div>
      </div>
    </section>
  );
}
