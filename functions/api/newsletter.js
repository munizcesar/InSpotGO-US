/**
 * Newsletter Subscription — Cloudflare Pages Function
 * 1. Salva contato no Resend Contacts (Audience)
 * 2. Envia e-mail de boas-vindas ao subscriber
 * 3. Notifica o admin
 */

const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const WELCOME_HTML = (email) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#f97316,#ea580c);padding:40px 40px 32px;text-align:center">
          <h1 style="margin:0;color:#fff;font-size:28px;font-weight:800;letter-spacing:-0.5px">🔥 Welcome to InSpotGO!</h1>
          <p style="margin:12px 0 0;color:rgba(255,255,255,0.9);font-size:16px">Your radar for the hottest AI tools & software</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px">
          <p style="font-size:17px;color:#1a1a1a;line-height:1.6;margin:0 0 20px">Hey there! 👋</p>
          <p style="font-size:16px;color:#444;line-height:1.7;margin:0 0 20px">You're officially on the InSpotGO list. We cut through the noise so you get only the tools that are actually worth your time.</p>
          <p style="font-size:16px;color:#444;line-height:1.7;margin:0 0 32px">Here's what to expect:</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px">
            <tr><td style="padding:14px 16px;background:#fff7ed;border-left:4px solid #f97316;border-radius:0 8px 8px 0;margin-bottom:12px">
              <strong style="color:#1a1a1a">🤖 AI Tool Reviews</strong> — Honest, hands-on reviews of the latest AI tools
            </td></tr>
            <tr><td style="height:8px"></td></tr>
            <tr><td style="padding:14px 16px;background:#fff7ed;border-left:4px solid #f97316;border-radius:0 8px 8px 0">
              <strong style="color:#1a1a1a">📊 Software Comparisons</strong> — Side-by-side so you pick the right tool fast
            </td></tr>
            <tr><td style="height:8px"></td></tr>
            <tr><td style="padding:14px 16px;background:#fff7ed;border-left:4px solid #f97316;border-radius:0 8px 8px 0">
              <strong style="color:#1a1a1a">💡 Buying Guides</strong> — No fluff, just what actually matters
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
            <a href="https://inspotgo.com" style="display:inline-block;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:700;font-size:16px;letter-spacing:0.3px">Browse Latest Reviews →</a>
          </td></tr></table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f9f9f9;padding:24px 40px;text-align:center;border-top:1px solid #eee">
          <p style="margin:0;font-size:13px;color:#999">You subscribed at inspotgo.com · <a href="https://inspotgo.com" style="color:#f97316">Visit site</a></p>
          <p style="margin:8px 0 0;font-size:12px;color:#bbb">© 2026 InSpotGO · All rights reserved</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const email = (data?.email || '').trim().toLowerCase();

    if (!email || !validateEmail(email)) {
      return json({ success: false, error: 'Invalid email address' }, 400);
    }

    const key = env.RESEND_API_KEY;
    if (!key) return json({ success: false, error: 'Server misconfiguration' }, 500);

    // 1. Salva contato no Resend Contacts
    await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    // 2. E-mail de boas-vindas ao subscriber
    const welcomeRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'InSpotGO <onboarding@resend.dev>',
        to: [email],
        subject: '🔥 Welcome to InSpotGO — Your AI & Software Radar',
        html: WELCOME_HTML(email),
      }),
    });

    // 3. Notificação admin
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'InSpotGO <onboarding@resend.dev>',
        to: ['inspotgo@gmail.com'],
        subject: `🎉 New subscriber: ${email}`,
        html: `<p><strong>New subscriber:</strong> ${email}</p><p><strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })}</p><p><strong>Source:</strong> inspotgo.com</p>`,
      }),
    });

    if (!welcomeRes.ok) {
      const err = await welcomeRes.text();
      return json({ success: false, error: 'Email error', details: err }, 500);
    }

    return json({ success: true, message: 'Successfully subscribed!' });

  } catch (err) {
    return json({ success: false, error: 'Server error', details: err.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
