import { defineConfig, type PluginOption } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import mkcert from "vite-plugin-mkcert";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    mkcert(),
    visualizer() as PluginOption,
  ],
});
