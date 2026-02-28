import type { APIRoute } from 'astro';

// This route mirrors the Cloudflare function at functions/api/newsletter.js
// so that the newsletter widget works during local development.
// Once deployed to Cloudflare Pages, the function file will handle the
// same endpoint. We reuse identical logic here.

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const email = (data?.email || '').trim();

    if (!email || !validateEmail(email)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.log(`[Newsletter Subscription] ${email} - ${new Date().toISOString()}`);
      return new Response(JSON.stringify({ success: true, message: 'Subscription received (dev mode)' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'InSpotGO <noreply@inspotgo.com>',
        to: ['inspotgo@gmail.com'],
        subject: `New Newsletter Subscription: ${email}`,
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })}</p>
          <p><strong>Source:</strong> inspotgo.com Newsletter Widget</p>
        `,
        text: `New Newsletter Subscription\n\nEmail: ${email}\nDate: ${new Date().toLocaleString()}\nSource: inspotgo.com`,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', errorData);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send notification' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Successfully subscribed!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Server error. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
