import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://inspotgo.com',
  
  integrations: [
    sitemap({
      // More robust configuration to prevent undefined errors
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Only filter if page is defined
      filter: (page) => {
        if (!page) return false;
        return !page.includes('/admin/') && 
               !page.includes('/api/');
      },
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
