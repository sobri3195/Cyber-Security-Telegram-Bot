# 🚀 Panduan Deploy ke Netlify

Panduan lengkap untuk deploy Cyber Security Bot dengan React Frontend ke Netlify.

## 📋 Prerequisites

- Akun Netlify (gratis di [netlify.com](https://netlify.com))
- Repository GitHub
- Bot Telegram Token (dari @BotFather)
- Node.js 16+ terinstall

## 🎯 Cara Deploy

### Method 1: Deploy via Netlify Dashboard (Recommended)

#### Step 1: Push ke GitHub
```bash
git add .
git commit -m "Add React frontend with animations"
git push origin main
```

#### Step 2: Connect ke Netlify
1. Login ke [app.netlify.com](https://app.netlify.com)
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **"Deploy with GitHub"**
4. Authorize Netlify untuk akses GitHub
5. Pilih repository Anda

#### Step 3: Configure Build Settings
Netlify akan otomatis detect settings dari `netlify.toml`:
- **Build command:** `npm run build`
- **Publish directory:** `build`
- **Functions directory:** `netlify/functions`

Klik **"Deploy site"**

#### Step 4: Set Environment Variables
1. Di site dashboard, klik **"Site settings"**
2. Pilih **"Environment variables"** di sidebar
3. Klik **"Add a variable"**
4. Tambahkan:
   - **Key:** `BOT_TOKEN`
   - **Value:** `8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs`
5. Tambahkan lagi:
   - **Key:** `WEBHOOK_URL`
   - **Value:** URL site Netlify Anda (misal: `https://your-site.netlify.app`)
6. Klik **"Save"**

#### Step 5: Redeploy
1. Kembali ke **"Deploys"** tab
2. Klik **"Trigger deploy"** → **"Deploy site"**
3. Tunggu hingga deploy selesai (2-3 menit)

#### Step 6: Setup Webhook Telegram
Setelah deploy sukses, akses URL ini di browser:
```
https://your-site.netlify.app/api/setup-webhook
```

Anda akan melihat response:
```json
{
  "status": "success",
  "message": "Webhook set successfully",
  "webhook_url": "https://your-site.netlify.app/api/webhook"
}
```

#### Step 7: Test Bot
1. Buka Telegram
2. Cari bot: **@winlincommunity_bot**
3. Kirim command: `/start`
4. Bot akan merespon dengan menu utama

#### Step 8: Test Frontend
Buka URL site Netlify Anda di browser:
```
https://your-site.netlify.app
```

Anda akan melihat landing page animasi dengan:
- ✅ Hero section dengan floating animation
- ✅ Features cards dengan hover effects
- ✅ Commands list dengan filter
- ✅ Tools showcase
- ✅ Footer dengan link

---

### Method 2: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login
```bash
netlify login
```
Browser akan terbuka untuk authorize.

#### Step 3: Initialize Site
```bash
cd /path/to/project
netlify init
```

Pilih:
- **"Create & configure a new site"**
- Pilih team
- Beri nama site (unique)

#### Step 4: Set Environment Variables
```bash
netlify env:set BOT_TOKEN "8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs"
netlify env:set WEBHOOK_URL "https://your-site.netlify.app"
```

#### Step 5: Deploy
```bash
netlify deploy --prod
```

#### Step 6: Setup Webhook & Test
Sama seperti Method 1 Step 6-8.

---

## 🔧 Configuration Files

### netlify.toml
```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "build"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/webhook"
  to = "/.netlify/functions/webhook"
  status = 200

[[redirects]]
  from = "/api/setup-webhook"
  to = "/.netlify/functions/setup-webhook"
  status = 200

[[redirects]]
  from = "/api/health"
  to = "/.netlify/functions/health"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "netlify deploy --prod",
    "netlify-dev": "netlify dev"
  }
}
```

---

## 📊 Monitoring & Logs

### View Logs
Di Netlify Dashboard:
1. Klik site Anda
2. Pilih **"Functions"** di sidebar
3. Pilih function (webhook, health, setup-webhook)
4. Lihat logs dan metrics

### Via CLI
```bash
# View real-time logs
netlify logs:function webhook --stream

# View latest logs
netlify logs:function webhook
```

### Health Check
Test endpoint health:
```bash
curl https://your-site.netlify.app/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-10-31T12:00:00.000Z",
  "service": "Cyber Security Telegram Bot",
  "platform": "Netlify"
}
```

---

## 🐛 Troubleshooting

### Bot Tidak Merespon
1. ✅ Cek environment variables di Netlify
2. ✅ Verify webhook sudah di-setup: `/api/setup-webhook`
3. ✅ Cek function logs di Netlify dashboard
4. ✅ Test health endpoint: `/api/health`

### Build Error
```bash
# Locally
npm install
npm run build

# Check logs di Netlify Dashboard > Deploys > Deploy log
```

### Frontend Tidak Muncul
1. ✅ Cek build berhasil di Netlify
2. ✅ Verify publish directory: `build`
3. ✅ Clear browser cache
4. ✅ Check console browser untuk errors

### Function Timeout
- Netlify free tier: 10 detik max execution time
- Optimize function atau upgrade plan

### Webhook Error
1. ✅ Pastikan `WEBHOOK_URL` benar dan HTTPS
2. ✅ Verify bot token valid
3. ✅ Check Telegram bot status di @BotFather

---

## 📈 Performance

### Netlify Free Tier Limits
- **Bandwidth:** 100GB/month
- **Build Minutes:** 300 minutes/month
- **Function Invocations:** 125K/month
- **Function Duration:** 10 seconds max

### Current Performance
- **Build Time:** ~2 minutes
- **Frontend Load:** < 2 seconds
- **Function Cold Start:** < 1 second
- **Bundle Size:** 85kb JS + 2.5kb CSS (gzipped)

### Optimization Tips
- ✅ Using webhook (not polling)
- ✅ Code splitting dengan React
- ✅ CSS/JS minification
- ✅ Gzip compression
- ✅ CDN via Netlify

---

## 🔄 Update & Maintenance

### Update Code
```bash
# Pull latest changes
git pull origin main

# Make changes
# ...

# Commit & push
git add .
git commit -m "Update feature"
git push origin main
```

Netlify akan auto-deploy setiap push ke branch main.

### Manual Redeploy
Di Netlify Dashboard:
1. **"Deploys"** tab
2. **"Trigger deploy"** → **"Deploy site"**

Via CLI:
```bash
netlify deploy --prod
```

### Rollback
Di Netlify Dashboard:
1. **"Deploys"** tab
2. Pilih deploy yang ingin di-restore
3. Klik **"Publish deploy"**

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain
1. Di Netlify Dashboard → **"Domain settings"**
2. Klik **"Add custom domain"**
3. Masukkan domain (misal: `cyberbot.com`)
4. Update DNS records di domain provider:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```
5. Wait for DNS propagation (5-30 menit)
6. Netlify akan auto-setup HTTPS

---

## 📱 Testing Checklist

### Frontend
- [ ] Landing page loads properly
- [ ] Animations working smoothly
- [ ] All sections visible (Hero, Features, Commands, Tools, Footer)
- [ ] Buttons clickable & redirect properly
- [ ] Responsive on mobile
- [ ] No console errors

### Backend (Bot)
- [ ] `/start` - Shows welcome menu
- [ ] `/help` - Lists all commands
- [ ] `/basic` - Shows security basics
- [ ] `/phishing [url]` - Detects suspicious links
- [ ] `/checkpass [password]` - Checks password strength
- [ ] `/encrypt [text]` - Encrypts to Base64
- [ ] `/news` - Shows latest cyber security news
- [ ] `/tools` - Lists security tools
- [ ] Auto-reply working
- [ ] Welcome message for new members

### API Endpoints
- [ ] `GET /api/health` - Returns status OK
- [ ] `GET /api/setup-webhook` - Sets up webhook
- [ ] `POST /api/webhook` - Receives Telegram updates

---

## 📞 Support

### Issues?
- **Email:** muhammadsobrimaulana31@gmail.com
- **GitHub Issues:** [Create Issue](https://github.com/sobri3195/cyber-security-telegram-bot/issues)
- **Telegram:** @winlincommunity_bot

### Resources
- [Netlify Docs](https://docs.netlify.com/)
- [React Docs](https://react.dev/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Framer Motion](https://www.framer.com/motion/)

---

**🎉 Selamat! Bot Anda sudah live dengan frontend animasi keren!**

**URL Bot:** https://t.me/winlincommunity_bot  
**Frontend:** https://your-site.netlify.app

*Dikembangkan dengan ❤️ menggunakan React + Netlify + Telegram Bot API*
