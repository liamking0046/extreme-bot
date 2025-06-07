const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleReactionCommand, reactionVideos } = require('./commands/reactions');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  console.log('Scan this QR code with WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async message => {
  const text = message.body.toLowerCase();

  if (text.startsWith('.')) {
    const command = text.slice(1).split(' ')[0];

    if (reactionVideos[command]) {
      await handleReactionCommand(message, command);
      return;
    }

    if (command === 'ping') {
      await message.reply('🏓 Pong!');
      return;
    }
  }
});

client.initialize();

 


