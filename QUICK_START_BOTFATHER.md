# 🚀 Quick Start: Hubungkan Bot dengan BotFather

Panduan singkat untuk menghubungkan bot Telegram Anda dengan BotFather dalam 5 menit!

---

## 📝 Prerequisites

Sebelum memulai, pastikan Anda sudah:
- [x] Memiliki akun Telegram
- [x] Menginstall Telegram di smartphone atau desktop
- [x] Siap untuk membuat bot

---

## ⚡ 5 Langkah Cepat

### 1️⃣ Buat Bot di BotFather (2 menit)

**Buka BotFather:**
```
1. Buka Telegram
2. Cari: @BotFather
3. Tekan START
```

**Buat Bot Baru:**
```
4. Kirim: /newbot
5. Masukkan nama bot: Winlin Community Security Bot
6. Masukkan username: winlincommunity_bot
7. SIMPAN TOKEN yang diberikan!
```

📋 **Token Example:** `8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs`

---

### 2️⃣ Set Commands Menu (1 menit)

**Di BotFather, kirim:**
```
/setcommands
```

**Copy-paste commands ini:**
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

---

### 3️⃣ Set Description (1 menit)

**Kirim di BotFather:**
```
/setdescription
```

**Copy-paste deskripsi ini:**
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

**Kemudian kirim:**
```
/setabouttext
```

**Copy-paste:**
```
🔐 Bot edukasi & tools cyber security
Tips keamanan, analisis phishing, cek password & lebih banyak lagi!
```

---

### 4️⃣ Configure Bot Settings (30 detik)

**Disable Privacy Mode (agar bisa di grup):**
```
/setprivacy
```
Pilih bot Anda → Pilih **Disable**

**Allow Bot in Groups:**
```
/setjoingroups
```
Pilih bot Anda → Pilih **Enable**

---

### 5️⃣ Setup Environment & Deploy (1 menit)

**Buat file `.env`:**
```bash
BOT_TOKEN=YOUR_BOT_TOKEN_HERE
WEBHOOK_URL=https://your-netlify-site.netlify.app
NODE_ENV=production
```

**Deploy ke Netlify:**
```bash
# Install dependencies
npm install

# Deploy
netlify deploy --prod

# Set environment variables di Netlify Dashboard:
# 1. Site Settings → Environment Variables
# 2. Add BOT_TOKEN dan WEBHOOK_URL
# 3. Save dan redeploy
```

**Setup Webhook:**
```
Akses: https://your-netlify-site.netlify.app/api/setup-webhook
```

---

## ✅ Verifikasi Setup

### Test Commands
1. Buka bot: `t.me/winlincommunity_bot`
2. Kirim: `/start`
3. Coba commands lain:
   ```
   /help
   /tips
   /checkpass MyPassword123!
   /news
   ```

### Check Webhook Status
```bash
curl https://your-netlify-site.netlify.app/api/health
```

Response sukses:
```json
{
  "status": "ok",
  "timestamp": "2024-11-02T...",
  "service": "Cyber Security Telegram Bot",
  "platform": "Netlify"
}
```

---

## 🎯 Checklist Selesai!

- [ ] Bot dibuat di BotFather ✅
- [ ] Token disimpan dengan aman ✅
- [ ] Commands menu dikonfigurasi ✅
- [ ] Description & about text di-set ✅
- [ ] Privacy mode disabled ✅
- [ ] Environment variables di-set ✅
- [ ] Aplikasi di-deploy ✅
- [ ] Webhook di-setup ✅
- [ ] Bot ditest dan berfungsi ✅

---

## 📚 Dokumentasi Lengkap

Untuk panduan detail, lihat:
- 📖 **[BOTFATHER_SETUP.md](BOTFATHER_SETUP.md)** - Panduan lengkap BotFather
- 🚀 **[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)** - Panduan deployment
- 📘 **[README.md](README.md)** - Dokumentasi utama
- ⚙️ **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Setup environment

---

## 🆘 Butuh Bantuan?

### Masalah Umum

**Bot tidak merespon?**
```
1. Cek token benar di environment variables
2. Pastikan webhook sudah di-set
3. Verify deployment sukses
4. Test endpoint /api/health
```

**Commands tidak muncul?**
```
1. Pastikan sudah run /setcommands
2. Restart Telegram app
3. Clear cache
```

**Webhook error?**
```
1. Pastikan URL menggunakan HTTPS
2. Verify SSL certificate valid
3. Cek Netlify function logs
```

### Kontak Developer
- **Email:** muhammadsobrimaulana31@gmail.com
- **GitHub:** [github.com/sobri3195](https://github.com/sobri3195)
- **Telegram:** [@winlincommunity_bot](https://t.me/winlincommunity_bot)

---

## 🎉 Selamat!

Bot Anda sekarang sudah terhubung dengan BotFather dan siap digunakan!

### Next Steps:
1. 🎨 Upload profile picture bot
2. 📢 Share bot ke komunitas
3. 📊 Monitor logs dan usage
4. 🔧 Customize fitur sesuai kebutuhan
5. 💡 Tambah fitur baru

### Customize Bot:
- Edit commands di `/netlify/functions/webhook.js`
- Tambah data di folder `/data`
- Update utilities di folder `/utils`
- Modify React frontend di folder `/src`

---

**🔐 Tetap aman di dunia digital!**

*Dikembangkan dengan ❤️ untuk komunitas cyber security Indonesia*

**Status:** 🟢 Ready to Use  
**Platform:** Netlify Serverless  
**Last Updated:** November 2024
