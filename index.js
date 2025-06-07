const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { menuText } = require('./menu'); // Make sure you have menu.js file
const { handleEmotionCommand, emotionCommands } = require('./commands/reactions'); // Correct path

const client = new Client({
  authStrategy: new LocalAuth()
});

// Show QR Code in terminal
client.on('qr', qr => {
  console.log('📱 Scan this QR code with WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// On successful login
client.on('ready', () => {
  console.log('✅ Bot is ready and connected!');
});

// Message handler
client.on('message', async message => {
  const text = message.body.toLowerCase();

  // Simple ping
  if (text === '.ping') {
    return message.reply('🏓 Pong!');
  }

  // Show menu with GIF
  if (text === '.menu') {
    try {
      const gif = MessageMedia.fromFilePath('./media/menu.gif'); // must exist
      await message.reply(gif);
      await message.reply(menuText);
    } catch (err) {
      console.error('❌ Failed to send menu:', err.message);
      return message.reply('❌ Could not send menu.');
    }
    return;
  }

  // Handle emotion commands like .slap, .kiss
  if (text.startsWith('.')) {
    const command = text.slice(1).split(' ')[0]; // .slap -> slap
    if (emotionCommands[command]) {
      try {
        await handleEmotionCommand(message, command);
      } catch (err) {
        console.error(`❌ Error handling .${command}:`, err.message);
        return message.reply(`❌ Failed to run *.${command}*.`);
      }
    }
  }
});

client.initialize();




