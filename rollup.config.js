import rollupPluginTypescript from "rollup-plugin-typescript";

export default {
  input: "components/index.ts",
  output: {
    file: "./debugge/index.js",
    format: "cjs",
  },
  plugins: [rollupPluginTypescript()],
};
