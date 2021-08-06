import rollupPluginTypescript from "rollup-plugin-typescript";

export default {
  input: "components/tag/index.ts",
  output: {
    file: "./debugge/index.js",
    format: "cjs",
  },
  plugins: [rollupPluginTypescript()],
};
