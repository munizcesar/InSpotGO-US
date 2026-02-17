export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response("Error: Authorization code not found.", { status: 400 });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: context.env.GITHUB_CLIENT_ID,
      client_secret: context.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await tokenResponse.json();
  
  if (data.error) {
    return new Response(`Authentication error: ${data.error_description || data.error}`, { status: 500 });
  }

  // Improved callback that works on mobile and desktop
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authentication Complete</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <p>Authenticating...</p>
      <script>
        (function() {
          const data = {
            token: "${data.access_token}",
            provider: "github"
          };

          // Try to communicate with opener (desktop popup)
          if (window.opener) {
            window.opener.postMessage(
              'authorization:github:success:' + JSON.stringify(data),
              window.location.origin
            );
            // Small delay before closing
            setTimeout(function() {
              window.close();
            }, 100);
          } 
          // Fallback for mobile or if opener doesn't exist
          else {
            // Store token and redirect back to admin
            const message = 'authorization:github:success:' + JSON.stringify(data);
            window.localStorage.setItem('decap-cms-auth-result', message);
            window.location.href = '/admin/';
          }
        })()
      </script>
    </body>
    </html>
  `;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
