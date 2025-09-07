import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://OhhTuRnz.github.io',
  base: '/web-portfolio',
  output: 'static', // Required for GitHub Pages
  integrations: [
    tailwind(),
    sitemap()
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@assets': '/src/assets'
      }
    }
  }
});