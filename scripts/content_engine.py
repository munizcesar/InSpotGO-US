#!/usr/bin/env python3
"""
InSpotGO Content Engine
=======================
Gera artigos evergreen estrategicos para o mercado americano.
O banner OG e gerado automaticamente pelo Astro no build.

Uso:
  python scripts/content_engine.py --topic "how to build better habits" \\
                                   --slug  "how-to-build-better-habits"  \\
                                   --niche "productivity"

Requisitos:
  pip install groq          # para usar Groq API (recomendado)
  # OU instale Ollama localmente: https://ollama.com  (gratis, offline)

Variaveis de ambiente:
  GROQ_API_KEY   — chave da Groq API (gratuita em console.groq.com)
"""

import argparse
import re
import json
import os
import sys
from pathlib import Path

# Load .env variables (so GROQ_API_KEY from .env is available)
from dotenv import load_dotenv
load_dotenv()

# ─── Configuracao ────────────────────────────────────────────────────────────
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
OUTPUT_DIR   = Path("src/content/posts")

VALID_NICHES = [
    "saas", "tools", "productivity", "finance",
    "health", "marketing", "security", "software", "default"
]

# ─── Frases que envelhecem o conteudo ────────────────────────────────────────
STALE_PATTERNS = [
    (r"\bin \d{4}\b",                        ""),
    (r"\brecently\b",                         ""),
    (r"\blately\b",                           ""),
    (r"\bnowadays\b",                         "commonly"),
    (r"\bthe latest\b",                       "modern"),
    (r"\bnew feature\b",                      "key feature"),
    (r"\bin recent (years|months|weeks)\b",   ""),
    (r"\bthis year\b",                        ""),
    (r"\bas of \d{4}\b",                      ""),
    (r"\bcurrently\b",                        "typically"),
    (r"\btoday's\b",                          "modern"),
    (r"\$[\d,]+(\.[\d]{2})?\b",              ""),   # remove precos USD
    (r"\bR\$[\d,]+\b",                        ""),   # remove precos BRL
    (r"\bper month\b",                        ""),
    (r"\bper year\b",                         ""),
    (r"/mo\b",                                ""),
    (r"/yr\b",                                ""),
]

# ─── Mapa de links internos por nicho ────────────────────────────────────────
# Atualize conforme for publicando novos posts
INTERNAL_LINKS: dict[str, list[dict]] = {
    "saas":         [{"text": "best project management tools",    "slug": "best-project-management-tools"}],
    "tools":        [{"text": "essential tools for remote work",   "slug": "essential-tools-remote-work"}],
    "productivity": [{"text": "how to manage your time better",    "slug": "how-to-manage-time-better"}],
    "finance":      [{"text": "how to build an emergency fund",    "slug": "how-to-build-emergency-fund"}],
    "health":       [{"text": "how to build sustainable habits",   "slug": "how-to-build-sustainable-habits"}],
    "marketing":    [{"text": "how to grow your audience online",  "slug": "grow-audience-online"}],
    "security":     [{"text": "how to protect your privacy online","slug": "protect-privacy-online"}],
    "software":     [{"text": "best software for small business",  "slug": "best-software-small-business"}],
    "default":      [],
}

# ─── Prompts ────────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are a senior content strategist writing for an American audience.

RULES (NON-NEGOTIABLE):
- Write in fluent, natural American English
- NEVER mention specific years, dates, or prices
- NEVER use: "in 2024", "in 2025", "in 2026", "recently", "lately", "this year", "as of", "new feature", "currently", "today"
- Use timeless language: "modern", "commonly", "advanced", "key", "typically", "proven"
- NEVER include price figures, subscription costs, or monetary comparisons
- Tone: authoritative, helpful, direct — like NerdWallet, Wirecutter, or The Verge
- Output ONLY valid Markdown. No HTML tags. No preamble. No explanation.

STRUCTURE:
1. H1: keyword-rich title (already provided as --topic, reuse it)
2. Intro paragraph (100-150 words) — include main keyword in first 2 sentences
3. Six H2 sections (see user prompt for exact titles)
4. After H2 #3: insert the exact placeholder text [INTERNAL_LINK] on its own line
5. After H2 #4: insert the exact placeholder text [AFFILIATE_CTA] on its own line
6. FAQ section with 4 questions as H3 headings, each followed by a 2-3 sentence answer"""


def build_user_prompt(topic: str, niche: str) -> str:
    return f"""Write a complete evergreen article about: \"{topic}\"
Niche: {niche}
Target reader: American adult looking for practical, trustworthy advice
Article intent: informational + soft affiliate conversion

Required H2 sections (use these exact titles):
1. What Is {topic.title()}
2. Why It Matters
3. How It Works
4. How to Choose the Right Option
5. Common Mistakes to Avoid
6. Tips to Get the Most Out of It
7. FAQ

Placeholder rules:
- Add [INTERNAL_LINK] on its own line at the END of section 3 (How It Works)
- Add [AFFILIATE_CTA] on its own line at the END of section 4 (How to Choose)

Output ONLY the article body in Markdown. Start directly with the H1."""


# ─── Limpeza de conteudo datado ──────────────────────────────────────────────
def clean_stale_content(text: str) -> str:
    for pattern, replacement in STALE_PATTERNS:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    text = re.sub(r"  +", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


# ─── Injecao de links internos ───────────────────────────────────────────────
def inject_internal_links(text: str, niche: str) -> str:
    links = INTERNAL_LINKS.get(niche, [])
    for link in links:
        if "/posts/" + link["slug"] not in text:  # evita duplicar
            anchor = f'[{link["text"]}](/posts/{link["slug"]})'
            text = text.replace("[INTERNAL_LINK]", anchor, 1)
    text = re.sub(r"\[INTERNAL_LINK\]", "", text)
    return text


# ─── Injecao do CTA de afiliado ──────────────────────────────────────────────
def inject_affiliate_cta(text: str, niche: str) -> str:
    cta = f"""
> **Ready to get started?** Explore top-rated {niche} solutions trusted by professionals — compare features, read real reviews, and find the right fit for your needs. [See our top picks →](/posts/)
"""
    text = text.replace("[AFFILIATE_CTA]", cta, 1)
    text = re.sub(r"\[AFFILIATE_CTA\]", "", text)  # limpa sobrando
    return text


# ─── Extrair meta description ────────────────────────────────────────────────
def extract_description(body: str) -> str:
    paragraphs = [
        p.strip() for p in body.split("\n\n")
        if p.strip() and not p.strip().startswith("#")
        and not p.strip().startswith(">")
    ]
    first = re.sub(r"[*_`\[\]]", "", paragraphs[0]) if paragraphs else ""
    first = re.sub(r"\(.*?\)", "", first).strip()
    if len(first) > 155:
        return first[:152].rsplit(" ", 1)[0] + "..."
    return first


# ─── Gerar schema JSON-LD para FAQ ──────────────────────────────────────────
def generate_faq_schema(body: str, slug: str) -> str:
    questions = re.findall(r"###?\s+(.+\?)", body)
    if not questions:
        return ""
    items = [
        {
            "@type": "Question",
            "name": q.strip(),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "See the full article for a detailed, practical answer."
            }
        }
        for q in questions[:4]
    ]
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items
    }
    return f'\n\n<script type="application/ld+json">\n{json.dumps(schema, indent=2)}\n</script>'


# ─── Montar frontmatter (compativel com src/content/config.ts) ───────────────
def build_frontmatter(
    topic: str,
    slug: str,
    niche: str,
    description: str,
) -> str:
    return f"""---
title: "{topic}"
description: "{description}"
category: "{niche}"
cover: "/og/{slug}.png"
ogImage: "/og/{slug}.png"
featured: false
draft: false
---"""


# ─── Geracao com Groq API ────────────────────────────────────────────────────
def generate_fallback_content(topic: str, niche: str) -> str:
    """Generate a basic placeholder article when no LLM is available."""
    return f"""# {topic}\n\n""" + \
           "This article is a draft generated locally. Replace with final content when the content engine is connected to an LLM.\n\n" + \
           "## What Is {topic.title()}\n\n" + \
           "A brief explanation of what this topic is about.\n\n" + \
           "## Why It Matters\n\n" + \
           "Why readers should care about this topic.\n\n" + \
           "## How It Works\n\n" + \
           "An overview of how the process works.\n\n" + \
           "[INTERNAL_LINK]\n\n" + \
           "## How to Choose the Right Option\n\n" + \
           "Guidance on selecting the right solution.\n\n" + \
           "[AFFILIATE_CTA]\n\n" + \
           "## Common Mistakes to Avoid\n\n" + \
           "Common pitfalls and how to avoid them.\n\n" + \
           "## Tips to Get the Most Out of It\n\n" + \
           "Practical tips to maximize success.\n\n" + \
           "### FAQ\n\n" + \
           "#### What is the best way to start?\n\n" + \
           "Start by defining your goals and evaluating options.\n\n" + \
           "#### How long does it take to see results?\n\n" + \
           "It depends on the pace of implementation and consistency.\n\n" + \
           "#### Are there common tools I should consider?\n\n" + \
           "Look for tools that fit your workflow and scale with you.\n\n" + \
           "#### Can I switch tools later?\n\n" + \
           "Yes, but plan transitions to avoid losing data or momentum.\n"""


def generate_with_google(topic: str, niche: str) -> str:
    google_key = os.getenv("GOOGLE_API_KEY", "")
    project_id = os.getenv("GOOGLE_PROJECT_ID", "")
    location = os.getenv("GOOGLE_LOCATION", "us-central1")

    if not google_key or not project_id:
        print("⚠️  GOOGLE_API_KEY ou GOOGLE_PROJECT_ID nao configurados. Tentando Ollama...")
        return generate_with_ollama(topic, niche)

    try:
        import requests

        # Use API key if provided (simpler than OAuth for quick setup)
        endpoint = (
            f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}"
            "/publishers/google/models/text-bison:generateText"
        )
        endpoint = f"{endpoint}?key={google_key}"

        payload = {
            "instances": [
                {"content": build_user_prompt(topic, niche)}
            ]
        }
        headers = {"Content-Type": "application/json"}

        res = requests.post(endpoint, json=payload, headers=headers, timeout=120)
        res.raise_for_status()
        data = res.json()
        return data["predictions"][0]["content"]
    except Exception as e:
        print(f"⚠️  Google Vertex AI falhou ({e}). Tentando Ollama...")
        return generate_with_ollama(topic, niche)


def generate_with_groq(topic: str, niche: str) -> str:
    if not GROQ_API_KEY:
        print("⚠️  GROQ_API_KEY nao encontrada. Tentando Google Vertex AI...")
        return generate_with_google(topic, niche)
    try:
        from groq import Groq
        client = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user",   "content": build_user_prompt(topic, niche)},
            ],
            temperature=0.7,
            max_tokens=4096,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"⚠️  Groq falhou ({e}). Tentando Google Vertex AI...")
        return generate_with_google(topic, niche)


# ─── Geracao com Ollama local (fallback gratuito) ────────────────────────────
def generate_with_ollama(topic: str, niche: str) -> str:
    import subprocess
    import json as j
    payload = {
        "model": "llama3",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": build_user_prompt(topic, niche)},
        ],
        "stream": False
    }
    try:
        result = subprocess.run(
            ["curl", "-s", "http://localhost:11434/api/chat", "-d", j.dumps(payload)],
            capture_output=True, text=True, timeout=120
        )
        data = j.loads(result.stdout)
        return data["message"]["content"]
    except Exception as e:
        print(f"❌ Ollama também falhou: {e}")
        print("   Instale Ollama em https://ollama.com ou configure GROQ_API_KEY")
        sys.exit(1)


# ─── Main ────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description="InSpotGO Content Engine — gera artigos evergreen para o mercado americano"
    )
    parser.add_argument("--topic",
                        help="Topico do artigo em ingles (ex: 'how to build better habits')")
    parser.add_argument("--slug",
                        help="Slug da URL (ex: how-to-build-better-habits)")
    parser.add_argument("--niche", default="default",
                        choices=VALID_NICHES,
                        help="Nicho: saas | tools | productivity | finance | health | marketing | security | software")
    parser.add_argument("--config",
                        help="JSON file with array of {topic, slug, niche} objects to generate in batch")
    parser.add_argument("--llm",   default="groq",
                        choices=["groq", "ollama"],
                        help="LLM a usar (default: groq)")
    args = parser.parse_args()

    if args.config:
        # Batch mode: generate multiple articles from a JSON file
        try:
            config_data = json.loads(Path(args.config).read_text(encoding="utf-8"))
        except Exception as e:
            print(f"❌ Falha ao ler config: {e}")
            sys.exit(1)
        if not isinstance(config_data, list):
            print("❌ Config file must be a JSON array of {topic, slug, niche} objects")
            sys.exit(1)

        for item in config_data:
            if not all(k in item for k in ["topic", "slug", "niche"]):
                print("❌ Each item must include topic, slug, and niche")
                continue
            run_generation(item["topic"], item["slug"], item["niche"], args.llm)
        return

    if not args.topic or not args.slug:
        print("❌ Must provide --topic and --slug unless using --config")
        sys.exit(1)

    print(f"\n🚀 InSpotGO Content Engine")
    print(f"   Topico : {args.topic}")
    print(f"   Slug   : {args.slug}")
    print(f"   Nicho  : {args.niche}")
    print(f"   LLM    : {args.llm}\n")

    run_generation(args.topic, args.slug, args.niche, args.llm)


def run_generation(topic: str, slug: str, niche: str, llm: str):
    print(f"\n🚀 InSpotGO Content Engine")
    print(f"   Topico : {topic}")
    print(f"   Slug   : {slug}")
    print(f"   Nicho  : {niche}")
    print(f"   LLM    : {llm}\n")

    output_file = OUTPUT_DIR / f"{slug}.md"
    if output_file.exists():
        confirm = input(f"⚠️  {output_file} ja existe. Sobrescrever? [s/N] ").strip().lower()
        if confirm != "s":
            print("   Cancelado.")
            return

    # 1. Gerar conteudo via LLM
    print("⏳ Gerando conteudo...")
    # Prioritize Google Vertex AI (if configured), else fall back to Groq, then Ollama
    if os.getenv("GOOGLE_API_KEY") and os.getenv("GOOGLE_PROJECT_ID"):
        raw = generate_with_google(topic, niche)
    else:
        raw = generate_with_groq(topic, niche) if llm == "groq" else generate_with_ollama(topic, niche)

    # 2. Limpar conteudo datado
    clean = clean_stale_content(raw)

    # 3. Injetar links e CTAs
    clean = inject_internal_links(clean, niche)
    clean = inject_affiliate_cta(clean, niche)

    # 4. Extrair description e gerar schema
    description = extract_description(clean)
    faq_schema = generate_faq_schema(clean, slug)

    # 5. Montar arquivo final
    frontmatter = build_frontmatter(topic, slug, niche, description)
    final = f"{frontmatter}\n\n{clean}{faq_schema}\n"

    # 6. Salvar
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_file.write_text(final, encoding="utf-8")

    print(f"\n✅ Artigo salvo  : {output_file}")
    print(f"🖼  Banner OG     : /og/{slug}.png  (gerado no astro build)")
    print(f"📝 Description   : {description[:80]}...")
    print(f"\n👉 Proximos passos:")
    print(f"   1. Revise o artigo em {output_file}")
    print(f"   2. git add . && git commit -m 'content: add {slug}'")
    print(f"   3. git push  →  Cloudflare Pages faz o build + banner automaticamente\n")


if __name__ == "__main__":
    main()
