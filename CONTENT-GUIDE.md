# 📝 Content Creation Guide - InSpotGO

> **Purpose**: Step-by-step guide for creating high-quality, SEO-optimized content that converts.

**Last Updated**: February 9, 2026

---

## 🎯 Content Goals

1. **Help readers make informed decisions**
2. **Build trust through honest, detailed reviews**
3. **Rank well in search engines**
4. **Convert visitors into affiliate clicks**
5. **Establish InSpotGO as an authority**

---

## 📋 Content Types

### 1. Product Reviews
**Best for**: Individual tech products, software, SaaS tools

**Structure**:
```markdown
# [Product Name] Review: [Main Benefit]

## Quick Verdict (TL;DR)
- Rating: X/5 stars
- Best for: [audience]
- Price: $X
- Pros: bullet points
- Cons: bullet points

## What is [Product]?
Brief introduction

## Key Features
### Feature 1
### Feature 2
### Feature 3

## Pricing
Breakdown of plans

## Pros and Cons
### Pros
### Cons

## Who Should Buy [Product]?

## Alternatives to Consider

## Final Verdict

[Affiliate CTA Button]
```

### 2. Comparison Posts
**Best for**: "X vs Y" or "Top 5 Best X"

**Structure**:
```markdown
# [Product A] vs [Product B]: Which is Better in 2026?

## Quick Comparison
| Feature | Product A | Product B |
|---------|-----------|------------|

## Overview
### Product A
### Product B

## Feature-by-Feature Comparison
### Feature 1
### Feature 2
### Feature 3

## Pricing Comparison

## Which Should You Choose?
### Choose Product A if...
### Choose Product B if...

## Final Recommendation
```

### 3. Buying Guides
**Best for**: "Best X for Y" or "How to Choose X"

**Structure**:
```markdown
# Best [Product Category] for [Use Case] in 2026

## Why Trust Our Recommendations?

## Quick Picks
1. Best Overall: [Product]
2. Best Budget: [Product]
3. Best Premium: [Product]

## What to Look for in [Product]
- Factor 1
- Factor 2
- Factor 3

## Detailed Reviews
### 1. [Product Name] - Best Overall
### 2. [Product Name] - Best Budget
### 3. [Product Name] - Best Premium

## Comparison Table

## How We Test

## FAQ

## Conclusion
```

### 4. How-To Guides
**Best for**: Educational content, tutorials

**Structure**:
```markdown
# How to [Do Something]: Complete Guide (2026)

## What You'll Need

## Step 1: [Action]
## Step 2: [Action]
## Step 3: [Action]

## Tips & Best Practices

## Common Mistakes to Avoid

## Recommended Tools
[Include affiliate products]

## Conclusion
```

---

## ✍️ Writing Process

### Step 1: Research & Planning

#### A. Keyword Research
1. Use Google Keyword Planner, Ahrefs, or SEMrush
2. Find keywords with:
   - Monthly search volume: 500-5,000 (sweet spot for starting)
   - Low-medium competition
   - Buyer intent ("best", "review", "vs", "how to choose")

**Good keyword examples**:
- "best noise cancelling headphones under 200"
- "notion vs clickup for project management"
- "how to choose a laptop for video editing"

#### B. Competitor Analysis
1. Google your target keyword
2. Analyze top 5 results:
   - What structure do they use?
   - What topics do they cover?
   - What's missing?
   - How can you do better?

#### C. Outline Creation
1. Create detailed outline with H2/H3 headings
2. Plan where affiliate links will go
3. Identify images needed
4. Note key points for each section

### Step 2: Content Creation

#### Writing Guidelines:

**Tone & Voice**:
- Professional but conversational
- Helpful and honest
- No hype or exaggeration
- Write in 2nd person ("you")
- Use short paragraphs (2-3 sentences max)

**Structure**:
- Use descriptive H2/H3 headings
- Include bullet points for easy scanning
- Add comparison tables where relevant
- Break up text with images
- Use bold for important points

**Word Count Guidelines**:
- Product Review: 1,500-2,500 words
- Comparison: 2,000-3,000 words
- Buying Guide: 2,500-4,000 words
- How-To: 1,000-2,000 words

**SEO Optimization**:
- Include target keyword in:
  - Title (H1)
  - First paragraph
  - At least one H2
  - Meta description
  - URL slug
  - Image alt text
- But write naturally - don't keyword stuff!
- Use semantic keywords (related terms)
- Link to other relevant posts (internal linking)

### Step 3: Adding Affiliate Links

#### Where to Place Affiliate Links:
1. **Top of post** - Quick verdict box
2. **Product buttons** - "Check Price on Amazon"
3. **Within content** - Naturally in context
4. **Comparison tables** - Link from product names
5. **End of post** - Final recommendation CTA

#### Affiliate Link Best Practices:
```astro
<!-- Use clear, action-oriented CTAs -->
<a href="{amazonLink}" 
   class="affiliate-button"
   target="_blank"
   rel="nofollow noopener sponsored">
  Check Current Price on Amazon →
</a>

<!-- Always add rel="nofollow sponsored" for affiliate links -->
<!-- This is required by Google and FTC -->
```

#### Disclosure Requirements:
- Add affiliate disclosure at TOP of every post with affiliate links
- Make it visible and clear
- Example: "This post contains affiliate links. If you make a purchase through these links, we may earn a commission at no extra cost to you."

### Step 4: Images & Media

#### Image Requirements:
- **Hero image**: 1200x630px (for social sharing)
- **Product images**: High quality, 800px+ width
- **Screenshots**: Clear and annotated
- **File format**: WebP preferred (Astro auto-converts)
- **Naming**: descriptive-file-name.jpg

#### Image Sources:
- Own photos (best!)
- Manufacturer press kits
- Amazon product images (with proper attribution)
- Unsplash/Pexels (free stock)
- Never steal images - use only licensed

#### Optimization:
- Compress images before upload
- Add descriptive alt text
- Include keywords in alt text naturally

### Step 5: Pre-Publish Checklist

```markdown
## Content Quality
- [ ] Article is 1,500+ words
- [ ] Information is accurate and fact-checked
- [ ] Writing is clear and easy to understand
- [ ] No spelling or grammar errors
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Short paragraphs (2-3 sentences)
- [ ] Bullet points used where appropriate

## SEO
- [ ] Target keyword in title
- [ ] Target keyword in first paragraph
- [ ] Target keyword in at least one H2
- [ ] Meta description written (150-160 characters)
- [ ] URL slug is clean and includes keyword
- [ ] Internal links to 2-3 other posts
- [ ] External links to authoritative sources
- [ ] Images have descriptive alt text

## Affiliate Compliance
- [ ] Affiliate disclosure at top of post
- [ ] All affiliate links have rel="nofollow sponsored"
- [ ] CTAs are clear and action-oriented
- [ ] At least 2-3 affiliate link placements
- [ ] Links open in new tab (target="_blank")

## Images
- [ ] Hero image added (1200x630px)
- [ ] Product images are high quality
- [ ] All images compressed
- [ ] All images have alt text
- [ ] Images are relevant to content

## User Experience
- [ ] Quick verdict/TL;DR at top
- [ ] Table of contents for long posts
- [ ] Comparison table (if applicable)
- [ ] Pros/cons clearly listed
- [ ] Mobile-friendly formatting
- [ ] Easy to scan (headings, bullets, bold)

## Technical
- [ ] No broken links
- [ ] Page loads fast
- [ ] Schema markup added (auto-generated)
- [ ] Social share image set
```

---

## 📊 Content Performance Tracking

### Metrics to Monitor:
1. **Organic traffic** (Google Analytics)
2. **Rankings** (Google Search Console)
3. **Affiliate clicks** (affiliate dashboards)
4. **Conversion rate** (clicks to purchases)
5. **Time on page** (engagement)
6. **Bounce rate** (content quality)

### Update Schedule:
- Review top posts monthly
- Update pricing/info quarterly
- Refresh low-performers
- Add new products as released

---

## 🚫 Content DON'Ts

### Never Do This:
- ❌ Copy content from other sites
- ❌ Make false claims or promises
- ❌ Hide affiliate relationships
- ❌ Review products you haven't researched
- ❌ Keyword stuff
- ❌ Use clickbait titles
- ❌ Ignore user intent
- ❌ Forget mobile users
- ❌ Skip proofreading
- ❌ Promote low-quality products for commission

### Ethical Guidelines:
- ✅ Only recommend products you'd use yourself
- ✅ Be honest about cons and limitations
- ✅ Update content when products change
- ✅ Disclose affiliate relationships clearly
- ✅ Put user needs before commissions
- ✅ Cite sources and data
- ✅ Test products when possible

---

## 📚 Content Ideas Generator

### Tech Products:
- "Best [product] for [use case] under $[price]"
- "[Product A] vs [Product B]: Which Should You Buy?"
- "[Brand] [Product] Review: Worth the Money?"
- "Top [number] [product category] for [year]"
- "Is [expensive product] Worth It? (Honest Review)"

### SaaS:
- "[SaaS A] vs [SaaS B] for [use case]"
- "Best [category] software for [audience]"
- "[SaaS] Review: Features, Pricing & Alternatives"
- "[Free SaaS] vs [Paid Alternative]: Complete Comparison"
- "How to Choose [SaaS category] for Your Business"

### Seasonal Content:
- "Best Tech Gifts Under $[price] ([Holiday])"
- "Back to School: Best [products] for Students"
- "Black Friday Deals: Best [category] Discounts"
- "New Year: Top Productivity Tools for [year]"

---

## 🎓 Resources

### SEO Tools:
- Google Keyword Planner (free)
- Google Search Console (free)
- Ubersuggest (free tier)
- AnswerThePublic (free tier)
- Ahrefs / SEMrush (paid)

### Writing Tools:
- Grammarly (grammar/spelling)
- Hemingway Editor (readability)
- Google Docs (collaboration)

### Image Tools:
- Canva (design)
- TinyPNG (compression)
- Figma (mockups)

### Learning Resources:
- Amazon Associates Central
- FTC Disclosure Guidelines
- Google Search Central Blog
- Backlinko (SEO guides)
- Nerd Wallet (good affiliate site example)
- Wirecutter (gold standard for reviews)

---

## 💡 Pro Tips

1. **Update old content** - Better ROI than always writing new
2. **Link internally** - Helps SEO and keeps users on site
3. **Email capture** - Build list from Day 1
4. **Promote on Pinterest** - Great for product content
5. **Answer real questions** - Check Reddit, Quora for ideas
6. **Be specific** - "Best laptop" is too broad
7. **Show, don't just tell** - Use screenshots, examples
8. **Write comparison tables** - Easy to scan, rank well
9. **Track what works** - Double down on winners
10. **Stay consistent** - Regular publishing = compound growth

---

**Remember**: Quality beats quantity. One excellent, helpful post is worth 10 mediocre ones. Focus on genuinely helping your readers make good decisions! 🎯
