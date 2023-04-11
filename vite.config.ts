import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  esbuild: {
  },
  plugins: [react({
    babel: {
      plugins: [
        ['babel-plugin-twin', {
          debug: true
        }],
        'babel-plugin-macros',
        [
          '@emotion/babel-plugin-jsx-pragmatic',
          {
            export: 'jsx',
            import: '__cssprop',
            module: '@emotion/react',
          },
        ],
        [
          '@babel/plugin-transform-react-jsx',
          { pragma: '__cssprop' },
          'twin.macro',
        ],
      ],
    },
  })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    }
  }
});