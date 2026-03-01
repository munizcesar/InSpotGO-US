// ============================================
// InSpotGO - Site Configuration
// ============================================

export const SITE_CONFIG = {
  // Basic Site Info
  name: 'InSpotGO',
  title: 'InSpotGO - Spot the Best. Go Confident.',
  description: 'Discover the best software and SaaS tools. Expert reviews, comparisons, and buying guides to help professionals make confident decisions.',
  url: 'https://inspotgo.com',
  ogImage: '/og-image.jpg',

  // Branding
  slogan: 'Spot the Best. Go Confident.',
  tagline: 'Expert reviews and guides for software and SaaS tools',

  // Contact & Legal
  contact: {
    email: 'hello@inspotgo.com',
    form: '/contact',
  },

  legalEntity: 'InSpotGO',
  foundedYear: 2026,

  // SEO & Analytics
  analytics: {
    googleAnalyticsId: 'G-7K7X7D66FJ',
    googleAdsId: '3771126331',
  },

  // Affiliate Programs
  affiliates: {
    partnerStack: {
      enabled: false, // Set to true when approved
    },
    impact: {
      enabled: false, // Set to true when approved
    },
    shareASale: {
      enabled: false,
    },
    cj: {
      enabled: false,
    },
  },

  // Social Media
  social: {
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  },

  // Site Features
  features: {
    newsletter: true,
    comments: false,
    search: true,
    darkMode: true,
  },

  // Content Categories — SaaS & Software only
  categories: {
    saas: {
      name: 'SaaS Tools',
      slug: 'saas',
      description: 'Project management, CRM, marketing, and productivity platforms',
      icon: '☁️',
    },
    software: {
      name: 'Software',
      slug: 'software',
      description: 'Security, productivity, and professional desktop applications',
      icon: '⚙️',
    },
    comparisons: {
      name: 'Comparisons',
      slug: 'posts',
      description: 'Head-to-head breakdowns of competing tools with clear recommendations',
      icon: '⚖️',
    },
    guides: {
      name: 'Buying Guides',
      slug: 'guides',
      description: 'Structured decision guides to help you choose the right tool',
      icon: '📚',
    },
  },

  // SEO Settings
  seo: {
    twitterCard: 'summary_large_image',
    language: 'en-US',
    locale: 'en_US',
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

// Helper to check if affiliate program is active
export function isAffiliateActive(program: keyof typeof SITE_CONFIG.affiliates): boolean {
  const affiliate = SITE_CONFIG.affiliates[program];
  return affiliate && 'enabled' in affiliate ? affiliate.enabled : false;
}
