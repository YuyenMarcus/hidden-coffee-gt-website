# Notion Webhook Setup for Automatic Vercel Updates

## 🎯 Goal
Set up automatic updates so that when you add/edit blog posts in Notion, your Vercel website updates automatically without manual intervention.

## 📋 Prerequisites
- Notion integration token
- Vercel deployment URL
- Database ID

## 🔧 Step 1: Create Notion Webhook

### Option A: Using Notion's Built-in Webhooks (Recommended)

1. **Go to your Notion database**
2. **Click the "..." menu** in the top right
3. **Select "Connections"**
4. **Click "Add connections"**
5. **Search for "Webhook" or "Zapier"**
6. **Set up webhook to trigger on:**
   - Page created
   - Page updated
   - Page deleted

### Option B: Using Zapier (Free tier available)

1. **Create Zapier account** at [zapier.com](https://zapier.com)
2. **Create new Zap**
3. **Trigger: Notion → New Page in Database**
4. **Action: Webhooks by Zapier → POST**
5. **URL:** `https://your-domain.vercel.app/api/revalidate`
6. **Method:** POST
7. **Data:** 
   ```json
   {
     "page": {
       "id": "{{page_id}}"
     }
   }
   ```

## 🔧 Step 2: Test Webhook

1. **Add a test post to your Notion database**
2. **Check Vercel logs** to see if revalidation triggered
3. **Visit your blog page** to see if the post appears

## 🔧 Step 3: Manual Revalidation (Backup)

If webhooks don't work, you can still manually revalidate:

```bash
# Via curl
curl -X GET https://your-domain.vercel.app/api/revalidate

# Via browser
https://your-domain.vercel.app/admin
```

## 🚨 Troubleshooting

### Webhook not triggering?
1. **Check Notion integration permissions**
2. **Verify webhook URL is correct**
3. **Test with a simple POST request**

### Posts not appearing?
1. **Check Vercel function logs**
2. **Verify environment variables**
3. **Test API endpoint directly**

### ISR not working?
1. **Ensure `output: 'export'` is commented out**
2. **Check `revalidate` setting in pages**
3. **Verify Vercel deployment settings**

## 📝 Environment Variables for Vercel

Make sure these are set in your Vercel dashboard:

```env
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

## 🔄 Alternative: Scheduled Revalidation

If webhooks don't work, you can set up scheduled revalidation:

### Using Vercel Cron Jobs

1. **Create `vercel.json`** (already done)
2. **Add cron job:**

```json
{
  "crons": [
    {
      "path": "/api/revalidate",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

This will revalidate every 5 minutes.

## ✅ Success Indicators

- ✅ New posts appear within 60 seconds
- ✅ No manual revalidation needed
- ✅ Vercel logs show webhook triggers
- ✅ Blog page updates automatically

## 🆘 Still Having Issues?

1. **Check Vercel deployment logs**
2. **Verify Notion database permissions**
3. **Test webhook with a tool like webhook.site**
4. **Contact support if needed**

---

**Note:** The 60-second revalidation interval is a fallback. With proper webhook setup, updates should be nearly instant. 