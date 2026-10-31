/** @type {import('tailwindcss').Config} */
// The theme points at the SAME CSS variables the original site used
// (defined in src/index.css). To recolour the whole site, edit the
// ":root" block in src/index.css - Tailwind utilities follow automatically.
//
// Original responsive breakpoints: 1000px and 640px (kept in index.css).
// A 1100px breakpoint for the mobile menu was added (see README).
export default {
  content: ["./index.html", "./project.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--c-ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        brand: "var(--c-brand)",
        "brand-hover": "var(--blue-hover)",
        rose: "var(--c-rose)",
        vapor: "var(--c-vapor)",
        surface: "var(--surface)",
        tint: "var(--bg2)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ['"Bricolage Grotesque"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
