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
