const fetch = require('node-fetch');
const { Telegraf } = require("telegraf");
const config = require('../config/config');
const { saveChatId } = require('./chat.service');


// Replace with your bot's API token and the channel username
const apiToken = config.telegramApiKey

const bot = new Telegraf(apiToken || "");


bot.start(async (ctx) => {
  const username = ctx.message.from.username;
  const chatId = ctx.message.chat.id;
  console.log(chatId);
  saveChatId(chatId);

  const description = `
✨ Welcome aboard, *${username || ctx.message.from.first_name}!* ✨

🎉 Glad to have you here with us!

💰 Get ready to receive your **daily gold price alerts** straight to this chat. Stay updated and never miss a beat on the latest retail gold rates in India 🇮🇳.

⏰ Alerts will come twice a day — morning and evening.

Happy investing! 💛
`;

  ctx.reply(description);
});




module.exports = {
    bot,
};

