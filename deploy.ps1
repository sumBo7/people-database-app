# PowerShell script to deploy to GitHub and Railway
# Run this script after creating your GitHub repository

Write-Host "🚀 People Database App - Deployment Script" -ForegroundColor Green
Write-Host ""

# GitHub repository details
$githubUsername = "sumBo7"
$repoName = "people-database-app"

Write-Host "✅ Repository already exists: https://github.com/$githubUsername/$repoName" -ForegroundColor Green
Write-Host ""

# Check if remote already exists
Write-Host "🔗 Checking GitHub remote..." -ForegroundColor Yellow
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "✅ Remote already configured: $remoteExists" -ForegroundColor Green
} else {
    Write-Host "🔗 Adding GitHub remote..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$githubUsername/$repoName.git"
}

Write-Host "📤 Pushing latest changes to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Railway Deployment Status" -ForegroundColor Yellow
Write-Host "1. Go to https://railway.app" -ForegroundColor Cyan
Write-Host "2. Check your project deployment" -ForegroundColor Cyan
Write-Host "3. Add environment variables:" -ForegroundColor Cyan
Write-Host "   - NODE_ENV=production" -ForegroundColor White
Write-Host "   - GOOGLE_CLIENT_ID=43715775108-jaste83141bb49qd7b02mbruldvsjn5b.apps.googleusercontent.com" -ForegroundColor White
Write-Host "   - GOOGLE_CLIENT_SECRET=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" -ForegroundColor White
Write-Host "   - JWT_SECRET=559e8c58b87a8f8ef3ff77364658dc1d65c33f30ac5de4e2dd7700aa7dab75cd6394308266836838f9013492b6c0c7105ca348416d98" -ForegroundColor White
Write-Host "   - CLIENT_URL=https://database.railway.app" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your app will be available at: https://database.railway.app" -ForegroundColor Green
