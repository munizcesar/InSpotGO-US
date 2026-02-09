// InSpotGO Site Configuration
// Central configuration file for all site settings

export const SITE = {
  name: 'InSpotGO',
  title: 'InSpotGO - Spot the Best. Go Confident.',
  description: 'Discover the best tech products and software through expert reviews and comparisons. Make informed decisions with InSpotGO.',
  url: 'https://inspotgo.com',
  author: 'InSpotGO Team',
  locale: 'en-US',
  
  // SEO
  tagline: 'Spot the Best. Go Confident.',
  keywords: ['tech reviews', 'software reviews', 'SaaS comparison', 'product reviews', 'buying guides', 'tech deals'],
  
  // Social Media (update when created)
  social: {
    twitter: '', // Add @username when created
    linkedin: '', // Add URL when created
    youtube: '', // Add URL when created
  },
  
  // Contact
  email: 'contact@inspotgo.com', // Update with real email
};

// Google Analytics 4
export const ANALYTICS = {
  enabled: true,
  googleAdsId: '3771126331',
  // GA4 Measurement ID - Add when you create GA4 property
  measurementId: '', // Format: G-XXXXXXXXXX
};

// Affiliate Programs
export const AFFILIATES = {
  amazon: {
    enabled: false, // Set to true when approved
    associateId: '', // Your Amazon Associate ID/Tag
    disclaimer: 'As an Amazon Associate, InSpotGO earns from qualifying purchases.',
  },
  partnerStack: {
    enabled: false, // Set to true when approved
    partnerId: '',
  },
  impact: {
    enabled: false, // Set to true when approved
    campaignId: '',
  },
};

// Site Structure - Main Categories
export const CATEGORIES = {
  tech: {
    name: 'Tech Products',
    slug: 'tech',
    description: 'Latest technology products and gadgets',
    subcategories: ['laptops', 'smartphones', 'accessories', 'smart-home'],
  },
  saas: {
    name: 'SaaS & Cloud',
    slug: 'saas',
    description: 'Software as a Service reviews and comparisons',
    subcategories: ['productivity', 'marketing', 'development', 'design'],
  },
  software: {
    name: 'Software',
    slug: 'software',
    description: 'Desktop and mobile software reviews',
    subcategories: ['windows', 'mac', 'utilities'],
  },
  guides: {
    name: 'Guides',
    slug: 'guides',
    description: 'Buying guides and how-to articles',
    subcategories: ['buying-guides', 'how-to', 'comparisons'],
  },
};

// Legal Pages
export const LEGAL = {
  lastUpdated: '2026-02-09',
  company: 'InSpotGO Team',
  jurisdiction: 'United States',
};
