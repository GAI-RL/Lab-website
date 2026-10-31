/* ─────────────────────────────────────────────
   HeroScene — Pure CSS 3D animation
   No libraries. No dependencies. Just CSS.
   ───────────────────────────────────────────── */
export default function HeroScene() {
  // The floating cubes around the core
  const cubes = [
    { class: "cube-1", label: "AI" },
    { class: "cube-2", label: "ML" },
    { class: "cube-3", label: "CV" },
    { class: "cube-4", label: "NLP" },
    { class: "cube-5", label: "RL" },
    { class: "cube-6", label: "NN" },
  ];

  return (
    <div className="hero-scene" aria-label="Animated 3D AI visualization">
      {/* The glowing central core */}
      <div className="hero-core">
        <div className="hero-core-inner" />
      </div>

      {/* Orbiting glowing rings */}
      <div className="hero-ring ring-a" />
      <div className="hero-ring ring-b" />
      <div className="hero-ring ring-c" />

      {/* Floating cubes with labels */}
      {cubes.map((c) => (
        <div key={c.class} className={`hero-cube ${c.class}`}>
          <div className="hero-cube-face front">{c.label}</div>
          <div className="hero-cube-face back">{c.label}</div>
          <div className="hero-cube-face right">{c.label}</div>
          <div className="hero-cube-face left">{c.label}</div>
          <div className="hero-cube-face top">{c.label}</div>
          <div className="hero-cube-face bottom">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
