
const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

const emotionCommands = {
  kiss: 'https://media.tenor.com/Wx9I2k8u5NIAAAAM/anime-kiss.gif',
  slap: 'https://media1.tenor.com/m/mxzgfeabiiwaaaad/taiga-toradora.gif',
  angry: 'https://media.tenor.com/ogSykpROj6wAAAAM/anime-angry.gif',
  pinch: 'https://media.tenor.com/Dxt6J74vACIAAAAM/anime-pinch.gif',
  cry: 'https://media.tenor.com/I_tTjuL2DqUAAAAM/sad-cry.gif',
  hug: 'https://media.tenor.com/BxxAb6Dg9-oAAAAM/anime-hug.gif',
  bite: 'https://media.tenor.com/VmyWcFaGrhMAAAAM/anime-bite.gif',
  blush: 'https://media.tenor.com/nNn5DEc10RMAAAAM/anime-blush.gif',
  punch: 'https://media.tenor.com/yh-hTGHpFxsAAAAM/anime-punch.gif',
  dance: 'https://media.tenor.com/bBYzk0h7PG0AAAAM/anime-dance.gif',
  run: 'https://media.tenor.com/nwC1Il1DoDcAAAAM/anime-run.gif',
  facepalm: 'https://media.tenor.com/N4I6NQZl8AkAAAAM/anime-facepalm.gif',
  laugh: 'https://media.tenor.com/RdOIkGp7rIQAAAAM/laugh-anime.gif',
  clap: 'https://media.tenor.com/M0Hkbi9s5tcAAAAM/anime-clap.gif',
  happy: 'https://media.tenor.com/BJY8-0KzJ4YAAAAM/anime-happy.gif',
};

async function handleEmotionCommand(message, command) {
  const gifUrl = emotionCommands[command];
  if (!gifUrl) return;

  try {
    const mentions = await message.getMentions(); // Contact[]
    const mentionIds = mentions.map(m => m.id._serialized); // ✅ FIXED: use ID strings
    const senderName = message._data.notifyName || 'Someone';
    const targetName = mentionIds.length > 0 ? `@${mentionIds[0].split('@')[0]}` : 'themselves';
    const caption = `*${senderName}* ${command}ed *${targetName}* 🖤`;

    const response = await axios.get(gifUrl, { responseType: 'arraybuffer' });
    const media = new MessageMedia('image/gif', Buffer.from(response.data).toString('base64'), `${command}.gif`);

    await message.reply(media, undefined, { caption, mentions: mentionIds }); // ✅ Now uses correct format
  } catch (err) {
    console.error(`❌ Failed to send .${command} reaction:`, err.message);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  emotionCommands,
  handleEmotionCommand
};
