const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleEmotionCommand, reactionVideos } = require('./commands/reaction');

const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', qr => {
  console.log('📱 Scan this QR code with WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot is ready!');
});

client.on('message', async message => {
  const text = message.body.toLowerCase().trim();

  if (text.startsWith('.')) {
    const command = text.slice(1).split(' ')[0];
    if (reactionVideos[command]) {
      await handleEmotionCommand(message, command);
    }
  }
});

client.initialize();
