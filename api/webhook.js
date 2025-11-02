const express = require('express');
const fetch = require('node-fetch');
const DataManager = require('../utils/dataManager');
const SecurityUtils = require('../utils/security');
const NewsService = require('../utils/news');

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const dataManager = new DataManager();
const securityUtils = new SecurityUtils();
const newsService = new NewsService();

// Daily security tips
const dailyTips = [
  "🔒 Selalu gunakan password yang kuat dan unik untuk setiap akun",
  "📱 Aktifkan autentikasi dua faktor (2FA) di semua akun penting",
  "🔄 Update software dan aplikasi secara rutin untuk patch keamanan",
  "📧 Jangan klik link mencurigakan dalam email atau pesan",
  "💾 Backup data penting secara berkala"
];

// Telegram Bot API functions
async function sendMessage(chatId, text, parseMode = 'Markdown') {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode,
        disable_web_page_preview: true
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}

// Command handlers
async function handleStart(chatId, user) {
  const welcomeMessage = `🔐 *SELAMAT DATANG DI CYBER SECURITY BOT!* 🔐

Halo ${user.first_name || 'User'}! 👋

Bot ini akan membantu Anda belajar tentang keamanan siber.

📋 **Fitur Utama:**
• /start - Menu utama
• /help - Daftar perintah
• /basic - Dasar cyber security
• /tips - Tips keamanan harian
• /phishing [url] - Deteksi link mencurigakan
• /checkpass [password] - Cek kekuatan password
• /encrypt & /decrypt - Enkripsi Base64
• /news - Berita cyber security terbaru
• /tools - Daftar tools keamanan
• /glossary [istilah] - Kamus cyber security
• /simulate phishing - Simulasi edukasi
• /business - Tips keamanan bisnis
• /report - Cara lapor insiden siber
• /checklist - Checklist keamanan
• /quiz - Kuis cyber security
• /events - Event keamanan

🆕 **Fitur Baru:**
• /incident - Panduan incident response
• /vpn - Panduan VPN dan privasi
• /backup - Strategi backup data
• /firewall - Konfigurasi firewall
• /vulnerability - Manajemen kerentanan
• /training - Security awareness training
• /compliance - Standard compliance (ISO, GDPR)
• /threat - Threat landscape terkini
• /forensics - Digital forensics basics
• /iot - Keamanan IoT devices

🔒 *Tetap aman di dunia digital!*

---
*Bot dikembangkan oleh Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE*
*Support: muhammadsobrimaulana31@gmail.com*
*Donasi: https://lynk.id/muhsobrimaulana*`;

  await dataManager.addUser(chatId, user.username, user.first_name, user.last_name);
  await sendMessage(chatId, welcomeMessage);
}

async function handleHelp(chatId) {
  const helpMessage = `📚 *DAFTAR PERINTAH LENGKAP*

🔐 **Perintah Dasar:**
/start - Menu utama dan sambutan
/help - Tampilkan daftar perintah ini

📖 **Edukasi:**
/basic - Penjelasan dasar cyber security
/tips - Tips keamanan harian acak
/glossary [istilah] - Cari istilah cyber security
/quiz - Kuis cyber security

🛡️ **Tools Keamanan:**
/phishing [url] - Deteksi link mencurigakan
/checkpass [password] - Cek kekuatan password
/encrypt [teks] - Enkripsi teks ke Base64
/decrypt [teks] - Dekripsi teks dari Base64

📰 **Informasi:**
/news - Berita cyber security terbaru
/tools - Daftar tools keamanan
/events - Event cyber security
/business - Tips keamanan untuk bisnis
/report - Cara lapor insiden siber
/checklist - Checklist keamanan lengkap

🎭 **Simulasi:**
/simulate phishing - Simulasi serangan phishing

🆕 **Fitur Advanced:**
• /incident - Panduan incident response
• /vpn - Panduan VPN dan privasi online
• /backup - Strategi backup data (3-2-1)
• /firewall - Konfigurasi dan best practices firewall
• /vulnerability - Vulnerability management
• /compliance - Standard compliance (ISO 27001, GDPR, PCI DSS)
• /forensics - Digital forensics basics
• /iot - Keamanan IoT devices
• /training - Security awareness training

💬 **Auto-reply:** Bot akan otomatis menjawab pertanyaan umum tentang cyber security.`;

  await sendMessage(chatId, helpMessage);
}

async function handleBasic(chatId) {
  const basicMessage = `🔐 *DASAR CYBER SECURITY*

Cyber Security adalah praktik melindungi sistem, jaringan, dan data dari serangan digital.

**🎯 Tujuan Utama:**
• **Confidentiality** - Kerahasiaan data
• **Integrity** - Keutuhan dan akurasi data
• **Availability** - Ketersediaan layanan

**🛡️ Ancaman Umum:**
• **Malware** - Software berbahaya
• **Phishing** - Penipuan online
• **Ransomware** - Enkripsi data untuk tebusan
• **DDoS** - Serangan denial of service
• **Social Engineering** - Manipulasi psikologis

**🔒 Praktik Keamanan Dasar:**
• Gunakan password kuat dan unik
• Aktifkan autentikasi dua faktor (2FA)
• Update software secara rutin
• Backup data penting
• Waspadai link mencurigakan

💡 *Keamanan siber adalah tanggung jawab bersama.*`;

  await sendMessage(chatId, basicMessage);
}

async function handleTips(chatId) {
  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
  const tipMessage = `💡 *TIPS KEAMANAN HARIAN*

${randomTip}

🔒 *Ingat: Keamanan siber dimulai dari kebiasaan sehari-hari!*

Gunakan /tips lagi untuk tips lainnya.`;

  await sendMessage(chatId, tipMessage);
}

async function handlePhishing(chatId, url) {
  if (!url) {
    await sendMessage(chatId, "❌ *Format salah!*\n\nGunakan: `/phishing [url]`\n\nContoh: `/phishing https://example.com`");
    return;
  }

  const analysis = securityUtils.detectPhishing(url);
  
  let message = `🔍 *ANALISIS PHISHING*\n\n`;
  message += `**URL:** \`${url}\`\n`;
  message += `**Level Risiko:** ${analysis.riskLevel}\n`;
  message += `**Skor Risiko:** ${analysis.riskScore}/10\n\n`;
  
  if (analysis.warnings.length > 0) {
    message += `**⚠️ Peringatan:**\n`;
    analysis.warnings.forEach(warning => {
      message += `• ${warning}\n`;
    });
    message += `\n`;
  }
  
  message += `**💡 Rekomendasi:** ${analysis.recommendation}\n\n`;
  message += `🔒 *Selalu waspada dengan link yang mencurigakan!*`;

  await sendMessage(chatId, message);
}

async function handleCheckPassword(chatId, password) {
  if (!password) {
    await sendMessage(chatId, "❌ *Format salah!*\n\nGunakan: `/checkpass [password]`\n\nContoh: `/checkpass MyPassword123!`");
    return;
  }

  const analysis = securityUtils.checkPasswordStrength(password);
  
  let message = `🔐 *ANALISIS KEKUATAN PASSWORD*\n\n`;
  message += `**Password:** \`${'*'.repeat(password.length)}\`\n`;
  message += `**Panjang:** ${analysis.length} karakter\n`;
  message += `**Kekuatan:** ${analysis.strength}\n`;
  message += `**Skor:** ${analysis.score}/10\n\n`;
  
  message += `**✅ Kriteria:**\n`;
  message += `• Huruf kecil: ${analysis.hasLowercase ? '✅' : '❌'}\n`;
  message += `• Huruf besar: ${analysis.hasUppercase ? '✅' : '❌'}\n`;
  message += `• Angka: ${analysis.hasNumbers ? '✅' : '❌'}\n`;
  message += `• Karakter khusus: ${analysis.hasSpecialChars ? '✅' : '❌'}\n\n`;
  
  if (analysis.feedback.length > 0) {
    message += `**💡 Saran:**\n`;
    analysis.feedback.forEach(feedback => {
      message += `• ${feedback}\n`;
    });
    message += `\n`;
  }
  
  message += `🔒 *Password yang kuat adalah pertahanan pertama melawan serangan siber!*`;

  await sendMessage(chatId, message);
}

async function handleEncrypt(chatId, text) {
  if (!text) {
    await sendMessage(chatId, "❌ *Format salah!*\n\nGunakan: `/encrypt [teks]`\n\nContoh: `/encrypt Hello World`");
    return;
  }

  const encoded = securityUtils.encodeBase64(text);
  const message = `🔐 *ENKRIPSI BASE64*\n\n**Teks Asli:** \`${text}\`\n**Teks Terenkripsi:** \`${encoded}\`\n\n💡 *Gunakan /decrypt untuk membalikkan proses.*`;

  await sendMessage(chatId, message);
}

async function handleDecrypt(chatId, text) {
  if (!text) {
    await sendMessage(chatId, "❌ *Format salah!*\n\nGunakan: `/decrypt [teks]`\n\nContoh: `/decrypt SGVsbG8gV29ybGQ=`");
    return;
  }

  const decoded = securityUtils.decodeBase64(text);
  const message = `🔓 *DEKRIPSI BASE64*\n\n**Teks Terenkripsi:** \`${text}\`\n**Teks Asli:** \`${decoded}\`\n\n💡 *Gunakan /encrypt untuk mengenkripsi teks.*`;

  await sendMessage(chatId, message);
}

async function handleNews(chatId) {
  try {
    await sendMessage(chatId, "📰 *Mengambil berita terbaru...*");
    
    const newsItems = await newsService.getLatestNews(3);
    const message = newsService.formatNewsMessage(newsItems);
    
    await sendMessage(chatId, message);
  } catch (error) {
    console.error('Error handling news:', error);
    await sendMessage(chatId, "❌ Maaf, tidak dapat mengambil berita saat ini. Silakan coba lagi nanti.");
  }
}

async function handleTools(chatId) {
  const securityTools = [
    "🔒 **Password Managers:** 1Password, LastPass, Bitwarden",
    "🛡️ **Antivirus:** Windows Defender, Avast, Malwarebytes",
    "🔐 **2FA Apps:** Google Authenticator, Authy, Microsoft Authenticator",
    "🌐 **VPN Services:** NordVPN, ExpressVPN, ProtonVPN",
    "🔍 **Password Checkers:** HaveIBeenPwned, Password Strength Testers"
  ];

  const toolsMessage = `🛠️ *TOOLS KEAMANAN CYBER SECURITY*\n\n${securityTools.join('\n')}\n\n💡 *Pilih tools yang sesuai dengan kebutuhan keamanan Anda!*`;

  await sendMessage(chatId, toolsMessage);
}

async function handleGlossary(chatId, term) {
  if (!term) {
    await sendMessage(chatId, "❌ *Format salah!*\n\nGunakan: `/glossary [istilah]`\n\nContoh: `/glossary malware`");
    return;
  }

  const result = await dataManager.searchGlossary(term);
  
  if (!result) {
    await sendMessage(chatId, `❌ *Istilah tidak ditemukan*\n\nTidak ada definisi untuk "${term}" dalam kamus cyber security.\n\n💡 Coba cari istilah lain atau gunakan /help untuk melihat fitur lainnya.`);
    return;
  }

  let message = `📚 *KAMUS CYBER SECURITY*\n\n`;
  message += `**Istilah:** ${result.term}\n`;
  message += `**Tipe Pencarian:** ${result.matchType === 'exact' ? 'Pencocokan Sempurna' : 'Pencocokan Parsial'}\n\n`;
  message += `**Definisi:**\n${result.definition}\n\n`;
  
  if (result.suggestions) {
    message += `**💡 Saran Istilah Terkait:**\n`;
    result.suggestions.forEach(suggestion => {
      message += `• ${suggestion}\n`;
    });
    message += `\n`;
  }
  
  message += `🔍 *Gunakan /glossary [istilah] untuk mencari istilah lainnya.*`;

  await sendMessage(chatId, message);
}

async function handleSimulatePhishing(chatId) {
  const simulationMessage = `🎭 *SIMULASI PHISHING - EDUKASI*\n\n`;
  simulationMessage += `**📧 Email Phishing Palsu:**\n`;
  simulationMessage += `Dari: security@bank-indonesia.com\n`;
  simulationMessage += `Subjek: URGENT: Akun Anda Terkunci\n\n`;
  simulationMessage += `**Isi Email:**\n`;
  simulationMessage += `Halo nasabah yang terhormat,\n\n`;
  simulationMessage += `Kami mendeteksi aktivitas mencurigakan pada akun Anda.\n`;
  simulationMessage += `Akun Anda telah dikunci untuk keamanan.\n\n`;
  simulationMessage += `Untuk membuka kunci, klik link berikut:\n`;
  simulationMessage += `🔗 http://bit.ly/bank-indonesia-secure\n\n`;
  simulationMessage += `**⚠️ INI ADALAH SIMULASI!**\n\n`;
  simulationMessage += `**🔍 Tanda-tanda Phishing:**\n`;
  simulationMessage += `• Sender address mencurigakan\n`;
  simulationMessage += `• Pesan mendesak/urgent\n`;
  simulationMessage += `• Link URL shortener (bit.ly)\n`;
  simulationMessage += `• Meminta aksi segera\n`;
  simulationMessage += `• Grammar/typo yang mencurigakan\n\n`;
  simulationMessage += `**💡 Yang Harus Dilakukan:**\n`;
  simulationMessage += `• Jangan klik link\n`;
  simulationMessage += `• Hapus email\n`;
  simulationMessage += `• Laporkan ke tim IT\n`;
  simulationMessage += `• Verifikasi melalui saluran resmi\n\n`;
  simulationMessage += `🔒 *Latihan ini membantu Anda mengenali serangan phishing yang nyata!*`;

  await sendMessage(chatId, simulationMessage);
}

async function handleBusiness(chatId) {
  const businessTips = [
    "🏢 **Employee Training:** Latih karyawan tentang keamanan siber secara berkala",
    "🔐 **Access Control:** Terapkan prinsip least privilege untuk akses sistem",
    "💾 **Data Backup:** Backup data penting dengan 3-2-1 strategy",
    "🛡️ **Network Security:** Gunakan firewall, VPN, dan segmentasi jaringan",
    "📱 **Mobile Security:** Terapkan kebijakan BYOD dan mobile device management"
  ];

  const businessMessage = `🏢 *TIPS KEAMANAN SIBER UNTUK BISNIS*\n\n${businessTips.join('\n')}\n\n💼 *Keamanan siber adalah investasi, bukan biaya. Lindungi bisnis Anda dari ancaman digital!*`;

  await sendMessage(chatId, businessMessage);
}

async function handleReport(chatId) {
  const message = `🚨 *CARA LAPOR INSIDEN SIBER DI INDONESIA*

**📞 Saluran Pelaporan:**
• **ID-CERT (BSSN):** 021-384-0909
• **Email:** id-cert@bssn.go.id
• **Website:** https://id-cert.go.id
• **Hotline:** 021-384-0909

**📋 Langkah-langkah Pelaporan:**
1. **Dokumentasikan insiden** - Catat waktu, jenis serangan, dan dampak
2. **Isolasi sistem** - Putuskan koneksi internet dan jaringan
3. **Backup bukti** - Simpan log, screenshot, dan file terkait
4. **Hubungi ID-CERT** - Laporkan melalui saluran resmi
5. **Ikuti instruksi** - Patuhi panduan dari tim CERT

**🚨 Jenis Insiden yang Harus Dilaporkan:**
• Serangan Ransomware
• Data Breach
• DDoS Attack
• Phishing Campaign
• Malware Infection

🔒 *Laporan Anda membantu melindungi komunitas digital Indonesia!*`;

  await sendMessage(chatId, message);
}

async function handleChecklist(chatId) {
  const securityChecklist = [
    "✅ **Password & Authentication**",
    "  • Password minimal 8 karakter",
    "  • Kombinasi huruf besar, kecil, angka, simbol",
    "  • Aktifkan 2FA di semua akun penting",
    "  • Gunakan password manager",
    "",
    "✅ **Device Security**",
    "  • Lock screen dengan PIN/biometric",
    "  • Update software secara rutin",
    "  • Install antivirus terbaru",
    "  • Backup data penting"
  ];

  const checklistMessage = `✅ *CHECKLIST KEAMANAN SIBER LENGKAP*\n\n${securityChecklist.join('\n')}\n\n🔒 *Review checklist ini secara berkala untuk memastikan keamanan digital Anda tetap terjaga!*`;

  await sendMessage(chatId, checklistMessage);
}

async function handleQuiz(chatId) {
  const quizQuestions = [
    {
      question: "Apa yang harus dilakukan jika menerima email mencurigakan?",
      options: ["Klik link dalam email", "Balas email tersebut", "Hapus email tanpa dibuka", "Forward ke teman"],
      correct: 2,
      explanation: "Email mencurigakan sebaiknya dihapus tanpa dibuka untuk menghindari malware atau phishing."
    }
  ];

  const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  
  let message = `🧠 *KUIS CYBER SECURITY*\n\n`;
  message += `**Pertanyaan:**\n${randomQuestion.question}\n\n`;
  message += `**Pilihan Jawaban:**\n`;
  
  randomQuestion.options.forEach((option, index) => {
    message += `${index + 1}. ${option}\n`;
  });
  
  message += `\n**💡 Jawaban Benar:** ${randomQuestion.correct}\n`;
  message += `**📚 Penjelasan:** ${randomQuestion.explanation}\n\n`;
  message += `🔒 *Latih pengetahuan cyber security Anda dengan kuis ini!*`;

  await sendMessage(chatId, message);
}

async function handleEvents(chatId) {
  try {
    const events = await dataManager.getEvents();
    
    if (events.length === 0) {
      await sendMessage(chatId, "❌ Tidak dapat memuat informasi event saat ini.");
      return;
    }

    let message = `📅 *EVENT CYBER SECURITY TERDEKAT*\n\n`;
    
    events.slice(0, 5).forEach((event, index) => {
      message += `**${index + 1}. ${event.name}**\n`;
      message += `📅 ${event.date}\n`;
      message += `📍 ${event.location}\n`;
      message += `📝 ${event.description}\n`;
      message += `🌐 [Website](${event.website})\n\n`;
    });
    
    message += `🔒 *Ikuti event-event ini untuk meningkatkan pengetahuan cyber security Anda!*`;

    await sendMessage(chatId, message);
  } catch (error) {
    console.error('Error handling events:', error);
    await sendMessage(chatId, "❌ Maaf, tidak dapat memuat informasi event saat ini.");
  }
}

async function handleIncident(chatId) {
  const message = `🚨 *PANDUAN INCIDENT RESPONSE*

**📋 Tahapan Incident Response:**

**1️⃣ Persiapan (Preparation)**
• Buat tim incident response
• Siapkan tools dan prosedur
• Dokumentasikan contact person
• Latihan rutin incident handling

**2️⃣ Identifikasi (Identification)**
• Deteksi anomali sistem
• Verifikasi apakah benar insiden
• Klasifikasi tingkat keparahan
• Dokumentasikan bukti awal

**3️⃣ Pembatasan (Containment)**
• Isolasi sistem yang terinfeksi
• Putuskan akses jaringan
• Backup sistem untuk forensik
• Cegah penyebaran lebih lanjut

**4️⃣ Pemulihan (Eradication)**
• Hapus malware/threat
• Patch vulnerability
• Strengthen security controls
• Restore dari backup bersih

**5️⃣ Recovery**
• Kembalikan sistem ke operasi normal
• Monitor ketat untuk reinfeksi
• Validasi sistem berjalan normal
• Update security measures

**6️⃣ Lessons Learned**
• Review insiden dan response
• Dokumentasi lengkap
• Update prosedur
• Training tambahan jika perlu

🔒 *Kecepatan response sangat penting dalam menangani insiden keamanan!*`;

  await sendMessage(chatId, message);
}

async function handleVPN(chatId) {
  const message = `🔐 *PANDUAN VPN (Virtual Private Network)*

**🎯 Apa itu VPN?**
VPN adalah layanan yang mengenkripsi koneksi internet Anda dan menyembunyikan identitas online dengan mengalihkan traffic melalui server VPN.

**✅ Manfaat VPN:**
• Enkripsi data dan privasi online
• Bypass geo-restrictions
• Keamanan di WiFi publik
• Anonimitas browsing
• Proteksi dari ISP tracking

**🛡️ Rekomendasi VPN Terpercaya:**
• **NordVPN** - Security kuat, banyak server
• **ExpressVPN** - Cepat dan reliable
• **ProtonVPN** - Privacy-focused, ada free tier
• **Surfshark** - Unlimited devices
• **Mullvad** - Anonymous payment

**⚠️ Yang Harus Dihindari:**
• Free VPN mencurigakan (jual data)
• VPN tanpa no-logs policy
• VPN dengan jurisdiction buruk
• VPN dengan enkripsi lemah

**🔒 Tips Memilih VPN:**
• Pilih yang punya no-logs policy
• Cek lokasi jurisdiction
• Pastikan enkripsi AES-256
• Support kill switch
• Transparent tentang ownership

**💡 Kapan Harus Pakai VPN:**
• Menggunakan WiFi publik
• Akses remote ke kantor
• Privacy browsing
• Bypass censorship
• Download/upload sensitif

🔐 *VPN bukan solusi sempurna, tapi layer security penting untuk online privacy!*`;

  await sendMessage(chatId, message);
}

async function handleBackup(chatId) {
  const message = `💾 *STRATEGI DATA BACKUP*

**🎯 Prinsip 3-2-1 Backup:**
• **3** - Simpan 3 copy data Anda
• **2** - Gunakan 2 jenis media berbeda
• **1** - Simpan 1 copy offsite/cloud

**📋 Jenis Backup:**

**1️⃣ Full Backup**
• Backup semua data
• Paling lama, paling besar
• Recovery paling mudah
• Lakukan bulanan

**2️⃣ Incremental Backup**
• Hanya backup perubahan sejak backup terakhir
• Cepat dan hemat storage
• Recovery butuh semua incremental
• Lakukan harian

**3️⃣ Differential Backup**
• Backup perubahan sejak full backup terakhir
• Lebih cepat dari full
• Recovery hanya butuh full + differential terakhir
• Lakukan mingguan

**🛠️ Tools Backup Populer:**
• **Cloud:** Google Drive, Dropbox, OneDrive, Backblaze
• **Local:** Windows Backup, Time Machine (Mac)
• **Enterprise:** Veeam, Acronis, Veritas

**✅ Best Practices:**
• Otomatis backup (scheduled)
• Enkripsi backup data
• Test restore secara berkala
• Versioning untuk file penting
• Monitor backup success/failure
• Document recovery procedures

**⚠️ Kesalahan Umum:**
• Hanya satu copy data
• Tidak test restore
• Backup dan original di lokasi sama
• Tidak enkripsi backup
• Tidak monitor backup jobs

**🔒 Data Prioritas Backup:**
• Dokumen penting
• Foto dan video pribadi
• Email dan kontak
• Database aplikasi
• Configuration files
• Financial records

💾 *Backup adalah insurance policy untuk data Anda. Jangan tunggu kehilangan data baru backup!*`;

  await sendMessage(chatId, message);
}

async function handleFirewall(chatId) {
  const message = `🔥 *PANDUAN FIREWALL*

**🎯 Apa itu Firewall?**
Firewall adalah sistem keamanan jaringan yang memonitor dan mengontrol traffic masuk/keluar berdasarkan aturan keamanan yang ditentukan.

**📊 Jenis Firewall:**

**1️⃣ Network Firewall**
• Proteksi level jaringan
• Hardware atau software based
• Filter berdasarkan IP, port, protocol

**2️⃣ Application Firewall (WAF)**
• Proteksi level aplikasi
• Filter HTTP/HTTPS traffic
• Deteksi SQL injection, XSS

**3️⃣ Host-based Firewall**
• Firewall di device individual
• Windows Firewall, iptables
• Kontrol granular per aplikasi

**4️⃣ Next-Gen Firewall (NGFW)**
• Deep packet inspection
• Intrusion prevention
• Application awareness

**🛡️ Firewall Populer:**
• **pfSense** - Open source, powerful
• **OPNsense** - Fork pfSense, modern UI
• **Fortinet** - Enterprise grade
• **Palo Alto** - Leader NGFW
• **Cisco ASA** - Industry standard

**✅ Best Practices:**

**1. Default Deny Policy**
• Block semua, allow yang perlu
• Whitelist approach

**2. Principle of Least Privilege**
• Buka port minimal
• Restrict by IP jika memungkinkan

**3. Regular Rules Review**
• Audit rules berkala
• Hapus unused rules
• Document setiap rule

**4. Logging & Monitoring**
• Enable firewall logs
• Monitor suspicious traffic
• Alert on anomalies

**5. Segmentation**
• Segment network by function
• DMZ untuk public services
• Internal network isolation

**🔒 Konfigurasi Dasar:**
• Block incoming default
• Allow outgoing default
• Allow established connections
• Block known bad IPs
• Rate limiting untuk DoS
• Geo-blocking jika perlu

**⚠️ Kesalahan Umum:**
• Allow all untuk troubleshooting (lupa revert)
• Tidak review rules lama
• Firewall tidak update
• Tidak backup config
• Bypass firewall untuk convenience

🔥 *Firewall adalah garis pertahanan pertama. Configure dengan benar!*`;

  await sendMessage(chatId, message);
}

async function handleVulnerability(chatId) {
  const message = `🛡️ *VULNERABILITY & PENCEGAHAN*

**🎯 Top 10 Vulnerabilities (OWASP):**

**1️⃣ Injection**
• SQL, NoSQL, OS command injection
• **Pencegahan:** Prepared statements, input validation

**2️⃣ Broken Authentication**
• Session hijacking, credential stuffing
• **Pencegahan:** MFA, secure session management

**3️⃣ Sensitive Data Exposure**
• Data tidak terenkripsi
• **Pencegahan:** Enkripsi at-rest dan in-transit

**4️⃣ XML External Entities (XXE)**
• XML processor vulnerability
• **Pencegahan:** Disable XML external entities

**5️⃣ Broken Access Control**
• Unauthorized access ke resources
• **Pencegahan:** Enforce access control checks

**6️⃣ Security Misconfiguration**
• Default settings, verbose errors
• **Pencegahan:** Hardening, disable unnecessary features

**7️⃣ Cross-Site Scripting (XSS)**
• Inject malicious scripts
• **Pencegahan:** Output encoding, CSP headers

**8️⃣ Insecure Deserialization**
• Remote code execution
• **Pencegahan:** Integrity checks, restrict deserialization

**9️⃣ Using Components with Known Vulnerabilities**
• Outdated libraries
• **Pencegahan:** Dependency scanning, regular updates

**🔟 Insufficient Logging & Monitoring**
• Delayed breach detection
• **Pencegahan:** Comprehensive logging, SIEM

**🔍 Vulnerability Management:**

**1. Discovery**
• Vulnerability scanning
• Penetration testing
• Code review
• Dependency checking

**2. Assessment**
• CVSS scoring
• Business impact analysis
• Exploitability assessment

**3. Prioritization**
• Critical first
• Risk-based approach
• Consider business context

**4. Remediation**
• Patch management
• Configuration changes
• Compensating controls

**5. Verification**
• Retest after fix
• Regression testing
• Documentation

**🛠️ Tools Scanning:**
• **Nessus** - Vulnerability scanner
• **OpenVAS** - Open source scanner
• **Qualys** - Cloud-based scanning
• **Burp Suite** - Web app testing
• **OWASP ZAP** - Web app scanner
• **Snyk** - Dependency scanning

**✅ Best Practices:**
• Regular vulnerability scans
• Patch management program
• Security development lifecycle
• Continuous monitoring
• Security training developer

🛡️ *Vulnerability management adalah proses berkelanjutan, bukan one-time activity!*`;

  await sendMessage(chatId, message);
}

async function handleTraining(chatId) {
  const message = `🎓 *SECURITY AWARENESS TRAINING*

**🎯 Mengapa Training Penting?**
Human adalah weakest link dalam security. 90% breach dimulai dari human error. Training yang efektif bisa reduce risk hingga 70%.

**📚 Topik Training Essensial:**

**1️⃣ Password Security**
• Cara membuat password kuat
• Password manager usage
• Multi-factor authentication
• Bahaya password reuse

**2️⃣ Phishing Awareness**
• Recognizing phishing emails
• Suspicious link checking
• Social engineering tactics
• Reporting procedures

**3️⃣ Data Protection**
• Classification data
• Proper data handling
• Encryption usage
• Privacy compliance (GDPR, etc)

**4️⃣ Physical Security**
• Clean desk policy
• Device locking
• Visitor management
• Tailgating prevention

**5️⃣ Mobile & Remote Work**
• BYOD best practices
• Public WiFi dangers
• VPN usage
• Remote access security

**6️⃣ Incident Response**
• Recognizing incidents
• Reporting channels
• Initial response steps
• Don't panic procedures

**🎓 Platform Training:**
• **KnowBe4** - Comprehensive, phishing simulation
• **SANS Security Awareness** - Industry leader
• **Cybrary** - Free courses
• **Udemy** - Affordable courses
• **Coursera** - University courses
• **LinkedIn Learning** - Professional courses

**📋 Training Program Structure:**

**1. Initial Training (Onboarding)**
• 1-2 jam comprehensive
• Cover all essential topics
• Interactive dan engaging

**2. Regular Refreshers**
• Quarterly 15-30 menit
• Focus on new threats
• Reinforce key concepts

**3. Targeted Training**
• Role-specific training
• Based on assessment results
• Address specific weaknesses

**4. Phishing Simulations**
• Monthly simulated attacks
• Track click rates
• Immediate training for clickers

**5. Measurement & Improvement**
• Pre and post assessments
• Track metrics over time
• Adjust based on results

**📊 Metrics to Track:**
• Training completion rates
• Assessment scores
• Phishing simulation click rates
• Time to complete training
• Incident reports from trained users

**💡 Tips Effective Training:**
• Keep it short and engaging
• Use real-world examples
• Gamification
• Regular reinforcement
• Executive buy-in
• Make it mandatory
• Provide incentives

**🎯 Free Resources:**
• NIST Cybersecurity Framework
• CISA Security Tips
• OWASP Training Materials
• YouTube security channels
• Security podcasts

🎓 *Invest in people security = Invest in organizational security!*`;

  await sendMessage(chatId, message);
}

async function handleCompliance(chatId) {
  const message = `📜 *SECURITY COMPLIANCE STANDARDS*

**🎯 Mengapa Compliance Penting?**
• Legal requirements
• Customer trust
• Avoid penalties
• Industry standards
• Risk management

**🌐 Global Standards:**

**1️⃣ ISO/IEC 27001**
• Information Security Management System (ISMS)
• International standard
• Risk-based approach
• Applicable semua organisasi
• **Benefit:** Global recognition, systematic approach

**2️⃣ GDPR (General Data Protection Regulation)**
• EU data protection law
• Applies ke EU citizens data
• Consent, data rights, breach notification
• **Penalty:** Up to €20M atau 4% revenue
• **Scope:** Privacy, data protection

**3️⃣ PCI DSS**
• Payment Card Industry Data Security Standard
• Protect cardholder data
• 12 requirements, 6 control objectives
• **Mandatory:** Semua yang process payments
• **Scope:** Payment security

**4️⃣ SOC 2**
• Service Organization Control
• For service providers
• 5 trust principles
• **Type I:** Design, **Type II:** Effectiveness
• **Scope:** Cloud services, SaaS

**5️⃣ HIPAA**
• Health Insurance Portability and Accountability Act
• US healthcare data protection
• PHI (Protected Health Information)
• **Scope:** Healthcare, health tech

**🇮🇩 Indonesia Regulations:**

**1. UU ITE (Undang-Undang Informasi dan Transaksi Elektronik)**
• Cybercrime law
• Electronic signatures
• Data protection

**2. Peraturan OJK tentang Keamanan Informasi**
• Financial sector
• Risk management
• Incident reporting

**3. Peraturan Menkominfo tentang Perlindungan Data Pribadi**
• Personal data protection
• Consent requirements
• Cross-border data transfer

**✅ Compliance Checklist:**

**ISO 27001:**
□ Risk assessment
□ Statement of Applicability
□ Information security policies
□ Access control
□ Cryptography
□ Physical security
□ Incident management
□ Business continuity
□ Compliance audits

**GDPR:**
□ Data inventory
□ Privacy notices
□ Consent mechanisms
□ Data subject rights processes
□ DPO appointment (if required)
□ Data breach procedures
□ DPIA for high-risk processing
□ Vendor agreements

**PCI DSS:**
□ Firewall configuration
□ No default passwords
□ Protect stored cardholder data
□ Encrypt transmission
□ Antivirus
□ Secure systems
□ Access control
□ Unique IDs
□ Restrict physical access
□ Track and monitor
□ Regular testing
□ Information security policy

**🛠️ Compliance Tools:**
• **Vanta** - Automate compliance
• **Drata** - Continuous compliance
• **Secureframe** - SOC 2, ISO 27001
• **TrustArc** - Privacy compliance
• **OneTrust** - Privacy management

**💡 Compliance Tips:**
• Start early
• Get executive buy-in
• Assign ownership
• Document everything
• Regular audits
• Use frameworks
• Automate where possible
• Employee training
• Continuous monitoring

📜 *Compliance bukan hanya checkbox, tapi foundation untuk security yang baik!*`;

  await sendMessage(chatId, message);
}

async function handleThreat(chatId) {
  const message = `⚠️ *CURRENT THREAT LANDSCAPE*

**🎯 Top Cyber Threats 2024:**

**1️⃣ Ransomware**
• **Trend:** Ransomware-as-a-Service (RaaS)
• **Target:** Healthcare, education, government
• **Tactic:** Double extortion (encrypt + leak)
• **Example:** LockBit, BlackCat, ALPHV
• **Impact:** Millions in ransom, operational downtime

**2️⃣ Phishing & Social Engineering**
• **Trend:** AI-powered phishing, deepfakes
• **Vector:** Email, SMS (smishing), voice (vishing)
• **Tactic:** CEO fraud, credential harvesting
• **Success Rate:** 30% click rate on targeted campaigns
• **Impact:** Data breach, financial loss

**3️⃣ Supply Chain Attacks**
• **Trend:** Targeting vendors dan third-parties
• **Vector:** Software dependencies, managed services
• **Example:** SolarWinds, Kaseya, Log4Shell
• **Tactic:** Compromise one, impact many
• **Impact:** Widespread compromise

**4️⃣ Zero-Day Exploits**
• **Trend:** Increase in 0-day discoveries
• **Target:** Microsoft, Apple, Google products
• **Market:** Dark web, nation-state actors
• **Speed:** Exploited within hours
• **Impact:** Unpatched vulnerabilities exploited

**5️⃣ Cloud Misconfigurations**
• **Trend:** Rapid cloud adoption, complexity
• **Error:** Public S3 buckets, weak access controls
• **Impact:** Data leaks, unauthorized access
• **Stats:** 80% of cloud breaches due to misconfiguration

**6️⃣ IoT & OT Attacks**
• **Trend:** More connected devices
• **Target:** Smart home, industrial systems
• **Weakness:** Default passwords, no updates
• **Impact:** Botnets (Mirai), industrial sabotage

**7️⃣ AI-Powered Attacks**
• **Trend:** AI untuk automate dan scale attacks
• **Usage:** Password cracking, social engineering
• **Example:** ChatGPT untuk phishing emails
• **Defense:** Harder to detect automated attacks

**8️⃣ Cryptocurrency Threats**
• **Trend:** Cryptojacking, crypto scams
• **Target:** Exchange hacks, wallet theft
• **Tactic:** Mining malware, rug pulls
• **Impact:** Financial loss, resource theft

**🔍 Threat Intelligence Sources:**
• **CISA Alerts** - cisa.gov/uscert
• **MITRE ATT&CK** - attack.mitre.org
• **US-CERT** - us-cert.gov
• **Krebs on Security** - krebsonsecurity.com
• **Threat Post** - threatpost.com
• **The Hacker News** - thehackernews.com

**📊 Key Statistics:**
• Cyber attack every 39 seconds
• Average breach cost: $4.45M
• 95% breaches caused by human error
• 43% attacks target small business
• 68% breaches take months to discover

**🛡️ Defense Strategy:**

**1. Prevention:**
• Patch management
• Security awareness training
• Network segmentation
• Least privilege access

**2. Detection:**
• SIEM monitoring
• Threat intelligence feeds
• Anomaly detection
• Regular audits

**3. Response:**
• Incident response plan
• Forensic capabilities
• Communication plan
• Recovery procedures

**4. Resilience:**
• Regular backups
• Business continuity plan
• Disaster recovery
• Insurance coverage

**💡 Emerging Threats to Watch:**
• Quantum computing impact on encryption
• 5G security implications
• Deep fake technology
• AI model poisoning
• Space-based infrastructure attacks

⚠️ *Stay informed, stay prepared. Threat landscape constantly evolving!*`;

  await sendMessage(chatId, message);
}

async function handleForensics(chatId) {
  const message = `🔬 *DIGITAL FORENSICS BASICS*

**🎯 Apa itu Digital Forensics?**
Digital forensics adalah proses mengidentifikasi, mengamankan, menganalisis, dan menyajikan bukti digital untuk investigasi insiden keamanan atau kejahatan siber.

**📋 Tahapan Digital Forensics:**

**1️⃣ Identification (Identifikasi)**
• Deteksi insiden terjadi
• Tentukan scope investigation
• Identify potential evidence sources
• Document initial state

**2️⃣ Preservation (Preservasi)**
• Isolasi dan secure crime scene
• Prevent evidence contamination
• Chain of custody documentation
• Create forensic images

**3️⃣ Collection (Pengumpulan)**
• Forensic imaging (bit-by-bit copy)
• Collect volatile data (RAM, network)
• Log files, system files
• Maintain integrity (hash values)

**4️⃣ Analysis (Analisis)**
• Examine forensic images
• Timeline reconstruction
• Identify artifacts
• Correlate evidence
• Use forensic tools

**5️⃣ Reporting (Pelaporan)**
• Document findings
• Create timeline
• Provide conclusions
• Expert testimony ready

**🛠️ Forensic Tools:**

**Disk Forensics:**
• **Autopsy/Sleuth Kit** - Open source suite
• **FTK (Forensic Toolkit)** - Commercial, powerful
• **EnCase** - Industry standard
• **X-Ways Forensics** - Fast, efficient

**Memory Forensics:**
• **Volatility** - RAM analysis framework
• **Rekall** - Memory forensic framework
• **DumpIt** - Memory acquisition

**Network Forensics:**
• **Wireshark** - Packet analyzer
• **NetworkMiner** - PCAP analysis
• **Zeek (Bro)** - Network monitoring

**Mobile Forensics:**
• **Cellebrite** - Mobile extraction
• **Oxygen Forensics** - Mobile analysis
• **AXIOM** - Mobile & computer forensics

**🔍 Types of Evidence:**

**1. Volatile Evidence (Hilang saat power off):**
• RAM contents
• Running processes
• Network connections
• Clipboard data
• Registry keys in memory

**2. Non-Volatile Evidence:**
• Hard drive contents
• USB devices
• Log files
• Email archives
• Browser history

**3. Network Evidence:**
• Firewall logs
• IDS/IPS alerts
• Packet captures
• DNS logs
• Proxy logs

**📊 Forensic Artifacts:**
• **Windows:** Event Logs, Registry, Prefetch, USN Journal
• **Linux:** /var/log/, bash_history, cron jobs
• **Browser:** History, cookies, cache, downloads
• **Email:** PST/OST files, email headers
• **Mobile:** SMS, call logs, app data, location history

**✅ Best Practices:**

**1. Order of Volatility:**
Collect most volatile first:
• Registers, cache
• Routing table, ARP cache, process table
• Memory
• Temporary file systems
• Disk
• Remote logging and monitoring data
• Physical configuration, network topology
• Archival media

**2. Chain of Custody:**
• Document who, what, when, where
• Every transfer logged
• Secure storage
• Limited access

**3. Forensic Soundness:**
• Write blockers untuk acquisition
• Hash verification (MD5, SHA-256)
• Work on copies, never originals
• Document every action

**4. Legal Considerations:**
• Proper authorization
• Privacy laws compliance
• Admissibility of evidence
• Expert witness testimony

**⚠️ Common Mistakes:**
• Working on original evidence
• No hash verification
• Incomplete documentation
• Breaking chain of custody
• Not collecting volatile data
• Delayed response

**💡 Career Path:**
• CompTIA Security+
• EnCase Certified Examiner (EnCE)
• GIAC Certified Forensic Analyst (GCFA)
• Certified Computer Examiner (CCE)
• CHFI (Computer Hacking Forensic Investigator)

🔬 *Digital forensics requires technical skills, attention to detail, dan understanding of legal requirements!*`;

  await sendMessage(chatId, message);
}

async function handleIoT(chatId) {
  const message = `🌐 *IoT SECURITY BEST PRACTICES*

**🎯 Apa itu IoT?**
Internet of Things (IoT) adalah jaringan perangkat fisik yang terhubung ke internet, mengumpulkan dan berbagi data.

**📱 Contoh Perangkat IoT:**
• Smart home (lights, thermostats, cameras)
• Wearables (smartwatch, fitness trackers)
• Smart appliances (refrigerator, washing machine)
• Industrial IoT (sensors, controllers)
• Smart city (traffic lights, parking meters)
• Healthcare (medical devices, monitors)

**⚠️ Ancaman Keamanan IoT:**

**1️⃣ Weak Authentication**
• Default passwords (admin/admin)
• No password change requirement
• Weak or no encryption
• **Impact:** Unauthorized access

**2️⃣ Insecure Network Services**
• Unnecessary open ports
• Outdated protocols
• No encryption
• **Impact:** Network compromise

**3️⃣ Lack of Updates**
• No firmware updates
• End of life devices
• No security patches
• **Impact:** Known vulnerabilities exploited

**4️⃣ Physical Security**
• Easy physical access
• No tamper detection
• Debug ports accessible
• **Impact:** Device manipulation

**5️⃣ Privacy Concerns**
• Data collection tanpa consent
• Data sharing dengan third parties
• Location tracking
• **Impact:** Privacy violation

**🛡️ IoT Security Best Practices:**

**1. Device Level:**

**Before Purchase:**
□ Research security track record
□ Check update policy
□ Read privacy policy
□ Prefer reputable brands

**Setup:**
□ Change default password immediately
□ Use strong, unique passwords
□ Update firmware to latest
□ Disable unnecessary features
□ Review privacy settings

**Ongoing:**
□ Regular firmware updates
□ Monitor device activity
□ Review connected apps
□ Audit device list regularly

**2. Network Level:**

**Network Segmentation:**
• Separate IoT network dari main network
• Use VLAN or separate router
• Limit IoT device communication

**Router Security:**
• Strong WiFi password (WPA3)
• Change router admin password
• Disable WPS
• Update router firmware
• Enable firewall

**Access Control:**
• MAC address filtering
• Guest network untuk IoT
• VPN untuk remote access
• Disable UPnP

**3. Data Level:**

**Data Protection:**
• Minimize data collection
• Understand data sharing
• Review third-party access
• Regular data audits

**Privacy:**
• Opt-out of data sharing jika bisa
• Review app permissions
• Check privacy policy updates
• Use privacy-focused alternatives

**🔒 Specific Device Security:**

**Smart Cameras:**
• Strong passwords
• Two-factor authentication
• Encrypt video streams
• Disable remote access jika tidak perlu
• Cover camera saat tidak digunakan
• Regular firmware updates

**Smart Speakers:**
• Mute when not in use
• Review voice recordings
• Limit connected services
• Strong account password
• Check activity logs

**Smart Locks:**
• Backup mechanical key
• Strong PIN codes
• Activity monitoring
• Firmware updates
• Battery monitoring

**Smart TVs:**
• Disable camera/mic jika tidak digunakan
• Review app permissions
• Limit data collection
• Update software
• Secure WiFi

**🏢 Enterprise IoT:**

**Industrial IoT (IIoT):**
• Network segmentation (IT vs OT)
• Zero Trust architecture
• Asset inventory management
• Threat monitoring
• Incident response plan
• Regular security assessments

**Healthcare IoT:**
• HIPAA compliance
• Patient data encryption
• Medical device management
• Network segmentation
• Regular vulnerability scans

**🛠️ IoT Security Tools:**
• **Shodan** - IoT device search engine
• **IoT Inspector** - Network monitoring
• **Fing** - Network scanner
• **Wireshark** - Traffic analysis
• **Nmap** - Port scanning

**📊 IoT Security Checklist:**
□ Inventory all IoT devices
□ Change all default passwords
□ Update all firmware
□ Enable encryption where possible
□ Segment IoT network
□ Disable unused features
□ Regular security audits
□ Monitor device traffic
□ Plan device retirement
□ Document device policies

**💡 Future of IoT Security:**
• Built-in security by design
• Standardization (IoT Security Foundation)
• AI-powered threat detection
• Blockchain for IoT security
• Quantum-resistant encryption

**⚠️ Red Flags:**
• No password required
• No firmware updates available
• Unclear data sharing practices
• Poor reviews on security
• No support or documentation
• Too cheap to be secure

🌐 *IoT convenience shouldn't compromise security. Secure your connected world!*`;

  await sendMessage(chatId, message);
}


// Auto-reply for general questions
async function handleAutoReply(chatId, text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('apa itu malware') || lowerText.includes('malware')) {
    await sendMessage(chatId, "🦠 *MALWARE*\n\nMalware adalah software berbahaya yang dirancang untuk merusak, mengganggu, atau mendapatkan akses tidak sah ke sistem komputer.\n\n**Jenis Malware:**\n• Virus\n• Worm\n• Trojan\n• Ransomware\n• Spyware\n• Adware\n\n💡 Gunakan /glossary malware untuk definisi lengkap.");
  }
  else if (lowerText.includes('apa itu phishing') || lowerText.includes('phishing')) {
    await sendMessage(chatId, "🎣 *PHISHING*\n\nPhishing adalah teknik penipuan online yang menggunakan email atau website palsu untuk mencuri informasi pribadi seperti password, nomor kartu kredit, atau data sensitif lainnya.\n\n**Tanda-tanda Phishing:**\n• Sender address mencurigakan\n• Pesan mendesak/urgent\n• Link URL mencurigakan\n• Meminta informasi pribadi\n• Grammar/typo yang mencurigakan\n\n💡 Gunakan /phishing [url] untuk menganalisis link mencurigakan.");
  }
  else if (lowerText.includes('password') || lowerText.includes('sandi')) {
    await sendMessage(chatId, "🔐 *PASSWORD YANG KUAT*\n\n**Kriteria Password Kuat:**\n• Minimal 8 karakter\n• Kombinasi huruf besar dan kecil\n• Angka dan simbol\n• Tidak mudah ditebak\n• Unik untuk setiap akun\n\n💡 Gunakan /checkpass [password] untuk menganalisis kekuatan password Anda.");
  }
  else {
    await sendMessage(chatId, "🤔 *Pertanyaan Tidak Dikenali*\n\nMaaf, saya tidak memahami pertanyaan Anda. Coba gunakan perintah berikut:\n\n• /help - Lihat semua perintah\n• /basic - Pelajari dasar cyber security\n• /glossary [istilah] - Cari istilah cyber security\n• /tips - Tips keamanan harian\n\n💡 Atau tanyakan tentang: malware, phishing, password");
  }
}

// Main webhook handler
app.post('/api/webhook', async (req, res) => {
  try {
    const { message, new_chat_members, left_chat_member } = req.body;
    
    if (!message && !new_chat_members && !left_chat_member) {
      return res.status(200).json({ status: 'ok' });
    }

    // Handle new chat members (welcome message)
    if (new_chat_members && new_chat_members.length > 0) {
      for (const newMember of new_chat_members) {
        if (!newMember.is_bot) {
          const chatId = message.chat.id;
          const chatTitle = message.chat.title || 'Grup';
          const welcomeMessage = `🎉 *SELAMAT DATANG DI ${chatTitle.toUpperCase()}!* 🎉

Halo ${newMember.first_name || 'Member Baru'}! 👋

🔐 **Cyber Security Bot** siap membantu Anda belajar tentang keamanan siber!

**💡 Fitur Utama:**
• /start - Menu utama dan sambutan
• /help - Daftar perintah lengkap
• /basic - Dasar cyber security
• /tips - Tips keamanan harian
• /phishing [url] - Deteksi link mencurigakan
• /checkpass [password] - Cek kekuatan password
• /encrypt & /decrypt - Enkripsi Base64
• /news - Berita cyber security terbaru
• /tools - Daftar tools keamanan
• /glossary [istilah] - Kamus cyber security
• /simulate phishing - Simulasi edukasi
• /business - Tips keamanan bisnis
• /report - Cara lapor insiden siber
• /checklist - Checklist keamanan
• /quiz - Kuis cyber security
• /events - Event keamanan

**🆕 Fitur Baru:**
• /incident - Panduan incident response
• /vpn - Panduan VPN
• /backup - Strategi backup
• /firewall - Konfigurasi firewall
• /vulnerability - Manajemen kerentanan
• /training - Security training
• /compliance - ISO 27001, GDPR, dll
• /threat - Threat landscape
• /forensics - Digital forensics
• /iot - Keamanan IoT

**🔒 Tetap aman di dunia digital!**
**📚 Belajar cyber security bersama komunitas ini!**

---
*Bot dikembangkan oleh Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE*
*Support: muhammadsobrimaulana31@gmail.com*`;

          await sendMessage(chatId, welcomeMessage);
          
          // Add new member to database
          await dataManager.addUser(newMember.id, newMember.username, newMember.first_name, newMember.last_name);
          
          console.log(`[${new Date().toISOString()}] New member joined: ${newMember.first_name || newMember.username} (${newMember.id}) in ${chatTitle}`);
        }
      }
    }

    // Handle left chat member
    if (left_chat_member && !left_chat_member.is_bot) {
      const chatId = message.chat.id;
      const chatTitle = message.chat.title || 'Grup';
      const goodbyeMessage = `👋 *MEMBER KELUAR*

${left_chat_member.first_name || left_chat_member.username} telah meninggalkan ${chatTitle}.

**💡 Tetap jaga keamanan siber Anda!**
**🔒 Gunakan bot ini untuk belajar cyber security!**

---
*Bot dikembangkan oleh Letda Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE*`;

      await sendMessage(chatId, goodbyeMessage);
      console.log(`[${new Date().toISOString()}] Member left: ${left_chat_member.first_name || left_chat_member.username} (${left_chat_member.id}) from ${chatTitle}`);
    }

    // Handle regular messages
    if (message) {
      const { chat, text, from } = message;
      const chatId = chat.id;
      
      // Log interaction
      console.log(`[${new Date().toISOString()}] User ${from.username || from.first_name} (${chatId}): ${text}`);
      
      // Update user activity
      await dataManager.updateUserActivity(chatId);
      
      // Handle commands
      if (text && text.startsWith('/')) {
        const [command, ...args] = text.split(' ');
        const commandText = command.toLowerCase();
        
        switch (commandText) {
          case '/start':
            await handleStart(chatId, from);
            break;
          case '/help':
            await handleHelp(chatId);
            break;
          case '/basic':
            await handleBasic(chatId);
            break;
          case '/tips':
            await handleTips(chatId);
            break;
          case '/phishing':
            await handlePhishing(chatId, args.join(' '));
            break;
          case '/checkpass':
            await handleCheckPassword(chatId, args.join(' '));
            break;
          case '/encrypt':
            await handleEncrypt(chatId, args.join(' '));
            break;
          case '/decrypt':
            await handleDecrypt(chatId, args.join(' '));
            break;
          case '/news':
            await handleNews(chatId);
            break;
          case '/tools':
            await handleTools(chatId);
            break;
          case '/glossary':
            await handleGlossary(chatId, args.join(' '));
            break;
          case '/simulate':
            if (args[0] === 'phishing') {
              await handleSimulatePhishing(chatId);
            } else {
              await sendMessage(chatId, "❌ Perintah tidak dikenal. Gunakan /help untuk melihat daftar perintah.");
            }
            break;
          case '/business':
            await handleBusiness(chatId);
            break;
          case '/report':
            await handleReport(chatId);
            break;
          case '/checklist':
            await handleChecklist(chatId);
            break;
          case '/quiz':
            await handleQuiz(chatId);
            break;
          case '/events':
            await handleEvents(chatId);
          case '/incident':
            await handleIncident(chatId);
            break;
          case '/vpn':
            await handleVPN(chatId);
            break;
          case '/backup':
            await handleBackup(chatId);
            break;
          case '/firewall':
            await handleFirewall(chatId);
            break;
          case '/vulnerability':
            await handleVulnerability(chatId);
            break;
          case '/training':
            await handleTraining(chatId);
            break;
          case '/compliance':
            await handleCompliance(chatId);
            break;
          case '/threat':
            await handleThreat(chatId);
            break;
          case '/forensics':
            await handleForensics(chatId);
            break;
          case '/iot':
            await handleIoT(chatId);
            break;
            break;
          default:
            await sendMessage(chatId, "❌ Perintah tidak dikenal. Gunakan /help untuk melihat daftar perintah yang tersedia.");
        }
      } else if (text) {
        // Handle auto-reply for general questions
        await handleAutoReply(chatId, text);
      }
    }
    
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Cyber Security Telegram Bot'
  });
});

// Webhook setup endpoint
app.get('/api/setup-webhook', async (req, res) => {
  try {
    if (!BOT_TOKEN) {
      return res.status(400).json({ error: 'BOT_TOKEN not configured' });
    }
    
    if (!WEBHOOK_URL) {
      return res.status(400).json({ error: 'WEBHOOK_URL not configured' });
    }
    
    const webhookUrl = `${WEBHOOK_URL}/api/webhook`;
    
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message']
      })
    });
    
    const result = await response.json();
    
    if (result.ok) {
      console.log('Webhook set successfully:', webhookUrl);
      res.json({ 
        status: 'success', 
        message: 'Webhook set successfully',
        webhook_url: webhookUrl
      });
    } else {
      console.error('Failed to set webhook:', result);
      res.status(400).json({ 
        status: 'error', 
        message: 'Failed to set webhook',
        telegram_error: result
      });
    }
  } catch (error) {
    console.error('Error setting webhook:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Handle GET requests to webhook (for verification)
app.get('/api/webhook', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Cyber Security Bot is running',
    timestamp: new Date().toISOString()
  });
});

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Cyber Security Bot running on port ${PORT}`);
    console.log(`📱 Webhook URL: http://localhost:${PORT}/api/webhook`);
    console.log(`🔧 Setup webhook: http://localhost:${PORT}/api/setup-webhook`);
  });
}

// Export for Vercel
module.exports = app;
