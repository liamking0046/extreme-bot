const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { menuText } = require('./menu');
const { handleEmotionCommand, emotionCommands } = require('./commands/reactions'); // ✅ Updated path and imports

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
client.on('message', async message => {
    const text = message.body.toLowerCase();

    // Ping command
    if (text === '.ping') {
        return message.reply('Pong!');
    }

    // Menu command
    if (text === '.menu') {
        try {
            const gif = MessageMedia.fromFilePath('./media/menu.gif'); // ✅ Make sure this GIF exists
            await message.reply(gif);
            await message.reply(menuText);
        } catch (err) {
            console.error('Error sending menu:', err);
            return message.reply('❌ Could not send menu.');
        }
        return;
    }

    // Emotion Reaction Commands
    if (text.startsWith('.')) {
        const command = text.slice(1).split(' ')[0];
        if (emotionCommands[command]) {
            try {
                await handleEmotionCommand(message, command);
            } catch (err) {
                console.error(`❌ Error handling .${command}:`, err);
                return message.reply('Something went wrong with the reaction.');
            }
        }
    }
});

// Start the bot
client.initialize();



