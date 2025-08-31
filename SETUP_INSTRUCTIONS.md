# 🚀 Setup Instructions for Winlin Community Bot

## 🤖 Bot Information
Your Telegram bot is ready and available at:
- **Bot Username:** @winlincommunity_bot
- **Bot URL:** t.me/winlincommunity_bot
- **Bot Token:** 8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs

## 📝 Environment Setup

### 1. Create .env File
Create a `.env` file in your project root with the following content:

```env
# Telegram Bot Configuration
BOT_TOKEN=8274287483:AAGiWpxtfRo7ByLagTdH1Cy_TNLths3wCSs
WEBHOOK_URL=https://your-app-name.vercel.app
NODE_ENV=production
PORT=3000
```

### 2. Update Webhook URL
Replace `https://your-app-name.vercel.app` with your actual Vercel deployment URL.

### 3. Deploy to Vercel
```bash
npm run deploy
# or
vercel --prod
```

### 4. Set Webhook
After deployment, visit:
```
https://your-app-name.vercel.app/api/setup-webhook
```

## 🔒 Security Notes
- **NEVER commit the .env file to Git**
- **Keep your bot token secure**
- **The token can be used by anyone to control your bot**

## 📱 Test Your Bot
1. Go to [t.me/winlincommunity_bot](https://t.me/winlincommunity_bot)
2. Send `/start` to begin
3. Use `/help` to see all available commands

## 🆘 Support
If you need help with your bot, contact Bot Support on Telegram after ensuring your bot is fully operational.
