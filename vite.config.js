import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Two HTML entry points, exactly like the original site:
//   index.html   -> home page (single page with sections)
//   project.html -> project detail page (?id=...)
// No router library is needed.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        project: fileURLToPath(new URL("./project.html", import.meta.url)),
      },
    },
  },
  server: {
    // In development, forward /api/* to the future FastAPI server.
    // This avoids CORS issues while you build the backend.
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
