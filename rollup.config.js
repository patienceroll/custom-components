import { defineConfig } from "rollup";

import Path from "path";

import rollupPluginTypescript from "rollup-plugin-typescript";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import alias from "@rollup/plugin-alias";

/** @var {"debugge" | 'build'} buildType  */
const buildType = process.env.type;

const output = {
  debugge: "./debugge",
  build: "./dist",
};

export default defineConfig({
  input: ["index.ts"],
  output: [{ dir: output[buildType] }],
  plugins: [
    alias({
      entries: [
        {
          find: "components",
          replacement: Path.resolve(__dirname, "components"),
        },
        {
          find: "css",
          replacement: Path.resolve(__dirname, "css"),
        },
        {
          find: "utils",
          replacement: Path.resolve(__dirname, "utils"),
        },
      ],
    }),
    rollupPluginTypescript({ tsconfig: "tsconfig.json" }),
    postcss({
      extract: true,
      extract: "css/index.css",
    }),
    copy({
      targets: {
        debugge: [],
        build: [
          { src: "components/*", dest: "dist/lib/components" },
          { src: "utils/*", dest: "dist/lib/utils" },
          { src: "css/*", dest: "dist/lib/css" },
          { src: "index.ts", dest: "dist/lib" },
          { src: "package.json", dest: "dist/lib" },
        ],
      }[buildType],
    }),
  ],
  preserveModules: true,
});
