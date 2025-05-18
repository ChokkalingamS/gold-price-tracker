const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'chatIds.json');

// Ensure the file exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

const saveChatId = (chatId) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.includes(chatId)) {
        data.push(chatId);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
};

const getAllChatIds = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

module.exports = { saveChatId, getAllChatIds };