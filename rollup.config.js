import { defineConfig } from "rollup";

import rollupPluginTypescript from "rollup-plugin-typescript";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";

/** @var {"debugge" | 'build'} buildType  */
const buildType = process.env.type;

const output = {
  debugge: "./debugge",
  build: "./dist",
};

export default defineConfig({
  input: ["packages/index.ts"],
  output: [{ dir: output[buildType] }],
  plugins: [
    postcss({
      extract: true,
      extract: "css/index.css",
    }),
    copy({
      targets: {
        build: [
          { src: "packages/components/*", dest: "dist/lib/components" },
          { src: "packages/utils/*", dest: "dist/lib/utils" },
          { src: "packages/css/*", dest: "dist/lib/css" },
          { src: "packages/index.ts", dest: "dist/lib" },
          { src: "packages/package.json", dest: "dist/lib" },
        ],
      }[buildType],
    }),
    rollupPluginTypescript({ tsconfig: "tsconfig.json" }),
  ],
  preserveModules: true,
});
