# 🚀 BotFather Quick Reference Card

> One-page reference for connecting and managing your Telegram bot with BotFather

---

## 📱 Essential BotFather Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/newbot` | Create a new bot | Starting fresh |
| `/mybots` | List and manage your bots | Access bot settings |
| `/setcommands` | Set command menu | Add bot commands |
| `/setdescription` | Set full description | Update bot profile |
| `/setabouttext` | Set short description | Quick bot info |
| `/setuserpic` | Upload profile picture | Brand your bot |
| `/setprivacy` | Toggle privacy mode | Enable group features |
| `/setjoingroups` | Allow/deny groups | Group access control |
| `/deletebot` | Delete bot permanently | ⚠️ Careful! |
| `/token` | Regenerate API token | If token compromised |

---

## ⚡ Quick Setup (Copy-Paste Ready)

### 1. Create Bot
```
Open @BotFather in Telegram
Send: /newbot
Name: Winlin Community Security Bot
Username: winlincommunity_bot
```

### 2. Commands List (Copy entire block)
```
start - Mulai bot dan lihat menu utama
help - Daftar semua perintah yang tersedia
basic - Penjelasan dasar cyber security
tips - Tips keamanan siber harian acak
glossary - Kamus istilah cyber security
quiz - Kuis cyber security interaktif
events - Event dan konferensi keamanan terbaru
phishing - Analisis link mencurigakan
checkpass - Cek kekuatan password
encrypt - Enkripsi teks ke Base64
decrypt - Dekripsi teks dari Base64
news - Berita cyber security terbaru
tools - Daftar tools keamanan yang direkomendasikan
business - Tips keamanan untuk bisnis
report - Cara lapor insiden siber
checklist - Checklist keamanan
simulate - Simulasi serangan phishing
```

### 3. Bot Description (Copy-paste to /setdescription)
```
🔐 Cyber Security Telegram Bot

Bot edukasi dan tools cyber security yang menyediakan 20+ fitur untuk melindungi diri Anda di dunia digital.

✨ FITUR UTAMA:
• Tips keamanan harian
• Analisis link phishing
• Password strength checker
• Enkripsi/Dekripsi teks
• Berita keamanan terbaru
• Kamus cyber security
• Kuis interaktif
• Event & konferensi

📚 Edukasi untuk semua tingkatan!

Gunakan /start untuk memulai!
```

### 4. About Text (Copy-paste to /setabouttext)
```
🔐 Bot edukasi & tools cyber security
Tips keamanan, analisis phishing, cek password & lebih banyak lagi!
```

---

## 💻 Terminal Commands (Copy-Paste Ready)

```bash
# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env and add your bot token
# BOT_TOKEN=your_token_here
# WEBHOOK_URL=https://your-site.netlify.app

# Validate bot connection
npm run validate-bot

# Deploy to Netlify
npm run deploy
```

---

## 🔍 Validation Results Guide

| Status | Meaning | Action Needed |
|--------|---------|---------------|
| ✅ Token format valid | Token syntax is correct | Continue |
| ✅ Bot connected | API connection working | Continue |
| ✅ Webhook set | Webhook configured | None |
| ⚠️ Webhook not set | Normal before deploy | Deploy first |
| ⚠️ No commands | Commands not configured | Set in BotFather |
| ❌ Invalid token | Wrong token format | Get correct token |
| ❌ Connection failed | Network/API issue | Check token & network |

---

## 🐛 Troubleshooting Checklist

### Bot Not Responding?
- [ ] Token is correct in .env
- [ ] App is deployed to Netlify
- [ ] Webhook is set up
- [ ] `/api/health` endpoint works
- [ ] Check Netlify function logs

### Commands Not Showing?
- [ ] `/setcommands` was executed in BotFather
- [ ] Telegram app was restarted
- [ ] Cache was cleared

### Webhook Errors?
- [ ] URL uses HTTPS
- [ ] SSL certificate is valid
- [ ] Netlify function is deployed
- [ ] No errors in logs

### Group Issues?
- [ ] Privacy mode is disabled (`/setprivacy → Disable`)
- [ ] Bot is added as admin
- [ ] Bot has message permissions

---

## 📊 Status Checks

```bash
# Check bot connection
npm run validate-bot

# Check webhook status
curl https://your-site.netlify.app/api/setup-webhook

# Check health endpoint
curl https://your-site.netlify.app/api/health

# View logs (requires Netlify CLI)
netlify logs:function webhook
```

---

## 🔗 Quick Links

### Documentation
- 🤖 [BOTFATHER_README.md](BOTFATHER_README.md) - Main guide
- ⚡ [QUICK_START_BOTFATHER.md](QUICK_START_BOTFATHER.md) - 5-min setup
- 📘 [BOTFATHER_SETUP.md](BOTFATHER_SETUP.md) - Complete guide
- 📊 [BOTFATHER_CONNECTION_FLOW.md](BOTFATHER_CONNECTION_FLOW.md) - Visual flow

### Bot URLs
- Bot: https://t.me/winlincommunity_bot
- BotFather: https://t.me/BotFather
- API Docs: https://core.telegram.org/bots/api

### Your Bot Info
- Username: @winlincommunity_bot
- Token: (stored in .env)
- Commands: 17 total
- Features: 20+ security tools

---

## 📝 Environment Variables

```bash
# Required
BOT_TOKEN=8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs
WEBHOOK_URL=https://your-site.netlify.app

# Optional
NODE_ENV=production
PORT=3000
```

---

## ✅ Deployment Checklist

### Pre-Deploy
- [ ] Token obtained from BotFather
- [ ] Commands configured
- [ ] Description set
- [ ] .env file created
- [ ] Dependencies installed
- [ ] Local validation passed

### Deploy
- [ ] Code pushed to GitHub
- [ ] Netlify site created
- [ ] Environment variables set
- [ ] Build successful
- [ ] No errors in logs

### Post-Deploy
- [ ] Webhook set up
- [ ] Health check passes
- [ ] Bot responds to /start
- [ ] All commands work
- [ ] Security features tested

---

## 🎯 Success Indicators

You know everything is working when:

1. ✅ `npm run validate-bot` passes all checks
2. ✅ `/api/health` returns HTTP 200
3. ✅ `/api/setup-webhook` returns success
4. ✅ Bot responds to `/start` in Telegram
5. ✅ Commands menu appears when typing "/"
6. ✅ Security features work (checkpass, phishing)
7. ✅ News command fetches latest articles

---

## 🆘 Emergency Commands

```bash
# Reset webhook
curl "https://api.telegram.org/bot<TOKEN>/deleteWebhook"
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=<WEBHOOK_URL>"

# Check webhook info
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"

# Get bot info
curl "https://api.telegram.org/bot<TOKEN>/getMe"

# Get updates (for debugging)
curl "https://api.telegram.org/bot<TOKEN>/getUpdates"
```

Replace `<TOKEN>` with your bot token and `<WEBHOOK_URL>` with your Netlify URL.

---

## 📞 Support

**Need help?**

1. Check [BOTFATHER_README.md](BOTFATHER_README.md) for detailed help
2. Run `npm run validate-bot` for diagnostics
3. Review [BOTFATHER_SETUP.md](BOTFATHER_SETUP.md) troubleshooting section
4. Contact developer: muhammadsobrimaulana31@gmail.com

---

## 💡 Pro Tips

1. **Security**: Never commit .env to Git
2. **Testing**: Use `netlify dev` for local testing
3. **Monitoring**: Check Netlify logs regularly
4. **Updates**: Pull latest code before deploying
5. **Backup**: Save your bot token securely
6. **Groups**: Disable privacy mode for group features
7. **Commands**: Update commands as you add features
8. **Documentation**: Keep README.md updated

---

**Print this page for quick reference while setting up your bot!**

---

*Last Updated: November 2024*
*Version: 2.0.0*
*Platform: Netlify Serverless*
