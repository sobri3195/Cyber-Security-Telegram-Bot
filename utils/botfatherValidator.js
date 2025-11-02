/**
 * BotFather Connection Validator
 * Validates bot configuration and connection to Telegram BotFather
 */

const https = require('https');

class BotFatherValidator {
  constructor(botToken) {
    this.botToken = botToken;
    this.apiBase = `https://api.telegram.org/bot${botToken}`;
  }

  /**
   * Make API request to Telegram
   */
  async makeRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      const url = new URL(`${this.apiBase}${endpoint}`);
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(url, options, (res) => {
        let body = '';
        
        res.on('data', (chunk) => {
          body += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(body);
            if (response.ok) {
              resolve(response.result);
            } else {
              reject(new Error(response.description || 'API request failed'));
            }
          } catch (err) {
            reject(err);
          }
        });
      });

      req.on('error', reject);

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  /**
   * Validate bot token format
   */
  validateTokenFormat() {
    const tokenRegex = /^\d+:[A-Za-z0-9_-]{35}$/;
    const isValid = tokenRegex.test(this.botToken);
    
    return {
      valid: isValid,
      message: isValid 
        ? '✅ Token format valid' 
        : '❌ Token format tidak valid. Format: 1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
    };
  }

  /**
   * Get bot information from BotFather
   */
  async getBotInfo() {
    try {
      const info = await this.makeRequest('/getMe');
      return {
        success: true,
        data: {
          id: info.id,
          username: info.username,
          firstName: info.first_name,
          canJoinGroups: info.can_join_groups,
          canReadAllGroupMessages: info.can_read_all_group_messages,
          supportsInlineQueries: info.supports_inline_queries
        },
        message: '✅ Bot berhasil terhubung dengan BotFather'
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Gagal mengambil info bot: ${error.message}`
      };
    }
  }

  /**
   * Check webhook status
   */
  async getWebhookInfo() {
    try {
      const info = await this.makeRequest('/getWebhookInfo');
      return {
        success: true,
        data: {
          url: info.url || 'Not set',
          hasCustomCertificate: info.has_custom_certificate,
          pendingUpdateCount: info.pending_update_count,
          lastErrorDate: info.last_error_date ? new Date(info.last_error_date * 1000).toISOString() : null,
          lastErrorMessage: info.last_error_message || null,
          maxConnections: info.max_connections || null,
          allowedUpdates: info.allowed_updates || []
        },
        message: info.url 
          ? '✅ Webhook sudah dikonfigurasi' 
          : '⚠️ Webhook belum dikonfigurasi'
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Gagal mengambil info webhook: ${error.message}`
      };
    }
  }

  /**
   * Set webhook URL
   */
  async setWebhook(webhookUrl) {
    try {
      await this.makeRequest(`/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
      return {
        success: true,
        message: `✅ Webhook berhasil di-set ke: ${webhookUrl}`
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Gagal set webhook: ${error.message}`
      };
    }
  }

  /**
   * Delete webhook
   */
  async deleteWebhook() {
    try {
      await this.makeRequest('/deleteWebhook');
      return {
        success: true,
        message: '✅ Webhook berhasil dihapus'
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Gagal hapus webhook: ${error.message}`
      };
    }
  }

  /**
   * Get bot commands
   */
  async getBotCommands() {
    try {
      const commands = await this.makeRequest('/getMyCommands');
      return {
        success: true,
        data: commands,
        message: commands.length > 0 
          ? `✅ Bot memiliki ${commands.length} commands` 
          : '⚠️ Belum ada commands yang di-set'
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Gagal mengambil commands: ${error.message}`
      };
    }
  }

  /**
   * Run full validation
   */
  async runFullValidation() {
    console.log('\n🔍 Memulai validasi koneksi BotFather...\n');
    
    const results = {
      tokenFormat: null,
      botInfo: null,
      webhookInfo: null,
      commands: null,
      timestamp: new Date().toISOString()
    };

    // 1. Validate token format
    console.log('1️⃣ Validasi format token...');
    results.tokenFormat = this.validateTokenFormat();
    console.log(`   ${results.tokenFormat.message}\n`);

    if (!results.tokenFormat.valid) {
      return {
        success: false,
        results,
        summary: '❌ Token format tidak valid. Periksa BOT_TOKEN Anda.'
      };
    }

    // 2. Get bot info
    console.log('2️⃣ Mengambil informasi bot...');
    results.botInfo = await this.getBotInfo();
    console.log(`   ${results.botInfo.message}`);
    
    if (results.botInfo.success) {
      console.log(`   📱 Username: @${results.botInfo.data.username}`);
      console.log(`   🆔 Bot ID: ${results.botInfo.data.id}`);
      console.log(`   👥 Can Join Groups: ${results.botInfo.data.canJoinGroups ? 'Yes' : 'No'}`);
      console.log(`   📖 Can Read Group Messages: ${results.botInfo.data.canReadAllGroupMessages ? 'Yes' : 'No'}\n`);
    } else {
      console.log('\n');
      return {
        success: false,
        results,
        summary: '❌ Gagal terhubung dengan bot. Periksa BOT_TOKEN Anda.'
      };
    }

    // 3. Check webhook
    console.log('3️⃣ Memeriksa status webhook...');
    results.webhookInfo = await this.getWebhookInfo();
    console.log(`   ${results.webhookInfo.message}`);
    
    if (results.webhookInfo.success) {
      console.log(`   🔗 URL: ${results.webhookInfo.data.url}`);
      console.log(`   📬 Pending Updates: ${results.webhookInfo.data.pendingUpdateCount}`);
      
      if (results.webhookInfo.data.lastErrorMessage) {
        console.log(`   ⚠️ Last Error: ${results.webhookInfo.data.lastErrorMessage}`);
      }
      console.log('');
    }

    // 4. Check commands
    console.log('4️⃣ Memeriksa bot commands...');
    results.commands = await this.getBotCommands();
    console.log(`   ${results.commands.message}`);
    
    if (results.commands.success && results.commands.data.length > 0) {
      console.log('   📋 Commands yang tersedia:');
      results.commands.data.forEach(cmd => {
        console.log(`      /${cmd.command} - ${cmd.description}`);
      });
    }
    console.log('');

    // Summary
    const allSuccess = results.tokenFormat.valid && 
                      results.botInfo.success && 
                      results.webhookInfo.success && 
                      results.commands.success;

    const summary = allSuccess 
      ? '✅ Semua validasi berhasil! Bot terhubung dengan baik ke BotFather.' 
      : '⚠️ Ada beberapa masalah yang perlu diperbaiki.';

    console.log('=' .repeat(60));
    console.log(`📊 HASIL VALIDASI: ${summary}`);
    console.log('=' .repeat(60));

    return {
      success: allSuccess,
      results,
      summary
    };
  }

  /**
   * Get troubleshooting recommendations
   */
  getTroubleshootingTips(validationResults) {
    const tips = [];

    if (!validationResults.tokenFormat?.valid) {
      tips.push({
        issue: 'Token format tidak valid',
        solution: [
          '1. Buka @BotFather di Telegram',
          '2. Kirim /mybots',
          '3. Pilih bot Anda',
          '4. Pilih "API Token"',
          '5. Copy token dan update BOT_TOKEN di environment variables'
        ]
      });
    }

    if (!validationResults.botInfo?.success) {
      tips.push({
        issue: 'Tidak dapat terhubung dengan bot',
        solution: [
          '1. Pastikan BOT_TOKEN benar',
          '2. Cek koneksi internet',
          '3. Verify bot tidak di-delete di BotFather',
          '4. Test dengan curl: curl https://api.telegram.org/bot<TOKEN>/getMe'
        ]
      });
    }

    if (validationResults.webhookInfo?.success && !validationResults.webhookInfo.data.url) {
      tips.push({
        issue: 'Webhook belum dikonfigurasi',
        solution: [
          '1. Deploy aplikasi ke Netlify',
          '2. Set WEBHOOK_URL di environment variables',
          '3. Akses: https://your-site.netlify.app/api/setup-webhook',
          '4. Verify response sukses'
        ]
      });
    }

    if (validationResults.webhookInfo?.data?.lastErrorMessage) {
      tips.push({
        issue: 'Webhook error detected',
        solution: [
          `Error: ${validationResults.webhookInfo.data.lastErrorMessage}`,
          '1. Pastikan WEBHOOK_URL menggunakan HTTPS',
          '2. Verify SSL certificate valid',
          '3. Cek Netlify function logs',
          '4. Test endpoint: /api/health'
        ]
      });
    }

    if (validationResults.commands?.success && validationResults.commands.data.length === 0) {
      tips.push({
        issue: 'Belum ada commands yang di-set',
        solution: [
          '1. Buka @BotFather di Telegram',
          '2. Kirim /setcommands',
          '3. Pilih bot Anda',
          '4. Copy-paste daftar commands dari QUICK_START_BOTFATHER.md',
          '5. Restart Telegram app untuk melihat commands'
        ]
      });
    }

    return tips;
  }
}

module.exports = BotFatherValidator;
