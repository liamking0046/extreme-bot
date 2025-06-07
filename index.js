const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { handleReaction, reactionVideos } = require('./commands/reaction');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('Scan the QR code below to log in:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot is ready!');
});

client.on('message', async (message) => {
    const body = message.body.toLowerCase();
    const prefix = '.';

    if (!body.startsWith(prefix)) return;

    const command = body.slice(1).split(' ')[0]; // Remove prefix and get command

    if (reactionVideos[command]) {
        await handleReaction(message, command);
    }
});

client.initialize();

