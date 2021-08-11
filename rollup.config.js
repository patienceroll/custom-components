import { defineConfig } from "rollup";

import rollupPluginTypescript from "rollup-plugin-typescript";
import postcss from "rollup-plugin-postcss";

export default defineConfig({
  input: ["index.ts"],
  output: [{ dir: "./debugge" }],
  plugins: [
    rollupPluginTypescript(),
    postcss({
      extract: true,
      extract: "css/index.css",
    }),
  ],
  preserveModules: true,
});
