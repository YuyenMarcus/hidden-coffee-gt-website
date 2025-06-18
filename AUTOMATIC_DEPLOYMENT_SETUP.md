# 🚀 Automatic Deployment Setup Guide

## 🎯 **The Problem You're Experiencing**

You're currently using **manual deployment** (`vercel --prod`) which means:
- ✅ Changes work locally
- ❌ Live website only updates when you manually run `vercel --prod`
- ❌ No automatic sync between local changes and live website

## 🔧 **The Solution: Git + Vercel Integration**

### **Step 1: Connect Vercel to GitHub**

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Find your project**: `hidden-coffee-gt-website`
3. **Go to Settings > Git**
4. **Click "Connect Git Repository"**
5. **Select GitHub**
6. **Find and select**: `YuyenMarcus/hidden-coffee-gt-website`
7. **Set Production Branch**: `main`
8. **Click "Deploy"**

### **Step 2: Verify Connection**

After connecting, you should see:
- ✅ "Connected Git Repository" shows your GitHub repo
- ✅ "Production Branch" shows `main`
- ✅ "Auto Deploy" is enabled

### **Step 3: Test Automatic Deployment**

1. **Make a small change** to any file
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```
3. **Check Vercel dashboard** - you should see a new deployment starting automatically
4. **Wait 2-3 minutes** - your live website should update

## 🔄 **How It Works After Setup**

### **Before (Manual)**:
```
Local Changes → Manual `vercel --prod` → Live Website Updates
```

### **After (Automatic)**:
```
Local Changes → `git push` → GitHub → Vercel Auto-Deploy → Live Website Updates
```

## 🛠️ **Alternative: Create New Project**

If reconnecting doesn't work:

1. **Go to Vercel Dashboard**
2. **Click "New Project"**
3. **Import from GitHub**
4. **Select**: `YuyenMarcus/hidden-coffee-gt-website`
5. **Framework Preset**: Next.js
6. **Click "Deploy"**

## 📋 **Environment Variables**

Make sure these are set in your new Vercel project:
- `NOTION_TOKEN` = your Notion integration token
- `NOTION_DATABASE_ID` = your database ID

## ✅ **Success Indicators**

- ✅ Every `git push` triggers automatic deployment
- ✅ Live website updates within 2-3 minutes
- ✅ No more manual `vercel --prod` needed
- ✅ Changes sync automatically

## 🚨 **If Still Having Issues**

1. **Check GitHub webhooks**: Go to your GitHub repo → Settings → Webhooks
2. **Verify Vercel webhook** is active and has recent deliveries
3. **Check Vercel build logs** for errors
4. **Ensure environment variables** are set correctly

## 🎯 **Quick Commands After Setup**

```bash
# Make changes locally
# Then simply:
git add .
git commit -m "Your changes"
git push origin main

# Vercel will automatically deploy!
```

---

**The key is connecting Vercel to GitHub so it watches for pushes and deploys automatically.** 