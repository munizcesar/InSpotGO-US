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
  const html = `
    <script>
      window.opener.postMessage({token: "${data.access_token}", provider: "github"}, window.location.origin);
      window.close();
    </script>
  `;
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
