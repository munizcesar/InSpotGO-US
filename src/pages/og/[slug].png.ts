// src/pages/og/[slug].png.ts
// Banner engine — Satori + Resvg
// Fontes Inter carregadas do node_modules/@fontsource/inter (sem fetch externo)
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

// ─── Paletas por nicho ──────────────────────────────────────────────────
const PALETTES: Record<string, { accent: string; glow: string; badge: string }> = {
  saas:         { accent: "#6366F1", glow: "#4F46E5", badge: "⚡ SaaS" },
  tools:        { accent: "#6366F1", glow: "#4F46E5", badge: "🛠 Tools" },
  productivity: { accent: "#3B82F6", glow: "#2563EB", badge: "🎯 Productivity" },
  finance:      { accent: "#10B981", glow: "#059669", badge: "💰 Finance" },
  health:       { accent: "#F59E0B", glow: "#D97706", badge: "🌿 Health" },
  marketing:    { accent: "#EC4899", glow: "#DB2777", badge: "📣 Marketing" },
  security:     { accent: "#8B5CF6", glow: "#7C3AED", badge: "🔒 Security" },
  software:     { accent: "#06B6D4", glow: "#0891B2", badge: "💻 Software" },
  default:      { accent: "#6366F1", glow: "#4F46E5", badge: "✦ InSpotGO" },
};

// ─── Carga de fontes do node_modules (instaladas via npm) ─────────────────
let _fontBlack:   Buffer | null = null;
let _fontRegular: Buffer | null = null;

function getFonts(): { black: Buffer; regular: Buffer } {
  if (_fontBlack && _fontRegular) {
    return { black: _fontBlack, regular: _fontRegular };
  }
  // @fontsource/inter instala os .ttf dentro de node_modules automaticamente
  const base = path.resolve(process.cwd(), "node_modules", "@fontsource", "inter", "files");
  _fontBlack   = fs.readFileSync(path.join(base, "inter-latin-900-normal.woff2"));
  _fontRegular = fs.readFileSync(path.join(base, "inter-latin-400-normal.woff2"));
  return { black: _fontBlack, regular: _fontRegular };
}

// ─── Static paths ───────────────────────────────────────────────────
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: {
      title:       post.data.title,
      description: post.data.description ?? "",
      category:    (post.data.category ?? "default").toLowerCase(),
    },
  }));
};

// ─── Endpoint GET ──────────────────────────────────────────────────
export const GET: APIRoute = async ({ props }) => {
  const { title, description, category } = props as {
    title: string;
    description: string;
    category: string;
  };

  const palette = PALETTES[category] ?? PALETTES.default;

  let fonts: { black: Buffer; regular: Buffer };
  try {
    fonts = getFonts();
  } catch (e) {
    console.error("[OG] Font load error:", e);
    return new Response("Font load failed", { status: 500 });
  }

  const safeTitle = title.length > 72 ? title.slice(0, 69) + "..." : title;
  const safeDesc  = description.length > 120 ? description.slice(0, 117) + "..." : description;

  const template = {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        background: "#080C18",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "72px 80px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-140px",
              right: "-100px",
              width: "680px",
              height: "680px",
              borderRadius: "9999px",
              background: `radial-gradient(circle, ${palette.glow}50 0%, transparent 65%)`,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "-80px",
              left: "200px",
              width: "400px",
              height: "400px",
              borderRadius: "9999px",
              background: `radial-gradient(circle, ${palette.accent}18 0%, transparent 70%)`,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: "0",
              top: "0",
              bottom: "0",
              width: "5px",
              background: `linear-gradient(to bottom, ${palette.accent}, ${palette.accent}00)`,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "52px",
              left: "80px",
              background: `${palette.accent}20`,
              border: `1px solid ${palette.accent}55`,
              borderRadius: "9999px",
              padding: "8px 22px",
              color: palette.accent,
              fontSize: "22px",
              fontWeight: 400,
              display: "flex",
              alignItems: "center",
            },
            children: palette.badge,
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "52px",
              right: "80px",
              color: "#334155",
              fontSize: "20px",
              fontWeight: 400,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "8px",
                    height: "8px",
                    borderRadius: "9999px",
                    background: palette.accent,
                  },
                },
              },
              "inspotgo.com",
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              color: "#FFFFFF",
              fontSize: "62px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              maxWidth: "950px",
              marginBottom: "20px",
              display: "flex",
              flexWrap: "wrap",
            },
            children: safeTitle,
          },
        },
        {
          type: "div",
          props: {
            style: {
              width: "48px",
              height: "3px",
              background: palette.accent,
              borderRadius: "9999px",
              marginBottom: "18px",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              color: "#94A3B8",
              fontSize: "24px",
              fontWeight: 400,
              maxWidth: "820px",
              lineHeight: 1.5,
              display: "flex",
              flexWrap: "wrap",
            },
            children: safeDesc,
          },
        },
      ],
    },
  };

  try {
    const svg = await satori(template as Parameters<typeof satori>[0], {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fonts.black,   weight: 900, style: "normal" },
        { name: "Inter", data: fonts.regular, weight: 400, style: "normal" },
      ],
    });

    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
    const png   = resvg.render().asPng();

    return new Response(png, {
      headers: {
        "Content-Type":  "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[OG] Satori render error:", err);
    return new Response("Banner generation failed", { status: 500 });
  }
};
