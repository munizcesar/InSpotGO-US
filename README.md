# InSpotGO - Product Discovery Platform

Affiliate review site built with Astro + Decap CMS + Cloudflare.

## 🚀 Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run local dev
```bash
npm run dev
```
Site: http://localhost:4321
Admin: http://localhost:4321/admin (admin works after deploy with GitHub OAuth)

### 3. Create GitHub OAuth App
Create a GitHub OAuth App and set:
- Authorization callback URL: https://inspotgo.com/api/callback

### 4. Deploy on Cloudflare Pages
Set build command `npm run build` and output directory `/dist`.
Add environment variables:
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

### 5. Update Decap CMS
Edit `public/admin/config.yml` to replace `SEU_USER/InSpotGO-US` and `base_url`.

Notes:
- Admin panel requires deploy and correct OAuth setup.
- Replace placeholder links and images with real assets.

Update: 2026-02-07
