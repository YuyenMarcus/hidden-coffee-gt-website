# Notion Webhook Setup Guide

This guide will help you set up automatic blog updates when you add new posts to your Notion database.

## Option 1: Manual Revalidation (Easiest)

If you don't want to set up webhooks, you can manually trigger updates:

1. **Visit your revalidation endpoint**: `https://yourdomain.com/api/revalidate`
2. **Or use curl**: `curl -X GET https://yourdomain.com/api/revalidate`

This will refresh your blog content with the latest posts from Notion.

## Option 2: Notion Webhooks (Automatic)

### Step 1: Deploy Your Site

First, deploy your site to a hosting provider that supports Next.js (Vercel, Netlify, etc.):

```bash
# Build and deploy
npm run build
npm run start
```

### Step 2: Set Up Notion Webhook

1. **Go to Notion Integrations**: https://www.notion.so/my-integrations
2. **Select your integration** (the one you created for your database)
3. **Add a webhook**:
   - URL: `https://yourdomain.com/api/revalidate`
   - Events: Select "Page added" and "Page updated"
   - Database: Select your blog database

### Step 3: Test the Webhook

1. Add a new blog post to your Notion database
2. The webhook should automatically trigger
3. Check your site - the new post should appear within 60 seconds

## Option 3: Scheduled Updates (Alternative)

If webhooks aren't working, you can set up scheduled updates:

### Using Cron Jobs (if you have server access):

```bash
# Add to crontab - runs every 5 minutes
*/5 * * * * curl -X GET https://yourdomain.com/api/revalidate
```

### Using External Services:

- **UptimeRobot**: Set up a monitor that hits your revalidation endpoint
- **Cron-job.org**: Free service to schedule HTTP requests
- **GitHub Actions**: If using GitHub, set up a workflow

## Troubleshooting

### Check if revalidation is working:

1. Visit `/api/revalidate` in your browser
2. You should see: `{"success":true,"message":"Manual revalidation completed"}`

### Check Notion connection:

1. Visit your blog page
2. Check browser console for any errors
3. Verify your `NOTION_TOKEN` and `NOTION_DATABASE_ID` are correct

### Common Issues:

- **Webhook not triggering**: Make sure your site is publicly accessible
- **Posts not appearing**: Check that posts have "Published" status in Notion
- **Images not loading**: Ensure images are properly uploaded to Notion

## Security Notes

For production, consider adding webhook verification:

1. Add a secret token to your environment variables
2. Verify the webhook signature in the revalidation endpoint
3. Only allow revalidation from trusted sources

## Quick Test

To test if everything is working:

1. Add a new blog post to Notion
2. Wait 60 seconds (ISR timeout)
3. Or manually visit `/api/revalidate`
4. Check your blog page - the new post should appear

If it's not working, check the browser console and server logs for errors. 