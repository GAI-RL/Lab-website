import { Fragment, useEffect, useRef, useState } from "react";
import { heroStats } from "../data/content";
import Typewriter from "./TypeWriter";

export default function Hero() {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodes = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;
    let lastFrameTime = performance.now();
    let isHoveredRef = isHovered;

    // Set canvas size
    const resizeCanvas = () => {
      const needsInit = nodes.length === 0;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (needsInit) {
        initNodes();
      }
    };

    // Node class
    class Node {
      constructor(x, y, index) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.baseZ = 0;
        this.radius = 3;
        // Unique phase and frequency for each node
        this.phaseX = index * 0.8;
        this.phaseY = index * 1.2;
        this.frequencyX = 0.0006 + (index % 5) * 0.0001;
        this.frequencyY = 0.0008 + (index % 7) * 0.00012;
        this.amplitudeX = 3 + (index % 3);
        this.amplitudeY = 5 + (index % 4);
      }

      update() {
        // Continuous sine wave animation - no loops, no resets
        const floatX =
          Math.sin(time * this.frequencyX + this.phaseX) * this.amplitudeX;
        const floatY =
          Math.sin(time * this.frequencyY + this.phaseY) * this.amplitudeY;

        if (isHoveredRef) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 20;
            this.x -= (dx / distance) * force * 0.04;
            this.y -= (dy / distance) * force * 0.04;
            this.z = force * 1.5;
          } else {
            this.z += (this.baseZ - this.z) * 0.05;
          }
        } else {
          this.z += (this.baseZ - this.z) * 0.05;
        }

        // Target position with continuous floating
        const targetX = this.baseX + floatX;
        const targetY = this.baseY + floatY;

        // Direct update for smooth continuous motion
        this.x = targetX;
        this.y = targetY;
      }

      draw() {
        const scale = 1 + this.z * 0.015;
        const adjustedRadius = this.radius * scale;

        // Outer soft glow
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          adjustedRadius * 2.5,
        );
        // Updated to Purple/Blue theme
        gradient.addColorStop(0, `rgba(109, 59, 224, ${0.6 * scale})`); // Brand Purple
        gradient.addColorStop(0.5, `rgba(38, 118, 232, ${0.3 * scale})`); // Rose Blue
        gradient.addColorStop(1, "rgba(38, 118, 232, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, adjustedRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(this.x, this.y, adjustedRadius, 0, Math.PI * 2);
        // Updated to a soft lavender-white for the core
        ctx.fillStyle = `rgba(240, 235, 255, ${0.9})`;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(
          this.x - adjustedRadius * 0.25,
          this.y - adjustedRadius * 0.25,
          adjustedRadius * 0.4,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Pure white highlight
        ctx.fill();
      }
    }

    // Initialize nodes with organic placement
    const initNodes = () => {
      nodes = [];
      const baseSpacing = 90;
      const cols = Math.ceil(canvas.width / baseSpacing) + 2;
      const rows = Math.ceil(canvas.height / baseSpacing) + 2;
      let index = 0;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // Add randomness to create organic pattern
          const offsetX = (Math.random() - 0.5) * baseSpacing * 0.4;
          const offsetY = (Math.random() - 0.5) * baseSpacing * 0.4;

          const x = i * baseSpacing + offsetX - baseSpacing;
          const y = j * baseSpacing + offsetY - baseSpacing;

          nodes.push(new Node(x, y, index));
          index++;
        }
      }
    };

    // Draw connections using Delaunay-like approach
    const drawConnections = () => {
      const maxDistance = 140;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const avgZ = (nodes[i].z + nodes[j].z) / 2;
            const baseOpacity = (1 - distance / maxDistance) * 0.4;
            const opacity = Math.min(0.6, baseOpacity + avgZ * 0.015);
            const width = 0.8 + avgZ * 0.02;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Updated line color to Brand Purple
            ctx.strokeStyle = `rgba(109, 59, 224, ${opacity})`;
            ctx.lineWidth = width;
            ctx.stroke();
          }
        }
      }
    };

    // Continuous animation loop
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;

      // Use delta time for smooth, consistent animation
      time += deltaTime;

      // Update hover state reference
      isHoveredRef = isHovered;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => node.update());
      drawConnections();
      nodes.forEach((node) => node.draw());

      animationFrameId = requestAnimationFrame(animate);
    };

    // Mouse move handler - Updated to work globally since canvas has pointer-events: none
    const handleMouseMove = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    // Initialize and start animation
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* SINGLE canvas covering the whole hero section as a background */}
      <canvas
        ref={canvasRef}
        className="hero-neural-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* ── Hero top: heading + description + buttons on the left ── */}
      <div className="hero-top" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-left">
          <div className="hero-chip">
            <span className="chip-dot" aria-hidden="true" />
            Generative AI Research Lab
          </div>

          <h1 className="hero-h1">
            Building the Next Generation of Generative AI to{" "}
            <Typewriter
              className="grad"
              words={[
                "Turn Imagination into Reality",
                "Redefine How the World Creates",
                "Solve Real-World Problems",
                "Solve Impossible Challenges",
              ]}
              typeSpeed={70}
              deleteSpeed={60}
              pauseTime={2000}
              loop={true}
            />
          </h1>
          {/* ✅ Description + Buttons now live BELOW the heading */}
          <p className="hero-desc">
            GAIRL at NCAI, UET Lahore studies generative AI through research,
            experimentation, and real-world applications.
          </p>

          <div className="btn-grp">
            <a href="#services" className="btn-solid">
              Explore Our Work
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </a>
            <a href="#team" className="btn-ghost">
              Meet the Team
            </a>
          </div>
        </div>

        {/* Empty right column kept for spacing */}
        <div className="hero-right"></div>
      </div>

      {/* ── Hero mid: stats row ── */}
      <div className="hero-mid" style={{ position: "relative", zIndex: 1 }}>
        <div className="hm-stat-row">
          {heroStats.flat().map((stat) => (
            <div className="hm-stat-item" key={stat.label}>
              <div className="hm-stat-num">
                {stat.value}
                <span>+</span>
              </div>
              <div className="hm-stat-lbl">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
