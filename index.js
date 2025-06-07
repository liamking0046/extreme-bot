const { sendMenu } = require('./menu');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize client
const client = new Client({
    authStrategy: new LocalAuth()
});

// Show QR code in terminal
client.on('qr', qr => {
    console.log('Scan this QR code with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// On successful connection
client.on('ready', () => {
    console.log('✅ Bot is ready and connected!');
});

// Respond to messages
client.on('message', message => {
    const text = message.body.toLowerCase();

    if (text === '.ping') {
        message.reply('Pong!');
    }

    else if (text === '.menu') {
        sendMenu(client, message);
    }
});

// Start the bot
client.initialize();
