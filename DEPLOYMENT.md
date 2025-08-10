# 🚀 Deployment Guide - People Database App

## Quick Deploy to Railway (Free Domain)

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository"
3. Name it: `people-database-app`
4. Make it **Public** (required for free Railway)
5. Click "Create repository"

### Step 2: Push Code to GitHub
Run these commands in your project directory:
```bash
git remote add origin https://github.com/YOUR_USERNAME/people-database-app.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Railway
1. Go to [Railway.app](https://railway.app) and sign up with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `people-database-app` repository
5. Railway will automatically deploy your app

### Step 4: Configure Environment Variables
In Railway dashboard, go to your project → Variables tab and add:

```
NODE_ENV=production
GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
JWT_SECRET=[YOUR_SECURE_JWT_SECRET]
CLIENT_URL=https://your-app-name.railway.app
```

### Step 5: Update Google OAuth Settings
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Update your OAuth 2.0 Client ID
3. Add authorized origins:
   - `https://your-app-name.railway.app`
4. Add redirect URIs:
   - `https://your-app-name.railway.app`
   - `https://your-app-name.railway.app/login`

### Step 6: Access Your App
Your app will be available at: `https://your-app-name.railway.app`

## 🔒 Security Features
- ✅ JWT token authentication
- ✅ Google OAuth login
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection prevention

## 📱 Features Available
- 👥 Add, edit, delete people
- 🔍 Search and filter
- 📱 Responsive design
- 🔐 Secure authentication
- 📊 Pagination

## 🆘 Troubleshooting
- If deployment fails, check Railway logs
- Ensure all environment variables are set
- Verify Google OAuth configuration
- Check that GitHub repository is public
