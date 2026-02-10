# InSpotGO - Spot the Best. Go Confident.

> Expert reviews and guides for tech products, software, and SaaS tools.

**Site**: https://inspotgo.com  
**Status**: 🔄 In Development

---

## 🚀 About

InSpotGO is an affiliate review site helping people discover the best tech products, software, and SaaS tools through honest, comprehensive reviews and buying guides.

### Categories
- 💻 **Tech Products**: Laptops, smartphones, accessories, smart home
- ☁️ **SaaS Tools**: Productivity, marketing, development, design
- ⚙️ **Software**: Desktop applications and utilities
- 📚 **Guides**: Buying guides, tutorials, comparisons

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) (SSG)
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages
- **Analytics**: Google Analytics 4
- **CMS**: Decap CMS (Git-based)

---

## 📝 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/munizcesar/InSpotGO-US.git
cd InSpotGO-US

# Switch to feature branch
git checkout feature/site-restructure

# Install dependencies
npm install

# Run development server
npm run dev
```

Site will be available at: http://localhost:4321

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📚 Documentation

- **[ROADMAP.md](./ROADMAP.md)** - Complete development roadmap (7 phases)
- **[CONTENT-GUIDE.md](./CONTENT-GUIDE.md)** - Content creation workflow
- **[src/config.ts](./src/config.ts)** - Site configuration

---

## 🎯 Current Phase: Foundation

### ✅ Completed
- [x] Core configuration system
- [x] SEO-optimized layouts
- [x] Legal pages (FTC, GDPR, CCPA compliant)
- [x] Category structure
- [x] Homepage and category hubs
- [x] Reusable components

### 🔄 In Progress
- [ ] Content creation (first 10 posts)
- [ ] Google Analytics setup
- [ ] Amazon Associates application

### 📝 Next Steps
1. Get Google Analytics Measurement ID
2. Apply to Amazon Associates (need 10+ posts first)
3. Create initial content
4. Deploy to production

---

## 💾 Key Files

```
InSpotGO-US/
├── src/
│   ├── config.ts              # Central configuration
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main layout with SEO
│   ├── components/
│   │   ├── SEO.astro           # SEO component
│   │   ├── GoogleAnalytics.astro
│   │   ├── CategoryCard.astro
│   │   ├── ProductCard.astro
│   │   └── AffiliateBanner.astro
│   └── pages/
│       ├── index.astro         # Homepage
│       ├── tech/
│       ├── saas/
│       ├── software/
│       ├── guides/
│       ├── about.astro
│       ├── contact.astro
│       ├── affiliate-disclosure.astro
│       ├── privacy.astro
│       └── terms.astro
├── public/
│   └── robots.txt
├── astro.config.mjs       # Astro configuration
├── ROADMAP.md             # Development plan
└── CONTENT-GUIDE.md       # Content creation guide
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file (use `.env.example` as template):

```env
# Google Analytics
PUBLIC_GA_ID=G-XXXXXXXXXX

# Amazon Associates
PUBLIC_AMAZON_TAG=your-tag-20

# GitHub OAuth (for Decap CMS)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### Update Configuration

Edit `src/config.ts` to update:
- Analytics IDs
- Affiliate tags
- Social media links
- Contact information

---

## 💰 Affiliate Programs

### Planned Integrations
- **Amazon Associates** - Tech products
- **PartnerStack** - SaaS tools
- **Impact.com** - Various merchants
- **ShareASale** - Software companies
- **CJ Affiliate** - Multiple networks

### Compliance
- ✅ FTC-compliant disclosures
- ✅ GDPR cookie consent
- ✅ CCPA privacy controls
- ✅ Clear affiliate disclaimers

---

## 🚀 Deployment

### Cloudflare Pages

1. Connect GitHub repository
2. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `/dist`
   - **Root directory**: `/`
3. Add environment variables
4. Deploy!

### Custom Domain

Add `inspotgo.com` in Cloudflare Pages settings.

---

## 📝 Content Creation

Follow the [CONTENT-GUIDE.md](./CONTENT-GUIDE.md) for:
- Content structure templates
- SEO optimization checklist
- Affiliate link best practices
- Image requirements
- Publishing workflow

---

## 🤝 Contributing

Currently a solo project. Contributions may be accepted in the future.

---

## 📞 Support

- Email: contact@inspotgo.com
- GitHub Issues: [Report bugs or suggestions](https://github.com/munizcesar/InSpotGO-US/issues)

---

## 📜 License

MIT License - See LICENSE file for details.

---

**Built with ❤️ by InSpotGO Team**
