import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://inspotgo-us.pages.dev',
  
  // Sitemap generation
  integrations: [
    sitemap({
      // Exclude admin and API routes
      filter: (page) => 
        !page.includes('/admin/') && 
        !page.includes('/api/'),
    }),
  ],
  
  // Build optimization for Cloudflare Pages
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
