# ⚡ Quick Start - Deploy ke Netlify

Panduan cepat untuk deploy bot Telegram ke Netlify dalam 5 menit!

## 🚀 Langkah Cepat

### 1. Push ke GitHub (1 menit)
```bash
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

### 2. Deploy ke Netlify (2 menit)
1. Buka [app.netlify.com](https://app.netlify.com)
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **"Deploy with GitHub"**
4. Pilih repository Anda
5. Klik **"Deploy site"**

### 3. Set Environment Variables (1 menit)
1. Di Netlify dashboard → **"Site configuration"** → **"Environment variables"**
2. Tambahkan:
   - `BOT_TOKEN` = `8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs`
   - `WEBHOOK_URL` = `https://your-site.netlify.app` (copy dari dashboard)
3. Klik **"Trigger deploy"**

### 4. Setup Webhook (30 detik)
Akses di browser:
```
https://your-site.netlify.app/api/setup-webhook
```

### 5. Test Bot (30 detik)
1. Buka Telegram
2. Chat: `@winlincommunity_bot`
3. Kirim: `/start`
4. ✅ Done!

## 🎯 URL Penting

- **Site URL:** `https://your-site.netlify.app`
- **Setup Webhook:** `https://your-site.netlify.app/api/setup-webhook`
- **Health Check:** `https://your-site.netlify.app/api/health`
- **Webhook Endpoint:** `https://your-site.netlify.app/api/webhook`

## 🔧 Netlify CLI (Alternatif)

```bash
# Install
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Set env vars
netlify env:set BOT_TOKEN 8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs
netlify env:set WEBHOOK_URL https://your-site.netlify.app
```

## ✅ Verifikasi

### Check Health
```bash
curl https://your-site.netlify.app/api/health
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

### Setup Webhook
```bash
curl https://your-site.netlify.app/api/setup-webhook
```

Response:
```json
{
  "status": "success",
  "message": "Webhook set successfully",
  "webhook_url": "https://your-site.netlify.app/api/webhook"
}
```

### Test di Telegram
1. Cari bot: `@winlincommunity_bot`
2. Kirim: `/start`
3. Bot harus response dengan menu

## 🚨 Troubleshooting Cepat

### Bot tidak response?
```bash
# 1. Check logs
netlify logs:function webhook

# 2. Verify env vars
netlify env:list

# 3. Check webhook
curl "https://api.telegram.org/bot8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs/getWebhookInfo"
```

### Reset webhook
```bash
# Delete webhook
curl "https://api.telegram.org/bot8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs/deleteWebhook"

# Setup ulang
curl https://your-site.netlify.app/api/setup-webhook
```

## 📚 Dokumentasi Lengkap

- **README.md** - Overview lengkap fitur
- **DEPLOYMENT_NETLIFY.md** - Panduan deploy detail
- **SETUP_INSTRUCTIONS.md** - Setup instructions

## 💡 Tips

1. ✅ Copy URL site dari Netlify dashboard
2. ✅ Set `WEBHOOK_URL` sesuai URL site Anda
3. ✅ Trigger redeploy setelah set env vars
4. ✅ Check logs jika ada error
5. ✅ Test health endpoint dulu sebelum setup webhook

## 🎉 Selesai!

Bot Anda sekarang live di Netlify! 🚀

**Test Commands:**
- `/start` - Menu utama
- `/help` - Daftar perintah
- `/tips` - Tips keamanan
- `/news` - Berita cyber security

---

*Dikembangkan dengan ❤️ oleh Letda Kes dr. Muhammad Sobri Maulana*
