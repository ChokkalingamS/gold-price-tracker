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
  console.log(chatId)
  saveChatId(chatId);
    // const webAppUrlWithUsername = `${webAppUrl}?username=${username}`;
    // const imageUrl = `${webAppUrl}/assets/images/pluscoin.png`;
    const description = `
Hi, @${username || ctx.message.from.first_name}

  `;
  
  ctx.reply(description);
  
    
});




module.exports = {
    bot,
};

