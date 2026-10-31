import Img from "./Img";
import { projects } from "../data/content";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div className="proj-card">
      <div className="proj-img">
        <span className="proj-tag">{project.tag}</span>

        {/* 🎥 The Video Tag replacing the image */}
        <video
          loading="lazy"
          src={project.img}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata" /* 👈 Tells browser to only load enough to show the first frame */
          className="project-media"
        />
      </div>
      <div className="proj-body">
        <h3>{project.title}</h3>
        <p>{project.text}</p>
        <Link to={`/project/${project.id}`} className="proj-lnk">
          View project <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects-sec" id="projects">
      <div className="projects-inner">
        <div className="proj-hdr">
          <div>
            <div className="section-tag">Projects</div>
            <h2 className="section-h2">
              From Research ideas to <span>Working Systems</span>
            </h2>
          </div>
        </div>
        <div className="proj-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
