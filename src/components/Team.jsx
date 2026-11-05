import React, { useRef } from "react";
import { team } from "../data/content";

export default function Team() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="team-sec" id="team">
      <div className="team-inner">
        {/* ── Header with Arrows ── */}
        <div className="team-hdr-flex">
          <div>
            <span className="section-tag">Our Team</span>
            <h2 className="section-h2">
              Researchers, Developers & Students <span>Working Together</span>
            </h2>
            <p className="section-sub">
              Passionate people pushing the boundaries of generative AI
              research.
            </p>
          </div>

          {/* The Arrow Buttons */}
          <div className="team-arrows">
            <button onClick={() => scroll("left")} aria-label="Previous">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={() => scroll("right")} aria-label="Next">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* ── The Slider Track ── */}
        <div className="team-slider-wrapper">
          <div className="team-track" ref={scrollRef}>
            {team.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-img">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="team-body">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-spec">{member.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
