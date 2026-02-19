# Album Download Delivery Setup Guide

This guide covers setting up the album download delivery system for the Bad Actors album.

## Setting Up Album Downloads

### Option 1: Google Drive (Recommended - Free)

1. Upload your album ZIP file to Google Drive
2. Right-click → Share → Anyone with the link
3. Get the shareable link
4. Use a direct download link converter or the Google Drive API

**Direct Download URL Format:**
```
https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
```

Replace `YOUR_FILE_ID` with the ID from your shareable link.

### Option 2: Dropbox (Free Tier Available)

1. Upload to Dropbox
2. Create a shared link
3. Change `dl=0` to `dl=1` in the URL for direct download

**Example:**
```
# Original shared link
https://www.dropbox.com/s/abc123/bad-actors-album.zip?dl=0

# Direct download link
https://www.dropbox.com/s/abc123/bad-actors-album.zip?dl=1
```

### Option 3: Internet Archive (Free, Permanent)

1. Upload to archive.org
2. Get the direct download link
3. Very reliable and free

**Benefits:**
- Permanent hosting
- No bandwidth limits
- Free forever

### Option 4: Host in public/ folder (Simplest)

1. Add your `bad-actors-album.zip` to the `public/` folder
2. The download URL becomes `/bad-actors-album.zip`
3. Works but increases bundle size

**Note:** Only recommended for small files or if you have no other option.

## EmailJS Template Setup

Create an email template in EmailJS with these variables:

| Variable | Description |
|----------|-------------|
| `{{to_email}}` | Recipient email |
| `{{to_name}}` | Recipient name (optional) |
| `{{download_url}}` | The download link |

### Example Template

```
Subject: Your Free Download: Bad Actors by Don Matthews

Hi {{to_name}},

Thanks for your interest in Bad Actors!

Download your free album here:
{{download_url}}

Stay tuned for updates and new releases.

- Don Matthews
```

### EmailJS Configuration

Add these environment variables to your `.env.local` file:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_DOWNLOAD_URL=your_download_url
```

## Testing

1. Set up your `.env.local` file with the EmailJS credentials
2. Test the email capture form
3. Verify the download link works
4. Check spam folder if emails don't arrive

## Recommended Workflow

1. Start with Google Drive or Dropbox for quick setup
2. Consider Internet Archive for permanent hosting
3. Test thoroughly before promoting the download link
4. Monitor EmailJS usage limits on free tier (200 emails/month)
