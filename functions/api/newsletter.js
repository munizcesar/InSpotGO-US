/**
 * Newsletter Subscription Endpoint
 * Receives email subscriptions and sends notification to inspotgo@gmail.com
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const data = await request.json();
    const email = data?.email?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resendApiKey = env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.log(`[Newsletter Subscription] ${email} - ${new Date().toISOString()}`);
      return new Response(
        JSON.stringify({ success: true, message: 'Subscription received (dev mode)' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Using Resend's shared sender while custom domain is not yet verified.
    // Once inspotgo.com is verified in Resend, change back to: noreply@inspotgo.com
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'InSpotGO <onboarding@resend.dev>',
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
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send notification' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Newsletter endpoint error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
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
