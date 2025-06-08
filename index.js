const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleReactionCommand } = require('./commands/reaction');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

client.on('qr', (qr) => {
  console.log('Scan the QR below:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot is ready!');
});

client.on('message', async (msg) => {
  const body = msg.body.toLowerCase();

  // Basic Ping Command
  if (body === '.ping') {
    return msg.reply('🏓 Pong!');
  }

  // Menu Command
  if (body === '.menu') {
    const { menuText } = require('./menu');
    return msg.reply(menuText);
  }

  // Reactions
  const command = body.startsWith('.') ? body.slice(1).split(' ')[0] : '';
  await handleReactionCommand(command, msg, client);
});

client.initialize();
