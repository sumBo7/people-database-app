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
Write-Host "   - GOOGLE_CLIENT_ID=43715775108-ta5ebfegl6n6h0h0ahau061hhd6un2dn.apps.googleusercontent.com" -ForegroundColor White
Write-Host "   - GOOGLE_CLIENT_SECRET=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" -ForegroundColor White
Write-Host "   - JWT_SECRET=010bf8b5e9d753c2696c514482d3b171525f0dc5af6af198dbf3d907f50087168fdb589f9d55164e856f32683ad6b75ce48ae9c817e5c9779f9aa9c248e3971a" -ForegroundColor White
Write-Host "   - CLIENT_URL=https://database.railway.app" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your app will be available at: https://database.railway.app" -ForegroundColor Green
