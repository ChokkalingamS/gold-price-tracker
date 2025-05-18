/* eslint-disable no-console */
/* eslint-disable no-undef */

const config = require('../config/config');
const logger = require('../config/logger');
const { getAllChatIds } = require('./chat.service');
const { bot } = require('./telegram.service');

const apiKey = config.priceApiKey;

const getPrice = async () => {
  try {
    const response = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=XAU`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching gold price:', error);
  }
};

const sendAlerts = async () => {
  try {
    const data = await getPrice();
   
    if (data.success && data.rates.XAU) {
      const ratePerINR = data.rates.XAU;
      const ratePerOunce = 1 / ratePerINR;
      const perGram = ratePerOunce / 31.1035;
      const markup = 0.08;
      const retail24K = perGram * (1 + markup);
      const retail22K = retail24K * 0.916;

      const priceFormatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
      });
      

      const priceObj = {
        ratePerOunce:priceFormatter.format(ratePerOunce),
        perGram:priceFormatter.format(perGram),
        retail24K:priceFormatter.format(retail24K),
        retail22K: priceFormatter.format(retail22K),
        price8Grams: priceFormatter.format(retail22K * 8),
      };

      const message = `
🌟 Daily Gold Price Alert – India 🇮🇳 🌟

📅 Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Kolkata' })}

⏰ Time: ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}

📍 Location: India

✨ Price for 8 Grams (22K): ${priceObj?.price8Grams}

💍 Retail Price (22K): ${priceObj?.retail22K}

👑 Retail Price (24K): ${priceObj?.retail24K}

      `;

      const chatIds = await getAllChatIds();
      logger.info('Chat IDs:', chatIds);
      for (const chatId of chatIds) {
        await bot.telegram.sendMessage(chatId, message);
      }

      logger.info('Price alert sent successfully',message);
    }
  } catch (error) { 
    console.log(error);
    
  }
};

module.exports = {
  getPrice, sendAlerts
};
