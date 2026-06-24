import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/", 
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    // Strip console.* and debugger statements from production builds only.
    // The dev server and `build:dev` (mode === 'development') keep them.
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
