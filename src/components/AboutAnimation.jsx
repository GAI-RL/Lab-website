import { useEffect, useRef } from "react";
import "../index.css";

// ═══════════════════════════════════════════════════════════════
// 🎨 THEME COLORS  (blue / violet / magenta glossy palette)
// ═══════════════════════════════════════════════════════════════
const THEME = {
  active: "multi-color",
};

const COLORS = {
  "multi-color": {
    orbit: "rgba(99, 102, 241, 0.18)",
    link: "rgba(99, 102, 241, 0.35)",
    pulse: "rgba(190, 200, 255, 0.95)",
    hubFill: "#6d3be0",
    hubStroke: "#e4daff",
    hubRing: "rgba(99, 102, 241, 0.45)",
    hubGlow: "rgba(110, 90, 240, 0.28)",
    nodeFill: "#6d3be0",
    nodeStroke: "#4b2e9a",
    nodeGlow: "rgba(109, 59, 224, 0.3)",
    text: "rgba(30, 27, 75,",
  },
};

const C = COLORS[THEME.active] || COLORS["multi-color"];

// 🎨 Hub colours (glossy purple → blue)
// light = highlight side, base = body, dark = shadow side
const HUB_COLOR = {
  light: "#a58bff",
  base: "#6d3be0",
  dark: "#2457c9",
};

// 🎨 The 3 Colors for the Nodes: blue, violet, magenta
const NODE_COLORS = [
  {
    light: "#9ec0ff",
    fill: "#2f6df0",
    dark: "#1a3fb0",
    stroke: "#1d4fd0",
    line: "59, 130, 246",
    glow: "rgba(47, 109, 240, 0.35)",
    pulse: "rgba(160, 195, 255, 0.95)",
  },
  {
    light: "#cbb0ff",
    fill: "#7c3aed",
    dark: "#4c1d95",
    stroke: "#5b21b6",
    line: "124, 58, 237",
    glow: "rgba(124, 58, 237, 0.35)",
    pulse: "rgba(205, 180, 255, 0.95)",
  },
  {
    light: "#efaaff",
    fill: "#b02fd8",
    dark: "#6b1a8a",
    stroke: "#8a22ad",
    line: "176, 47, 216",
    glow: "rgba(176, 47, 216, 0.35)",
    pulse: "rgba(235, 185, 255, 0.95)",
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

    const hexPath = (x, y, r) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        ctx[i ? "lineTo" : "moveTo"](x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
    };

    const hex = (x, y, r, fill, stroke, lw = 1) => {
      hexPath(x, y, r);
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

    // Same hexagon (same size, same position) — only the paint changes:
    // shaded gradient body + glossy top sheen + small specular spot.
    const glossHex = (x, y, r, col, stroke, lw = 1) => {
      const body = ctx.createRadialGradient(
        x - r * 0.35,
        y - r * 0.4,
        r * 0.05,
        x,
        y,
        r * 1.05,
      );
      body.addColorStop(0, col.light);
      body.addColorStop(0.45, col.base || col.fill);
      body.addColorStop(1, col.dark);
      hex(x, y, r, body, stroke, lw);

      ctx.save();
      hexPath(x, y, r);
      ctx.clip();

      // top sheen
      const sheen = ctx.createLinearGradient(x, y - r, x, y + r * 0.1);
      sheen.addColorStop(0, "rgba(255, 255, 255, 0.55)");
      sheen.addColorStop(1, "rgba(255, 255, 255, 0.05)");
      ctx.beginPath();
      ctx.ellipse(x, y - r * 0.5, r * 0.9, r * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = sheen;
      ctx.fill();

      // bottom bounce light
      const bounce = ctx.createRadialGradient(
        x + r * 0.2,
        y + r * 0.65,
        0,
        x + r * 0.2,
        y + r * 0.65,
        r * 0.7,
      );
      bounce.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      bounce.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = bounce;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);

      // specular spot
      const spec = ctx.createRadialGradient(
        x - r * 0.38,
        y - r * 0.42,
        0,
        x - r * 0.38,
        y - r * 0.42,
        r * 0.3,
      );
      spec.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      spec.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = spec;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.restore();
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
      const lineRgb = (i) => (i < 0 ? "79, 109, 240" : NODE_COLORS[i % 3].line);

      // links with travelling pulses (same width and motion, gradient colour)
      LINKS.forEach(([a, b], i) => {
        const p = at(a),
          q = at(b);

        const lg = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
        lg.addColorStop(0, `rgba(${lineRgb(a)}, 0.45)`);
        lg.addColorStop(1, `rgba(${lineRgb(b)}, 0.45)`);

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = lg;
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
      glossHex(Center.x, Center.y, hr, HUB_COLOR, C.hubStroke, 2);

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
          glossHex(p.x, p.y, r, nodeColor, nodeColor.stroke, 1.5);

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
