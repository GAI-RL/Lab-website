import { useEffect, useState } from "react";
import { projects } from "../data/content";

function ProjectNav() {
  return (
    <nav id="nav" className="scrolled" aria-label="Primary">
      <a href="index.html" className="nav-logo">
        Gen<span>AI</span> Lab
      </a>
      <div className="nav-right">
        <a href="index.html#projects" className="btn-nav">
          <i
            className="fas fa-arrow-left"
            style={{ marginRight: 6 }}
            aria-hidden="true"
          />
          All Projects
        </a>
      </div>
    </nav>
  );
}

function ProjectDemo({ project }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="pj-gif-frame">
      <div className="pj-bar">
        <i />
        <i />
        <i />
        <span>{project.title} · Demo</span>
      </div>
      <div className="pj-gif-wrap">
        {failed ? (
          <div className="pj-gif-fallback">
            <i className="fas fa-film" aria-hidden="true" />
            <span>
              Add your project GIF at
              <br />
              <strong>public/{project.gif}</strong>
            </span>
          </div>
        ) : (
          <img
            src={project.gif}
            alt={`${project.title} demo`}
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="pj-notfound">
      <h1 className="pj-title">Project not found</h1>
      <p className="pj-summary">We couldn't find that project.</p>
      <br />
      <a href="index.html#projects" className="btn-solid">
        <i className="fas fa-arrow-left" aria-hidden="true" />
        Back to projects
      </a>
    </div>
  );
}

function ProjectDetail({ project: p }) {
  return (
    <>
      <a href="index.html#projects" className="pj-back">
        <i className="fas fa-arrow-left" aria-hidden="true" />
        Back to projects
      </a>

      <div className="pj-head">
        <div className="pj-chip">{p.tag}</div>
        <h1 className="pj-title">{p.title}</h1>
        <p className="pj-summary">{p.summary}</p>
      </div>

      <div className="pj-layout">
        <ProjectDemo project={p} />

        <aside className="pj-side">
          <h2>Project details</h2>
          <div className="pj-row">
            <span className="lbl">Status</span>
            <span className="pj-status">{p.status}</span>
          </div>
          <div className="pj-row">
            <span className="lbl">Category</span>
            <span className="val">{p.category}</span>
          </div>
          <div className="pj-row">
            <span className="lbl">Year</span>
            <span className="val">{p.year}</span>
          </div>
          <div className="pj-row">
            <span className="lbl">Project lead</span>
            <span className="val">{p.lead}</span>
          </div>
        </aside>
      </div>

      <div className="pj-details">
        <div className="pj-card">
          <h2>
            <i className="fas fa-circle-info" aria-hidden="true" />
            Overview
          </h2>
          {p.overview.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>

        <div className="pj-card">
          <h2 className="pj-mt">
            <i className="fas fa-list-check" aria-hidden="true" />
            Key features
          </h2>
          <ul className="pj-list">
            {p.features.map((f) => (
              <li key={f}>
                <i className="fas fa-check" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="pj-card">
          <h2>
            <i className="fas fa-layer-group" aria-hidden="true" />
            Tech stack
          </h2>
          <div className="pj-stack">
            {p.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        <div className="pj-card">
          <h2>
            <i className="fas fa-chart-line" aria-hidden="true" />
            Results
          </h2>
          <div className="pj-outcomes">
            {p.outcomes.map((o) => (
              <div key={o.label}>
                <strong>{o.num}</strong>
                <span>{o.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProjectPage() {
  const id = new URLSearchParams(window.location.search).get("id");
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (project) document.title = `${project.title} · GenAI Lab`;
  }, [project]);

  return (
    <>
      <ProjectNav />
      <main className="pj-page">
        <div className="pj-inner" id="project">
          {project ? <ProjectDetail project={project} /> : <NotFound />}
        </div>
      </main>
    </>
  );
}
