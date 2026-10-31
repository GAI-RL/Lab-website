import { processSteps } from "../data/content";

export default function Process() {
  return (
    <section className="process">
      <div className="process-inner">
        <div className="process-hdr">
          <div className="section-tag">Our Workflow</div>
          <h2 className="section-h2">
            Our working <span>process</span>
          </h2>
          <p className="section-sub">
            From initial research ideas to fully deployed systems - a structured
            process that ensures rigorous, reproducible outcomes.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <div className="p-step" key={step.num}>
              <div className="p-num" aria-hidden="true">
                {step.num}
              </div>
              <div className="p-icon">
                <i className={step.icon} aria-hidden="true" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
