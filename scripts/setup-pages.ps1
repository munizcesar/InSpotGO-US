<#
.SYNOPSIS
  Configure Cloudflare Pages environment variables and update Decap CMS base_url.

.DESCRIPTION
  This script calls the Cloudflare Pages API to set environment variables
  required for GitHub OAuth and updates `public/admin/config.yml` with the
  Pages domain. It then commits and pushes the change.

.NOTES
  Run in the repository root. Do NOT paste secrets in chat. Provide values
  via parameters or environment variables.

#>

param(
  [string]$CF_API_TOKEN = $env:CF_API_TOKEN,
  [string]$CF_ACCOUNT_ID = $env:CF_ACCOUNT_ID,
  [string]$GITHUB_CLIENT_ID = $env:GITHUB_CLIENT_ID,
  [string]$GITHUB_CLIENT_SECRET = $env:GITHUB_CLIENT_SECRET,
  [string]$PROJECT_NAME = 'inspotgo-us',
  [string]$REPO = 'munizcesar/InSpotGO-US',
  [string]$BRANCH = 'main',
  [string]$PAGES_DOMAIN = "$($env:PAGES_DOMAIN -or "$($PROJECT_NAME).pages.dev")"
)

function Die($msg){ Write-Error $msg; exit 1 }

if (-not $CF_API_TOKEN) { Die 'Set CF_API_TOKEN environment variable or pass -CF_API_TOKEN' }
if (-not $CF_ACCOUNT_ID) { Die 'Set CF_ACCOUNT_ID environment variable or pass -CF_ACCOUNT_ID' }
if (-not $GITHUB_CLIENT_ID) { Die 'Set GITHUB_CLIENT_ID environment variable or pass -GITHUB_CLIENT_ID' }
if (-not $GITHUB_CLIENT_SECRET) { Die 'Set GITHUB_CLIENT_SECRET environment variable or pass -GITHUB_CLIENT_SECRET' }

Write-Host "Project: $PROJECT_NAME"
Write-Host "Repo: $REPO (branch: $BRANCH)"
Write-Host "Pages domain: $PAGES_DOMAIN"

$apiUrl = "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects/$PROJECT_NAME/env"

$payload = @{
  variables = @(
    @{ name = 'GITHUB_CLIENT_ID'; value = $GITHUB_CLIENT_ID; scope = @('preview','production'); sensitive = $false },
    @{ name = 'GITHUB_CLIENT_SECRET'; value = $GITHUB_CLIENT_SECRET; scope = @('preview','production'); sensitive = $true }
  )
} | ConvertTo-Json -Depth 5

Write-Host 'Setting environment variables on Cloudflare Pages...'
try {
  $resp = Invoke-RestMethod -Method Put -Uri $apiUrl -Headers @{ Authorization = "Bearer $CF_API_TOKEN"; 'Content-Type' = 'application/json' } -Body $payload -ErrorAction Stop
  if ($resp.success -ne $true) { Write-Host (ConvertTo-Json $resp -Depth 5) ; Die 'Cloudflare API reported failure' }
  Write-Host 'Environment variables set.'
} catch {
  Write-Error "API call failed: $_"
  Die 'Failed to set environment variables on Cloudflare'
}

$cfgFile = 'public/admin/config.yml'
if (Test-Path $cfgFile) {
  $text = Get-Content $cfgFile -Raw
  if ($text -match '^base_url:') {
    $new = $text -replace '^base_url:.*','base_url: https://' + $PAGES_DOMAIN
    $new | Set-Content $cfgFile -NoNewline
  } else {
    Add-Content $cfgFile "`nbase_url: https://$PAGES_DOMAIN"
  }
  git add $cfgFile
  git commit -m "ci: set Decap CMS base_url to https://$PAGES_DOMAIN" 2>$null
  if (-not $?) { Write-Host 'No changes to commit' }
  git push origin $BRANCH
  Write-Host 'Updated config and pushed changes.'
} else {
  Write-Warning "$cfgFile not found - skipping update"
}

Write-Host 'Done. Wait for Pages deploy and then visit https://'