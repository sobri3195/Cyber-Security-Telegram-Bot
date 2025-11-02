#!/usr/bin/env node

/**
 * BotFather Connection Validator CLI
 * Run: node scripts/validate-botfather.js
 */

require('dotenv').config();
const BotFatherValidator = require('../utils/botfatherValidator');

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🤖 TELEGRAM BOTFATHER CONNECTION VALIDATOR');
  console.log('='.repeat(60) + '\n');

  // Check if BOT_TOKEN is set
  const botToken = process.env.BOT_TOKEN;
  
  if (!botToken) {
    console.error('❌ ERROR: BOT_TOKEN tidak ditemukan!\n');
    console.log('Solusi:');
    console.log('1. Buat file .env di root project');
    console.log('2. Tambahkan: BOT_TOKEN=your_bot_token_here');
    console.log('3. Atau set environment variable: export BOT_TOKEN=your_token\n');
    console.log('📚 Lihat: QUICK_START_BOTFATHER.md untuk panduan lengkap\n');
    process.exit(1);
  }

  // Initialize validator
  const validator = new BotFatherValidator(botToken);

  // Run full validation
  const validationResults = await validator.runFullValidation();

  // Show troubleshooting tips if needed
  if (!validationResults.success) {
    console.log('\n' + '='.repeat(60));
    console.log('🔧 TROUBLESHOOTING TIPS');
    console.log('='.repeat(60) + '\n');

    const tips = validator.getTroubleshootingTips(validationResults.results);
    
    if (tips.length > 0) {
      tips.forEach((tip, index) => {
        console.log(`${index + 1}. ⚠️ ${tip.issue}`);
        console.log('   Solusi:');
        tip.solution.forEach(step => {
          console.log(`   ${step}`);
        });
        console.log('');
      });
    }

    console.log('📚 Dokumentasi lengkap:');
    console.log('   - QUICK_START_BOTFATHER.md - Panduan cepat');
    console.log('   - BOTFATHER_SETUP.md - Panduan detail');
    console.log('   - README.md - Dokumentasi utama\n');
  } else {
    console.log('\n🎉 Bot Anda siap digunakan!');
    console.log('   Test bot: https://t.me/' + validationResults.results.botInfo.data.username);
    console.log('   Kirim /start untuk memulai\n');
  }

  // Exit with appropriate code
  process.exit(validationResults.success ? 0 : 1);
}

// Run main function
main().catch(error => {
  console.error('\n❌ Unexpected error:', error.message);
  console.error('\nStack trace:', error.stack);
  process.exit(1);
});
