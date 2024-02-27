import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import sass from 'rollup-plugin-sass';
import scss from 'rollup-plugin-scss'
import postcssNested from 'postcss-nested';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sass(), libInjectCss(), dts({ include: ['lib'] })],
  build: {
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-syntax-highlighter'],
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}').map(file => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative(
            'lib',
            file.slice(0, file.length - extname(file).length)
          ),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    },
    lib: {
      entry: 'lib/index.ts',
      formats: ['es']
    }
  }
})
