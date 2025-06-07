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
    try {
        const gif = MessageMedia.fromFilePath('./media/menu.gif'); // Path to your Luffy GIF
        await message.reply(gif);         // Send the animated GIF first
        await message.reply(menuText);    // Then send the menu text
    } catch (err) {
        console.error('Error sending menu:', err);
        message.reply('Could not send menu.');
    }
}
  
});

// Start the bot
client.initialize();
