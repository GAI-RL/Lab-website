import { partners } from "../data/content";

export default function Partners() {
  const loop = [...partners, ...partners]; // doubled for the seamless scroll

  return (
    <section className="partners">
      <div className="partners-inner">
        <div className="partners-lbl">Trusted Partners</div>
        <div className="partners-scroll">
          <div className="partner-track">
            {loop.map((name, i) => (
              <span
                key={`${i}-${name}`}
                className="partner-item"
                aria-hidden={i >= partners.length ? "true" : undefined}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
