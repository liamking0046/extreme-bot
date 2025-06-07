const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

// Map of emotion commands and their corresponding GIF URLs
const emotionCommands = {
  kiss: 'https://media.tenor.com/Wx9I2k8u5NIAAAAM/anime-kiss.gif',
  slap: 'https://media.tenor.com/4hHGbn9I3wYAAAAM/anime-slap.gif',
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

  // Try to get the quoted or tagged user
  const mentions = await message.getMentions();
  const sender = message._data.notifyName || 'Someone';

  const targetName = mentions.length > 0
    ? `@${mentions[0].id.user}`
    : 'themselves';

  const caption = `*${sender}* ${command}ed *${targetName}* 🖤`;

  try {
    const response = await axios.get(gifUrl, { responseType: 'arraybuffer' });
    const media = new MessageMedia('image/gif', response.data.toString('base64'));
    await message.reply(media, undefined, { caption, mentions });
  } catch (err) {
    console.error(`Error fetching or sending ${command} gif:`, err);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  emotionCommands,
  handleEmotionCommand
};
