import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
