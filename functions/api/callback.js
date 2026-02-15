export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response("Erro: Código de autorização não encontrado.", { status: 400 });
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
    return new Response(`Erro na autenticação: ${data.error_description || data.error}`, { status: 500 });
  }

  const responseData = {
    token: data.access_token,
    provider: 'github'
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        (function() {
          const responseData = ${JSON.stringify(responseData)};
          const message = "authorization:github:success:" + JSON.stringify(responseData);
          
          if (window.opener) {
            window.opener.postMessage(message, window.location.origin);
            window.close();
          } else {
            document.body.innerHTML = "Autenticação concluída! Você já pode fechar esta janela e voltar ao painel.";
          }
        })()
      </script>
    </body>
    </html>
  `;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
