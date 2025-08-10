# PowerShell script to deploy to GitHub and Railway
# Run this script after creating your GitHub repository

Write-Host "🚀 People Database App - Deployment Script" -ForegroundColor Green
Write-Host ""

# Get GitHub username
$githubUsername = Read-Host "Enter your GitHub username"
$repoName = "people-database-app"

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/new" -ForegroundColor Cyan
Write-Host "2. Repository name: $repoName" -ForegroundColor Cyan
Write-Host "3. Make it PUBLIC (required for free Railway)" -ForegroundColor Cyan
Write-Host "4. Click 'Create repository'" -ForegroundColor Cyan
Write-Host ""

$continue = Read-Host "Press Enter after creating the GitHub repository"

# Add remote and push
Write-Host "🔗 Adding GitHub remote..." -ForegroundColor Yellow
git remote add origin "https://github.com/$githubUsername/$repoName.git"

Write-Host "🔄 Renaming branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next: Deploy to Railway" -ForegroundColor Yellow
Write-Host "1. Go to https://railway.app" -ForegroundColor Cyan
Write-Host "2. Sign up with GitHub" -ForegroundColor Cyan
Write-Host "3. Click 'New Project'" -ForegroundColor Cyan
Write-Host "4. Select 'Deploy from GitHub repo'" -ForegroundColor Cyan
Write-Host "5. Choose your repository" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 See DEPLOYMENT.md for detailed instructions" -ForegroundColor Cyan
