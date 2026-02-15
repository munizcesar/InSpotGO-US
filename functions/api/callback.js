export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

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
  console.log("GitHub Response:", JSON.stringify(data));
  
  const content = data.error 
    ? `authorization:github:error:${data.error_description || data.error}`
    : `authorization:github:success:${JSON.stringify({
        token: data.access_token,
        provider: 'github'
      })}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("Receiving message:", e.data);
            if (e.data !== "authorizing:github") return;
            
            window.opener.postMessage("${content}", e.origin);
            window.removeEventListener("message", receiveMessage, false);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
      </script>
    </body>
    </html>
  `;
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
