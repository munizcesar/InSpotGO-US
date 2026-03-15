# InSpotGO Content Engine

Pipeline completo para gerar **artigos evergreen** + **banners OG premium** com um único comando.

---

## Como funciona

```
Você digita o tema
       ↓
 content_engine.py  →  src/content/posts/<slug>.md
       ↓
  astro build       →  /og/<slug>.png  (banner 1200×630 automático)
```

---

## Instalação (uma vez só)

### 1. Dependências Node (banner)

```bash
npm install satori @resvg/resvg-js
```

### 2. Fontes Inter (obrigatório)

```bash
# Baixe Inter em https://fonts.google.com/specimen/Inter
# Extraia e copie:
mkdir -p public/fonts
cp ~/Downloads/static/Inter-Black.ttf   public/fonts/
cp ~/Downloads/static/Inter-Regular.ttf public/fonts/
```

### 3. Dependências Python (artigo)

```bash
pip install groq
```

### 4. Chave Groq (grátis)

1. Acesse https://console.groq.com
2. Crie uma chave API gratuita
3. Adicione ao seu `.env`:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

> **Alternativa offline:** Instale [Ollama](https://ollama.com) e use `--llm ollama`

---

## Uso

```bash
python scripts/content_engine.py \
  --topic "how to improve focus while working from home" \
  --slug  "improve-focus-working-from-home" \
  --niche "productivity"
```

### Nichos disponíveis

| Flag | Badge no banner | Cor |
|------|----------------|-----|
| `saas` | ⚡ SaaS | Indigo |
| `tools` | 🛠 Tools | Indigo |
| `productivity` | 🎯 Productivity | Blue |
| `finance` | 💰 Finance | Emerald |
| `health` | 🌿 Health | Amber |
| `marketing` | 📣 Marketing | Pink |
| `security` | 🔒 Security | Violet |
| `software` | 💻 Software | Cyan |

---

## O que é gerado

| Arquivo | Conteúdo |
|---------|----------|
| `src/content/posts/<slug>.md` | Artigo completo com frontmatter, CTAs, links internos, schema FAQ |
| `/og/<slug>.png` | Banner 1200×630 gerado automaticamente no `astro build` |

---

## Workflow diário

```bash
# 1. Gerar artigo
python scripts/content_engine.py --topic "..." --slug "..." --niche "..."

# 2. Revisar o .md gerado
code src/content/posts/<slug>.md

# 3. Commitar e publicar (banner é gerado automaticamente no deploy)
git add .
git commit -m "content: add <slug>"
git push
```

---

## Segurança

- ✅ Nenhum arquivo existente foi modificado
- ✅ Branch separada `feature/content-engine` — merge só quando testar
- ✅ O endpoint `/og/[slug].png.ts` só é ativado se `satori` e `@resvg/resvg-js` estiverem instalados
- ✅ Fallback de erro 500 silencioso se fontes não estiverem presentes (não quebra o build)
- ✅ O script Python **pergunta antes de sobrescrever** posts existentes
