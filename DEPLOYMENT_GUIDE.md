# 🚀 Deployment Guide - Hidden Coffee GT

Your website is ready to deploy! Follow these steps to get your blog with automatic Notion updates live.

## Step 1: Create GitHub Repository

1. **Go to [github.com](https://github.com)** and sign in
2. **Click "New repository"** (green button)
3. **Repository name**: `hidden-coffee-gt`
4. **Description**: `Hidden Coffee GT website with Notion blog integration`
5. **Make it Public** (Vercel needs access)
6. **Don't initialize** with README (you already have one)
7. **Click "Create repository"**

## Step 2: Push Your Code to GitHub

Run these commands in your terminal:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/hidden-coffee-gt.git

# Push your code
git push -u origin main
```

## Step 3: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository** (`hidden-coffee-gt`)
4. **Vercel will auto-detect Next.js** - keep default settings
5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add these variables:
     - `NOTION_TOKEN` = `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`
     - `NOTION_DATABASE_ID` = `215ac0c14cf080b8894dcb512cbf6dbd`
6. **Click "Deploy"**

## Step 4: Test Your Deployment

Once deployed, you'll get a URL like `https://hidden-coffee-gt.vercel.app`

**Test your blog updates:**
1. Visit your new site
2. Go to `/admin` to see the admin panel
3. Add a new post to your Notion database
4. Wait 60 seconds OR visit `/api/revalidate` to force update
5. Check your blog - new posts should appear!

## Step 5: Set Up Automatic Updates (Optional)

### Option A: Manual Updates
- Visit `/admin` and click "Refresh Blog Content"
- Or visit `/api/revalidate` directly

### Option B: Automatic Updates (Recommended)
- Your blog automatically refreshes every 60 seconds
- New Notion posts will appear automatically

### Option C: Notion Webhooks (Advanced)
- Set up webhooks in Notion for instant updates
- See `docs/notion-webhook-setup.md` for details

## What You Get

✅ **Automatic blog updates** when you add content to Notion  
✅ **No need to rebuild or re-upload code**  
✅ **Admin panel** at `/admin` for manual updates  
✅ **Fast loading** with ISR (Incremental Static Regeneration)  
✅ **Mobile responsive** design  
✅ **SEO optimized** pages  

## Troubleshooting

### If images don't load:
- Notion images have expiring URLs
- We can add an image proxy if needed
- Contact me for the fix

### If posts don't appear:
- Check that posts have "Published" status in Notion
- Visit `/api/revalidate` to force update
- Check browser console for errors

### If deployment fails:
- Make sure all environment variables are set
- Check that your GitHub repository is public
- Verify your Notion token and database ID

## Next Steps

1. **Custom Domain**: Add your domain in Vercel dashboard
2. **Analytics**: Add Google Analytics or Vercel Analytics
3. **SEO**: Add meta tags and sitemap
4. **Performance**: Monitor with Vercel Analytics

---

**Your site will be live and automatically update when you add content to Notion! 🎉** 