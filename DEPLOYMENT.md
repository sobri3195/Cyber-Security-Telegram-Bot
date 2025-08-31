# 🚀 Deployment Guide - Cyber Security Telegram Bot

Panduan lengkap untuk deploy bot Telegram cyber security ke Vercel.

## 📋 Prerequisites

Sebelum deploy, pastikan Anda memiliki:

- ✅ **GitHub Account** - untuk repository
- ✅ **Vercel Account** - untuk hosting
- ✅ **Telegram Bot Token** - dari @BotFather
- ✅ **Node.js** - versi 16+ (untuk development lokal)

## 🔧 Setup Telegram Bot

### 1. Buat Bot di Telegram
1. Chat dengan [@BotFather](https://t.me/botfather)
2. Kirim `/newbot`
3. Ikuti instruksi untuk nama bot dan username
4. Simpan **BOT_TOKEN** yang diberikan

### 2. Test Bot Lokal (Optional)
```bash
# Install dependencies
npm install

# Set environment variables
export BOT_TOKEN=your_bot_token_here
export WEBHOOK_URL=http://localhost:3000

# Run bot
npm start
```

## 🌐 Deploy ke Vercel

### Method 1: Vercel Dashboard (Recommended)

#### Step 1: Push ke GitHub
```bash
# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit: Cyber Security Telegram Bot"
git branch -M main
git remote add origin https://github.com/sobri3195/cyber-security-telegram-bot.git
git push -u origin main
```

#### Step 2: Import ke Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **"New Project"**
4. Import repository `cyber-security-telegram-bot`
5. Klik **"Deploy"**

#### Step 3: Set Environment Variables
1. Di project dashboard Vercel
2. Klik **"Settings"** → **"Environment Variables"**
3. Tambahkan variabel berikut:

```env
BOT_TOKEN=your_telegram_bot_token_here
WEBHOOK_URL=https://your-app-name.vercel.app
```

4. Klik **"Save"**
5. Redeploy project

### Method 2: Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login & Deploy
```bash
# Login ke Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add BOT_TOKEN
vercel env add WEBHOOK_URL
```

## 🔗 Setup Webhook

### 1. Akses Setup Endpoint
Setelah deploy berhasil, akses:
```
https://your-app-name.vercel.app/api/setup-webhook
```

### 2. Verifikasi Webhook
Jika berhasil, Anda akan melihat:
```json
{
  "status": "success",
  "message": "Webhook set successfully",
  "webhook_url": "https://your-app-name.vercel.app/api/webhook"
}
```

### 3. Test Bot
1. Buka Telegram
2. Chat dengan bot Anda
3. Kirim `/start`
4. Bot harus merespon dengan menu utama

## 📱 Fitur yang Tersedia Setelah Deploy

### ✅ **Fitur Utama**
- `/start` - Menu utama
- `/help` - Daftar perintah
- `/basic` - Dasar cyber security
- `/tips` - Tips keamanan harian
- `/phishing [url]` - Deteksi link mencurigakan
- `/checkpass [password]` - Cek kekuatan password
- `/encrypt & /decrypt` - Enkripsi Base64
- `/news` - Berita cyber security terbaru
- `/tools` - Daftar tools keamanan
- `/glossary [istilah]` - Kamus cyber security
- `/simulate phishing` - Simulasi edukasi
- `/business` - Tips keamanan bisnis
- `/report` - Cara lapor insiden siber
- `/checklist` - Checklist keamanan
- `/quiz` - Kuis cyber security
- `/events` - Event keamanan

### ✅ **Fitur Tambahan**
- **Auto-reply** untuk pertanyaan umum
- **Welcome message** otomatis untuk member baru
- **Broadcast notifikasi** (admin)
- **Log interaksi** lengkap
- **User management** dengan tracking

## 🔒 Keamanan & Monitoring

### 1. Environment Variables
- ✅ `BOT_TOKEN` - Jangan share ke publik
- ✅ `WEBHOOK_URL` - URL Vercel Anda
- ❌ Jangan commit file `.env` ke GitHub

### 2. Logs & Monitoring
- Akses logs di Vercel dashboard
- Monitor webhook endpoint `/api/health`
- Check user activity di console

### 3. Rate Limiting
- Telegram API: 30 requests/second
- Vercel: 100 requests/second (free tier)
- Bot sudah include delay untuk broadcast

## 🚨 Troubleshooting

### Bot Tidak Merespon
1. ✅ Check `BOT_TOKEN` di environment variables
2. ✅ Verify webhook URL di `/api/setup-webhook`
3. ✅ Check logs di Vercel dashboard
4. ✅ Test endpoint `/api/health`

### Webhook Error
1. ✅ Pastikan `WEBHOOK_URL` benar
2. ✅ Check SSL certificate (HTTPS required)
3. ✅ Verify bot token valid
4. ✅ Check Vercel deployment status

### RSS News Error
1. ✅ Check internet connectivity
2. ✅ Verify RSS feed URL
3. ✅ Check XML parsing
4. ✅ Monitor error logs

## 📊 Performance & Scaling

### Vercel Free Tier Limits
- **Bandwidth:** 100GB/month
- **Function Duration:** 10 seconds
- **Requests:** 100/second
- **Deployments:** Unlimited

### Optimization Tips
- ✅ Use webhook (not polling)
- ✅ Implement caching untuk RSS
- ✅ Optimize JSON file sizes
- ✅ Monitor function cold starts

## 🔄 Update & Maintenance

### 1. Update Bot
```bash
# Pull latest changes
git pull origin main

# Deploy to Vercel
vercel --prod
```

### 2. Add New Features
1. Develop locally
2. Test dengan `npm start`
3. Commit changes
4. Deploy ke Vercel

### 3. Monitor Performance
- Vercel Analytics
- Function execution times
- Error rates
- User engagement

## 📞 Support

### Technical Issues
- **GitHub Issues:** [Create Issue](https://github.com/sobri3195/cyber-security-telegram-bot/issues)
- **Email:** muhammadsobrimaulana31@gmail.com

### Bot Features
- **Documentation:** README.md
- **Commands:** `/help` di bot
- **Examples:** Lihat file source code

---

## 🎯 Next Steps

1. ✅ **Deploy ke Vercel**
2. ✅ **Setup webhook**
3. ✅ **Test semua fitur**
4. ✅ **Share bot ke komunitas**
5. ✅ **Monitor performance**
6. ✅ **Add fitur baru**

---

**🔐 Selamat! Bot cyber security Anda sudah siap digunakan!**

*Dikembangkan dengan ❤️ oleh Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE*
