import { useEffect, useRef } from "react";
import "../index.css";

// ═══════════════════════════════════════════════════════════════
// 🎨 THEME COLORS
// ═══════════════════════════════════════════════════════════════
const THEME = {
  active: "multi-color",
};

const COLORS = {
  "multi-color": {
    orbit: "rgba(176, 86, 138, 0.12)",
    link: "rgba(122, 10, 79, 0.25)",
    pulse: "rgba(245, 198, 208, 0.9)",
    hubFill: "#b0568a",
    hubStroke: "#f5c6d0",
    hubRing: "rgba(176, 86, 138, 0.3)",
    hubGlow: "rgba(176, 86, 138, 0.2)",
    nodeFill: "#7a0a4f",
    nodeStroke: "#4a062f",
    nodeGlow: "rgba(122, 10, 79, 0.2)",
    text: "rgba(74, 42, 61,",
  },
};

const C = COLORS[THEME.active] || COLORS["multi-color"];

// 🎨 The 3 Colors for the Nodes
const NODE_COLORS = [
  {
    fill: "#a04a68",
    stroke: "#7a0a4f",
    glow: "rgba(160, 74, 104, 0.2)",
    pulse: "rgba(245, 198, 208, 0.9)",
  },
  {
    fill: "#7d5a85",
    stroke: "#4a2a3d",
    glow: "rgba(125, 90, 133, 0.2)",
    pulse: "rgba(212, 184, 217, 0.9)",
  },
  {
    fill: "#4a7ba0",
    stroke: "#2f5470",
    glow: "rgba(74, 123, 160, 0.2)",
    pulse: "rgba(184, 212, 232, 0.9)",
  },
];
// ═══════════════════════════════════════════════════════════════

// 👇 Adjusted ONLY the 4th ring slightly narrower so text doesn't clip
const ORBITS = [
  { rx: 0.4, ry: 0.27, rot: -0.08 }, // Orbit 0
  { rx: 0.33, ry: 0.14, rot: -0.18 }, // Orbit 1
  { rx: 0.3, ry: 0.3, rot: 0.9 }, // Orbit 2
  { rx: 0.41, ry: 0.36, rot: 0.4 }, // Orbit 3 (slightly narrower)
];

const NODES = [
  { n: "Vision", o: 0, p: 5.4, s: 0.1, r: 15 },
  { n: "Agents", o: 1, p: 4.6, s: -0.14, r: 15 },
  { n: "RAG", o: 0, p: 0.2, s: 0.1, r: 15 },
  { n: "Robotics", o: 1, p: 2.9, s: -0.14, r: 15 },
  { n: "NLP", o: 2, p: 2.4, s: 0.08, r: 12 },
  { n: "LLMs", o: 2, p: 1.2, s: 0.08, r: 13 },
  { n: "Gemini", o: 3, p: 0.5, s: -0.05, r: 14 },
  { n: "Claude 3", o: 3, p: 2.0, s: -0.05, r: 14 },
  { n: "Llama 3", o: 3, p: 3.5, s: -0.05, r: 14 },
  { n: "Mistral", o: 3, p: 5.0, s: -0.05, r: 13 },
  { n: "GPT-4o", o: 3, p: 4.2, s: -0.05, r: 13 },
  { n: "Multimodal", o: 3, p: 1.2, s: -0.05, r: 13 },
];

const LINKS = [
  [-1, 0],
  [-1, 1],
  [-1, 2],
  [-1, 3],
  [-1, 4],
  [-1, 5],
  [-1, 6],
  [-1, 7],
  [-1, 8],
  [-1, 9],
  [-1, 10],
  [-1, 11],
  [0, 1],
  [0, 2],
  [1, 2],
  [3, 4],
  [4, 5],
  [5, 2],
  [0, 5],
  [3, 1],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 6],
  [0, 6],
  [3, 9],
  [5, 11],
  [2, 7],
];

const FONT = '"Segoe UI", system-ui, sans-serif';

export default function GenAINetwork({ title = "Generative AI" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pulses = LINKS.map(([a, b]) => {
      const colorIndex = b >= 0 ? b % 3 : 0;
      return {
        off: Math.random(),
        speed: 0.12 + Math.random() * 0.1,
        color: NODE_COLORS[colorIndex].pulse,
      };
    });

    let W = 0,
      H = 0,
      S = 0,
      raf;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      S = Math.min(W, H * 1.7);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const cy = () => H * 0.54;

    const position = (node, t) => {
      const o = ORBITS[node.o];
      const a = node.p + t * node.s;
      const x = Math.cos(a) * o.rx * S;
      const y = Math.sin(a) * o.ry * S;
      const c = Math.cos(o.rot),
        s = Math.sin(o.rot);
      return {
        x: W / 2 + x * c - y * s,
        y: cy() + x * s + y * c,
        depth: Math.sin(a),
      };
    };

    const hex = (x, y, r, fill, stroke, lw = 1) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        ctx[i ? "lineTo" : "moveTo"](x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke;
        ctx.stroke();
      }
    };

    const glow = (x, y, r, color, fadeColor) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, fadeColor);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (ms) => {
      const t = reduce ? 0 : ms / 1000;
      ctx.clearRect(0, 0, W, H);

      // orbit rings
      ORBITS.forEach((o) => {
        ctx.save();
        ctx.translate(W / 2, cy());
        ctx.rotate(o.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, o.rx * S, o.ry * S, 0, 0, Math.PI * 2);
        ctx.strokeStyle = C.orbit;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      });

      const pts = NODES.map((n) => position(n, t));
      const Center = { x: W / 2, y: cy() };
      const at = (i) => (i < 0 ? Center : pts[i]);

      // links with travelling pulses
      LINKS.forEach(([a, b], i) => {
        const p = at(a),
          q = at(b);
        const colorIndex = b >= 0 ? b % 3 : 0;
        const linkColor = NODE_COLORS[colorIndex].glow;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = linkColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        const k = (t * pulses[i].speed + pulses[i].off) % 1;
        glow(
          p.x + (q.x - p.x) * k,
          p.y + (q.y - p.y) * k,
          9,
          pulses[i].color,
          C.hubGlow.replace(/\d?\.?\d+\)$/, "0)"),
        );
      });

      // ─── CENTER HUB ───
      const beat = Math.sin(t * 2);
      glow(
        Center.x,
        Center.y,
        160 * (1 + 0.12 * beat),
        C.hubGlow,
        C.hubGlow.replace(/\d?\.?\d+\)$/, "0)"),
      );
      const hr = 60 * (1 + 0.03 * beat);

      hex(Center.x, Center.y, hr + 10 + 5 * beat, null, C.hubRing);
      hex(Center.x, Center.y, hr, C.hubFill, C.hubStroke, 2);

      ctx.fillStyle = "#ffffff";
      ctx.font = `700 ${Math.round(Math.max(16, S * 0.022))}px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(title, Center.x, Center.y);

      // nodes
      NODES.map((n, i) => ({ n, p: pts[i], index: i }))
        .sort((a, b) => a.p.depth - b.p.depth)
        .forEach(({ n, p, index }) => {
          const sc = 0.9 + 0.12 * p.depth;
          const r = n.r * sc * Math.max(0.7, S / 1100);
          const nodeColor = NODE_COLORS[index % 3];

          glow(
            p.x,
            p.y,
            r * 2.4,
            nodeColor.glow,
            nodeColor.glow.replace(/\d?\.?\d+\)$/, "0)"),
          );
          hex(p.x, p.y, r, nodeColor.fill, nodeColor.stroke, 1.5);

          ctx.fillStyle = `${C.text}${0.85 + 0.15 * p.depth})`;
          ctx.font = `600 ${Math.round(Math.max(13, S * 0.0165) * sc)}px ${FONT}`;
          ctx.textAlign = "left";
          ctx.fillText(n.n, p.x + r + 10, p.y);
        });

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [title]);

  return (
    <section className="genai-network" aria-label="Research areas network">
      <canvas ref={canvasRef} className="genai-network__canvas" />
    </section>
  );
}
