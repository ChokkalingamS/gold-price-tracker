const cron = require('node-cron');
const { sendAlerts } = require('./price.service');

const scheduleGoldPriceUpdates = () => {
    // Morning update - 9:00 AM IST
    cron.schedule('0 9 * * *', () => {
        sendAlerts(); // This should internally handle sending to all saved chat IDs
    }, {
        timezone: "Asia/Kolkata"
    });

    // Evening update - 6:00 PM IST
    cron.schedule('0 18 * * *', () => {
        sendAlerts();
    }, {
        timezone: "Asia/Kolkata"
    });
};

module.exports = { scheduleGoldPriceUpdates };