#!/usr/bin/env bash
set -euo pipefail

# Usage: export required env vars or pass them as env when running the script.
# Required env vars:
#  CF_API_TOKEN, CF_ACCOUNT_ID, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
# Optional:
#  PROJECT_NAME (default: inspotgo-us)
#  REPO (default: munizcesar/InSpotGO-US)
#  BRANCH (default: main)
#  PAGES_DOMAIN (default: <PROJECT_NAME>.pages.dev)

PROJECT_NAME=${PROJECT_NAME:-inspotgo-us}
REPO=${REPO:-munizcesar/InSpotGO-US}
BRANCH=${BRANCH:-main}
CF_API_TOKEN=${CF_API_TOKEN:-}
CF_ACCOUNT_ID=${CF_ACCOUNT_ID:-}
GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID:-}
GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET:-}
PAGES_DOMAIN=${PAGES_DOMAIN:-${PROJECT_NAME}.pages.dev}

die(){ echo "ERROR: $*" >&2; exit 1; }

[ -n "$CF_API_TOKEN" ] || die "Set CF_API_TOKEN"
[ -n "$CF_ACCOUNT_ID" ] || die "Set CF_ACCOUNT_ID"
[ -n "$GITHUB_CLIENT_ID" ] || die "Set GITHUB_CLIENT_ID"
[ -n "$GITHUB_CLIENT_SECRET" ] || die "Set GITHUB_CLIENT_SECRET"

echo "Project: $PROJECT_NAME"
echo "Repo: $REPO (branch: $BRANCH)"
echo "Pages domain: $PAGES_DOMAIN"

if command -v wrangler >/dev/null 2>&1; then
  echo "Found wrangler — attempting to create Pages project (idempotent)..."
  set +e
  wrangler pages project create "$PROJECT_NAME" --repository "$REPO" --branch "$BRANCH" --account-id "$CF_ACCOUNT_ID"
  WRANGLER_RC=$?
  set -e
  if [ $WRANGLER_RC -ne 0 ]; then
    echo "wrangler project create returned non-zero ($WRANGLER_RC). Continue — project may already exist."
  fi
else
  echo "wrangler not found — skipping automatic project creation. Create the Pages project in Cloudflare UI if not present." 
fi

echo "Setting environment variables on Pages via Cloudflare API..."
API_URL="https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/env"

PAYLOAD=$(cat <<JSON
{
  "variables": [
    { "name": "GITHUB_CLIENT_ID", "value": "${GITHUB_CLIENT_ID}", "scope": ["preview", "production"], "sensitive": false },
    { "name": "GITHUB_CLIENT_SECRET", "value": "${GITHUB_CLIENT_SECRET}", "scope": ["preview", "production"], "sensitive": true }
  ]
}
JSON
)

echo "Calling Cloudflare API: $API_URL"
HTTP_RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "$API_URL" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "$PAYLOAD")

HTTP_BODY=$(echo "$HTTP_RESPONSE" | sed '$d')
HTTP_CODE=$(echo "$HTTP_RESPONSE" | tail -n1)

echo "Cloudflare API response code: $HTTP_CODE"
if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
  echo "Environment variables set successfully."
else
  echo "Failed to set environment variables. Response ($HTTP_CODE):"
  echo "$HTTP_BODY"
  die "Cloudflare API call failed"
fi

echo "Updating public/admin/config.yml with base_url = https://${PAGES_DOMAIN}"
CFG_FILE="public/admin/config.yml"
if [ -f "$CFG_FILE" ]; then
  if grep -q '^base_url:' "$CFG_FILE"; then
    sed -i.bak -E "s|^base_url:.*|base_url: https://${PAGES_DOMAIN}|" "$CFG_FILE"
  else
    echo "base_url: https://${PAGES_DOMAIN}" >> "$CFG_FILE"
  fi
  git add "$CFG_FILE"
  git commit -m "ci: set Decap CMS base_url to https://${PAGES_DOMAIN}" || echo "No changes to commit"
  git push origin ${BRANCH}
else
  echo "Warning: $CFG_FILE not found — skipping config update"
fi

echo "Done. Next steps:"
echo " - Wait for Pages deploy (Cloudflare UI shows status)."
echo " - Visit https://${PAGES_DOMAIN}/admin and click 'GitHub' to login."
