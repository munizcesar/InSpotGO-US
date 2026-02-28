import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts', ({ data }) => data.draft !== true);

  const index = posts
    .sort((a, b) => {
      const da = new Date(a.data.updated || a.data.date || a.data.pubDate || 0);
      const db = new Date(b.data.updated || b.data.date || b.data.pubDate || 0);
      return db.getTime() - da.getTime();
    })
    .map((post) => {
      const raw = post.data.updated || post.data.date || post.data.pubDate;
      return {
        slug:        post.slug,
        title:       post.data.title       || '',
        description: post.data.description || '',
        category:    post.data.category    || '',
        tags:        post.data.tags        || [],
        date:        raw
          ? new Date(raw).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : '',
        image:       post.data.cover || post.data.image || '',
        readTime:    post.data.readTime || '5 min',
        featured:    post.data.featured   || false,
      };
    });

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
