#!/bin/bash

# Video compression script for Notion (5MB limit)
# Usage: ./compress-video.sh input.mp4 output.mp4

if [ $# -ne 2 ]; then
    echo "Usage: $0 input.mp4 output.mp4"
    exit 1
fi

INPUT_FILE=$1
OUTPUT_FILE=$2
MAX_SIZE_MB=5

echo "🎬 Compressing video for Notion (max ${MAX_SIZE_MB}MB)..."

# Compress video to fit within 5MB
ffmpeg -i "$INPUT_FILE" \
    -c:v libx264 \
    -crf 28 \
    -preset medium \
    -c:a aac \
    -b:a 128k \
    -movflags +faststart \
    -y "$OUTPUT_FILE"

# Check file size
FILE_SIZE=$(du -m "$OUTPUT_FILE" | cut -f1)
echo "📊 Compressed file size: ${FILE_SIZE}MB"

if [ $FILE_SIZE -gt $MAX_SIZE_MB ]; then
    echo "⚠️  File still too large. Trying more aggressive compression..."
    ffmpeg -i "$INPUT_FILE" \
        -c:v libx264 \
        -crf 35 \
        -preset slow \
        -c:a aac \
        -b:a 96k \
        -movflags +faststart \
        -y "$OUTPUT_FILE"
    
    FILE_SIZE=$(du -m "$OUTPUT_FILE" | cut -f1)
    echo "📊 Final file size: ${FILE_SIZE}MB"
fi

if [ $FILE_SIZE -le $MAX_SIZE_MB ]; then
    echo "✅ Success! Video compressed to ${FILE_SIZE}MB"
else
    echo "❌ Could not compress below ${MAX_SIZE_MB}MB"
    echo "💡 Consider using YouTube or Vimeo instead"
fi 