# ComparisonTable Component Usage Guide

## Overview

The `ComparisonTable` component is a reusable, responsive table designed for comparing product specifications across multiple items. It follows the InSpotGO design system with the signature blue/orange color scheme.

## Features

- ✅ Fully responsive with horizontal scroll on mobile
- ✅ Sticky header for easy navigation
- ✅ Highlight rows for featured products
- ✅ Badge support (Editor's Pick, Best Value, etc.)
- ✅ Tier classification (Entry-level, Mid-range, Premium)
- ✅ Smooth hover animations
- ✅ TypeScript type safety
- ✅ Accessible and semantic HTML

---

## Installation

The component is already installed in your project at:
```
src/components/ComparisonTable.astro
```

---

## Basic Usage

### 1. Import the Component

```astro
---
import ComparisonTable from '@/components/ComparisonTable.astro';
---
```

### 2. Prepare Your Data

```astro
---
const smartphones = [
  {
    name: 'Xiaomi Redmi Note 13',
    badge: '🏆 Editor\'s Pick',
    badgeType: 'editor',
    display: { 
      main: '6.6" AMOLED', 
      sub: '120Hz Refresh Rate' 
    },
    processor: { 
      main: 'Snapdragon 7', 
      sub: 'Gen 2' 
    },
    battery: { 
      main: '5,000 mAh', 
      sub: '67W Fast Charging' 
    },
    camera: { 
      main: '64MP', 
      sub: 'with OIS' 
    },
    tier: 'mid',
    highlight: true
  },
  {
    name: 'Samsung Galaxy A25',
    display: { 
      main: '6.5" S-AMOLED', 
      sub: '120Hz Refresh Rate' 
    },
    processor: { 
      main: 'Exynos 1380' 
    },
    battery: { 
      main: '5,000 mAh', 
      sub: '25W Fast Charging' 
    },
    camera: { 
      main: '50MP', 
      sub: 'with OIS' 
    },
    tier: 'mid'
  }
];
---
```

### 3. Use the Component

```astro
<ComparisonTable 
  title="Smartphone Specifications Comparison"
  products={smartphones}
/>
```

---

## Complete Example

```astro
---
// src/pages/tech/best-budget-smartphones-2026.astro
import BaseLayout from '@/layouts/BaseLayout.astro';
import ComparisonTable from '@/components/ComparisonTable.astro';

const smartphones = [
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
  {
    name: 'Moto G Power',
    badge: '💰 Best Battery',
    badgeType: 'value',
    display: { main: '6.7" LCD', sub: '120Hz' },
    processor: { main: 'Snapdragon 680' },
    battery: { main: '6,000 mAh', sub: '30W Charging' },
    camera: { main: '48MP' },
    tier: 'entry'
  },
  {
    name: 'Samsung Galaxy A25',
    display: { main: '6.5" S-AMOLED', sub: '120Hz Refresh Rate' },
    processor: { main: 'Exynos 1380' },
    battery: { main: '5,000 mAh', sub: '25W Fast Charging' },
    camera: { main: '50MP', sub: 'with OIS' },
    tier: 'mid'
  }
];
---

<BaseLayout 
  title="Best Budget Smartphones 2026 - InSpotGO"
  description="Compare the best budget smartphones of 2026. Expert reviews and specifications."
>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <h1>Best Budget Smartphones of 2026</h1>
    
    <p class="lead">
      Looking for the best smartphone under $500? We've tested and compared 
      the top budget options to help you make the right choice.
    </p>

    <ComparisonTable 
      title="Smartphone Specifications Comparison"
      products={smartphones}
      note="Prices may vary by region and retailer. Last updated: February 2026."
    />

    <h2>Detailed Reviews</h2>
    <!-- Rest of your content -->
  </article>
</BaseLayout>
```

---

## Props Reference

### `title` (optional)
- **Type:** `string`
- **Default:** `"Specifications Comparison"`
- **Description:** The main heading displayed above the table

### `products` (required)
- **Type:** `Product[]`
- **Description:** Array of product objects to display in the table

### `note` (optional)
- **Type:** `string`
- **Default:** `"All specifications are based on manufacturer information. Prices and availability may vary."`
- **Description:** Footer note displayed below the table

---

## Product Object Structure

```typescript
interface Product {
  name: string;              // Product name (required)
  badge?: string;            // Badge text (optional)
  badgeType?: 'editor' | 'value' | 'popular';  // Badge style
  display: SpecDetail;       // Display specifications
  processor: SpecDetail;     // Processor specifications
  battery: SpecDetail;       // Battery specifications
  camera: SpecDetail;        // Camera specifications
  tier: 'entry' | 'mid' | 'premium';  // Product tier
  highlight?: boolean;       // Highlight this row
}

interface SpecDetail {
  main: string;    // Main specification (required)
  sub?: string;    // Sub-specification (optional)
}
```

---

## Badge Types

### Editor's Pick (Green)
```typescript
{
  badge: '🏆 Editor\'s Pick',
  badgeType: 'editor'
}
```

### Best Value (Orange)
```typescript
{
  badge: '💰 Best Value',
  badgeType: 'value'
}
```

### Most Popular (Purple)
```typescript
{
  badge: '🔥 Most Popular',
  badgeType: 'popular'
}
```

---

## Tier Classification

### Entry-level (Gray)
```typescript
{ tier: 'entry' }
```
- Budget products
- Basic features
- Affordable options

### Mid-range (Blue)
```typescript
{ tier: 'mid' }
```
- Balanced performance
- Good value for money
- Most recommended

### Premium (Gold/Amber)
```typescript
{ tier: 'premium' }
```
- High-end products
- Best performance
- Premium features

---

## Use Cases

### 1. Smartphone Comparisons
```astro
<ComparisonTable 
  title="Best Budget Smartphones 2026"
  products={smartphones}
/>
```

### 2. Laptop Comparisons
```astro
const laptops = [
  {
    name: 'MacBook Air M3',
    badge: '🏆 Editor\'s Pick',
    badgeType: 'editor',
    display: { main: '13.6" Liquid Retina', sub: '2560x1664' },
    processor: { main: 'Apple M3', sub: '8-core CPU' },
    battery: { main: 'Up to 18 hours' },
    camera: { main: '1080p FaceTime' },
    tier: 'premium',
    highlight: true
  }
];
```

### 3. SaaS Tool Comparisons
```astro
const saasTools = [
  {
    name: 'Notion',
    badge: '🔥 Most Popular',
    badgeType: 'popular',
    display: { main: 'All-in-one workspace' },
    processor: { main: 'Unlimited blocks', sub: 'Free plan available' },
    battery: { main: '$8/month', sub: 'Per user' },
    camera: { main: 'Web, iOS, Android' },
    tier: 'mid'
  }
];
```

---

## Styling Customization

The component uses CSS variables from your global styles:

```css
--color-primary: #2563eb       /* Blue */
--color-primary-dark: #1e40af   /* Blue Dark */
--color-action: #f97316         /* Orange */
--color-success: #10b981        /* Green */
--color-text: #1f2937           /* Dark Gray */
--color-text-light: #6b7280     /* Medium Gray */
```

---

## Responsive Behavior

- **Desktop (>768px):** Full table display with all columns visible
- **Tablet (768px):** Slightly reduced padding, still readable
- **Mobile (<768px):** Horizontal scroll enabled, minimum width maintained
- **Small Mobile (<480px):** Optimized spacing and font sizes

---

## Accessibility Features

- ✅ Semantic HTML (`<table>`, `<thead>`, `<tbody>`)
- ✅ Proper heading hierarchy
- ✅ High contrast ratios (WCAG AA compliant)
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Sticky header for context

---

## Best Practices

### DO:
- ✅ Use for 3-10 products (optimal readability)
- ✅ Keep product names concise (under 30 characters)
- ✅ Highlight only 1-2 featured products
- ✅ Use consistent spec formatting
- ✅ Include both main and sub specifications when relevant

### DON'T:
- ❌ Don't compare more than 15 products (too cluttered)
- ❌ Don't use on homepage (use cards instead)
- ❌ Don't highlight all rows (defeats the purpose)
- ❌ Don't mix different product categories
- ❌ Don't leave specs empty (use "—" instead)

---

## Performance

- **Zero JavaScript:** Pure CSS animations
- **Lightweight:** ~3KB CSS (minified)
- **Fast rendering:** Static HTML generation
- **SEO friendly:** Semantic markup

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Troubleshooting

### Table not responsive on mobile
**Solution:** Ensure parent container doesn't have `overflow: hidden`

### Colors not matching brand
**Solution:** Check CSS variables in `src/styles/global.css`

### Badges not showing
**Solution:** Verify `badgeType` is one of: 'editor', 'value', 'popular'

### Specs wrapping incorrectly
**Solution:** Keep main spec under 20 characters, use sub for details

---

## Related Components

- `ProductCard.astro` - For individual product displays
- `CategoryCard.astro` - For category navigation
- `PostCard.astro` - For blog post listings

---

## Support

For issues or questions:
- Check [COMPONENTS-GUIDE.md](../../COMPONENTS-GUIDE.md)
- Review [COLOR-GUIDE.md](../../COLOR-GUIDE.md)
- Open an issue on GitHub

---

**Built with ❤️ for InSpotGO**
