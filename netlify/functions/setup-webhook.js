const fetch = require('node-fetch');

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

exports.handler = async (event, context) => {
  try {
    if (!BOT_TOKEN) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'BOT_TOKEN not configured' })
      };
    }
    
    if (!WEBHOOK_URL) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'WEBHOOK_URL not configured' })
      };
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
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: 'success',
          message: 'Webhook set successfully',
          webhook_url: webhookUrl
        })
      };
    } else {
      console.error('Failed to set webhook:', result);
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: 'error',
          message: 'Failed to set webhook',
          telegram_error: result
        })
      };
    }
  } catch (error) {
    console.error('Error setting webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: 'Internal server error',
        error: error.message
      })
    };
  }
};
