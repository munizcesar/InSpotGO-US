"""Normalize image placement in Markdown posts.

This helper moves the first inline image (if present) to the top of the
content body and removes a duplicated H1 title when it matches the frontmatter.
It operates on all .md files under src/content/posts and rewrites them in place.

Usage:
    python scripts/normalize_post_images.py

This is intended for use in a Git Bash/WSL/later commit workflow.
"""

import re
from pathlib import Path

POSTS_DIR = Path(__file__).parent.parent / "src" / "content" / "posts"

H1_PATTERN = re.compile(r"^#\s*(.+)$")
IMAGE_PATTERN = re.compile(r"^!\[.*\]\(.*\)$")


def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines:
        return False

    # separate frontmatter
    if lines[0].strip() == "---":
        try:
            end = lines.index("---", 1)
        except ValueError:
            return False
        frontmatter = lines[: end + 1]
        body = lines[end + 1 :]
    else:
        frontmatter = []
        body = lines

    modified = False
    # remove duplicate H1 if first non-empty body line equals frontmatter.title
    title = None
    for line in frontmatter:
        if line.startswith("title:"):
            title = line.split("title:", 1)[1].strip().strip('"')
            break
    if title and body:
        # skip blanks
        for i, ln in enumerate(body):
            if ln.strip():
                if H1_PATTERN.match(ln) and H1_PATTERN.match(ln).group(1).strip() == title:
                    del body[i]
                    modified = True
                break
    # find first image line and move it right after frontmatter/body separator
    img_idx = None
    for i, ln in enumerate(body):
        if IMAGE_PATTERN.match(ln.strip()):
            img_idx = i
            break
    if img_idx is not None and img_idx != 0:
        img_line = body.pop(img_idx)
        # if there's an initial blank line, keep one
        while body and not body[0].strip():
            body.pop(0)
        body.insert(0, "")
        body.insert(1, img_line)
        modified = True
    
    if modified:
        new_text = "\n".join(frontmatter + [""] + body)
        path.write_text(new_text, encoding="utf-8")
    return modified


def main():
    changed = []
    for md in POSTS_DIR.glob("*.md"):
        if process_file(md):
            changed.append(md.name)
    if changed:
        print("Updated files:", ", ".join(changed))
    else:
        print("No changes needed.")


if __name__ == "__main__":
    main()
