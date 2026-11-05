import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/content";
import Footer from "./Footer";
import logo from "../assets/images/logo.png";
import "./projectDetails.css";

export default function ProjectDetail() {
  const { id } = useParams();

  const project =
    projects.find((p) => p.id === id) || projects[Number(id)] || projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title} · GenAI Lab`;
    }
  }, [id, project]);

  const featureIcons = [
    "fa-search",
    "fa-file-alt",
    "fa-comments",
    "fa-bolt",
    "fa-chart-line",
    "fa-check",
  ];

  const isVideo = project?.img && /\.(mp4|webm|mov)$/i.test(project.img);

  // Smart helper to split the title perfectly for the gradient
  const renderTitle = (title) => {
    if (!title) return null;

    // Try to find an uppercase letter after the first character (CamelCase split)
    const splitIndex = title
      .split("")
      .findIndex(
        (char, i) => i > 0 && char === char.toUpperCase() && char !== " ",
      );

    let finalIndex = splitIndex;

    // If no CamelCase is found, fall back to the nearest space in the middle
    if (finalIndex === -1) {
      const mid = Math.ceil(title.length / 2);
      finalIndex = title.indexOf(" ", mid);
      if (finalIndex === -1) finalIndex = mid;
    }

    const firstHalf = title.slice(0, finalIndex);
    const secondHalf = title.slice(finalIndex);

    return (
      <>
        {firstHalf}
        <span>{secondHalf}</span>
      </>
    );
  };

  return (
    <>
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
          <Link to="/#projects" className="btn-nav">
            <i
              className="fas fa-arrow-left"
              style={{ marginRight: 6 }}
              aria-hidden="true"
            />
            All Projects
          </Link>
        </div>
      </nav>

      <div className="pj-page">
        <div className="pj-inner">
          <Link to="/#projects" className="pj-back">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to
            Projects
          </Link>

          <div className="pj-header-full">
            <div className="pj-tags">
              <span className="pj-chip">{project.tag || "AI Research"}</span>
            </div>

            {/* Applying the smart gradient splitter */}
            <h1 className="pj-title">{renderTitle(project.title)}</h1>

            <p className="pj-summary">{project.summary || project.text}</p>

            {project.stack && (
              <div className="pj-tech-stack-top">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            )}
          </div>

          <div className="pj-video-hero">
            <div className="pj-gif-frame">
              <div className="pj-gif-wrap">
                {isVideo ? (
                  <video
                    src={project.detailVideo || project.img}
                    autoPlay
                    loop
                    playsInline
                    className="project-media"
                  />
                ) : (
                  <img
                    src={project.img}
                    alt={project.title}
                    className="project-media"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="pj-content-full">
            <h2>Project Overview</h2>
            {project.overview && project.overview.length > 0 ? (
              project.overview.map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p>{project.summary || project.text}</p>
            )}

            {project.features && project.features.length > 0 && (
              <>
                <h2 className="pj-mt">Key Features</h2>
                <div className="pj-features-grid">
                  {project.features.map((feature, idx) => (
                    <div className="pj-feature" key={idx}>
                      <div className="pj-feature-icon">
                        <i
                          className={`fas ${featureIcons[idx % featureIcons.length]}`}
                          aria-hidden="true"
                        />
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.stack && project.stack.length > 0 && (
              <>
                <h2 className="pj-mt">Technology Stack</h2>
                <div className="pj-tech-stack-bottom">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
