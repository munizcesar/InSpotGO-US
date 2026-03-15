from PIL import Image, ImageDraw, ImageFont

out = 'public/images/posts/saas-marketing.png'
w, h = 1200, 628
img = Image.new('RGB', (w, h), color=(14, 165, 233))
draw = ImageDraw.Draw(img)

# Gradient
for i in range(h):
    r = int(14 + (56 - 14) * (i / h))
    g = int(165 + (221 - 165) * (i / h))
    b = int(233 + (248 - 233) * (i / h))
    draw.line([(0, i), (w, i)], fill=(r, g, b))

# Text
try:
    font = ImageFont.truetype('arial.ttf', 72)
except Exception:
    font = ImageFont.load_default()

text = 'Marketing Automation'
bbox = draw.textbbox((0, 0), text, font=font)
w_text = bbox[2] - bbox[0]
# h_text = bbox[3] - bbox[1]
draw.text(((w - w_text) / 2, h * 0.4), text, font=font, fill='white')

sub = 'Email + funnels for SaaS growth'
bbox2 = draw.textbbox((0, 0), sub, font=font)
w_sub = bbox2[2] - bbox2[0]
draw.text(((w - w_sub) / 2, h * 0.55), sub, font=font, fill='white')

img.save(out)
print('Created', out)
