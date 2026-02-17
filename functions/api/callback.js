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

  // Format expected by Decap CMS
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authentication Complete</title>
    </head>
    <body>
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("Received message:", e);
            window.opener.postMessage(
              'authorization:github:success:' + JSON.stringify({
                token: "${data.access_token}",
                provider: "github"
              }),
              e.origin
            );
            window.removeEventListener("message", receiveMessage, false);
          }
          window.addEventListener("message", receiveMessage, false);
          console.log("Sending message to opener");
          window.opener.postMessage(
            "authorizing:github",
            "*"
          );
        })()
      </script>
    </body>
    </html>
  `;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
