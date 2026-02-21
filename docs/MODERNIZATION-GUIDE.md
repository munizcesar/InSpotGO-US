# InSpotGO Modernization Guide

**Purpose:** Keep content evergreen to maintain RPM and search authority. Avoid dated references that hurt credibility.

---

## Non-Evergreen Content to Avoid

| Pattern | Example | Modern Replacement |
|---------|---------|---------------------|
| **Hardcoded years in titles** | "Best Laptops 2024" | "Best Laptops" or "Best Laptops (Updated)" + dynamic year in meta |
| **"Last year" / "This year"** | "Released in 2023" | Use relative: "Recently released" or actual date |
| **Outdated tech references** | "Works with IE11" | "Modern browsers (Chrome, Firefox, Safari, Edge)" |
| **Deprecated frameworks** | "AngularJS 1.x" | "Angular" or "Vue/React" |
| **Legacy formats** | "Flash support" | Remove; Flash is deprecated |
| **Static "Last Updated"** | Hardcoded "Feb 9, 2026" | Use `new Date().toLocaleDateString()` or CMS-driven |

---

## Current Status (Audit)

### ✅ Already Evergreen
- **Footer copyright:** Uses `new Date().getFullYear()` (dynamic)
- **Config:** `foundedYear: 2026` — update annually if needed
- **Default articles:** Use 2026 dates (current)

### ⚠️ Review & Update
- **Legal pages** (`privacy.astro`, `terms.astro`, `affiliate-disclosure.astro`):  
  "Last Updated: February 9, 2026" — consider dynamic or update when content changes
- **LatestNewsSection default fallback:** Mock articles have fixed dates — ensure real content overrides

### 📝 Recommendation
Add a shared `lastUpdated` helper or use frontmatter for legal pages so updates propagate automatically.

---

## Impact on RPM & Search Authority

- **Evergreen content** → Higher dwell time, fewer bounces, better rankings
- **Dated references** → Users distrust "2023" content in 2026; CTR and RPM drop
- **Schema.org + semantic HTML** → Better AI Overviews (SGE) visibility; more featured snippets
