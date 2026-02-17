---
# InSpotGO Ops Log (Living Doc)

This is a living document to track what we changed, what we learned, and what we will do next.

## Today / Latest changes

### 2026-02-17
- Standardized affiliate disclosure line across posts to a short, professional one-liner.
- Fixed "Trending Now" to pull real posts from the Astro content collection instead of mock links.
- Added "Trending Now" placement to the homepage and to the Tech category page (sidebar).

## How "Trending Now" works

Source of truth: `src/components/WhatsHot.astro`.

Behavior:
- If the page passes `items`, those are rendered (manual/editorial override).
- If `items` is not provided, it auto-builds the list from `getCollection('posts')`.
- It filters out `draft: true` posts.
- It can optionally filter by `category` (example: `category="Tech"`).
- Ranking strategy (simple score): featured posts get a boost, newer posts get a boost.

## Where it is placed

- Homepage: `src/pages/index.astro` (sidebar next to Latest News).
- Tech category: `src/pages/tech.astro` (sidebar next to the post grid).

If you want it on other categories, repeat the same pattern on:
- `src/pages/software.astro`
- `src/pages/guides.astro`
- `src/pages/saas.astro`
- `src/pages/posts.astro`

## Next steps (planned)

### Content strategy
- Evergreen posts: create articles that stay useful for 6–24+ months (examples: how-to guides, “best X under $Y” with periodic updates, comparison frameworks).
- Update policy: add `updated:` in frontmatter whenever you refresh a post, and prefer updating evergreen posts over publishing brand-new ones.
- Monetization-ready posts: add `products:` blocks in frontmatter for posts that are meant to convert (the PostLayout renders a product list + Amazon link fallback).

### Product + monetization
- Create a dedicated page: `/affiliate-disclosure` (if it doesn't exist yet) explaining how commissions work.
- Add an "Editorial Policy" page and link it in the footer to increase trust.
- Add tracking later (Plausible/GA4) to replace the Trending score with real click data.

## Notes / Important reminders

- "Evergreen" means the intent stays stable; you keep it fresh by updating specs, models, and dates.
- Favor categories with higher buyer intent (Tech, Software) for early monetization.

