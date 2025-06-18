# 🎥 Video Upload Guide for Hidden Coffee GT Blog

## 📏 Notion File Size Limits
- **Direct uploads**: 5MB maximum
- **External URLs**: No size limit (recommended for videos)

## 🚀 Recommended Solutions

### 1. YouTube (Best for Most Cases)
**✅ Pros:**
- Completely free
- Unlimited storage
- Automatic compression
- Built-in analytics
- Mobile-friendly

**📝 How to use:**
1. Upload video to YouTube (can be private/unlisted)
2. Copy the URL: `https://www.youtube.com/watch?v=VIDEO_ID`
3. Add to Notion "images" property
4. Video will automatically embed in your blog

**🎯 Best for:** Most video content, tutorials, behind-the-scenes

---

### 2. Vimeo (Best for Professional Content)
**✅ Pros:**
- Higher quality than YouTube
- No ads
- Professional appearance
- 5GB free uploads per week

**📝 How to use:**
1. Upload to Vimeo
2. Copy the URL: `https://vimeo.com/VIDEO_ID`
3. Add to Notion "images" property

**🎯 Best for:** High-quality content, professional videos

---

### 3. Cloudinary (Best for Custom Control)
**✅ Pros:**
- 25GB free storage
- Automatic optimization
- Custom transformations
- Fast CDN

**📝 How to use:**
1. Sign up at cloudinary.com
2. Upload your video
3. Copy the URL: `https://res.cloudinary.com/your-cloud/video/upload/video.mp4`
4. Add to Notion "images" property

**🎯 Best for:** Developers, custom video needs

---

### 4. Google Drive (Limited Support)
**⚠️ Requirements:**
- Video must be shared as "Anyone with the link can view"
- URL must contain the file ID
- Some browsers may block Google Drive embeds

**📝 How to make it work:**
1. Upload video to Google Drive
2. Right-click → "Get shareable link"
3. **Important**: Set permissions to "Anyone with the link can view"
4. Copy the URL (should look like: `https://drive.google.com/file/d/FILE_ID/view`)
5. Add to Notion "images" property
6. **Note**: May not work in all browsers due to security restrictions

**🎯 Better alternatives:** YouTube, Vimeo, or Cloudinary

---

## 🔧 Video Compression (If You Must Use Direct Upload)

### Using the Compression Script
```bash
# Make sure you have ffmpeg installed
brew install ffmpeg

# Compress a video
./scripts/compress-video.sh input.mp4 output.mp4
```

### Manual Compression with FFmpeg
```bash
# Basic compression
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k output.mp4

# More aggressive compression
ffmpeg -i input.mp4 -c:v libx264 -crf 35 -preset slow -c:a aac -b:a 96k output.mp4
```

## 📊 Video Size Recommendations

### For Direct Notion Upload (≤5MB):
- **Resolution**: 720p or lower
- **Duration**: 30-60 seconds
- **Format**: MP4 with H.264 codec
- **Audio**: AAC, 128kbps or lower

### For External Hosting (No Limit):
- **Resolution**: Up to 4K
- **Duration**: Any length
- **Format**: Any modern format
- **Quality**: As high as you want

## 🎬 Content Ideas for Your Coffee Blog

### Short Videos (≤5MB):
- Coffee brewing techniques
- Quick recipe demos
- Behind-the-scenes glimpses
- Equipment reviews

### Long Videos (External Hosting):
- Full coffee brewing tutorials
- Barista training videos
- Coffee origin stories
- Customer testimonials
- Event coverage

## 🔗 URL Format Examples

### YouTube
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

### Vimeo
```
https://vimeo.com/123456789
```

### Cloudinary
```
https://res.cloudinary.com/your-cloud/video/upload/v1234567890/sample.mp4
```

### Google Drive
```
https://drive.google.com/file/d/FILE_ID/preview
```

## 🚨 Troubleshooting

### Google Drive Videos Not Playing?
1. **Check permissions**: Set to "Anyone with the link can view"
2. **Verify URL format**: Should be `https://drive.google.com/file/d/FILE_ID/view`
3. **Try different browsers**: Some browsers block Google Drive embeds
4. **Check file size**: Large files may not load properly
5. **Alternative**: Use direct download link: `https://drive.google.com/uc?export=download&id=FILE_ID`
6. **Best solution**: Move to YouTube or Vimeo for reliable embedding

### Video Not Playing?
1. Check if URL is accessible
2. Ensure video is public/shared
3. Try different hosting platform

### Poor Quality?
1. Use higher resolution source
2. Choose better hosting platform
3. Check compression settings

### Upload Failing?
1. Check file size limits
2. Verify file format
3. Try external hosting

## 💡 Pro Tips

1. **Always use external hosting** for videos longer than 30 seconds
2. **YouTube is your friend** - it's free and reliable
3. **Keep backups** of original videos
4. **Test on mobile** - most users view on phones
5. **Add captions** for accessibility

## 🎯 Quick Start

1. **For short videos**: Use the compression script
2. **For long videos**: Upload to YouTube and use the URL
3. **For professional content**: Use Vimeo
4. **For custom needs**: Use Cloudinary

Your blog system will automatically detect and display videos from any of these sources! 