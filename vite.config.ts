import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// SPA build for GitHub Pages. The base path is set via VITE_BASE at build time
// (the GH Actions workflow passes /<repo-name>/). Locally it defaults to "/".
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE ?? "/",
  plugins: [
    tsconfigPaths(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: "::",
    port: 8080,
    strictPort: false,
  },
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  build: {
    sourcemap: mode === "development",
  },
}));
