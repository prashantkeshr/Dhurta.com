import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom domain (dhurta.com via CNAME) → site is served from the root path.
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules[\\/](three|@react-three)[\\/]/.test(id)) return "three";
          if (/node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return "motion";
        },
      },
    },
  },
});
