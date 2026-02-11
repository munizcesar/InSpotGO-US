import { defineConfig } from 'astro/config';
// Sitemap removed due to persistent build errors
// Manual sitemap.xml will be created in /public folder instead

// https://astro.build/config
export default defineConfig({
  site: 'https://inspotgo.com',
  
  integrations: [],
  
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
