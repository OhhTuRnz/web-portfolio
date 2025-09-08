import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://e1193dbe.carrusk-web-portfolio.pages.dev/', // Update with real URL
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