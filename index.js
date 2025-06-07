const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { handleReactionCommand, reactionVideos } = require('./commands/reaction');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot is ready!');
});

client.on('message_create', async (msg) => {
  if (!msg.body.startsWith('.')) return;
  const command = msg.body.slice(1).split(' ')[0].toLowerCase();

  if (reactionVideos[command]) {
    await handleReactionCommand(msg, command);
  }
});

client.initialize();
