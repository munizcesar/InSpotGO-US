import os
import re

posts_dir = "src/content/posts"

patterns = [
    r'\[.*?\]\(https?://[^\)]*\.br[^\)]*\)',
    r'\[.*?\]\(#\)', 
    r'\[.*?\]\(https?://inspotgo\.com/[^\)]*#\)',
]

for filename in os.listdir(posts_dir):
    if filename.endswith('.md'):
        filepath = os.path.join(posts_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for pattern in patterns:
            content = re.sub(pattern, '', content)
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Links limpos em: {filename}")
