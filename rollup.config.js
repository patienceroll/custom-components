import { defineConfig } from 'rollup';

import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

/** @var {"debugge" | 'build'} buildType  */
const buildType = process.env.type;

const output = {
	debugge: './debugge',
	build: './dist',
};

export default defineConfig({
	input: ['packages/index.ts'],
	output: [{ dir: output[buildType] }],
	plugins: [
		typescript({ outDir: output[buildType], tsconfig: './tsconfig.json' }),
		postcss({
			extract: true,
			extract: 'css/index.css',
		}),
		copy({
			targets: {
				debugge: [
					{ src: 'packages/**/*.html', dest: 'debugge/packages/html' },
					{ src: 'packages/index.html', dest: 'debugge/packages' },
				],
				build: [{ src: 'packages/*', dest: 'dist/packages/lib', ignore: ['*.html'] }],
			}[buildType],
		}),
	],
	preserveModules: true,
});
