import { defineConfig } from "rollup";

import rollupPluginTypescript from "rollup-plugin-typescript";
import rolluppluginCssOnly from "rollup-plugin-css-only";

export default defineConfig({
  input: ["components/index.ts", "css/index.css"],
  output: [{ dir: "./debugge" }],
  plugins: [
    rolluppluginCssOnly({ output: "index.css" }),
    rollupPluginTypescript(),
  ],
  preserveModules: true,
});
