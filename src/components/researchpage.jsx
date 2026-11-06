import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import "../research.css";
import HeroScene from "./HeroScene";
import logo from "../assets/images/logo.png";
import { researchAreas, researchServices } from "../data/content";

/* ─────────────────────────────────────────────
   ResearchCanvas — 6 animations, one per area.
   ───────────────────────────────────────────── */
function ResearchCanvas({ variant }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W, H, rafId;
    function size() {
      const d = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * d;
      cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    }
    size();
    addEventListener("resize", size);

    /* ── Palette ── */
    const BRAND = "#5b3df0";
    const ROSE = "#1e6bff";
    const DEEP = "#3b2bb8";
    const CYAN = "#00c5df";

    const brand = (a) => `rgba(91, 61, 240, ${a})`;
    const rose = (a) => `rgba(30, 107, 255, ${a})`;
    const deep = (a) => `rgba(59, 43, 184, ${a})`;

    /* ── 1. AGENTIC AI ── */
    function drawAgentic(t) {
      ctx.clearRect(0, 0, W, H);
      const cy = H / 2;
      const pad = W * 0.08;
      const usable = W - pad * 2;
      const steps = [
        { label: "Goal", icon: "◎" },
        { label: "Plan", icon: "▤" },
        { label: "Tools", icon: "⚙" },
        { label: "Memory", icon: "▦" },
        { label: "Output", icon: "◆" },
      ];
      const spacing = usable / (steps.length - 1);
      const positions = steps.map((_, i) => [pad + i * spacing, cy]);
      const THEME_COLORS = [
        {
          main: BRAND,
          light: brand(0.1),
          glow: (o) => brand(o * 0.4),
          icon: "#ffffff",
        },
        {
          main: ROSE,
          light: rose(0.1),
          glow: (o) => rose(o * 0.4),
          icon: "#ffffff",
        },
        {
          main: DEEP,
          light: deep(0.1),
          glow: (o) => deep(o * 0.4),
          icon: "#ffffff",
        },
      ];
      ctx.strokeStyle = deep(0.15);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(positions[0][0], cy);
      ctx.lineTo(positions[positions.length - 1][0], cy);
      ctx.stroke();
      ctx.setLineDash([4, 8]);
      ctx.lineDashOffset = -t * 20;
      ctx.strokeStyle = deep(0.3);
      ctx.beginPath();
      ctx.moveTo(positions[0][0], cy);
      ctx.lineTo(positions[positions.length - 1][0], cy);
      ctx.stroke();
      ctx.setLineDash([]);
      const seg = (t * 0.6) % (positions.length - 1);
      const i0 = Math.floor(seg);
      const f = seg - i0;
      const px =
        positions[i0][0] + (positions[i0 + 1][0] - positions[i0][0]) * f;
      const currentTheme = THEME_COLORS[i0 % 3];
      const gradient = ctx.createRadialGradient(px, cy, 0, px, cy, 20);
      gradient.addColorStop(0, currentTheme.glow(0.7));
      gradient.addColorStop(1, currentTheme.glow(0));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(px, cy, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = currentTheme.main;
      ctx.beginPath();
      ctx.arc(px, cy, 3.5, 0, 6.283);
      ctx.fill();
      positions.forEach(([x, y], i) => {
        const near = Math.max(0, 1 - Math.abs(seg - i) * 0.8);
        const r = 22 + near * 4;
        const theme = THEME_COLORS[i % 3];
        if (near > 0.05) {
          const glowGradient = ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            28 + near * 18,
          );
          glowGradient.addColorStop(0, theme.glow(0.4 * near));
          glowGradient.addColorStop(1, theme.glow(0));
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x, y, 28 + near * 18, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (k * Math.PI) / 3 - Math.PI / 6;
          const hx = x + Math.cos(a) * r;
          const hy = y + Math.sin(a) * r;
          k === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = near > 0.3 ? theme.main : theme.light;
        ctx.fill();
        ctx.strokeStyle = theme.main;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.font = "11px Inter, system-ui, sans-serif";
        ctx.fillStyle = theme.main;
        ctx.textAlign = "center";
        ctx.fillText(steps[i].label.toUpperCase(), x, y - 40);
        ctx.font = "14px Inter, system-ui, sans-serif";
        ctx.fillStyle = near > 0.3 ? theme.icon : theme.main;
        ctx.fillText(steps[i].icon, x, y + 5);
      });
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.fillStyle = deep(0.5);
      ctx.textAlign = "center";
      ctx.fillText("Plan · Act · Verify · Repeat", W / 2, cy + H * 0.28);
      ctx.textAlign = "left";
    }

    /* ── 2. AGRICULTURE ── */
    function drawAgriculture(t) {
      ctx.clearRect(0, 0, W, H);
      const L = Math.min(W * 0.92, H * 1.2);
      const w = L * 0.27;
      const s = Math.max(12, L / 30);
      const ang = -0.32;
      const sx = -L / 2 + L * ((t * 0.1) % 1.2);
      const hh = (x) =>
        1.08 *
        w *
        Math.pow(Math.max(0, Math.sin(Math.PI * (x / L + 0.5))), 0.85);
      const spots = [
        [-0.18, -0.1, 0.075, "Leaf blight 94%"],
        [0.12, 0.2, 0.06, "Rust 88%"],
        [0.3, -0.08, 0.05, "Leaf spot 91%"],
      ];
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(-L / 2, 0);
      ctx.bezierCurveTo(-L / 4, -w * 1.4, L / 4, -w * 1.5, L / 2, 0);
      ctx.bezierCurveTo(L / 4, w * 1.5, -L / 4, w * 1.4, -L / 2, 0);
      ctx.closePath();
      const g = ctx.createLinearGradient(-L / 2, 0, L / 2, 0);
      g.addColorStop(0, "#27421f");
      g.addColorStop(1, "#5b7d3a");
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = deep(0.6);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-L / 2, 0);
      ctx.lineTo(L / 2, 0);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = deep(0.4);
      for (let k = 1; k < 11; k++) {
        const x = -L / 2 + (L * k) / 11;
        const y = hh(x) * 0.85;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + L * 0.07, -y);
        ctx.moveTo(x, 0);
        ctx.lineTo(x + L * 0.07, y);
        ctx.stroke();
      }
      const dx = s * 1.5;
      const dy = s * 1.732;
      const lit = [];
      for (let c = 0, x = -L / 2 + s; x < L / 2 - s; x += dx, c++) {
        for (let y = -w * 1.15 + (c % 2 ? dy / 2 : 0); y < w * 1.15; y += dy) {
          if (Math.abs(y) > hh(x) * 0.9) continue;
          let on = false;
          for (const sp of spots) {
            const ex = x - sp[0] * L;
            const ey = y - sp[1] * L;
            if (ex * ex + ey * ey < (sp[2] * L) ** 2 && x < sx) on = true;
          }
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI) / 3;
            ctx[i ? "lineTo" : "moveTo"](
              x + Math.cos(a) * s * 0.9,
              y + Math.sin(a) * s * 0.9,
            );
          }
          ctx.closePath();
          if (on) {
            lit.push([x, y]);
            ctx.fillStyle = brand(0.6);
            ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255,.9)";
          } else {
            ctx.strokeStyle = deep(0.28);
          }
          ctx.stroke();
        }
      }
      ctx.strokeStyle = rose(0.55);
      for (let i = 0; i < lit.length; i++) {
        for (let j = i + 1; j < lit.length; j++) {
          const a = lit[i][0] - lit[j][0];
          const b = lit[i][1] - lit[j][1];
          if (a * a + b * b < (s * 2.3) ** 2) {
            ctx.beginPath();
            ctx.moveTo(lit[i][0], lit[i][1]);
            ctx.lineTo(lit[j][0], lit[j][1]);
            ctx.stroke();
          }
        }
      }
      if (sx > -L / 2 && sx < L / 2) {
        ctx.shadowColor = BRAND;
        ctx.shadowBlur = 16;
        ctx.strokeStyle = brand(0.95);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx, -w * 1.25);
        ctx.lineTo(sx, w * 1.25);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      for (const sp of spots) {
        const x0 = sp[0] * L;
        const y0 = sp[1] * L;
        if (x0 - sp[2] * L > sx) continue;
        const X = W / 2 + x0 * Math.cos(ang) - y0 * Math.sin(ang);
        const Y = H / 2 + x0 * Math.sin(ang) + y0 * Math.cos(ang);
        const tw = ctx.measureText(sp[3]).width + 16;
        ctx.strokeStyle = BRAND;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(X, Y);
        ctx.lineTo(X + 30, Y - 40);
        ctx.stroke();
        ctx.fillStyle = deep(0.9);
        ctx.fillRect(X + 30, Y - 52, tw, 24);
        ctx.strokeStyle = BRAND;
        ctx.strokeRect(X + 30, Y - 52, tw, 24);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(sp[3], X + 38, Y - 40);
      }
      ctx.textBaseline = "alphabetic";
    }

    /* ── 3. MEDICAL ── */
    function drawMedical(t) {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const size = Math.min(W, H) * 0.62;
      const bx = cx - size / 2;
      const by = cy - size / 2;
      const labelColors = [BRAND, ROSE, CYAN];
      const bl = size * 0.14;
      ctx.strokeStyle = deep(0.4);
      ctx.lineWidth = 2;
      [
        [bx, by, 1, 1],
        [bx + size, by, -1, 1],
        [bx, by + size, 1, -1],
        [bx + size, by + size, -1, -1],
      ].forEach(([x, y, sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(x + sx * bl, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + sy * bl);
        ctx.stroke();
      });
      ctx.strokeStyle = deep(0.1);
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(bx + (size * i) / 6, by);
        ctx.lineTo(bx + (size * i) / 6, by + size);
        ctx.moveTo(bx, by + (size * i) / 6);
        ctx.lineTo(bx + size, by + (size * i) / 6);
        ctx.stroke();
      }
      const blobs = [
        { x: 0.32, y: 0.38, rx: 0.16, ry: 0.12, a: 0.15 },
        { x: 0.62, y: 0.44, rx: 0.14, ry: 0.11, a: 0.12 },
        { x: 0.44, y: 0.62, rx: 0.18, ry: 0.1, a: 0.1 },
        { x: 0.68, y: 0.68, rx: 0.1, ry: 0.09, a: 0.08 },
      ];
      blobs.forEach((b) => {
        const bob = Math.sin(t * 0.8 + b.x * 6) * 3;
        ctx.fillStyle = brand(b.a);
        ctx.beginPath();
        ctx.ellipse(
          bx + b.x * size + bob,
          by + b.y * size,
          b.rx * size,
          b.ry * size,
          0,
          0,
          6.283,
        );
        ctx.fill();
      });
      const scanProgress = (t * 0.22) % 1;
      const scanY = by + scanProgress * size;
      const grd = ctx.createLinearGradient(0, scanY - 24, 0, scanY + 24);
      grd.addColorStop(0, brand(0));
      grd.addColorStop(0.5, brand(0.3));
      grd.addColorStop(1, brand(0));
      ctx.fillStyle = grd;
      ctx.fillRect(bx, scanY - 24, size, 48);
      ctx.strokeStyle = BRAND;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(bx, scanY);
      ctx.lineTo(bx + size, scanY);
      ctx.stroke();
      const findings = [
        { x: 0.32, y: 0.38, label: "Region A · 92%" },
        { x: 0.62, y: 0.44, label: "Region B · 78%" },
        { x: 0.44, y: 0.62, label: "Region C · 86%" },
      ];
      ctx.font = "11px Inter, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      findings.forEach((f, i) => {
        const fx = bx + f.x * size;
        const fy = by + f.y * size;
        const pulse = 0.6 + 0.4 * Math.sin(t * 3 + f.x * 4);
        const currentColor = labelColors[i % 3];
        const glowGrd = ctx.createRadialGradient(fx, fy, 0, fx, fy, 20 * pulse);
        const r = parseInt(currentColor.slice(1, 3), 16);
        const g = parseInt(currentColor.slice(3, 5), 16);
        const b = parseInt(currentColor.slice(5, 7), 16);
        glowGrd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.4 * pulse})`);
        glowGrd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = glowGrd;
        ctx.beginPath();
        ctx.arc(fx, fy, 20 * pulse, 0, 6.283);
        ctx.fill();
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(fx, fy, 10 + pulse * 3, 0, 6.283);
        ctx.stroke();
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(fx, fy, 2.5, 0, 6.283);
        ctx.fill();
        const tw = ctx.measureText(f.label).width + 14;
        const lx = fx + 24;
        const ly = fy - 18;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(fx + 10, fy - 6);
        ctx.lineTo(lx, ly + 12);
        ctx.stroke();
        ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
        ctx.fillRect(lx, ly, tw, 22);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(lx, ly, tw, 22);
        ctx.fillStyle = currentColor;
        ctx.fillText(f.label, lx + 7, ly + 11);
      });
      ctx.font = "10px Inter, system-ui, sans-serif";
      ctx.fillStyle = deep(0.5);
      ctx.textAlign = "left";
      ctx.fillText("SCAN · ACTIVE", bx + 12, by + 18);
      ctx.fillText(
        `DEPTH ${(scanProgress * 100).toFixed(0)}%`,
        bx + 12,
        by + 34,
      );
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.fillStyle = deep(0.6);
      ctx.textAlign = "center";
      ctx.fillText("Detect · Annotate · Report", cx, cy + size / 2 + 34);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
    }

    /* ── 4. EDUCATION ── */
    function drawEducation(t) {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const colors = [BRAND, ROSE, DEEP];
      const boxW = Math.min(W * 0.7, 450);
      const boxH = 180;
      const bx = cx - boxW / 2;
      const by = cy - boxH / 2;
      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, boxH, 12);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = deep(0.15);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#f87171";
      ctx.beginPath();
      ctx.arc(bx + 15, by + 15, 5, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(bx + 30, by + 15, 5, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(bx + 45, by + 15, 5, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = deep(0.4);
      ctx.font = "600 10px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("AI Tutor Session", cx, by + 18);
      ctx.beginPath();
      ctx.moveTo(bx, by + 30);
      ctx.lineTo(bx + boxW, by + 30);
      ctx.strokeStyle = deep(0.1);
      ctx.stroke();
      ctx.textAlign = "left";
      ctx.fillStyle = deep(0.5);
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.fillText(
        "Student: Explain photosynthesis based on my level.",
        bx + 20,
        by + 55,
      );
      const textSpeed = 0.15;
      const time = t * textSpeed;
      const line1 = "Photosynthesis is how plants eat...";
      const len1 = Math.floor((time * 10) % (line1.length + 10));
      if (len1 > 0) {
        ctx.fillStyle = colors[0];
        ctx.font = "500 13px Inter, system-ui, sans-serif";
        ctx.fillText(line1.slice(0, len1), bx + 20, by + 85);
      }
      const line2 = "They use sunlight to turn CO2 into sugar.";
      const len2 = Math.floor((time * 8) % (line2.length + 15));
      if (len2 > 0) {
        ctx.fillStyle = colors[1];
        ctx.font = "500 13px Inter, system-ui, sans-serif";
        ctx.fillText(line2.slice(0, len2), bx + 20, by + 110);
      }
      const line3 = "Think of it like a solar-powered kitchen!";
      const len3 = Math.floor((time * 9) % (line3.length + 20));
      if (len3 > 0) {
        ctx.fillStyle = colors[2];
        ctx.font = "500 13px Inter, system-ui, sans-serif";
        ctx.fillText(line3.slice(0, len3), bx + 20, by + 135);
      }
      if (Math.sin(t * 8) > 0) {
        const lastLineLength = Math.max(len1, len2, len3);
        ctx.fillStyle = deep(0.8);
        const cursorX = bx + 20 + lastLineLength * 7;
        ctx.fillRect(cursorX, by + 123, 6, 14);
      }
      ctx.fillStyle = deep(0.5);
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Generating personalized explanations · Real-time · Adaptive",
        cx,
        by + boxH + 30,
      );
    }

    /* ── 5. BIOINFORMATICS ── */
    function drawBio(t) {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const amp = Math.min(W, H) * 0.18;
      const height = H * 0.75;
      const N = 40;
      for (let i = 0; i < N; i++) {
        const f = i / (N - 1);
        const y = cy - height / 2 + f * height;
        const phase = f * 6 + t * 1.2;
        const x1 = cx + Math.sin(phase) * amp;
        const x2 = cx - Math.sin(phase) * amp;
        const depth = Math.cos(phase);
        ctx.strokeStyle = `rgba(91, 61, 240, ${0.2 + 0.5 * (1 - Math.abs(depth))})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        ctx.fillStyle = BRAND;
        ctx.beginPath();
        ctx.arc(x1, y, 3 + depth * 1.5, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = ROSE;
        ctx.beginPath();
        ctx.arc(x2, y, 3 - depth * 1.5, 0, 6.283);
        ctx.fill();
      }
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.fillStyle = deep(0.7);
      ctx.textAlign = "center";
      ctx.fillText("Genomics · Proteins · Cells", cx, cy + height / 2 + 30);
      ctx.textAlign = "left";
    }

    /* ── 6. CYBER SECURITY ── */
    function drawCyber(t) {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.38;
      const colors = [BRAND, ROSE, CYAN];
      const getRGB = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
      };
      for (let k = 1; k <= 3; k++) {
        const r = (R * k) / 3;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 - k * 0.6);
        const color = colors[k % 3];
        ctx.strokeStyle = `rgba(${getRGB(color)}, ${0.15 + pulse * 0.2})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 6.283);
        ctx.stroke();
      }
      const coreColor = colors[0];
      const coreRGB = getRGB(coreColor);
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
      coreGlow.addColorStop(0, `rgba(${coreRGB}, 0.6)`);
      coreGlow.addColorStop(1, `rgba(${coreRGB}, 0)`);
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = coreColor;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6;
        const x = cx + Math.cos(a) * 18;
        const y = cy + Math.sin(a) * 18;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = `rgba(${coreRGB}, 0.8)`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.strokeStyle = deep(0.15);
      ctx.lineWidth = 1;
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * 22, cy + Math.sin(a) * 22);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.stroke();
      }
      const threats = [
        { angle: 0.3, speed: 0.35, phase: 0.0 },
        { angle: 2.1, speed: 0.28, phase: 0.4 },
        { angle: 4.5, speed: 0.4, phase: 0.7 },
        { angle: 5.6, speed: 0.32, phase: 0.2 },
      ];
      threats.forEach((th, i) => {
        const cycle = (t * th.speed + th.phase) % 1;
        const dist = R * (1 - cycle);
        const x = cx + Math.cos(th.angle) * dist;
        const y = cy + Math.sin(th.angle) * dist;
        const threatColor = colors[(i + 1) % 3];
        const threatRGB = getRGB(threatColor);
        if (cycle < 0.78) {
          ctx.fillStyle = `rgba(${threatRGB}, ${0.4 + cycle * 0.5})`;
          ctx.beginPath();
          ctx.arc(x, y, 3 + cycle * 2, 0, 6.283);
          ctx.fill();
          ctx.strokeStyle = `rgba(${threatRGB}, ${0.25 * (1 - cycle)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(cx + Math.cos(th.angle) * R, cy + Math.sin(th.angle) * R);
          ctx.stroke();
        } else {
          const bf = (cycle - 0.78) / 0.22;
          const rx = cx + Math.cos(th.angle) * R;
          const ry = cy + Math.sin(th.angle) * R;
          const flash = 1 - bf;
          const impactGlow = ctx.createRadialGradient(
            rx,
            ry,
            0,
            rx,
            ry,
            24 * flash + 8,
          );
          impactGlow.addColorStop(0, `rgba(${threatRGB}, ${0.7 * flash})`);
          impactGlow.addColorStop(1, `rgba(${threatRGB}, 0)`);
          ctx.fillStyle = impactGlow;
          ctx.beginPath();
          ctx.arc(rx, ry, 24 * flash + 8, 0, 6.283);
          ctx.fill();
          ctx.strokeStyle = `rgba(${threatRGB}, ${flash})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(rx, ry, 8 + bf * 18, 0, 6.283);
          ctx.stroke();
        }
      });
      const sa = t * 0.6;
      const sx = cx + Math.cos(sa) * R;
      const sy = cy + Math.sin(sa) * R;
      const scanColor = colors[2];
      const scanRGB = getRGB(scanColor);
      const scanGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12);
      scanGlow.addColorStop(0, `rgba(${scanRGB}, 0.6)`);
      scanGlow.addColorStop(1, `rgba(${scanRGB}, 0)`);
      ctx.fillStyle = scanGlow;
      ctx.beginPath();
      ctx.arc(sx, sy, 12, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = scanColor;
      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, 6.283);
      ctx.fill();
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.fillStyle = deep(0.6);
      ctx.textAlign = "center";
      ctx.fillText("Detect · Block · Respond", cx, cy + R + 26);
      ctx.textAlign = "left";
    }

    const draw =
      {
        "agentic-ai": drawAgentic,
        agriculture: drawAgriculture,
        medical: drawMedical,
        education: drawEducation,
        bioinformatics: drawBio,
        "cyber-security": drawCyber,
      }[variant] || drawAgentic;

    function frame(ts) {
      draw(reduce ? 0 : ts / 1000);
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener("resize", size);
    };
  }, [variant]);

  return (
    <canvas
      ref={ref}
      className="research-canvas"
      aria-label="Animated research visual"
    />
  );
}

/* ─────────────────────────────────────────────
   Helper to split the title for the gradient
   ───────────────────────────────────────────── */
function GradientTitle({ text }) {
  const words = text.split(" ");
  if (words.length <= 1) return <span>{text}</span>;
  const mid = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, mid).join(" ");
  const secondHalf = words.slice(mid).join(" ");
  return (
    <>
      {firstHalf} <span>{secondHalf}</span>
    </>
  );
}

/* ─────────────────────────────────────────────
   The page
   ───────────────────────────────────────────── */
export default function Research() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Research Areas · GenAI Lab";
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const serviceKeyMap = {
    "agentic-ai": "Agentic AI",
    agriculture: "GenAI in Agriculture",
    medical: "GenAI in Medical",
    education: "GenAI in Education",
    bioinformatics: "GenAI in Bioinformatics",
    "cyber-security": "GenAI in Cyber Security",
  };

  return (
    <div className="research-page">
      <nav
        id="nav"
        className="scrolled"
        aria-label="Primary"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <Link to="/" className="nav-logo" aria-label="GARIL Home">
          <img src={logo} alt="GARIL" className="nav-logo-img" />
        </Link>
        <div className="nav-right">
          <Link to="/#services" className="btn-nav">
            <i
              className="fas fa-arrow-left"
              style={{ marginRight: 6 }}
              aria-hidden="true"
            />
            Back to Home
          </Link>
        </div>
      </nav>

      <section className="proj">
        <div className="hero-section">
          <div className="ph">
            <h2 data-label="Research">
              Research in <span>practice</span>
            </h2>
            <p>
              Exploring intelligent systems, autonomous agents and applied AI
              through research that connects emerging technologies with
              real-world challenges.
            </p>
            <a href="#agentic-ai" className="explore-link">
              Explore research →
            </a>
          </div>

          <div className="hero-image-wrapper">
            <HeroScene />
          </div>
        </div>

        {researchAreas.map((area) => {
          const serviceKey = serviceKeyMap[area.id] || area.title;
          const servicesForArea = researchServices[serviceKey] || [];

          return (
            <section key={area.id} className="area" id={area.id}>
              <div className="editorial-layout">
                {/* LEFT SIDEBAR */}
                <aside className="editorial-sidebar">
                  <h4 className="sidebar-title">Key Applications</h4>
                  <div className="sidebar-cards">
                    {area.cards.map((c) => (
                      <div key={c.title} className="sidebar-card">
                        <h3>{c.title}</h3>
                        <p>{c.text}</p>
                      </div>
                    ))}
                  </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="editorial-main">
                  {/* Header */}
                  <div className="ph">
                    <h2 data-label="Research Area">
                      <GradientTitle text={area.title} />
                    </h2>
                    <p>{area.intro}</p>
                  </div>

                  {/* ⬇️ THE NEW WRAPPER FOR CANVAS + TEXT ⬇️ */}
                  <div className="editorial-content-row">
                    <div className="editorial-visual-col">
                      <div className="feat-canvas-wrap">
                        <ResearchCanvas variant={area.id} />
                      </div>
                    </div>
                    <div className="editorial-text-col">
                      <div className="editorial-text">
                        <h3>{area.feature.heading}</h3>
                        <p>{area.feature.text}</p>
                        <div className="tags">
                          {area.feature.tags.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SERVICES SECTION BELOW */}
                  {servicesForArea.length > 0 && (
                    <div className="research-services-section">
                      <div className="rs-header">
                        <span className="rs-tag">What We Build</span>
                        <h2 className="rs-title">
                          Powerful AI Services for{" "}
                          <span className="text-gradient">Your Vision</span>
                        </h2>
                        <p className="rs-subtitle">
                          Comprehensive AI solutions to build, automate and
                          scale your ideas.
                        </p>
                      </div>
                      <div className="rs-grid">
                        {servicesForArea.map((service, idx) => (
                          <div className="rs-card" key={idx}>
                            <div
                              className={`rs-icon-wrapper svc-icon-${(idx % 6) + 1}`}
                            >
                              <i
                                className={`fas fa-${
                                  [
                                    "robot",
                                    "bolt",
                                    "database",
                                    "puzzle-piece",
                                    "comments",
                                    "cog",
                                  ][idx % 6]
                                }`}
                              ></i>
                            </div>
                            <div className="rs-card-content">
                              <h3>{service.heading}</h3>
                              <p>{service.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </main>
              </div>
            </section>
          );
        })}
      </section>
      <Footer />
    </div>
  );
}
