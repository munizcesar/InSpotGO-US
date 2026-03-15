# Fonts — Inter

Esta pasta deve conter as fontes **Inter** para o gerador de banners OG funcionar.

## Como baixar (uma vez só)

```bash
# Opção 1: Google Fonts (mais fácil)
curl -L "https://fonts.google.com/download?family=Inter" -o inter.zip
unzip inter.zip -d inter-tmp
cp inter-tmp/static/Inter-Black.ttf ./public/fonts/Inter-Black.ttf
cp inter-tmp/static/Inter-Regular.ttf ./public/fonts/Inter-Regular.ttf
rm -rf inter-tmp inter.zip

# Opção 2: Manual
# Acesse https://fonts.google.com/specimen/Inter
# Baixe → extraia → copie Inter-Black.ttf e Inter-Regular.ttf para esta pasta
```

## Arquivos necessários

- `Inter-Black.ttf` — peso 900 (usado no título do banner)
- `Inter-Regular.ttf` — peso 400 (usado no subtítulo e badge)

> ⚠️ Estes arquivos .ttf estão no .gitignore por serem binários.
> Cada desenvolvedor/CI precisa baixá-los uma vez.
