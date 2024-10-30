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
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].js',
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

