const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { menuText } = require('./menu');
const { handleReaction, availableReactions } = require('./reactions'); // ⬅️ Add this line

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
        message.reply('Pong!');
    }

    // Menu command
    else if (text === '.menu') {
        try {
            const gif = MessageMedia.fromFilePath('./media/menu.gif'); // Path to your menu GIF
            await message.reply(gif);
            await message.reply(menuText);
        } catch (err) {
            console.error('Error sending menu:', err);
            message.reply('Could not send menu.');
        }
    }

    // Emotion Reactions (e.g. .slap, .kiss)
    else if (text.startsWith('.')) {
        const cmd = text.slice(1).split(' ')[0]; // get the command after "."
        if (availableReactions.includes(cmd)) {
            try {
                await handleReaction(client, message, cmd);
            } catch (err) {
                console.error(`Error handling ${cmd}:`, err);
                message.reply('Something went wrong with the reaction.');
            }
        }
    }
});

// Start the bot
client.initialize();


