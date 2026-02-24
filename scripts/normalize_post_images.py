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
    # find first image line in body
    img_idx = None
    first_img_path = None
    for i, ln in enumerate(body):
        if IMAGE_PATTERN.match(ln.strip()):
            img_idx = i
            # extract path between parentheses
            match = re.search(r"\(([^)]+)\)", ln)
            if match:
                first_img_path = match.group(1)
            break

    # ensure frontmatter.cover points to a reachable image
    cover_exists = False
    cover_index = None
    for idx, fm in enumerate(frontmatter):
        if fm.strip().startswith("cover:"):
            cover_index = idx
            cover_val = fm.split("cover:", 1)[1].strip().strip('"')
            # check if file exists under public
            cover_path = Path(__file__).parent.parent / "public" / cover_val.lstrip("/")
            if cover_path.exists():
                cover_exists = True
            break

    # if we have a first inline image and it's not already the cover, set cover
    if first_img_path and not cover_exists:
        new_cover = first_img_path
        if cover_index is not None:
            frontmatter[cover_index] = f"cover: \"{new_cover}\""
        else:
            insert_pos = len(frontmatter) - 1
            frontmatter.insert(insert_pos, f"cover: \"{new_cover}\"")
        cover_exists = True
        modified = True

    # if cover now equals the first image, remove the inline image line entirely
    if cover_exists and first_img_path and img_idx is not None:
        # delete the image from body and any following blank line
        try:
            del body[img_idx]
            while img_idx < len(body) and not body[img_idx].strip():
                del body[img_idx]
        except IndexError:
            pass
        modified = True
    else:
        # otherwise, if we found an inline image and didn't make it cover, move it to top
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
