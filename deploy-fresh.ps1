# Fresh Deployment Script for People Database App
# This script will set up everything from scratch

Write-Host "🚀 Fresh Deployment Script - People Database App" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

# Configuration
$githubUsername = "sumBo7"
$repoName = "people-database-app"
$railwayDomain = "database.railway.app"

Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "GitHub Username: $githubUsername" -ForegroundColor Cyan
Write-Host "Repository: $repoName" -ForegroundColor Cyan
Write-Host "Railway Domain: $railwayDomain" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Git status
Write-Host "🔍 Step 1: Checking Git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "📋 Step 2: Adding all files to Git..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "📋 Step 3: Committing changes..." -ForegroundColor Yellow
git commit -m "Fresh deployment - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

Write-Host ""
Write-Host "📋 Step 4: Checking remote configuration..." -ForegroundColor Yellow
$remoteUrl = git remote get-url origin 2>$null
if ($remoteUrl) {
    Write-Host "✅ Remote found: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "❌ No remote found. Adding remote..." -ForegroundColor Red
    git remote add origin "https://github.com/$githubUsername/$repoName.git"
}

Write-Host ""
Write-Host "📋 Step 5: Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Code pushed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Railway Deployment Instructions:" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://railway.app" -ForegroundColor Cyan
Write-Host "2. Click 'New Project'" -ForegroundColor Cyan
Write-Host "3. Select 'Deploy from GitHub repo'" -ForegroundColor Cyan
Write-Host "4. Search for: $githubUsername/$repoName" -ForegroundColor Cyan
Write-Host "5. Select the repository" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Environment Variables to add in Railway:" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host "GOOGLE_CLIENT_ID=[YOUR_NEW_GOOGLE_CLIENT_ID]" -ForegroundColor White
Write-Host "GOOGLE_CLIENT_SECRET=[YOUR_NEW_GOOGLE_CLIENT_SECRET]" -ForegroundColor White
Write-Host "JWT_SECRET=[YOUR_NEW_JWT_SECRET]" -ForegroundColor White
Write-Host "CLIENT_URL=https://$railwayDomain" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your app will be available at: https://$railwayDomain" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 Google OAuth Configuration:" -ForegroundColor Yellow
Write-Host "==============================" -ForegroundColor Yellow
Write-Host "1. Go to: https://console.cloud.google.com" -ForegroundColor Cyan
Write-Host "2. Update OAuth 2.0 Client ID" -ForegroundColor Cyan
Write-Host "3. Add authorized origins: https://$railwayDomain" -ForegroundColor Cyan
Write-Host "4. Add redirect URIs: https://$railwayDomain and https://$railwayDomain/login" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Deployment script completed!" -ForegroundColor Green
