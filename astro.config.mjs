import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://inspotgo.com',
  
  // Temporarily disabled due to build error
  // Will re-enable after investigating the issue
  integrations: [
    // sitemap({
    //   filter: (page) => 
    //     !page.includes('/admin/') && 
    //     !page.includes('/api/'),
    // }),
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
