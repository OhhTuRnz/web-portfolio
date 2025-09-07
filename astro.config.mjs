import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://carrusk-portfolio.pages.dev', // Carrusk branded domain
  output: 'static',
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