# 🚀 Manual Deployment Guide - People Database App

## Current Status
- ✅ **GitHub Repository**: https://github.com/sumBo7/people-database-app
- ✅ **Code Pushed**: Latest changes are on GitHub
- ✅ **Railway Domain**: https://database.railway.app
- ❌ **Railway Deployment**: Not working yet

## 🔧 Step-by-Step Railway Deployment

### Step 1: Create New Railway Project
1. **Go to**: https://railway.app
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Search for**: `sumBo7/people-database-app`
6. **Click on your repository**
7. **Wait for Railway to start deploying**

### Step 2: Add Environment Variables
Once Railway starts deploying:
1. **Go to your Railway project**
2. **Click "Variables" tab**
3. **Add these variables one by one:**

```
NODE_ENV=production
GOOGLE_CLIENT_ID=[YOUR_NEW_GOOGLE_CLIENT_ID]
GOOGLE_CLIENT_SECRET=[YOUR_NEW_GOOGLE_CLIENT_SECRET]
JWT_SECRET=[YOUR_NEW_JWT_SECRET]
CLIENT_URL=https://database.railway.app
```

### Step 3: Update Google OAuth
1. **Go to**: https://console.cloud.google.com
2. **Find your OAuth 2.0 Client ID**
3. **Add these Authorized JavaScript origins:**
   - `https://database.railway.app`
4. **Add these Authorized redirect URIs:**
   - `https://database.railway.app`
   - `https://database.railway.app/login`
5. **Click "Save"**

### Step 4: Check Deployment
1. **In Railway dashboard**, go to "Deployments" tab
2. **Look for successful deployment**
3. **Check for any error messages**

## 🆘 Troubleshooting

### If Railway Shows "No Active Deployment"
1. **Delete the current Railway project**
2. **Create a new project**
3. **Follow Step 1 above**

### If Build Fails
1. **Check Railway logs**
2. **Make sure all environment variables are set**
3. **Verify the repository is public**

### If App Doesn't Load
1. **Wait 5-10 minutes** for Google OAuth to update
2. **Check if Railway domain is accessible**
3. **Verify environment variables are correct**

## 🌐 Expected Result
Once everything is configured:
- **Your app will be live at**: https://database.railway.app
- **Google OAuth will work**
- **You can add/edit/delete people**
- **Database will be persistent**

## 📞 Need Help?
If you're still having issues:
1. **Check Railway logs** for specific error messages
2. **Verify GitHub repository is public**
3. **Make sure all environment variables are set**
4. **Wait for Google OAuth to propagate (5-10 minutes)**

## 🎯 Quick Test
After deployment:
1. **Visit**: https://database.railway.app
2. **Click "Sign in with Google"**
3. **Try adding a person to your database**
4. **Test the search functionality**

Your app should be fully functional once Railway deployment is complete! 🚀
