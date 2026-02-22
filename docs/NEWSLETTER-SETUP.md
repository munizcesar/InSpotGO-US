# Newsletter Setup - Resend Integration

## ✅ API Key Configurada

A API key do Resend já foi configurada nas variáveis de ambiente do Cloudflare Pages.

**API Key:** `re_Q3cq34fg_9NSLiAyqSnVmduPHwLNmdNyU`

---

## Como Funciona

1. **Usuário preenche email** no formulário "Stay Updated"
2. **Frontend envia** para `/api/newsletter` via POST
3. **Backend (Cloudflare Function)** recebe e valida
4. **Resend API** envia email de notificação para `inspotgo@gmail.com`
5. **Usuário vê** mensagem de confirmação: "✓ Thank you! You've been subscribed."

---

## Configuração no Cloudflare Pages

A variável de ambiente já deve estar configurada:

- **Nome:** `RESEND_API_KEY`
- **Valor:** `re_Q3cq34fg_9NSLiAyqSnVmduPHwLNmdNyU`
- **Ambiente:** Production + Preview

---

## Teste

1. Acesse a homepage
2. Role até a seção "Latest News & Reviews"
3. No sidebar, encontre o widget "Stay Updated"
4. Digite um email e clique em "Subscribe"
5. Você deve ver: "✓ Thank you! You've been subscribed."
6. Verifique `inspotgo@gmail.com` - deve receber email com o novo subscription

---

## Estrutura do Email Recebido

**Assunto:** `New Newsletter Subscription: [email]`

**Conteúdo:**
- Email do subscriber
- Data/hora da subscription
- Origem: inspotgo.com Newsletter Widget

---

## Troubleshooting

### Email não chega?
- Verifique se `RESEND_API_KEY` está configurada no Cloudflare Pages
- Verifique spam em `inspotgo@gmail.com`
- Veja logs do Cloudflare Workers para erros

### Mensagem de erro no formulário?
- Verifique console do navegador (F12)
- Verifique Network tab para ver resposta do `/api/newsletter`
- Verifique se o domínio está verificado no Resend (se necessário)

---

## Limites do Resend Free Tier

- ✅ 100 emails por dia
- ✅ 3,000 emails por mês
- ✅ API completa
- ✅ Suporte por email

Para mais volume, upgrade em https://resend.com/pricing
