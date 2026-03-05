/**
 * generate-search-index.mjs
 * Scans src/content/posts/*.md and writes public/search-index.json
 * Run: node scripts/generate-search-index.mjs
 * Or via npm scripts: called automatically before astro build / astro dev
 */
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT       = join(__dirname, '..');
const POSTS_DIR  = join(ROOT, 'src', 'content', 'posts');
const OUT_FILE   = join(ROOT, 'public', 'search-index.json');

/** Minimal YAML value extractor (handles strings, arrays, booleans, dates) */
function parseFrontmatter(raw) {
  const block = raw.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!block) return {};
  const fm = {};
  const lines = block[1].split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // array field: tags: [a, b] or tags:\n  - a
    const arrInline = line.match(/^(\w+):\s*\[([^\]]*)\]/);
    if (arrInline) {
      fm[arrInline[1]] = arrInline[2].split(',').map(s => s.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')).filter(Boolean);
      i++; continue;
    }
    const keyOnly = line.match(/^(\w+):\s*$/);
    if (keyOnly) {
      // check if next lines are array items
      const arr = [];
      let j = i + 1;
      while (j < lines.length && /^\s+-\s+/.test(lines[j])) {
        arr.push(lines[j].replace(/^\s+-\s+/, '').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, ''));
        j++;
      }
      if (arr.length) { fm[keyOnly[1]] = arr; i = j; continue; }
    }
    const kv = line.match(/^(\w+):\s+(.+)$/);
    if (kv) {
      const val = kv[2].trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      fm[kv[1]] = val;
    }
    i++;
  }
  return fm;
}

async function main() {
  // Ensure public/ exists
  await mkdir(join(ROOT, 'public'), { recursive: true });

  let files;
  try {
    files = await readdir(POSTS_DIR);
  } catch {
    console.warn('⚠️  src/content/posts not found — writing empty index.');
    await writeFile(OUT_FILE, '[]', 'utf-8');
    return;
  }

  const mdFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const index = [];

  for (const file of mdFiles) {
    try {
      const raw = await readFile(join(POSTS_DIR, file), 'utf-8');
      const fm  = parseFrontmatter(raw);

      const slug = file.replace(/\.mdx?$/, '');

      // Normalise category → lowercase key used by the modal
      const category = (fm.category || 'tech').toLowerCase();

      // Format date nicely
      let dateStr = '';
      if (fm.date) {
        try {
          dateStr = new Date(fm.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          });
        } catch { dateStr = String(fm.date); }
      }

      index.push({
        slug,
        title:       fm.title       || slug,
        description: fm.description || fm.excerpt || '',
        category,
        tags:        Array.isArray(fm.tags) ? fm.tags : [],
        date:        dateStr,
        readTime:    fm.readTime    || fm.readingTime || '',
        featured:    fm.featured === 'true' || fm.featured === true,
      });
    } catch (err) {
      console.warn(`  ⚠️  Skipped ${file}: ${err.message}`);
    }
  }

  // Sort: featured first, then by date descending
  index.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  await writeFile(OUT_FILE, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`✅  search-index.json → ${index.length} post(s)`);
}

main().catch(err => { console.error(err); process.exit(1); });
