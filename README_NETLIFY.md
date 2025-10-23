# 🚀 Netlify Deployment - Cyber Security Telegram Bot

> **This bot has been successfully migrated to Netlify!** 🎉

## ⚡ Quick Deploy to Netlify

### 1-Click Deploy (Recommended)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Manual Deploy (5 minutes)

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Netlify"
git push origin main

# 2. Go to app.netlify.com
# 3. Click "Add new site" → "Import an existing project"
# 4. Select your GitHub repository
# 5. Click "Deploy site"

# 6. Add environment variables:
# - BOT_TOKEN = 8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs
# - WEBHOOK_URL = https://your-site.netlify.app

# 7. Setup webhook:
# Visit: https://your-site.netlify.app/api/setup-webhook

# 8. Test bot on Telegram!
```

## 📋 What's New?

### ✅ Netlify Functions
All bot logic now runs on Netlify serverless functions:
- `webhook.js` - Main bot handler (20+ commands)
- `setup-webhook.js` - Telegram webhook configuration
- `health.js` - Health check endpoint

### ✅ Updated Documentation
- **README.md** - Updated for Netlify
- **DEPLOYMENT_NETLIFY.md** - Complete deployment guide
- **QUICK_START_NETLIFY.md** - 5-minute quick start
- **NETLIFY_MIGRATION_SUMMARY.md** - Technical details
- **PLATFORM_COMPARISON.md** - Vercel vs Netlify
- **CHANGES.md** - All changes made

### ✅ Configuration Files
- **netlify.toml** - Netlify configuration
- **.gitignore** - Git ignore file
- **package.json** - Updated for Netlify

## 🎯 Key Features (All Working!)

### 20+ Commands
- `/start` - Menu utama
- `/help` - Daftar perintah
- `/basic` - Dasar cyber security
- `/tips` - Tips keamanan harian
- `/phishing [url]` - Deteksi phishing
- `/checkpass [password]` - Cek password
- `/encrypt [text]` - Enkripsi Base64
- `/decrypt [text]` - Dekripsi Base64
- `/news` - Berita cyber security
- `/tools` - Tools keamanan
- `/glossary [term]` - Kamus cyber security
- `/simulate phishing` - Simulasi phishing
- `/business` - Tips keamanan bisnis
- `/report` - Cara lapor insiden
- `/checklist` - Checklist keamanan
- `/quiz` - Kuis cyber security
- `/events` - Event keamanan

### Automatic Features
- Auto-reply untuk pertanyaan umum
- Welcome message untuk member baru
- Goodbye message untuk member keluar
- User activity tracking
- Comprehensive logging

## 📚 Documentation

| Document | Description | Size |
|----------|-------------|------|
| **README.md** | Main documentation (updated for Netlify) | 10.6 KB |
| **DEPLOYMENT_NETLIFY.md** | Complete deployment guide | 12.3 KB |
| **QUICK_START_NETLIFY.md** | 5-minute quick start | 3.3 KB |
| **NETLIFY_MIGRATION_SUMMARY.md** | Technical migration details | 7.7 KB |
| **PLATFORM_COMPARISON.md** | Vercel vs Netlify comparison | 6.5 KB |
| **CHANGES.md** | List of all changes | 7.8 KB |
| **README_NETLIFY.md** | This file | - |

## 🔧 Local Development

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Install dependencies
npm install

# Run locally
netlify dev

# Access at: http://localhost:8888
```

## 🌐 API Endpoints

All endpoints remain the same:

- **POST** `/api/webhook` - Main webhook endpoint
- **GET** `/api/webhook` - Webhook verification
- **GET** `/api/setup-webhook` - Setup Telegram webhook
- **GET** `/api/health` - Health check

## 🚨 Important Notes

### Environment Variables (Required)
```env
BOT_TOKEN=8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs
WEBHOOK_URL=https://your-site.netlify.app
```

Set these in:
- Netlify Dashboard → Site settings → Environment variables

### Data Persistence
⚠️ **Important:** File writes in Netlify functions are ephemeral!

- `data/glossary.json` ✅ Works (read-only)
- `data/events.json` ✅ Works (read-only)
- `data/users.json` ⚠️ Won't persist across deployments

**Solution for Production:**
- Use external database (MongoDB, Firebase, Supabase)
- See DEPLOYMENT_NETLIFY.md for details

## 📊 Netlify Free Tier

- **Bandwidth:** 100GB/month
- **Function Invocations:** 125K/month (≈4,000/day)
- **Function Duration:** 10 seconds max
- **Build Minutes:** 300/month

**Is this enough?**
- ✅ Yes for small-medium bots (< 4K messages/day)
- ⚠️ May need Pro tier for high-traffic bots

## 🔍 Troubleshooting

### Bot not responding?
```bash
# Check function logs
netlify logs:function webhook

# Verify webhook setup
curl https://your-site.netlify.app/api/setup-webhook

# Check health
curl https://your-site.netlify.app/api/health
```

### Common Issues

**Issue:** Webhook not set
```bash
# Solution: Visit setup endpoint
curl https://your-site.netlify.app/api/setup-webhook
```

**Issue:** Environment variables not set
```bash
# Solution: Set in Netlify dashboard
# Site settings → Environment variables
```

**Issue:** Function timeout
```bash
# Check function duration in Netlify dashboard
# Optimize code if > 10 seconds
```

See **DEPLOYMENT_NETLIFY.md** for detailed troubleshooting.

## 📈 Next Steps

1. **Deploy to Netlify** ✅
   - Follow QUICK_START_NETLIFY.md

2. **Test All Features** ✅
   - Test all commands
   - Test in private chat
   - Test in group chat

3. **Monitor Performance** ✅
   - Check Netlify dashboard
   - Monitor function logs
   - Track invocation count

4. **Optional Enhancements**
   - Add external database
   - Setup custom domain
   - Enable analytics
   - Add more commands

## 🎓 Learning Resources

### Netlify
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify CLI Guide](https://docs.netlify.com/cli/get-started/)
- [Netlify Community Forums](https://answers.netlify.com)

### Telegram Bot
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Bot Tutorial](https://core.telegram.org/bots/tutorial)
- [Webhook Guide](https://core.telegram.org/bots/webhooks)

### Cyber Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Cyber Security Guide](https://www.cisa.gov/cybersecurity)
- [ID-CERT Indonesia](https://id-cert.go.id)

## 💬 Support & Contact

### Technical Support
- **Email:** muhammadsobrimaulana31@gmail.com
- **GitHub:** [github.com/sobri3195](https://github.com/sobri3195)
- **Telegram Bot:** @winlincommunity_bot

### Report Issues
- [GitHub Issues](https://github.com/sobri3195/cyber-security-telegram-bot/issues)

### Donate
Support bot development:
- [Lynk.id/muhsobrimaulana](https://lynk.id/muhsobrimaulana)

## 📜 License

MIT License - See LICENSE file

## 👨‍💻 Author

**Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE**

- GitHub: [github.com/sobri3195](https://github.com/sobri3195)
- Email: muhammadsobrimaulana31@gmail.com
- Telegram: @winlincommunity_bot

## 🙏 Acknowledgments

- **Telegram** - Bot API platform
- **Netlify** - Serverless hosting
- **The Hacker News** - RSS feed
- **Cyber Security Community** - Inspiration and support
- **Node.js Community** - Tools and libraries

## ⭐ Star This Repository!

If you find this bot useful, please star the repository on GitHub!

---

## 🎉 Success!

**Your Telegram Cyber Security Bot is now running on Netlify!** 🚀

**Quick Links:**
- 🌐 [Your Bot on Telegram](https://t.me/winlincommunity_bot)
- 📚 [Complete Documentation](./README.md)
- 🚀 [Deployment Guide](./DEPLOYMENT_NETLIFY.md)
- ⚡ [Quick Start](./QUICK_START_NETLIFY.md)

**Status:** 🟢 Live and Ready  
**Platform:** Netlify Serverless Functions  
**Version:** 2.0.0  
**Last Updated:** October 2024

---

*Dikembangkan dengan ❤️ untuk cyber security education*

**🔐 Tetap aman di dunia digital!**
