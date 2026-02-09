import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://inspotgo.com',
  
  // Sitemap generation
  integrations: [
    sitemap({
      // Exclude admin and API routes
      filter: (page) => 
        !page.includes('/admin/') && 
        !page.includes('/api/'),
      
      // Customize URLs
      customPages: [
        'https://inspotgo.com',
        'https://inspotgo.com/tech',
        'https://inspotgo.com/saas',
        'https://inspotgo.com/software',
        'https://inspotgo.com/guides',
      ],
    }),
  ],
  
  // Build optimization
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
  
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  
  // Prefetch for better performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  
  // Security headers
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro'],
          },
        },
      },
    },
  },
});
