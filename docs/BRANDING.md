# 🎨 InSpotGO - Branding & Logo Guidelines

## Logo Files

### Primary Logos

#### 1. **favicon.svg** (Browser Tab Icon)
- **Location:** `/public/favicon.svg`
- **Size:** 200×200px viewBox
- **Design:** 3D Target Icon
- **Layers:** 7 premium layers with gradients
- **Colors:**
  - Outer ring: Blue gradient (#667eea)
  - Middle ring: Purple gradient (#764ba2)
  - Core: Orange gradient (#FFB74D → #F97316 → #EA580C)
- **Effects:** Outer glow, shadows, 3D depth
- **Usage:** Browser favicon, PWA icon

#### 2. **logo-icon.svg** (Standalone Icon)
- **Location:** `/public/logo-icon.svg`
- **Size:** 200×200px viewBox
- **Design:** Identical to favicon.svg
- **Usage:** Social media profiles, app icons, standalone branding

#### 3. **logo-horizontal.svg** (Full Logo)
- **Location:** `/public/logo-horizontal.svg`
- **Size:** 360×100px viewBox (optimized compact)
- **Design:** Target icon + "InSpotGO" text
- **Spacing:**
  - Icon position: x=45, y=50
  - Text position: x=95, y=60
  - Gap: 50px (balanced)
- **Text Colors:**
  - "InSpot": Primary Blue (#2563EB)
  - "GO": Orange (#F97316)
- **Typography:** Inter, SF Pro Display, system-ui
- **Weight:** 700 (Bold)
- **Usage:** Header, footer, marketing materials

---

## Design Specifications

### Target Icon Details

```
Layers (from outside to inside):
1. Outer ring (r=85px) - Blue gradient
2. Middle ring (r=60px) - Purple gradient  
3. Inner ring (r=38px) - Purple accent
4. Core circle (r=30px) - Orange gradient
5. Inner glow (r=20px) - White radial
6. Central dot (r=8px) - White focal point
7. Shine effect - Ellipse highlight
```

### Color Palette

#### Primary Colors
- **Primary Blue:** `#2563EB`
- **Orange:** `#F97316`
- **Purple Gradient:** `#764ba2`
- **Blue Gradient:** `#667eea`

#### Gradients
- **Core:** `#FFB74D` → `#F97316` → `#EA580C`
- **Outer Ring:** `#667eea` (0% opacity 0.3 → 100% opacity 1)
- **Middle Ring:** `#764ba2` (0% opacity 0.5 → 100% opacity 1)

---

## Usage Guidelines

### Header
```astro
<img 
  src="/logo-horizontal.svg" 
  alt="InSpotGO" 
  class="h-8 w-auto"
/>
```

### Footer
```astro
<img 
  src="/logo-horizontal.svg" 
  alt="InSpotGO" 
  class="h-8 mb-4"
/>
```

### HTML Head (Favicon)
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

---

## Logo Versions History

### Current Version (v3.0 - Feb 2026)
- ✅ Target 3D icon with premium gradients
- ✅ Horizontal logo with optimized spacing (360px width)
- ✅ Dual-color text (Blue + Orange)
- ✅ Perfect vertical alignment
- ✅ Professional spacing (50px icon-text gap)

### Previous Versions
- v2.0: I•G text-based favicon (abandoned - alignment issues)
- v1.0: Simple IG text favicon (replaced for uniqueness)

---

## Brand Concept

### "Spot" = Target 🎯
The target/bullseye icon represents:
- **Precision** - Finding the right spots/locations
- **Focus** - Hitting the target with recommendations
- **Discovery** - Spotting the best places
- **Premium Quality** - Multiple layers of excellence

### Name Breakdown
- **In** = Location/Inside (White)
- **Spot** = Target/Place (represented by icon)
- **GO** = Action/Movement (Orange)

---

## Technical Details

### File Sizes
- favicon.svg: 3,108 bytes (3.1 KB)
- logo-icon.svg: 3,108 bytes (3.1 KB)
- logo-horizontal.svg: 3,573 bytes (3.6 KB)

### SVG Features
- Radial gradients (4 types)
- SVG filters (glow, shadow)
- Scalable to any size
- No external dependencies
- Optimized for web
- Dark mode compatible

---

## Do's and Don'ts

### ✅ Do
- Use original SVG files
- Maintain aspect ratios
- Keep minimum size of 32px for icon
- Use on white or light backgrounds
- Use horizontal logo for headers/footers

### ❌ Don't
- Modify colors or gradients
- Distort or stretch logos
- Add effects or filters
- Use on busy backgrounds
- Separate icon from text in horizontal logo
- Use raster formats (prefer SVG)

---

## Deployment

All logo files are committed to:
- **Repository:** munizcesar/InSpotGO-US
- **Branch:** main
- **Path:** `/public/`
- **CDN:** Cloudflare Pages
- **Live Site:** https://inspotgo.com

---

## Last Updated
- **Date:** February 10, 2026
- **Version:** 3.0 (Target Icon)
- **Status:** ✅ Production Ready
