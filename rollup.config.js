import pkg from './package.json' assert { type: 'json' };
import { builtinModules as builtins } from 'module';
import { imagetools } from 'vite-imagetools';
import typescript from '@rollup/plugin-typescript';

const deps = Object.keys(pkg.dependencies || {});

export default {
  input: 'src/index.ts',
  external: [...builtins, ...deps],
  output: [
    {
      dir: './dist',
      entryFileNames: '[name].js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
};
