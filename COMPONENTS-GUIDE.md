# Components Guide - InSpotGO-US

## New Premium Components

This guide covers the newly implemented premium layout components with Deep Purple + Orange-to-Pink gradient design.

---

## 🔥 WhatsHot Component

**Location:** `src/components/WhatsHot.astro`

### Features
- Trending articles sidebar widget
- Numbered list with gradient badges
- Category tags with custom colors
- View count and date metadata
- Animated trending icon
- Sticky positioning on desktop
- "View All Trending" CTA button

### Usage

```astro
---
import WhatsHot from '../components/WhatsHot.astro';
---

<!-- Basic usage with mock data -->
<WhatsHot />

<!-- Custom data -->
<WhatsHot 
  items={[
    {
      title: "Article Title",
      category: "Tech",
      href: "/tech/article-slug",
      views: "2.3k",
      date: "2h ago",
    },
    // ... more items
  ]}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<HotItem>` | Mock data | Array of trending articles |

**HotItem Interface:**
```typescript
{
  title: string;
  category: string;  // "Tech", "SaaS", "Software", "Guides"
  href: string;
  views?: string;
  date?: string;
  image?: string;
}
```

### Design Features
- **Gradient number badges** using `--gradient-action`
- **Category-specific colors:**
  - Tech: Deep Purple (`#2E1155`)
  - SaaS: Purple (`#8b5cf6`)
  - Software: Green (`#10b981`)
  - Guides: Orange (`#f59e0b`)
- **Hover effects:** Slide right + background change
- **Pulse animation** on trending icon

---

## 📰 LatestNewsSection Component

**Location:** `src/components/LatestNewsSection.astro`

### Features
- Large featured article with 16:9 image
- Grid of 5 regular articles
- Integrated WhatsHot sidebar
- Newsletter subscription widget
- Responsive layout (sidebar moves to bottom on mobile)
- Category badges with custom colors
- Read time estimates
- Gradient CTA buttons

### Usage

```astro
---
import LatestNewsSection from '../components/LatestNewsSection.astro';
---

<!-- Basic usage with mock data -->
<LatestNewsSection />

<!-- Custom articles -->
<LatestNewsSection 
  articles={[
    {
      title: "Article Title",
      description: "Article description...",
      category: "Tech",
      image: "/images/article.jpg",
      href: "/tech/article-slug",
      date: "Feb 13, 2026",
      readTime: "8 min",
      featured: true,  // First featured article becomes hero
    },
    // ... more articles
  ]}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `articles` | `Array<Article>` | Mock data | Array of articles |

**Article Interface:**
```typescript
{
  title: string;
  description: string;
  category: string;      // "Tech", "SaaS", "Software", "Guides"
  image: string;         // Image URL or path
  href: string;
  date: string;
  readTime?: string;     // e.g., "8 min"
  featured?: boolean;    // Makes it the hero article
}
```

### Layout Structure

```
┌─────────────────────────────────────────────┐
│     Latest News & Reviews (Title)            │
├────────────────────────────┬────────────────┤
│                            │                 │
│  FEATURED ARTICLE          │  WHAT'S HOT    │
│  (Large, 16:9 image)       │  • Item 1      │
│                            │  • Item 2      │
├────────────────────────────┤  • Item 3      │
│  ARTICLE  │  ARTICLE       │  • Item 4      │
│    1      │     2          │  • Item 5      │
├───────────┼────────────────┤                 │
│  ARTICLE  │  ARTICLE       │  NEWSLETTER    │
│    3      │     4          │  WIDGET        │
├───────────┼────────────────┤                 │
│  ARTICLE 5 (optional)      │                 │
├────────────────────────────┴────────────────┤
│         [View All Articles]                  │
└─────────────────────────────────────────────┘
```

### Design Features

**Featured Article:**
- Large format with prominent image
- Full description visible
- Hover: Image zoom effect
- Category badge top-left

**Regular Articles:**
- 2-column grid on desktop
- Compact card format
- 2-line title clamp
- 2-line description clamp
- Read time badge

**Sidebar:**
- Sticky WhatsHot widget
- Gradient newsletter form
- Responsive: becomes 2-column grid on tablet

---

## 🎨 Integration Example

### Replace Current Homepage Section

**Before** (`src/pages/index.astro`):
```astro
<!-- Recent Posts Section -->
<section class="recent-posts">
  <div class="container">
    <h2>Recent Articles</h2>
    <div class="posts-grid">
      {posts.map(post => <PostCard {...post} />)}
    </div>
  </div>
</section>
```

**After:**
```astro
---
import LatestNewsSection from '../components/LatestNewsSection.astro';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');

// Transform posts to Article format
const articles = posts.map((post, index) => ({
  title: post.data.title,
  description: post.data.description,
  category: post.data.category || 'Tech',
  image: post.data.cover || post.data.image || '/images/default.jpg',
  href: `/posts/${post.slug}`,
  date: new Date(post.data.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }),
  readTime: post.data.readTime || '5 min',
  featured: index === 0,  // First post is featured
}));
---

<LatestNewsSection articles={articles} />
```

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- 2-column layout: Main content (left) + Sidebar (right)
- Sidebar sticky at `top: 80px`
- Featured article + 2×3 grid

### Tablet (768px - 1024px)
- Single column layout
- Sidebar becomes 2-column grid below content
- Featured article + 2×2 grid + single article

### Mobile (<768px)
- Single column everything
- Featured article scales down
- Articles stack vertically
- Sidebar widgets stack

---

## 🎯 Color System

### Category Colors
```css
Tech:     #2E1155 (Deep Purple)
SaaS:     #8b5cf6 (Purple)
Software: #10b981 (Green)
Guides:   #f59e0b (Orange)
```

### Gradient Buttons
```css
--gradient-action: linear-gradient(135deg, #f97316 0%, #fb7185 50%, #ec4899 100%);
```

### Hover States
- Cards: Lift 2-4px with shadow increase
- Images: Scale 1.05
- Titles: Change to `--color-primary`
- Buttons: Darker gradient + lift + shadow

---

## 🚀 Next Steps

1. **Replace homepage recent posts section** with `LatestNewsSection`
2. **Add real post data** instead of mock data
3. **Create trending logic** for WhatsHot (views/date based)
4. **Implement newsletter** backend integration
5. **Add category pages** using similar layout

---

## 📄 Files Modified

- ✅ `src/styles/global.css` - Premium color system
- ✅ `src/components/Header.astro` - Gradient logo
- ✅ `src/components/Footer.astro` - Gradient logo  
- ✅ `src/components/WhatsHot.astro` - NEW
- ✅ `src/components/LatestNewsSection.astro` - NEW
- ⏳ `src/pages/index.astro` - TO UPDATE

---

**Questions or Issues?**
Refer to `LANGUAGE-POLICY.md` for content guidelines and `ROADMAP.md` for project planning.
