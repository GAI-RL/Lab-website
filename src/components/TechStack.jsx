// src/components/TechStack.jsx
import React from "react";
import { techStack } from "../data/content";

export default function TechStack() {
  return (
    <section className="tech-stack-sec">
      <div className="tech-stack-inner">
        {/* HEADING */}
        <div className="tech-stack-hdr">
          <span className="section-tag">Our Tech Stack</span>
          <h2 className="section-h2">
            Driven by <span>Modern Innovation</span>
          </h2>
          <p className="section-sub">
            The frameworks and platforms we use to build cutting-edge AI
            solutions.
          </p>
        </div>

        {/* 3 COLUMNS */}
        <div className="tech-columns-wrapper">
          {techStack.map((category, index) => (
            <div className="tech-column" key={index}>
              {/* The Inner Grid that holds the 2x3 layout */}
              <div className="tech-grid-inner">
                {category.items.map((tech, i) => (
                  <div className="tech-item" key={i}>
                    <div className="tech-icon-box">
                      <img src={tech.img} alt={tech.name} />
                    </div>
                    <span className="tech-name">{tech.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
