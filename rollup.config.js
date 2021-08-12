import { defineConfig } from "rollup";

import rollupPluginTypescript from "rollup-plugin-typescript";
import postcss from "rollup-plugin-postcss";

const output = {
  debugge: "./debugge",
  build: "./dist",
};

export default defineConfig({
  input: ["index.ts"],
  output: [{ dir: output[process.env.type] }],
  plugins: [
    rollupPluginTypescript({ tsconfig: "tsconfig.json" }),
    postcss({
      extract: true,
      extract: "css/index.css",
    }),
  ],
  preserveModules: true,
});
