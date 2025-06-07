const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { menuText } = require('./menu');
const { handleEmotionCommand, emotionCommands } = require('./commands/reactions'); // ✅ Import reactions

// Initialize client
const client = new Client({
    authStrategy: new LocalAuth()
});

// Show QR code
client.on('qr', qr => {
    console.log('Scan this QR code with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Bot is ready
client.on('ready', () => {
    console.log('✅ Bot is ready and connected!');
});

// Handle incoming messages
client.on('message', async message => {
    const text = message.body.toLowerCase();

    // 1. Ping
    if (text === '.ping') {
        return message.reply('🏓 Pong!');
    }

    // 2. Menu (send GIF first, then text)
    if (text === '.menu') {
        try {
            const gif = MessageMedia.fromFilePath('./media/menu.gif'); // Make sure this exists and is a real .gif
            await message.reply(gif);
            await message.reply(menuText);
        } catch (err) {
            console.error('❌ Error sending menu:', err);
            return message.reply('❌ Could not send menu.');
        }
        return;
    }

    // 3. Emotion reactions (.kiss, .slap, etc.)
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

// Start bot
client.initialize();




