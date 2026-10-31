import Img from "./Img";
import { areas } from "../data/content";

// "AI solutions for your work & study" (key areas) section.
export default function Solutions() {
  return (
    <section className="areas-sec">
      <div className="areas-inner">
        <div className="areas-hdr">
          <div>
            <div className="section-tag">Solutions</div>
            <h2 className="section-h2">
              AI solutions for your <span>work & study</span>
            </h2>
          </div>
          <a href="#" className="section-link">
            View all areas <i className="fas fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
        <div className="areas-grid">
          {areas.map((area) => (
            <div className="area-card" key={area.title}>
              <div className="area-img">
                <Img src={area.img} alt={area.alt} />
              </div>
              <div className="area-body">
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
