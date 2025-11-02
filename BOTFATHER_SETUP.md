# 🤖 Panduan Lengkap Menghubungkan Bot dengan BotFather

## 📋 Daftar Isi
1. [Membuat Bot Baru di BotFather](#1-membuat-bot-baru-di-botfather)
2. [Mengonfigurasi Bot](#2-mengonfigurasi-bot)
3. [Mengatur Commands Menu](#3-mengatur-commands-menu)
4. [Mengatur Bot Description](#4-mengatur-bot-description)
5. [Mengatur Bot Picture](#5-mengatur-bot-picture)
6. [Testing dan Verifikasi](#6-testing-dan-verifikasi)

---

## 1. Membuat Bot Baru di BotFather

### Langkah 1.1: Buka BotFather di Telegram
1. Buka aplikasi Telegram
2. Cari **@BotFather** atau klik: [t.me/BotFather](https://t.me/BotFather)
3. Tekan tombol **START**

### Langkah 1.2: Buat Bot Baru
1. Kirim perintah `/newbot` ke BotFather
2. BotFather akan meminta nama untuk bot Anda
   - Contoh: **Winlin Community Security Bot**
3. BotFather akan meminta username untuk bot (harus diakhiri dengan 'bot')
   - Contoh: **winlincommunity_bot**

### Langkah 1.3: Simpan Token Bot
Setelah berhasil, BotFather akan memberikan:
- **Bot Token**: Token API untuk mengontrol bot (contoh: `8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs`)
- **Bot Link**: Link untuk akses bot (contoh: `t.me/winlincommunity_bot`)

> ⚠️ **PENTING:** Simpan token ini dengan aman! Jangan share ke orang lain.

---

## 2. Mengonfigurasi Bot

### Langkah 2.1: Set Bot Description
Deskripsi singkat yang muncul di profile bot.

```
/setdescription
```

Kemudian kirim teks berikut:
```
Bot edukasi dan tools cyber security untuk komunitas Winlin. 
Dapatkan tips keamanan, analisis phishing, cek password, berita keamanan terbaru, dan banyak lagi! 

Dikembangkan oleh Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE
```

### Langkah 2.2: Set About Text
Teks singkat yang muncul di info bot.

```
/setabouttext
```

Kemudian kirim:
```
🔐 Cyber Security Education & Tools Bot
Edukasi keamanan siber untuk semua tingkatan
```

### Langkah 2.3: Enable Inline Mode (Opsional)
```
/setinline
```
Pilih bot Anda, lalu kirim placeholder:
```
Cari tools atau info cyber security...
```

### Langkah 2.4: Disable Privacy Mode (untuk grup)
Agar bot bisa membaca semua pesan di grup:
```
/setprivacy
```
Pilih bot Anda, lalu pilih **Disable**

---

## 3. Mengatur Commands Menu

### Langkah 3.1: Set Commands
```
/setcommands
```

Pilih bot Anda, kemudian copy-paste seluruh daftar commands berikut:

```
start - Mulai bot dan lihat menu utama
help - Daftar semua perintah yang tersedia
basic - Penjelasan dasar cyber security
tips - Tips keamanan siber harian acak
glossary - Kamus istilah cyber security
quiz - Kuis cyber security interaktif
events - Event dan konferensi keamanan terbaru
phishing - Analisis link mencurigakan (contoh: /phishing https://example.com)
checkpass - Cek kekuatan password (contoh: /checkpass MyPass123!)
encrypt - Enkripsi teks ke Base64 (contoh: /encrypt Hello)
decrypt - Dekripsi teks dari Base64 (contoh: /decrypt SGVsbG8=)
news - Berita cyber security terbaru
tools - Daftar tools keamanan yang direkomendasikan
business - Tips keamanan untuk bisnis dan enterprise
report - Cara lapor insiden siber di Indonesia
checklist - Checklist keamanan untuk review berkala
simulate - Simulasi serangan phishing untuk edukasi
```

Perintah ini akan muncul sebagai menu commands saat user menekan "/" di chat.

---

## 4. Mengatur Bot Description

### Langkah 4.1: Set Description (Detail)
```
/setdescription
```

Kirim teks lengkap berikut:
```
🔐 Cyber Security Telegram Bot

Bot edukasi dan tools cyber security yang menyediakan 20+ fitur untuk melindungi diri Anda di dunia digital:

✨ FITUR UTAMA:
• Tips keamanan harian
• Analisis link phishing
• Password strength checker
• Enkripsi/Dekripsi teks
• Berita keamanan terbaru
• Kamus istilah cyber security
• Kuis interaktif
• Event & konferensi
• Tools rekomendasi
• Checklist keamanan
• Simulasi phishing

📚 Edukasi untuk semua tingkatan - dari pemula hingga professional.

🛡️ Dikembangkan oleh:
Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE

GitHub: github.com/sobri3195
Email: muhammadsobrimaulana31@gmail.com

Gunakan /start untuk memulai!
```

### Langkah 4.2: Set Short Description
```
/setabouttext
```

Kirim:
```
🔐 Bot edukasi & tools cyber security
Tips keamanan, analisis phishing, cek password, berita terbaru & lebih banyak lagi!
```

---

## 5. Mengatur Bot Picture

### Langkah 5.1: Upload Bot Profile Picture
```
/setuserpic
```

Pilih bot Anda, kemudian upload gambar:
- Format: JPG atau PNG
- Ukuran: 512x512 pixels (minimal)
- Rekomendasi: Logo cyber security atau shield dengan tema keamanan

### Langkah 5.2: Set Bot Sticker (Opsional)
```
/setusersticker
```

Upload sticker untuk bot (format .webp atau pilih dari sticker pack)

---

## 6. Testing dan Verifikasi

### Langkah 6.1: Cek Konfigurasi Bot
```
/mybots
```

Pilih bot Anda, lalu pilih **Bot Settings** untuk review semua konfigurasi.

### Langkah 6.2: Test Bot Commands
1. Buka bot Anda di Telegram: `t.me/winlincommunity_bot`
2. Tekan **/start**
3. Coba tekan "/" untuk melihat menu commands
4. Test beberapa commands:
   - `/help` - Lihat daftar perintah
   - `/basic` - Baca penjelasan dasar
   - `/tips` - Dapatkan tips acak
   - `/checkpass Test123!` - Cek password
   - `/news` - Lihat berita terbaru

### Langkah 6.3: Verifikasi Webhook
Setelah deploy aplikasi, akses URL berikut untuk setup webhook:
```
https://your-netlify-site.netlify.app/api/setup-webhook
```

Response sukses:
```json
{
  "status": "success",
  "message": "Webhook set successfully",
  "webhook_url": "https://your-netlify-site.netlify.app/api/webhook"
}
```

### Langkah 6.4: Test Bot Response
1. Kirim beberapa pesan ke bot
2. Cek apakah bot merespon dengan benar
3. Test fitur auto-reply dengan bertanya:
   - "apa itu malware?"
   - "bagaimana cara aman?"
   - "tips password?"

---

## 📊 Checklist Setup Lengkap

Pastikan semua langkah berikut sudah selesai:

- [ ] Bot dibuat di BotFather
- [ ] Token disimpan dengan aman
- [ ] Bot description di-set
- [ ] About text di-set
- [ ] Commands menu dikonfigurasi (16 commands)
- [ ] Bot profile picture di-upload
- [ ] Privacy mode disabled (untuk grup)
- [ ] Environment variables di-set (BOT_TOKEN, WEBHOOK_URL)
- [ ] Aplikasi di-deploy ke Netlify
- [ ] Webhook di-setup dan verified
- [ ] Bot ditest dan merespon commands
- [ ] Auto-reply berfungsi
- [ ] Welcome message berfungsi (di grup)

---

## 🔧 Commands BotFather yang Berguna

### Informasi Bot
- `/mybots` - Lihat semua bot Anda
- `/token` - Regenerate token (HATI-HATI!)
- `/revoke` - Revoke bot token

### Konfigurasi
- `/setname` - Ubah nama bot
- `/setdescription` - Ubah deskripsi panjang
- `/setabouttext` - Ubah deskripsi pendek
- `/setuserpic` - Upload foto profil
- `/setcommands` - Set menu commands
- `/deletebot` - Hapus bot (PERMANEN!)

### Group Settings
- `/setjoingroups` - Izinkan/larang bot ditambah ke grup
- `/setprivacy` - Enable/disable privacy mode di grup

### Advanced
- `/setinline` - Enable inline mode
- `/setinlinefeedback` - Set inline feedback
- `/setdomain` - Set domain untuk login widget

---

## 🚨 Troubleshooting

### Bot Tidak Merespon
1. ✅ Cek token benar di environment variables
2. ✅ Pastikan webhook sudah di-set
3. ✅ Verify aplikasi sudah di-deploy
4. ✅ Cek logs di Netlify dashboard

### Commands Tidak Muncul
1. Pastikan sudah run `/setcommands` di BotFather
2. Restart aplikasi Telegram
3. Try clear cache Telegram

### Webhook Error
1. ✅ Pastikan WEBHOOK_URL menggunakan HTTPS
2. ✅ Verify SSL certificate valid
3. ✅ Test dengan `/api/health` endpoint
4. ✅ Cek Netlify function logs

### Privacy Mode Issues
- Jika bot tidak bisa baca pesan di grup, disable privacy mode dengan `/setprivacy`

---

## 📞 Support & Bantuan

### Kontak Developer
- **Email:** muhammadsobrimaulana31@gmail.com
- **GitHub:** [github.com/sobri3195](https://github.com/sobri3195)
- **Telegram Bot:** [@winlincommunity_bot](https://t.me/winlincommunity_bot)
- **Donasi:** [https://lynk.id/muhsobrimaulana](https://lynk.id/muhsobrimaulana)

### Resources
- **BotFather Official:** [core.telegram.org/bots](https://core.telegram.org/bots)
- **Bot API Docs:** [core.telegram.org/bots/api](https://core.telegram.org/bots/api)
- **Bot Features:** [core.telegram.org/bots/features](https://core.telegram.org/bots/features)

---

## 🎯 Tips Best Practices

1. **Keamanan Token:**
   - Jangan share token bot ke siapapun
   - Gunakan environment variables
   - Jangan commit token ke Git
   - Regenerate token jika terkompromis

2. **Deskripsi Bot:**
   - Buat deskripsi yang jelas dan informatif
   - Sertakan informasi developer
   - Jelaskan fitur utama
   - Tambahkan call-to-action

3. **Commands Menu:**
   - Maksimal 100 commands
   - Gunakan nama commands yang jelas
   - Tambahkan deskripsi singkat untuk setiap command
   - Urutkan berdasarkan frekuensi penggunaan

4. **Profile Picture:**
   - Gunakan logo yang profesional
   - Ukuran minimal 512x512 pixels
   - Format PNG dengan background transparan
   - Hindari terlalu banyak detail

5. **Testing:**
   - Test semua commands sebelum launch
   - Test di berbagai device (mobile, desktop)
   - Test di private chat dan grup
   - Test dengan berbagai input

---

**🔐 Selamat! Bot Anda sudah terhubung dengan BotFather!**

*Dikembangkan dengan ❤️ untuk komunitas cyber security Indonesia*

**Last Updated:** November 2024
