import { createVuePlugin as vue } from 'vite-plugin-vue2';
import viteComponents, { VuetifyResolver } from 'vite-plugin-components';
import path from 'path';

// https://vitejs.dev/config/
module.exports = {
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
    ],
  },
  plugins: [
    vue(),
    viteComponents({
      customComponentResolvers: [VuetifyResolver()],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
};
