# ✅ POST-TEMPLATE.md — InSpotGO

> **⚠️ MANDATORY READ BEFORE CREATING ANY POST.**
> This file defines the exact standard for every article published on InSpotGO.
> Non-compliance will cause category display errors, SEO inconsistencies, and broken internal links.

---

## 0. SITE IDENTITY — Read First

| Property | Value |
|---|---|
| **Site name** | InSpotGO |
| **Primary audience** | United States |
| **Language** | American English (en-US) |
| **Locale** | en_US |
| **Content focus** | SaaS, software, productivity tools, AI, security |
| **Monetization** | Affiliate programs (SaaS-first, recurring commissions) |
| **Editorial standard** | Wirecutter / The Verge level — professional, evidence-based |
| **Tone** | Authoritative, direct, helpful. Not casual, not hype. |

---

## 1. FRONTMATTER — Required Fields

Every post MUST start with this exact frontmatter block:

```yaml
---
title: "[Descriptive Title: NO years or dates]"
date: YYYY-MM-DD
updated: YYYY-MM-DD        # Optional — only add if the post was revised after publishing
tags: ["tag1", "tag2", "tag3"]  # lowercase, hyphenated, max 6 tags
description: "One sentence summary of the post. 140-160 characters. No dates. Evergreen."
cover: "/images/posts/slug-of-the-post.png"
author: "InSpotGO Editorial Team"
readTime: "X min"          # Estimate: ~200 words per minute
featured: true             # true = appears in featured sections
category: "Reviews"        # See valid categories below
seo:
  keywords: "keyword 1, keyword 2, keyword 3, keyword 4, keyword 5"
---
```

### Valid `category` values (use exactly as written):

| Value | Use for |
|---|---|
| `"Reviews"` | Individual product/tool reviews |
| `"Comparisons"` | X vs Y posts, multi-tool comparisons |
| `"Buying Guides"` | How-to-choose, expert buying advice |
| `"SaaS"` | SaaS market analysis, trends, industry overviews |
| `"News"` | Product launches, updates, industry news |

---

## 2. US SEO STANDARDS — Mandatory

InSpotGO targets **Google US (google.com)**. All SEO decisions must be made with the American search market in mind.

### 2.1 Keyword Language
- Write in **American English** only: `color` not `colour`, `organize` not `organise`, `license` not `licence`
- Use US-market terminology: `project management software` not `project management programme`
- Use US intent signals in keywords: `best`, `top`, `review`, `vs`, `how to`, `for teams`, `for small business`

### 2.2 Keyword Selection Rules
- **Primary keyword**: 1 per post — in title, first paragraph, and at least one H2
- **Secondary keywords**: 3–4 semantically related terms — used naturally in body
- **No keyword stuffing**: density should feel natural to a native English reader
- **No years in keywords** (evergreen rule)
- **Buyer intent preferred**: keywords with commercial or transactional intent rank better for affiliate sites

### 2.3 Title Tag Rules (for `title:` field)
- Max 60 characters (Google US truncates at ~60ch on desktop)
- Primary keyword near the beginning
- No clickbait, no ALL CAPS, no excessive punctuation
- Format patterns that work well:
  - `Best [Category]: [Differentiator]`
  - `[Tool A] vs [Tool B]: Which Is Right for You?`
  - `How to Choose [Category]: The Complete Guide`
  - `[Tool Name] Review: [Verdict in a few words]`

### 2.4 Meta Description Rules (for `description:` field)
- 140–160 characters (Google US displays ~155ch)
- Include primary keyword naturally
- Write as a value proposition, not a summary
- End with an implicit or explicit call-to-action
- No quotes, no special characters that break SERP display

### 2.5 URL Slug Rules (filename)
- All lowercase, hyphens only
- 3–5 words ideal — include primary keyword
- No stop words (a, the, for, of, in) unless essential for keyword match
- No years

```
✅ best-password-manager.md
✅ notion-vs-clickup.md
✅ how-to-choose-crm-software.md
❌ the-best-password-manager-for-2026.md
❌ password_manager_review.md
```

### 2.6 Internal Linking Strategy
- Every post must link to **at least 2 other posts** within the body (not just Related Articles)
- Link with descriptive anchor text: `[our ClickUp review](/posts/clickup-review)` not `[click here](/posts/clickup-review)`
- Prioritize linking to posts in the same category
- Do not link to the same post more than once per article

### 2.7 Heading Hierarchy
- `H1` = title (set by frontmatter, do NOT add a # heading in the body)
- `H2 (##)` = main sections
- `H3 (###)` = subsections within H2
- Never skip levels (no H4 without H3)
- At least one H2 should contain the primary keyword

---

## 3. GEO — US Audience Targeting

InSpotGO is a US-first publication. Every content decision must reflect the American reader.

### 3.1 Currency & Pricing
- Always reference **USD ($)** when currency is needed
- Never show fixed prices — always link to official pricing pages
- When comparing plans, use US pricing tiers only

### 3.2 US Spellings — Required

| ❌ UK/Other | ✅ US English |
|---|---|
| colour | color |
| organise | organize |
| licence (noun) | license |
| programme | program |
| whilst | while |
| analyse | analyze |
| centre | center |
| travelling | traveling |
| behaviour | behavior |

### 3.3 US Date Format
- In frontmatter: `YYYY-MM-DD` (ISO, for machine use)
- In body text (if ever needed): `Month DD, YYYY` — e.g., `March 7, 2026`
- Never use `DD/MM/YYYY` (British format)

### 3.4 US Audience Assumptions
- Readers are professionals, small business owners, entrepreneurs, and teams
- They are familiar with SaaS subscription models
- They compare tools on **features, integrations, support quality, and value** — not just price
- They trust brands like Wirecutter, PCMag, G2, and TechRadar — match that tone
- They respond to **social proof**: mention user counts, reviews, G2/Capterra scores where relevant

### 3.5 US Legal & Compliance
- **FTC Affiliate Disclosure** is required on every review/comparison post
- Place this at the very top of the body, before the Bottom Line:

```markdown
> **Disclosure:** InSpotGO may earn a commission from affiliate links in this article at no extra cost to you. Our editorial opinions are independent.
```

- All affiliate links must use `rel="nofollow sponsored"` (handled by the theme, but verify)

---

## 4. GEO SCHEMA — Structured Data for US Market

Every post already includes `FAQPage` JSON-LD. For **Review** posts, also add `SoftwareApplication` or `Product` schema. Example for a SaaS tool review:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Tool Name]",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Windows, macOS, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan available"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "ratingCount": "1000"
  }
}
</script>
```

> Only add this schema to **Review** posts where you can justify the rating with research.

---

## 5. EVERGREEN RULES — Non-Negotiable

InSpotGO publishes **timeless content**. Every post must follow these rules:

- ❌ **NO years in titles or slugs**
- ❌ **NO fixed prices in the body** — link to official pricing pages
- ❌ **NO "Last updated: [Month Year]"** in the footer
- ❌ **NO "as of 2026"** or similar date anchors
- ❌ **NO "currently"** without context that won't age poorly
- ✅ **YES** — link to pricing pages: `[See current plans](https://tool.com/pricing)`
- ✅ **YES** — footer disclaimer (exact text):

```
*Feature availability and pricing change frequently — always verify on provider websites before purchasing.*
```

---

## 6. BODY STRUCTURE — Mandatory Order

```
1. > Disclosure blockquote         ← Reviews/Comparisons only
2. > **Bottom line:** blockquote   ← Always first content element
3. ---
4. ## At a glance (table)          ← Comparisons/roundups. Skip for how-to guides.
5. ---
6. ## [Content sections...]        ← Core article content
7. ---
8. ## Frequently Asked Questions   ← Min. 4 questions. Required.
9. ---
10. ## Related Articles            ← Min. 4 internal links. Required.
11. ---
12. *Footer disclaimer*            ← Evergreen line. Required.
13. <script> JSON-LD FAQPage </script>  ← Required.
14. <script> JSON-LD SoftwareApp </script>  ← Reviews only.
```

---

## 7. BOTTOM LINE BLOCKQUOTE

```markdown
> **Bottom line:** [One or two sentences. Clear verdict. Written for a US professional audience.]
```

---

## 8. RELATED ARTICLES — Exact Format

Always after FAQ, before footer. Min 4, max 6. Existing posts only.

```markdown
## Related Articles

- 📊 [Post Title Here](/posts/post-slug-here)
- 🔄 [Post Title Here](/posts/post-slug-here)
- 🟢 [Post Title Here](/posts/post-slug-here)
- 🔵 [Post Title Here](/posts/post-slug-here)
```

| Emoji | Use for |
|---|---|
| 📊 | Roundups / Best-of lists |
| 🔄 | Comparisons / X vs Y |
| 🟢 | Reviews (recommended) |
| 🔵 | Reviews (neutral/informational) |
| 🟡 | Reviews (with caveats) |
| 📖 | Buying Guides |
| 🔐 | Security/Privacy tools |
| 🤖 | AI tools |

---

## 9. FAQ SECTION

Min 4, max 6 questions. Answers: 1–3 sentences each. Write for US reader intent.

```markdown
## Frequently Asked Questions

### [Question?]
[Answer.]
```

---

## 10. FAQ JSON-LD SCHEMA (Required on all posts)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Q1?", "acceptedAnswer": {"@type": "Answer", "text": "A1."}},
    {"@type": "Question", "name": "Q2?", "acceptedAnswer": {"@type": "Answer", "text": "A2."}},
    {"@type": "Question", "name": "Q3?", "acceptedAnswer": {"@type": "Answer", "text": "A3."}},
    {"@type": "Question", "name": "Q4?", "acceptedAnswer": {"@type": "Answer", "text": "A4."}}
  ]
}
</script>
```

---

## 11. CTA LINKS — Affiliate Format

```markdown
[🚀 Try [Tool] Free →](https://tool.com/)
[🛡️ Get [Tool] →](https://tool.com/)
[📖 See [Tool] Plans →](https://tool.com/pricing)
```

---

## 12. COMPLETE POST SKELETON

```markdown
---
title: ""
date: YYYY-MM-DD
tags: []
description: ""
cover: "/images/posts/post-slug.png"
author: "InSpotGO Editorial Team"
readTime: "X min"
featured: true
category: ""
seo:
  keywords: ""
---

> **Disclosure:** InSpotGO may earn a commission from affiliate links in this article at no extra cost to you. Our editorial opinions are independent.

> **Bottom line:**

---

## At a glance

| | Option A | Option B | Option C |
|---|---|---|---|
| **Best for** | | | |

---

## [Section 1]

---

## [Section 2]

---

## [Section 3]

---

## Frequently Asked Questions

### [Question?]

### [Question?]

### [Question?]

### [Question?]

---

## Related Articles

- 📊 [Post Title](/posts/post-slug)
- 🔄 [Post Title](/posts/post-slug)
- 🟢 [Post Title](/posts/post-slug)
- 🔵 [Post Title](/posts/post-slug)

---

*Feature availability and pricing change frequently — always verify on provider websites before purchasing.*

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "?", "acceptedAnswer": {"@type": "Answer", "text": ""}},
    {"@type": "Question", "name": "?", "acceptedAnswer": {"@type": "Answer", "text": ""}},
    {"@type": "Question", "name": "?", "acceptedAnswer": {"@type": "Answer", "text": ""}},
    {"@type": "Question", "name": "?", "acceptedAnswer": {"@type": "Answer", "text": ""}}
  ]
}
</script>
```

---

## 13. PRE-PUBLISH CHECKLIST

```
US SEO
[ ] American English spelling throughout
[ ] Primary keyword in title (first 60 chars)
[ ] Primary keyword in first paragraph
[ ] At least 1 H2 contains primary keyword
[ ] Meta description 140-160 chars, no years
[ ] Slug is 3-5 words, keyword-rich, no years
[ ] 2+ internal contextual links in body text
[ ] Anchor text is descriptive (not "click here")

GEO / US AUDIENCE
[ ] FTC Disclosure blockquote present (reviews/comparisons)
[ ] Currency references use USD ($)
[ ] No UK spellings (colour, organise, programme, etc.)
[ ] Date format in body: Month DD, YYYY (if used)
[ ] Tone matches Wirecutter/The Verge standard

FRONTMATTER
[ ] title has no year
[ ] category is one of the 5 valid values
[ ] description is 140-160 chars, evergreen
[ ] cover path matches image filename
[ ] seo.keywords has 4-5 terms, no years

CONTENT
[ ] Starts with Bottom line: blockquote
[ ] No fixed prices — only links to pricing pages
[ ] No date anchors in body
[ ] At least one comparison table
[ ] Pro tips / blockquotes for emphasis

SCHEMA
[ ] FAQPage JSON-LD at end of file
[ ] SoftwareApplication schema (Reviews only)

RELATED ARTICLES
[ ] Section present after FAQ
[ ] Min 4 internal links
[ ] All slugs exist in src/content/posts/

FOOTER
[ ] Evergreen disclaimer line present
```

---

*This document is the single source of truth for post standards at InSpotGO.
Always read this file before creating or editing any post.*
