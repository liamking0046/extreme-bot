const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { menuText } = require('./menu');
const { handleReactionCommand } = require('./commands/reaction');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('🤖 Bot is ready!');
});

client.on('message', async msg => {
  const chat = await msg.getChat();
  const command = msg.body.toLowerCase();

  // Simple ping command
  if (command === '.ping') {
    return msg.reply('🏓 Pong! I am alive.');
  }

  // Menu command
  if (command === '.menu') {
    const luffyGif = await MessageMedia.fromUrl('https://media.tenor.com/KHM3aNkXaEwAAAAC/luffy-one-piece.gif');
    await msg.reply(luffyGif, undefined, { sendMediaAsSticker: false });
    return client.sendMessage(msg.from, menuText);
  }

  // Reaction commands
  const reactionCommands = [
    '.kiss', '.slap', '.angry', '.pinch', '.cry', '.hug', '.bite', '.blush', '.punch', '.dance',
    '.run', '.facepalm', '.laugh', '.clap', '.happy'
  ];

  if (reactionCommands.includes(command.split(' ')[0])) {
    await handleReactionCommand(msg, command);
  }
});

client.initialize();
