# InSpotGO Components Guide

> Reusable components for building consistent, conversion-optimized pages

---

## Overview

This guide covers all InSpotGO components, their props, and usage examples.

**Design Principle**: Every component follows our blue (trust) + orange (action) color psychology for maximum conversion.

---

## Table of Contents

1. [Layout Components](#layout-components)
2. [Content Components](#content-components)
3. [Comparison Components](#comparison-components)
4. [SEO Components](#seo-components)
5. [Analytics Components](#analytics-components)
6. [Interactive Components](#interactive-components)

---

## Layout Components

### BaseLayout

**Location**: `src/layouts/BaseLayout.astro`

**Purpose**: Main layout wrapper with SEO, header, footer, and analytics

**Usage**:
```astro
import BaseLayout from '@/layouts/BaseLayout.astro';

<BaseLayout 
  title="Page Title - InSpotGO"
  description="Page description for SEO"
>
  <!-- Your content -->
</BaseLayout>
```

**Props**:
- `title` (string, required): Page title with site name
- `description` (string, required): Meta description
- `ogImage` (string, optional): Social media image
- `canonicalURL` (string, optional): Canonical URL

---

## Content Components

### ProductCard

**Location**: `src/components/ProductCard.astro`

**Purpose**: Display individual product with image, rating, and CTA

**Usage**:
```astro
import ProductCard from '@/components/ProductCard.astro';

<ProductCard 
  title="MacBook Air M3"
  image="/images/macbook-air-m3.jpg"
  rating={4.8}
  price="$1,099"
  affiliateLink="https://amazon.com/..."
  badge="Editor's Pick"
/>
```

**Design Notes**:
- Blue title link (trust)
- Orange "Check Price" button (action)
- Green badge for featured products (validation)

---

### CategoryCard

**Location**: `src/components/CategoryCard.astro`

**Purpose**: Navigate to category pages

**Usage**:
```astro
import CategoryCard from '@/components/CategoryCard.astro';

<CategoryCard 
  title="Tech Products"
  description="Laptops, smartphones, and gadgets"
  icon="💻"
  href="/tech"
/>
```

---

### PostCard

**Location**: `src/components/PostCard.astro`

**Purpose**: Display blog post preview

**Usage**:
```astro
import PostCard from '@/components/PostCard.astro';

<PostCard 
  title="Best Laptops 2026"
  excerpt="Our top picks for work and study"
  coverImage="/images/laptops-2026.jpg"
  publishDate="2026-02-15"
  slug="/tech/best-laptops-2026"
/>
```

---

## Comparison Components

### ComparisonTable

**Location**: `src/components/ComparisonTable.astro`

**Purpose**: Compare multiple products side-by-side with detailed specifications

**Usage**:
```astro
import ComparisonTable from '@/components/ComparisonTable.astro';

const products = [
  {
    name: 'Xiaomi Redmi Note 13',
    badge: '🏆 Editor\'s Pick',
    badgeType: 'editor',
    display: { main: '6.6" AMOLED', sub: '120Hz Refresh Rate' },
    processor: { main: 'Snapdragon 7', sub: 'Gen 2' },
    battery: { main: '5,000 mAh', sub: '67W Fast Charging' },
    camera: { main: '64MP', sub: 'with OIS' },
    tier: 'mid',
    highlight: true
  },
  // ... more products
];

<ComparisonTable 
  title="Smartphone Specifications Comparison"
  products={products}
  note="Prices may vary by region. Last updated: February 2026."
/>
```

**Props**:
- `title` (string, optional): Table heading
- `products` (Product[], required): Array of products to compare
- `note` (string, optional): Footer note

**Product Object**:
```typescript
interface Product {
  name: string;                              // Product name
  badge?: string;                            // Badge text
  badgeType?: 'editor' | 'value' | 'popular'; // Badge style
  display: { main: string; sub?: string };   // Display specs
  processor: { main: string; sub?: string }; // Processor specs
  battery: { main: string; sub?: string };   // Battery specs
  camera: { main: string; sub?: string };    // Camera specs
  tier: 'entry' | 'mid' | 'premium';         // Product tier
  highlight?: boolean;                       // Highlight row
}
```

**Features**:
- ✅ Fully responsive with horizontal scroll
- ✅ Sticky header for easy navigation
- ✅ Highlight rows for featured products
- ✅ Three badge types (Editor, Value, Popular)
- ✅ Three tier levels (Entry, Mid, Premium)
- ✅ Smooth hover animations
- ✅ InSpotGO blue/orange color scheme

**When to Use**:
- ✅ Product comparison reviews
- ✅ "Best of" roundup articles
- ✅ Buying guides with 3-10 products
- ✅ Direct product comparisons

**When NOT to Use**:
- ❌ Homepage (use ProductCard instead)
- ❌ Single product reviews
- ❌ More than 15 products (too cluttered)
- ❌ Legal/informational pages

**Examples**:

Smartphone Comparison:
```astro
const smartphones = [
  {
    name: 'Xiaomi Redmi Note 13',
    badge: '🏆 Editor\'s Pick',
    badgeType: 'editor',
    display: { main: '6.6" AMOLED', sub: '120Hz' },
    processor: { main: 'Snapdragon 7 Gen 2' },
    battery: { main: '5,000 mAh', sub: '67W' },
    camera: { main: '64MP', sub: 'OIS' },
    tier: 'mid',
    highlight: true
  }
];
```

Laptop Comparison:
```astro
const laptops = [
  {
    name: 'MacBook Air M3',
    badge: '🏆 Editor\'s Pick',
    badgeType: 'editor',
    display: { main: '13.6" Retina', sub: '2560x1664' },
    processor: { main: 'Apple M3', sub: '8-core' },
    battery: { main: 'Up to 18 hours' },
    camera: { main: '1080p FaceTime' },
    tier: 'premium',
    highlight: true
  }
];
```

SaaS Tools Comparison:
```astro
const saasTools = [
  {
    name: 'Notion',
    badge: '🔥 Most Popular',
    badgeType: 'popular',
    display: { main: 'All-in-one workspace' },
    processor: { main: 'Unlimited blocks', sub: 'Free plan' },
    battery: { main: '$8/month', sub: 'Per user' },
    camera: { main: 'Web, iOS, Android' },
    tier: 'mid',
    highlight: true
  }
];
```

**Design Notes**:
- Blue gradient header (trust and authority)
- Orange highlight for featured products (action)
- Green badges for Editor's Pick (validation)
- Orange badges for Best Value (action/urgency)
- Purple badges for Most Popular (social proof)
- Smooth hover effects for interactivity
- Responsive design with horizontal scroll on mobile

**Documentation**:
- Full guide: `docs/components/comparison-table-usage.md`
- Examples: `docs/examples/comparison-table-example.astro`

---

## SEO Components

### SEO

**Location**: `src/components/SEO.astro`

**Purpose**: Inject SEO meta tags

**Usage**:
```astro
import SEO from '@/components/SEO.astro';

<SEO 
  title="Page Title"
  description="Page description"
  ogImage="/images/og-image.jpg"
/>
```

---

## Analytics Components

### GoogleAnalytics

**Location**: `src/components/GoogleAnalytics.astro`

**Purpose**: Load Google Analytics 4

**Usage**:
```astro
import GoogleAnalytics from '@/components/GoogleAnalytics.astro';

<GoogleAnalytics />
```

**Setup**:
1. Add `PUBLIC_GA_ID` to `.env`
2. Component auto-loads on production

---

## Interactive Components

### CookieBanner

**Location**: `src/components/CookieBanner.astro`

**Purpose**: GDPR/CCPA cookie consent

**Usage**:
```astro
import CookieBanner from '@/components/CookieBanner.astro';

<CookieBanner />
```

**Features**:
- Accept/Decline buttons
- Persists choice in localStorage
- GDPR compliant

---

### AffiliateBanner

**Location**: `src/components/AffiliateBanner.astro`

**Purpose**: FTC-required affiliate disclosure

**Usage**:
```astro
import AffiliateBanner from '@/components/AffiliateBanner.astro';

<AffiliateBanner />
```

**Display**: Appears at top of pages with affiliate links

---

## Header & Footer

### Header

**Location**: `src/components/Header.astro`

**Features**:
- Dual-color logo (blue "InSpot" + orange "GO")
- Responsive navigation
- Mobile menu

### Footer

**Location**: `src/components/Footer.astro`

**Features**:
- Category links
- Legal pages
- Social media
- Newsletter signup

---

## Logo Component

### Logo

**Location**: `src/components/Logo.astro`

**Usage**:
```astro
import Logo from '@/components/Logo.astro';

<Logo />
```

**Design**:
- "InSpot" in blue (#2563eb) - Trust
- "GO" in orange (#f97316) - Action

---

## Component Hierarchy

```
BaseLayout
├── Header
│   └── Logo
├── SEO
├── GoogleAnalytics
├── CookieBanner
├── AffiliateBanner
├── [Your Content]
│   ├── ProductCard
│   ├── ComparisonTable (NEW)
│   ├── CategoryCard
│   └── PostCard
└── Footer
```

---

## Best Practices

### Component Usage

1. **Always use BaseLayout** for full pages
2. **ProductCard for individual items** on listings
3. **ComparisonTable for 3-10 products** in reviews
4. **CategoryCard for navigation** on homepage/hubs
5. **PostCard for blog listings**

### Color Usage

- **Blue links**: Navigation, article links (trust)
- **Orange buttons**: Affiliate links, CTAs (action)
- **Green badges**: Editor's Pick, success (validation)

### Responsive Design

- All components mobile-first
- Tables scroll horizontally on mobile
- Cards stack on small screens

---

## Testing Components

### Local Development

```bash
npm run dev
```

Visit: http://localhost:4321

### Test Pages

- Homepage: `/`
- Categories: `/tech`, `/saas`, `/software`
- Example comparison: `docs/examples/comparison-table-example.astro`

---

## Related Documentation

- [COLOR-GUIDE.md](./COLOR-GUIDE.md) - Color psychology and usage
- [BRANDBOOK.md](./BRANDBOOK.md) - Brand guidelines
- [CONTENT-GUIDE.md](./CONTENT-GUIDE.md) - Content creation
- [docs/components/comparison-table-usage.md](./docs/components/comparison-table-usage.md) - ComparisonTable full guide

---

**Questions?** Check individual component files for inline documentation.

**Built with ❤️ for InSpotGO**
