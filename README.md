# 🔐 Cyber Security Telegram Bot

Bot Telegram berbasis webhook untuk edukasi dan tools cyber security yang di-host di Netlify (serverless) dengan **React Frontend Animasi Interaktif**.

## 🤖 Bot Information

**Your bot is ready and available at:**
- **Bot Username:** @winlincommunity_bot
- **Bot URL:** [t.me/winlincommunity_bot](https://t.me/winlincommunity_bot)
- **Bot Token:** `8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs`

> **Note:** Keep your token secure and store it safely. It can be used by anyone to control your bot.

## 👨‍💻 Author

**Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE**

- **GitHub:** [github.com/sobri3195](https://github.com/sobri3195)
- **Email:** muhammadsobrimaulana31@gmail.com
- **Donasi:** [https://lynk.id/muhsobrimaulana](https://lynk.id/muhsobrimaulana)

## ✨ React Frontend (NEW!)

Website landing page dengan animasi interaktif yang menampilkan:
- 🎨 **Animated Hero Section** dengan floating logo dan particles background
- 📊 **Features Showcase** dengan glassmorphism cards dan hover effects
- 📖 **Commands List** dengan category filtering dan smooth transitions
- 🛠️ **Security Tools** showcase dengan animated icons
- 📱 **Fully Responsive** design untuk semua device
- ⚡ **Performance Optimized** dengan bundle size < 90KB

**Dokumentasi Lengkap:**
- 📚 [REACT_FRONTEND.md](REACT_FRONTEND.md) - Feature documentation
- 🚀 [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) - Deployment guide
- ⚡ [QUICK_START_REACT.md](QUICK_START_REACT.md) - Quick start
- 📝 [SUMMARY_REACT.md](SUMMARY_REACT.md) - Implementation summary

## 🌟 Fitur Utama

Bot ini memiliki **20+ fitur lengkap** untuk cyber security:

### 📚 **Edukasi & Informasi**
- `/start` - Menu utama dan sambutan
- `/help` - Daftar perintah lengkap
- `/basic` - Penjelasan dasar cyber security
- `/tips` - Tips keamanan harian acak
- `/glossary [istilah]` - Kamus cyber security dengan 30+ istilah
- `/quiz` - Kuis cyber security interaktif
- `/events` - Event cyber security terbaru

### 🛡️ **Tools Keamanan**
- `/phishing [url]` - Deteksi link mencurigakan dengan analisis mendalam
- `/checkpass [password]` - Cek kekuatan password dengan skor dan saran
- `/encrypt [teks]` - Enkripsi teks ke Base64
- `/decrypt [teks]` - Dekripsi teks dari Base64

### 📰 **Berita & Update**
- `/news` - Berita cyber security terbaru dari RSS The Hacker News (max 3 item)
- `/tools` - Daftar tools keamanan yang direkomendasikan
- `/business` - Tips keamanan untuk bisnis dan enterprise

### 🚨 **Keamanan & Pelaporan**
- `/report` - Cara lapor insiden siber di Indonesia (ID-CERT)
- `/checklist` - Checklist keamanan lengkap untuk review berkala
- `/simulate phishing` - Simulasi serangan phishing untuk edukasi

### 💬 **Fitur Tambahan**
- **Auto-reply** untuk pertanyaan umum cyber security
- **Welcome message** otomatis untuk member baru
- **Broadcast notifikasi** (admin bisa kirim ke semua user)
- **Log interaksi** lengkap untuk monitoring
- **User management** dengan tracking aktivitas

## 🚀 Teknologi

- **Frontend:** React 18 + Framer Motion (Animated UI)
- **Backend:** Node.js + Netlify Functions
- **Hosting:** Netlify (serverless + static)
- **Database:** File JSON lokal (tanpa database eksternal)
- **API:** Telegram Bot API dengan webhook
- **RSS:** Fetch RSS dari The Hacker News
- **Architecture:** Serverless functions + SPA

## 📁 Struktur File

```
├── src/                    # React source code
│   ├── App.js             # Main React component
│   ├── index.js           # React entry point
│   └── components/        # React components (animated UI)
│       ├── Hero.js        # Hero section with animations
│       ├── Features.js    # Features showcase
│       ├── Commands.js    # Bot commands list
│       ├── Tools.js       # Security tools
│       ├── Footer.js      # Footer section
│       └── ParticlesBackground.js  # Animated background
├── public/                # Static files
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── build/                 # Production build (generated)
├── netlify/
│   └── functions/         # Netlify serverless functions
│       ├── webhook.js     # Main bot logic (webhook handler)
│       ├── setup-webhook.js # Webhook setup endpoint
│       └── health.js      # Health check endpoint
├── utils/
│   ├── dataManager.js     # User & data management
│   ├── security.js        # Security utilities (password, phishing)
│   └── news.js            # RSS news service
├── data/
│   ├── glossary.json      # Cyber security terms dictionary
│   ├── events.json        # Security events & conferences
│   └── users.json         # User database
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies
├── README.md              # This file
├── REACT_FRONTEND.md      # React frontend documentation
├── DEPLOY_GUIDE.md        # Deployment guide
└── QUICK_START_REACT.md   # Quick start guide
```

## 🛠️ Instalasi & Setup

### 1. Clone Repository
```bash
git clone https://github.com/sobri3195/cyber-security-telegram-bot.git
cd cyber-security-telegram-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env` atau set di Netlify:
```env
BOT_TOKEN=8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs
WEBHOOK_URL=https://your-app.netlify.app
```

**Bot Information:**
- **Bot Username:** @winlincommunity_bot
- **Bot URL:** t.me/winlincommunity_bot
- **Token:** 8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs

### 4. Deploy ke Netlify

#### Method 1: Netlify Dashboard (Recommended)

1. **Push ke GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

2. **Import ke Netlify:**
   - Buka [netlify.com](https://netlify.com)
   - Login dengan GitHub
   - Klik **"New site from Git"**
   - Pilih repository Anda
   - Build settings sudah otomatis dari `netlify.toml`
   - Klik **"Deploy site"**

3. **Set Environment Variables:**
   - Di site dashboard Netlify
   - Klik **"Site settings"** → **"Environment variables"**
   - Tambahkan:
     - `BOT_TOKEN`: Token bot Telegram Anda
     - `WEBHOOK_URL`: URL site Netlify Anda (e.g., `https://your-site.netlify.app`)
   - Klik **"Save"**
   - Trigger redeploy

#### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod

# Set environment variables
netlify env:set BOT_TOKEN your_bot_token_here
netlify env:set WEBHOOK_URL https://your-site.netlify.app
```

### 5. Setup Webhook
Setelah deploy, akses:
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

## 📱 Cara Penggunaan

### Perintah Dasar
- `/start` - Mulai bot dan lihat menu utama
- `/help` - Lihat semua perintah yang tersedia

### Edukasi Cyber Security
- `/basic` - Pelajari dasar-dasar cyber security
- `/tips` - Dapatkan tips keamanan harian
- `/glossary malware` - Cari definisi istilah cyber security

### Tools Keamanan
- `/phishing https://example.com` - Analisis link mencurigakan
- `/checkpass MyPassword123!` - Cek kekuatan password
- `/encrypt Hello World` - Enkripsi teks ke Base64

### Informasi Terbaru
- `/news` - Berita cyber security terbaru
- `/events` - Event keamanan yang akan datang
- `/tools` - Rekomendasi tools keamanan

## 🔒 Fitur Keamanan

- **Webhook-based** (lebih aman dari polling)
- **Input validation** untuk semua perintah
- **Rate limiting** built-in
- **Logging** untuk audit trail
- **No external database** (data tersimpan lokal)
- **Environment variables** untuk sensitive data

## 🌐 API Endpoints

### Webhook Endpoint
```
POST /api/webhook
```
Endpoint utama untuk menerima updates dari Telegram.

### Setup Webhook
```
GET /api/setup-webhook
```
Setup webhook URL di Telegram.

### Health Check
```
GET /api/health
```
Cek status bot.

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-10-23T12:00:00.000Z",
  "service": "Cyber Security Telegram Bot",
  "platform": "Netlify"
}
```

## 🚨 Troubleshooting

### Bot Tidak Merespon
1. ✅ Cek `BOT_TOKEN` di environment variables
2. ✅ Verify webhook URL di `/api/setup-webhook`
3. ✅ Cek function logs di Netlify dashboard
4. ✅ Test endpoint `/api/health`

### Webhook Error
1. ✅ Pastikan `WEBHOOK_URL` benar dan menggunakan HTTPS
2. ✅ Cek SSL certificate valid
3. ✅ Verify bot token valid
4. ✅ Cek Netlify function deployment status

### Function Timeout
- Netlify free tier: 10 detik max execution time
- Jika timeout, optimize fungsi atau upgrade plan

### Data Persistence
- Data disimpan di file JSON lokal
- Untuk production, pertimbangkan database eksternal (MongoDB, Firebase, dll)

## 📊 Performance & Limits

### Netlify Free Tier
- **Bandwidth:** 100GB/month
- **Function Invocations:** 125K/month
- **Function Duration:** 10 seconds max
- **Build Minutes:** 300 minutes/month

### Telegram API Limits
- **Messages:** 30 messages/second
- **Same user:** 1 message/second
- **Webhook payload:** 10MB max

### Optimization Tips
- ✅ Use webhook (not polling)
- ✅ Implement caching untuk RSS feeds
- ✅ Optimize JSON file sizes
- ✅ Monitor function execution times
- ✅ Use async/await properly

## 🔄 Update & Maintenance

### Update Bot
```bash
# Pull latest changes
git pull origin main

# Push to trigger Netlify deploy
git push origin main
```

### Monitor Logs
```bash
# View function logs
netlify logs:function webhook

# Real-time logs
netlify logs:function webhook --stream
```

### Local Development
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run functions locally
netlify dev

# Test locally at http://localhost:8888
```

## 🌐 Support & Kontribusi

### Support
- **Email:** muhammadsobrimaulana31@gmail.com
- **GitHub Issues:** [Create Issue](https://github.com/sobri3195/cyber-security-telegram-bot/issues)
- **Telegram:** @winlincommunity_bot

### Donasi
Support pengembangan bot ini:
- **Link Donasi:** [https://lynk.id/muhsobrimaulana](https://lynk.id/muhsobrimaulana)

### Kontribusi
1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📊 Statistik

- **20+ Fitur** cyber security
- **30+ Istilah** dalam kamus
- **Serverless** architecture (Netlify Functions)
- **Real-time** RSS news
- **Multi-language** support (Indonesia)
- **Auto-reply** untuk pertanyaan umum

## 🔄 Changelog

### v2.0.0 - Netlify Migration
- ✅ Migrasi dari Vercel ke Netlify
- ✅ Refactor functions untuk Netlify serverless
- ✅ Update deployment documentation
- ✅ Improve error handling
- ✅ Add health check endpoint

### v1.0.0 - Initial Release
- ✅ 20+ fitur cyber security
- ✅ Webhook-based bot
- ✅ Auto-reply system
- ✅ User management
- ✅ RSS news integration

## 📄 License

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

- **Telegram Bot API** untuk platform bot
- **Netlify** untuk hosting serverless
- **The Hacker News** untuk RSS feed
- **Cyber Security Community** untuk inspirasi
- **Node.js Community** untuk tools dan libraries

## 📚 Resources

### Documentation
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Learning Materials
- [Cyber Security Basics](https://www.coursera.org/learn/cyber-security-basics)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Best Practices](https://cheatsheetseries.owasp.org/)

---

**🔐 Tetap aman di dunia digital!**

*Dikembangkan dengan ❤️ oleh Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE*

**Platform:** Netlify Serverless Functions  
**Status:** 🟢 Active & Ready  
**Last Updated:** October 2024
