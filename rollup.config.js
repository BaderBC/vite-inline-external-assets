import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import inject from '@rollup/plugin-inject';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: [
    {
      //file: 'dist/index.cjs',
      dir: 'dist',
      format: 'cjs',
    },
    {
      //file: 'dist/index.js',
      dir: 'dist',
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    json(),
    terser(),
  ],
  external: [],
};

