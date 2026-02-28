#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Reads all .md files in src/content/posts/, extracts frontmatter,
 * and writes public/sitemap.xml automatically.
 *
 * Usage:  node scripts/generate-sitemap.js
 *         npm run sitemap
 *
 * Run before every deploy or add to the build step:
 *   "build": "node scripts/generate-sitemap.js && astro build"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT       = path.resolve(__dirname, '..');
const POSTS_DIR  = path.join(ROOT, 'src/content/posts');
const OUT_FILE   = path.join(ROOT, 'public/sitemap.xml');
const SITE       = 'https://inspotgo.com';
const TODAY      = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Minimal frontmatter parser (no external deps)
// ---------------------------------------------------------------------------
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const col = line.indexOf(':');
    if (col === -1) continue;
    const key = line.slice(0, col).trim();
    const val = line.slice(col + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && val) fm[key] = val;
  }
  return fm;
}

// ---------------------------------------------------------------------------
// Collect posts
// ---------------------------------------------------------------------------
const postFiles = fs
  .readdirSync(POSTS_DIR)
  .filter(f => f.endsWith('.md'));

const posts = postFiles
  .map(file => {
    const raw  = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const fm   = parseFrontmatter(raw);
    if (fm.draft === 'true') return null;   // skip drafts

    // slug: prefer explicit frontmatter slug, else filename without .md
    const slug = fm.slug || file.replace(/\.md$/, '');
    const lastmod = fm.updated || fm.date || TODAY;

    return { slug, lastmod, title: fm.title || slug };
  })
  .filter(Boolean)
  .sort((a, b) => b.lastmod.localeCompare(a.lastmod));

// ---------------------------------------------------------------------------
// Static pages
// ---------------------------------------------------------------------------
const staticPages = [
  { loc: '/',                    lastmod: TODAY,        changefreq: 'weekly',  priority: '1.0' },
  { loc: '/tech',                lastmod: TODAY,        changefreq: 'weekly',  priority: '0.9' },
  { loc: '/saas',                lastmod: TODAY,        changefreq: 'weekly',  priority: '0.9' },
  { loc: '/software',            lastmod: TODAY,        changefreq: 'weekly',  priority: '0.9' },
  { loc: '/guides',              lastmod: TODAY,        changefreq: 'weekly',  priority: '0.9' },
  { loc: '/about',               lastmod: '2026-02-11', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact',             lastmod: '2026-02-11', changefreq: 'monthly', priority: '0.6' },
  { loc: '/affiliate-disclosure',lastmod: '2026-02-11', changefreq: 'monthly', priority: '0.5' },
  { loc: '/editorial-policy',    lastmod: '2026-02-11', changefreq: 'monthly', priority: '0.5' },
  { loc: '/privacy',             lastmod: '2026-02-11', changefreq: 'yearly',  priority: '0.4' },
  { loc: '/terms',               lastmod: '2026-02-11', changefreq: 'yearly',  priority: '0.4' },
];

// ---------------------------------------------------------------------------
// Build XML
// ---------------------------------------------------------------------------
function urlBlock({ loc, lastmod, changefreq = 'monthly', priority = '0.8' }) {
  return [
    '  <url>',
    `    <loc>${SITE}${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const staticXML = staticPages.map(urlBlock).join('\n');
const postsXML  = posts.map(p => urlBlock({
  loc: `/posts/${p.slug}`,
  lastmod: p.lastmod,
})).join('\n');

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '',
  '  <!-- Static pages -->',
  staticXML,
  '',
  '  <!-- Posts (' + posts.length + ' total, auto-generated ' + TODAY + ') -->',
  postsXML,
  '',
  '</urlset>',
].join('\n');

fs.writeFileSync(OUT_FILE, xml, 'utf8');
console.log(`✅ sitemap.xml generated — ${posts.length} posts + ${staticPages.length} static pages`);
console.log(`   Output: ${OUT_FILE}`);
