require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({ authStrategy: new LocalAuth() });

const { menuText } = require('./commands/menu');
const handleReaction = require('./commands/reaction');
const handlePing = require('./commands/ping');

client.on('qr', (qr) => qrcode.generate(qr, { small: true }));

client.on('ready', () => console.log('✅ Bot is ready'));

client.on('message', async (msg) => {
    const { body, from } = msg;
    const command = body.trim().split(" ")[0].toLowerCase();

    if (command === '.menu') {
        client.sendMessage(from, menuText);
    } else if (command === '.ping') {
        handlePing(client, msg);
    } else {
        // Handle reactions
        handleReaction(client, msg);
    }
});

client.initialize();

