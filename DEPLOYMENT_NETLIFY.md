# 🚀 Netlify Deployment Guide - Cyber Security Telegram Bot

Panduan lengkap untuk deploy bot Telegram cyber security ke Netlify.

## 📋 Prerequisites

Sebelum deploy, pastikan Anda memiliki:

- ✅ **GitHub Account** - untuk repository
- ✅ **Netlify Account** - untuk hosting (gratis)
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

# Install Netlify CLI
npm install -g netlify-cli

# Set environment variables
export BOT_TOKEN=your_bot_token_here
export WEBHOOK_URL=http://localhost:8888

# Run bot locally
netlify dev
```

## 🌐 Deploy ke Netlify

### Method 1: Netlify Dashboard (Recommended) ⭐

#### Step 1: Push ke GitHub
```bash
# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit: Cyber Security Telegram Bot for Netlify"
git branch -M main
git remote add origin https://github.com/your-username/cyber-security-telegram-bot.git
git push -u origin main
```

#### Step 2: Import ke Netlify
1. Buka [app.netlify.com](https://app.netlify.com)
2. Login dengan GitHub account
3. Klik **"Add new site"** → **"Import an existing project"**
4. Pilih **"Deploy with GitHub"**
5. Authorize Netlify untuk akses GitHub
6. Pilih repository `cyber-security-telegram-bot`
7. **Build settings:**
   - Build command: `npm run build` (atau kosongkan)
   - Publish directory: `.` (atau kosongkan)
   - Functions directory: `netlify/functions` (otomatis dari netlify.toml)
8. Klik **"Deploy site"**

#### Step 3: Set Environment Variables
1. Di site dashboard Netlify
2. Klik **"Site configuration"** → **"Environment variables"**
3. Klik **"Add a variable"**
4. Tambahkan variabel berikut:

**Variable 1:**
- **Key:** `BOT_TOKEN`
- **Value:** `8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs` (atau token bot Anda)
- Klik **"Create variable"**

**Variable 2:**
- **Key:** `WEBHOOK_URL`
- **Value:** `https://your-site-name.netlify.app` (URL site Netlify Anda)
- Klik **"Create variable"**

5. Klik **"Trigger deploy"** untuk redeploy dengan environment variables

#### Step 4: Dapatkan URL Site Anda
- Setelah deploy selesai, copy URL site Anda
- Format: `https://your-site-name.netlify.app`
- Update environment variable `WEBHOOK_URL` dengan URL ini jika perlu

### Method 2: Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login & Deploy
```bash
# Login ke Netlify
netlify login

# Initialize Netlify site
netlify init

# Pilih opsi:
# - "Create & configure a new site"
# - Pilih team Anda
# - Masukkan site name (optional)

# Deploy
netlify deploy --prod

# Set environment variables
netlify env:set BOT_TOKEN your_bot_token_here
netlify env:set WEBHOOK_URL https://your-site.netlify.app
```

#### Step 3: Verify Deployment
```bash
# Check deployment status
netlify status

# Open site in browser
netlify open:site
```

## 🔗 Setup Webhook

### 1. Akses Setup Endpoint
Setelah deploy berhasil, akses URL berikut di browser:
```
https://your-site.netlify.app/api/setup-webhook
```

### 2. Verifikasi Webhook
Jika berhasil, Anda akan melihat response JSON:
```json
{
  "status": "success",
  "message": "Webhook set successfully",
  "webhook_url": "https://your-site.netlify.app/api/webhook"
}
```

### 3. Test Bot
1. Buka Telegram
2. Cari bot Anda (@your_bot_username)
3. Kirim `/start`
4. Bot harus merespon dengan menu utama

### 4. Check Health
Verify bot is running:
```
https://your-site.netlify.app/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-10-23T12:00:00.000Z",
  "service": "Cyber Security Telegram Bot",
  "platform": "Netlify"
}
```

## 📱 Fitur yang Tersedia Setelah Deploy

### ✅ **Fitur Utama (20+ Commands)**
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
- **Goodbye message** untuk member yang keluar
- **User tracking** dan activity monitoring
- **Log interaksi** lengkap

## 🔒 Keamanan & Monitoring

### 1. Environment Variables (Critical!)
- ✅ `BOT_TOKEN` - JANGAN share ke publik
- ✅ `WEBHOOK_URL` - URL Netlify Anda
- ❌ JANGAN commit file `.env` ke GitHub
- ✅ Gunakan Netlify environment variables

### 2. Logs & Monitoring
```bash
# View function logs (Netlify CLI)
netlify logs:function webhook

# Real-time logs
netlify logs:function webhook --stream

# View all functions
netlify functions:list
```

**Via Dashboard:**
1. Buka Netlify dashboard
2. Klik site Anda
3. Pilih **"Functions"** tab
4. Klik function name untuk lihat logs dan metrics

### 3. Rate Limiting
- **Telegram API:** 30 messages/second
- **Netlify Free:** 125K function invocations/month
- **Function timeout:** 10 seconds max
- Bot sudah include error handling

## 🚨 Troubleshooting

### Bot Tidak Merespon
**Checklist:**
1. ✅ Verify `BOT_TOKEN` di Netlify environment variables
2. ✅ Check `WEBHOOK_URL` benar (harus HTTPS)
3. ✅ Akses `/api/setup-webhook` untuk setup ulang
4. ✅ Check function logs di Netlify dashboard
5. ✅ Test endpoint `/api/health`

**Debug Steps:**
```bash
# Check deployment status
netlify status

# View recent logs
netlify logs:function webhook

# List all functions
netlify functions:list
```

### Webhook Error
**Kemungkinan penyebab:**
1. ❌ `WEBHOOK_URL` salah atau tidak menggunakan HTTPS
2. ❌ SSL certificate issue
3. ❌ Bot token tidak valid
4. ❌ Function tidak terdeploy dengan benar

**Solusi:**
```bash
# Verify webhook status via Telegram API
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"

# Setup ulang webhook
curl "https://your-site.netlify.app/api/setup-webhook"

# Delete webhook (jika perlu reset)
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/deleteWebhook"
```

### Function Timeout
**Issue:** Function execution > 10 seconds

**Solusi:**
- ✅ Optimize code untuk response cepat
- ✅ Use async/await properly
- ✅ Avoid blocking operations
- ✅ Cache data jika memungkinkan
- ✅ Upgrade ke Netlify Pro (26 seconds timeout)

### RSS News Error
**Issue:** `/news` command tidak bekerja

**Solusi:**
1. ✅ Check internet connectivity dari Netlify
2. ✅ Verify RSS feed URL valid
3. ✅ Check XML parsing di logs
4. ✅ Test fetch manually
5. ✅ Add timeout handling

### Data Persistence Issue
**Issue:** User data tidak persist setelah redeploy

**Note:** 
- File JSON lokal akan reset setiap deploy
- Untuk production, gunakan database eksternal:
  - MongoDB Atlas (free tier)
  - Firebase Realtime Database
  - Supabase
  - PostgreSQL

## 📊 Performance & Limits

### Netlify Free Tier
- **Bandwidth:** 100GB/month
- **Function Invocations:** 125K/month (≈4K/day)
- **Function Duration:** 10 seconds max
- **Build Minutes:** 300 minutes/month
- **Concurrent Builds:** 1
- **Edge Functions:** 3M requests/month

### Telegram API Limits
- **Messages:** 30 messages/second per bot
- **Same user:** 1 message/second
- **Group messages:** 20 messages/minute
- **Webhook payload:** 10MB max
- **File upload:** 50MB max

### Optimization Tips
- ✅ **Use webhook** (bukan polling) ✓ Sudah diimplementasi
- ✅ **Implement caching** untuk RSS feeds
- ✅ **Optimize JSON files** (compress jika > 1MB)
- ✅ **Monitor function duration** di dashboard
- ✅ **Use async/await** properly ✓ Sudah diimplementasi
- ✅ **Error handling** comprehensive ✓ Sudah diimplementasi

## 🔄 Update & Maintenance

### Update Bot Code
```bash
# Pull latest changes (jika dari repo)
git pull origin main

# Atau buat perubahan sendiri
# Edit files...

# Commit changes
git add .
git commit -m "Update: [describe changes]"

# Push to trigger Netlify auto-deploy
git push origin main
```

**Auto-deploy:**
- Netlify akan auto-deploy setiap push ke branch main
- Monitoring di Netlify dashboard → Deploys

### Manual Redeploy
```bash
# Via CLI
netlify deploy --prod

# Atau trigger via dashboard
# Dashboard → Deploys → Trigger deploy
```

### Monitor Function Performance
```bash
# View function analytics
netlify functions:list

# Check logs
netlify logs:function webhook --since 1h

# Check invocation count
# Via Dashboard → Functions → Analytics
```

### Update Environment Variables
```bash
# Via CLI
netlify env:set BOT_TOKEN new_token_value
netlify env:set WEBHOOK_URL new_url_value

# Via Dashboard
# Site settings → Environment variables → Edit
```

### Rollback Deployment
```bash
# Via Dashboard:
# Deploys → Find previous deploy → "Publish deploy"

# Or manually revert git commit
git revert <commit-hash>
git push origin main
```

## 🎯 Production Checklist

### Before Going Live
- [ ] Bot token di environment variables (tidak di code)
- [ ] `WEBHOOK_URL` sudah correct dan HTTPS
- [ ] Test semua commands (`/start`, `/help`, dll)
- [ ] Verify RSS news feed working
- [ ] Check welcome/goodbye messages di grup
- [ ] Test error handling
- [ ] Setup monitoring/alerts
- [ ] Document custom settings
- [ ] Backup data files (users.json, dll)

### Post-Deploy
- [ ] Setup webhook via `/api/setup-webhook`
- [ ] Test bot di private chat
- [ ] Test bot di group chat
- [ ] Monitor function logs
- [ ] Check function invocation count
- [ ] Setup custom domain (optional)
- [ ] Configure notifications (optional)

### Monitoring
- [ ] Check Netlify dashboard regularly
- [ ] Monitor function execution time
- [ ] Track error rates
- [ ] Monitor bandwidth usage
- [ ] Check user activity logs
- [ ] Review security incidents

## 🌟 Advanced Features

### Custom Domain
```bash
# Via Netlify Dashboard
# Domain settings → Add custom domain

# Or via CLI
netlify domains:add yourdomain.com
```

### Deploy Notifications
**Slack Integration:**
1. Netlify Dashboard → Integrations
2. Add Slack integration
3. Configure channels for deploy notifications

**Email Notifications:**
- Enabled by default
- Check notification settings

### Branch Deploys
```bash
# Create feature branch
git checkout -b feature/new-feature

# Push branch
git push origin feature/new-feature

# Netlify auto-creates preview deploy
# URL: https://feature-new-feature--your-site.netlify.app
```

### Environment per Branch
- **Production:** main branch
- **Staging:** develop branch
- **Preview:** feature branches

Set different env vars per context.

## 📞 Support

### Technical Issues
- **GitHub Issues:** [Create Issue](https://github.com/sobri3195/cyber-security-telegram-bot/issues)
- **Email:** muhammadsobrimaulana31@gmail.com
- **Telegram:** @winlincommunity_bot

### Netlify Support
- **Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Community:** [answers.netlify.com](https://answers.netlify.com)
- **Status:** [netlifystatus.com](https://netlifystatus.com)

### Bot Features
- **Documentation:** README.md
- **Commands:** `/help` di bot
- **Examples:** Cek source code di `/netlify/functions/`

---

## 🎉 Success!

Jika semua langkah berhasil:

✅ Bot Anda sekarang running di Netlify  
✅ Webhook configured dengan Telegram  
✅ Semua fitur cyber security tersedia  
✅ Monitoring & logs active  
✅ Auto-deploy configured  

**Test Bot Anda:**
1. Buka Telegram
2. Chat dengan bot: `@your_bot_username`
3. Kirim `/start`
4. Eksplorasi 20+ fitur cyber security! 🔐

---

**🔐 Selamat! Bot cyber security Anda sudah live di Netlify!**

*Dikembangkan dengan ❤️ oleh Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE*

**Platform:** Netlify Serverless Functions  
**Status:** 🟢 Production Ready  
**Last Updated:** October 2024
