import Img from "./Img";
import { aboutImages, aboutChecklist } from "../data/content";
import AboutAnimation from "./AboutAnimation";
export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-visual">
          <AboutAnimation />
        </div>

        <div className="about-text">
          <div className="section-tag">About Us</div>
          <h2 className="section-h2">
            Building knowledge through <span>Generative AI</span>
          </h2>
          <p>
            Our lab brings together research, experimentation and software
            development to explore how Generative AI can address meaningful
            problems. We bridge the gap between theoretical foundations and
            real-world deployment.
          </p>
          <p>
            We support student projects, applied development and collaboration
            across academia, industry and the wider research community.
          </p>
          <div className="checklist">
            {aboutChecklist.map((item) => (
              <div className="chk" key={item.title}>
                <div className="chk-icon">
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <div className="chk-body">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-row">
            <a href="#team" className="btn-solid">
              Meet the Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
