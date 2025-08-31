# 🔐 Cyber Security Telegram Bot

Bot Telegram berbasis webhook untuk edukasi dan tools cyber security yang di-host di Vercel (serverless).

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

- **Backend:** Node.js + Express
- **Hosting:** Vercel (serverless)
- **Database:** File JSON lokal (tanpa database eksternal)
- **API:** Telegram Bot API dengan webhook
- **RSS:** Fetch RSS dari The Hacker News
- **Architecture:** Serverless functions

## 📁 Struktur File

```
├── api/
│   └── webhook.js          # Main bot logic (webhook handler)
├── utils/
│   ├── dataManager.js      # User & data management
│   ├── security.js         # Security utilities (password, phishing)
│   └── news.js            # RSS news service
├── data/
│   ├── glossary.json      # Cyber security terms dictionary
│   ├── events.json        # Security events & conferences
│   └── users.json         # User database
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies
└── README.md              # This file
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
Buat file `.env` atau set di Vercel:
```env
BOT_TOKEN=8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs
WEBHOOK_URL=https://your-app.vercel.app
```

**Bot Information:**
- **Bot Username:** @winlincommunity_bot
- **Bot URL:** t.me/winlincommunity_bot
- **Token:** 8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs

### 4. Deploy ke Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 5. Setup Webhook
Setelah deploy, akses:
```
https://your-app.vercel.app/api/setup-webhook
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

## 🌐 Support & Kontribusi

### Support
- **Email:** muhammadsobrimaulana31@gmail.com
- **GitHub Issues:** [Create Issue](https://github.com/sobri3195/cyber-security-telegram-bot/issues)

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
- **Serverless** architecture
- **Real-time** RSS news
- **Multi-language** support (Indonesia)

## 🔄 Update & Maintenance

Bot ini akan terus diupdate dengan:
- Fitur keamanan terbaru
- Istilah cyber security baru
- Tools keamanan terkini
- Event dan konferensi terbaru

## 📄 License

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

- **Telegram Bot API** untuk platform bot
- **Vercel** untuk hosting serverless
- **The Hacker News** untuk RSS feed
- **Cyber Security Community** untuk inspirasi

---

**🔐 Tetap aman di dunia digital!**

*Dikembangkan dengan ❤️ oleh Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE*
