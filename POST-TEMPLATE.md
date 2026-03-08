# ✅ POST-TEMPLATE.md — InSpotGO

> **⚠️ MANDATORY READ BEFORE CREATING ANY POST.**
> This file defines the exact standard for every article published on InSpotGO.
> Non-compliance will cause category display errors, SEO inconsistencies, and broken internal links.

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

## 2. EVERGREEN RULES — Non-Negotiable

InSpotGO publishes **timeless content**. Every post must follow these rules:

- ❌ **NO years in titles** — `"Best VPNs"` not `"Best VPNs 2026"`
- ❌ **NO prices in the body** — link to the tool's official pricing page instead
- ❌ **NO "Last updated: [Month Year]"** in the footer
- ❌ **NO "as of 2026"** or similar date anchors in the text
- ✅ **YES to pricing page links** — `[See current plans](https://tool.com/pricing)`
- ✅ **YES to footer disclaimer** — use this exact line at the end:

```
*Feature availability and pricing change frequently — always verify on provider websites before purchasing.*
```

---

## 3. BODY STRUCTURE — Mandatory Order

Every post MUST follow this section order:

```
1. > **Bottom line:** blockquote   ← First element, always
2. ---
3. ## At a glance (table)          ← For comparisons/roundups. Skip for how-to guides.
4. ---
5. ## [Content sections...]        ← Core of the article
6. ---
7. ## Frequently Asked Questions   ← Min. 4 questions. Required.
8. ---
9. ## Related Articles             ← Min. 4 internal links. Required.
10. ---
11. *Footer disclaimer*            ← Evergreen disclaimer. Required.
12. <script> JSON-LD FAQPage </script>  ← Schema markup. Required.
```

---

## 4. BOTTOM LINE BLOCKQUOTE

The first element after the frontmatter. Always formatted exactly like this:

```markdown
> **Bottom line:** [One or two sentences summarizing the verdict or the value of reading this guide.]
```

---

## 5. RELATED ARTICLES — Exact Format

Always placed **after FAQ** and **before the footer disclaimer**.
Minimum 4 links. Maximum 6. Always link to existing posts only.

```markdown
## Related Articles

- 📊 [Post Title Here](/posts/post-slug-here)
- 🔄 [Post Title Here](/posts/post-slug-here)
- 🟢 [Post Title Here](/posts/post-slug-here)
- 🔵 [Post Title Here](/posts/post-slug-here)
- 🟡 [Post Title Here](/posts/post-slug-here)
```

### Suggested emoji by category:
| Emoji | Use for |
|---|---|
| 📊 | Roundups / Best-of lists |
| 🔄 | Comparisons / X vs Y |
| 🟢 | Reviews (positive/recommended) |
| 🔵 | Reviews (neutral / informational) |
| 🟡 | Reviews (with caveats) |
| 📖 | Buying Guides |
| 🔐 | Security/Privacy tools |
| 🤖 | AI tools |

---

## 6. FAQ SECTION — Exact Format

Minimum 4 questions. Maximum 6. Each answer: 1–3 sentences.

```markdown
## Frequently Asked Questions

### [Question 1?]
[Answer in 1–3 sentences.]

### [Question 2?]
[Answer in 1–3 sentences.]
```

---

## 7. FAQ SCHEMA — JSON-LD (Required at end of every post)

Copy this block and fill in with the FAQ content above:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Question 1?", "acceptedAnswer": {"@type": "Answer", "text": "Answer 1."}},
    {"@type": "Question", "name": "Question 2?", "acceptedAnswer": {"@type": "Answer", "text": "Answer 2."}},
    {"@type": "Question", "name": "Question 3?", "acceptedAnswer": {"@type": "Answer", "text": "Answer 3."}},
    {"@type": "Question", "name": "Question 4?", "acceptedAnswer": {"@type": "Answer", "text": "Answer 4."}}
  ]
}
</script>
```

---

## 8. CTA LINKS — Affiliate Link Format

Use this format for all affiliate/tool CTAs inside the post body:

```markdown
[🚀 Try [Tool Name] Free →](https://tool.com/)
[🛡️ Get [Tool Name] →](https://tool.com/)
[📖 See [Tool Name] Plans →](https://tool.com/pricing)
```

---

## 9. FILENAME — Slug Convention

- All lowercase
- Hyphens only (no underscores)
- No years in the filename
- Descriptive and keyword-rich

```
✅ best-password-manager.md
✅ how-to-choose-project-management-software.md
✅ notion-vs-clickup-vs-monday.md
❌ best-password-manager-2026.md
❌ BestPasswordManager.md
❌ post_1.md
```

---

## 10. COVER IMAGE

- Path: `/images/posts/[post-slug].png`
- Size: 1200 × 630px
- Format: PNG or WebP
- Style: No text, no people, professional editorial aesthetic
- The filename must **exactly match** the `cover:` field in the frontmatter

---

## 11. COMPLETE POST SKELETON

Copy this skeleton when starting every new post:

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

## 12. PRE-PUBLISH CHECKLIST

Before committing any post, verify:

```
FRONTMATTER
[ ] title has no year
[ ] category is one of the 5 valid values
[ ] description is 140-160 chars and evergreen
[ ] cover path matches actual image filename
[ ] seo.keywords has 4-5 terms, no years

CONTENT
[ ] Starts with > **Bottom line:** blockquote
[ ] No prices in body — only links to pricing pages
[ ] No dates in body text
[ ] At least one comparison table
[ ] Pro tips / blockquotes used for emphasis

FAQ
[ ] Minimum 4 questions
[ ] FAQ JSON-LD schema at end of file

RELATED ARTICLES
[ ] Section present
[ ] Minimum 4 internal links
[ ] All linked slugs exist in src/content/posts/

FOOTER
[ ] Evergreen disclaimer line present
```

---

*This document is the single source of truth for post standards at InSpotGO.
When in doubt, refer back here before writing or committing.*
