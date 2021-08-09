import rollupPluginTypescript from "rollup-plugin-typescript";

export default {
  input: "components/index.ts",
  output: {
    dir: "./debugge",
  },
  plugins: [rollupPluginTypescript()],
  preserveModules: true,
};
