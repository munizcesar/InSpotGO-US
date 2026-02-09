// ============================================
// InSpotGO - Site Configuration
// ============================================
// Central configuration file for all site settings
// Update affiliate IDs and API keys here as you get them

export const SITE_CONFIG = {
  // Basic Site Info
  name: 'InSpotGO',
  title: 'InSpotGO - Spot the Best. Go Confident.',
  description: 'Discover the best tech products, software, and SaaS tools. Expert reviews, comparisons, and buying guides to help you make confident decisions.',
  url: 'https://inspotgo.com',
  ogImage: '/og-image.jpg', // Create this image 1200x630px
  
  // Branding
  slogan: 'Spot the Best. Go Confident.',
  tagline: 'Expert reviews and guides for tech products, software, and SaaS',
  
  // Contact & Legal
  contact: {
    email: 'contact@inspotgo.com',
    form: '/contact',
  },
  
  legalEntity: 'InSpotGO Team',
  foundedYear: 2026,
  
  // SEO & Analytics
  analytics: {
    // Google Analytics 4
    googleAnalyticsId: 'G-5J84J9C65G', // ✅ GA4 configured!
    googleAdsId: '3771126331',
    
    // TODO: Add other analytics as needed
    // microsoftClarityId: '',
    // facebookPixelId: '',
  },
  
  // Affiliate Programs
  affiliates: {
    amazon: {
      // Amazon Associates Program
      tag: 'YOUR-AMAZON-TAG-20', // TODO: Add your Amazon Associate Tag after approval
      disclaimer: 'As an Amazon Associate, we earn from qualifying purchases.',
      // You can have different tags for different regions
      tags: {
        us: 'YOUR-US-TAG-20',
        // uk: 'YOUR-UK-TAG-21',
        // ca: 'YOUR-CA-TAG-20',
      }
    },
    
    partnerStack: {
      // PartnerStack for SaaS affiliates
      enabled: false, // Set to true when you join
      // publicKey: '',
    },
    
    impact: {
      // Impact.com affiliate network
      enabled: false, // Set to true when you join
      // accountId: '',
    },
    
    // Add other affiliate networks here
    shareASale: {
      enabled: false,
      // affiliateId: '',
    },
    
    cj: {
      enabled: false,
      // websiteId: '',
    },
  },
  
  // Social Media
  social: {
    twitter: '', // TODO: Add @username when created
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    pinterest: '', // Good for product images
  },
  
  // Site Features
  features: {
    newsletter: false, // Enable when you setup email service
    comments: false, // Enable if you want comments (Disqus, etc)
    search: true,
    darkMode: true,
  },
  
  // Content Categories
  categories: {
    tech: {
      name: 'Tech Products',
      slug: 'tech',
      description: 'Laptops, smartphones, accessories, and smart home devices',
      icon: '💻',
    },
    saas: {
      name: 'SaaS Tools',
      slug: 'saas',
      description: 'Productivity, marketing, development, and design software',
      icon: '☁️',
    },
    software: {
      name: 'Software',
      slug: 'software',
      description: 'Desktop applications and utilities',
      icon: '⚙️',
    },
    guides: {
      name: 'Guides',
      slug: 'guides',
      description: 'Buying guides, tutorials, and comparisons',
      icon: '📚',
    },
  },
  
  // SEO Settings
  seo: {
    twitterCard: 'summary_large_image',
    language: 'en-US',
    locale: 'en_US',
    
    // Schema.org settings
    schema: {
      type: 'WebSite',
      publisher: {
        '@type': 'Organization',
        name: 'InSpotGO',
        logo: '/logo.png',
      },
    },
  },
};

// Helper function to generate affiliate links
export function getAmazonLink(asin: string, tag?: string): string {
  const amazonTag = tag || SITE_CONFIG.affiliates.amazon.tag;
  return `https://www.amazon.com/dp/${asin}?tag=${amazonTag}`;
}

// Helper to check if affiliate program is active
export function isAffiliateActive(program: keyof typeof SITE_CONFIG.affiliates): boolean {
  const affiliate = SITE_CONFIG.affiliates[program];
  return affiliate && 'enabled' in affiliate ? affiliate.enabled : false;
}
