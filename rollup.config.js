import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';
import pkg from './package.json';

function makeExternalPredicate(externalArr) {
  if (!externalArr.length) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
}

function getExternal() {
  const external = Object.keys(pkg.peerDependencies || {});
  const allExternal = [...external, ...Object.keys(pkg.dependencies || {})];
  return makeExternalPredicate(allExternal);
}

export default {
  input: './packages/index.js',
  external: getExternal(),
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    url({
      emitFiles: true,
      fileName: '[name][extname]',
      destDir: './dist/assets',
      limit: 1,
    }),
    svgr(),
    postcss({
      modules: true,
      autoModules: false,
      minimize: true,
      // extract: true,
      plugins: [postcssUrl(), postcssImport()],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
};
