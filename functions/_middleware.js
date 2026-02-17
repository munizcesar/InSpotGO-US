// Cloudflare Pages Functions Middleware
// This ensures Functions are properly handled

export async function onRequest(context) {
  try {
    return await context.next();
  } catch (error) {
    console.error('Function error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
