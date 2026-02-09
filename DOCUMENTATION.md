# InSpotGO - Complete Documentation

**Version:** 2.0  
**Last Updated:** February 9, 2026

---

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [Site Structure](#site-structure)
3. [Configuration](#configuration)
4. [Creating Content](#creating-content)
5. [SEO Guidelines](#seo-guidelines)
6. [Affiliate Links](#affiliate-links)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Text editor (VS Code recommended)

### Installation

```bash
# Clone repository
git clone https://github.com/munizcesar/InSpotGO-US.git
cd InSpotGO-US

# Install dependencies
npm install

# Run development server
npm run dev
```

Site will be available at: `http://localhost:4321`

### Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

---

## 🗂️ Site Structure

```
InSpotGO-US/
├── public/              # Static assets
│   ├── admin/          # Decap CMS admin
│   ├── images/         # Site images
│   └── favicon.ico
│
├── src/
│   ├── components/     # Reusable components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Site pages (routes)
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── tech/       # Tech category
│   │   ├── saas/       # SaaS category
│   │   ├── software/   # Software category
│   │   ├── guides/     # Guides category
│   │   └── legal/      # Legal pages
│   │
│   ├── content/        # Markdown content
│   ├── styles/         # Global styles
│   └── config.ts       # Site configuration
│
├── astro.config.mjs    # Astro config
├── package.json        # Dependencies
├── ROADMAP.md         # Development roadmap
└── README.md          # Project readme
```

---

## ⚙️ Configuration

### Main Config File: `src/config.ts`

This is the central configuration file. Update this file with your details:

```typescript
export const SITE = {
  name: 'InSpotGO',
  url: 'https://inspotgo.com',
  email: 'contact@inspotgo.com', // UPDATE THIS
  // ... more settings
};

export const ANALYTICS = {
  measurementId: '', // ADD YOUR GA4 ID
};

export const AFFILIATES = {
  amazon: {
    enabled: false, // Set true when approved
    associateId: '', // ADD YOUR AMAZON ID
  },
};
```

### Environment Variables

Create `.env` file in root:

```env
# GitHub OAuth (for Decap CMS)
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

# Analytics
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Affiliate IDs
AMAZON_ASSOCIATE_ID=yourname-20
```

---

## ✍️ Creating Content

### Method 1: Using Decap CMS (Easiest)

1. Go to: `https://yoursite.com/admin`
2. Login with GitHub
3. Click "New Post"
4. Fill in the fields
5. Click "Publish"

### Method 2: Manually Creating Files

#### Product Review

Create file: `src/content/posts/product-name-review.md`

```markdown
---
title: "Product Name Review 2026: Is It Worth It?"
description: "Detailed review of Product Name including features, pros, cons, and pricing."
date: 2026-02-09
category: tech
tags: [laptops, review, 2026]
author: InSpotGO Team
featuredImage: /images/product-name.jpg
rating: 4.5
affiliateLink: https://amazon.com/...
price: $999
---

## Introduction

Your content here...

## Key Features

- Feature 1
- Feature 2

## Pros & Cons

### Pros
- Pro 1
- Pro 2

### Cons
- Con 1
- Con 2

## Final Verdict

Your conclusion...
```

---

## 🔍 SEO Guidelines

### Every Page Must Have:

1. **Title Tag** (50-60 characters)
   - Include main keyword
   - Brand name at end
   - Example: "Best Laptops 2026: Top 10 Picks | InSpotGO"

2. **Meta Description** (150-160 characters)
   - Compelling summary
   - Include CTA
   - Example: "Discover the best laptops of 2026. Expert reviews, comparisons, and buying guides to help you choose right. Read now!"

3. **URL Structure**
   - Use hyphens, not underscores
   - Keep short and descriptive
   - Include main keyword
   - Good: `/tech/best-laptops-2026`
   - Bad: `/p?id=123&cat=tech`

4. **Headings (H1-H6)**
   - One H1 per page (page title)
   - Use H2 for main sections
   - Use H3 for subsections
   - Include keywords naturally

5. **Images**
   - Descriptive file names: `best-laptop-2026.jpg`
   - Alt text with keywords
   - Compress before uploading
   - Use WebP format when possible

### Internal Linking

- Link to related articles
- Use descriptive anchor text
- 2-5 internal links per article
- Link from old content to new content

### External Linking

- Link to authoritative sources
- Open in new tab
- Use `rel="nofollow"` for affiliate links

---

## 💰 Affiliate Links

### FTC Compliance (REQUIRED)

**Every page with affiliate links must include:**

```html
<div class="affiliate-disclosure">
  <p><strong>Disclosure:</strong> As an Amazon Associate, InSpotGO earns 
  from qualifying purchases. This means we may earn a commission if you 
  click through and make a purchase, at no additional cost to you.</p>
</div>
```

### Creating Affiliate Links

#### Amazon Associates

1. Get product link from Amazon
2. Add your Associate ID: `?tag=yourname-20`
3. Use link builder: https://affiliate-program.amazon.com/home/tools

Example:
```
https://amazon.com/dp/B08XYZ123?tag=yourname-20
```

#### Best Practices

- ✅ Use descriptive link text: "Check price on Amazon"
- ❌ Don't use: "Click here"
- ✅ Add `rel="nofollow sponsored"` to affiliate links
- ✅ Update prices regularly
- ✅ Disclose clearly and prominently

---

## 🚀 Deployment

### Cloudflare Pages

Site deploys automatically on push to `main` branch.

**Build settings:**
```
Build command: npm run build
Output directory: dist
Node version: 18
```

**Environment variables to set in Cloudflare:**
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `PUBLIC_GA_MEASUREMENT_ID`

### Custom Domain Setup

1. Go to Cloudflare Pages → Your site → Custom domains
2. Add `inspotgo.com`
3. Update DNS records:
   ```
   CNAME @ yoursite.pages.dev
   ```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Admin panel not working**
- Check GitHub OAuth setup
- Verify callback URL: `https://yoursite.com/api/callback`
- Check browser console for errors

**Issue: Images not showing**
- Verify file path starts with `/images/`
- Check file exists in `public/images/`
- Clear browser cache

**Issue: Affiliate links not tracking**
- Verify Associate ID is correct
- Check link format
- Test in incognito mode

**Issue: Site not updating**
- Check Cloudflare Pages build logs
- Verify push to correct branch
- Clear Cloudflare cache

### Getting Help

- Check console for errors: `F12` → Console tab
- Review build logs in Cloudflare Pages
- Check Astro documentation: https://docs.astro.build

---

## 📞 Support Resources

- **Astro Discord:** https://astro.build/chat
- **Cloudflare Community:** https://community.cloudflare.com
- **GitHub Issues:** https://github.com/munizcesar/InSpotGO-US/issues

---

**Remember:** Document everything you do. Future you will thank you! 🙏
