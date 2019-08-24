import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { version, homepage, author, license } from './package.json';

const dist = './dist/';
const name = 'focusoverlay';
const production = !process.env.ROLLUP_WATCH;
const sourcemap = !production ? 'inline' : false;
const preamble = `/* Focus Overlay - v${version}
* ${homepage}
* Copyright (c) ${new Date().getFullYear()} ${author}. Licensed ${license} */`;

export default {
  input: './src/index.js',
  output: [
    {
      file: `${dist}${name}.cjs.js`,
      format: 'cjs',
      sourcemap
    },
    {
      file: `${dist}${name}.esm.js`,
      format: 'esm',
      sourcemap
    },
    {
      name: 'FocusOverlay',
      file: `${dist}${name}.js`,
      format: 'umd',
      sourcemap
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/env',
          {
            modules: 'false',
            targets: {
              browsers: '> 1%, IE 11, not op_mini all, not dead',
              node: 8
            },
            useBuiltIns: 'usage'
          }
        ]
      ]
    }),
    commonjs(),
    production &&
      terser({
        output: { preamble }
      }),
    postcss({
      extract: `${dist}${name}.css`,
      minimize: true
    })
  ]
};
