const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

// Emotion command -> .mp4 link (more WhatsApp-friendly)
const emotionCommands = {
  kiss: 'https://media.tenor.com/kiW_5RsO5fUAAAPo/ghibli-couple-hugging-and-kissing-hugging.mp4',
  slap: 'https://media.tenor.com/MXZGFeabIIwAAAPo/taiga-toradora.mp4',
  angry: 'https://media.tenor.com/ogSykpROj6wAAAd/anime-angry.mp4',
  pinch: 'https://media.tenor.com/Dxt6J74vACIAAAAd/anime-pinch.mp4',
  cry: 'https://media.tenor.com/I_tTjuL2DqUAAAd/sad-cry.mp4',
  hug: 'https://media.tenor.com/BxxAb6Dg9-oAAAd/anime-hug.mp4',
  bite: 'https://media.tenor.com/VmyWcFaGrhMAAAAd/anime-bite.mp4',
  blush: 'https://media.tenor.com/nNn5DEc10RMAAAAd/anime-blush.mp4',
  punch: 'https://media.tenor.com/yh-hTGHpFxsAAAd/anime-punch.mp4',
  dance: 'https://media.tenor.com/bBYzk0h7PG0AAAd/anime-dance.mp4',
  run: 'https://media.tenor.com/nwC1Il1DoDcAAAd/anime-run.mp4',
  facepalm: 'https://media.tenor.com/N4I6NQZl8AkAAAd/anime-facepalm.mp4',
  laugh: 'https://media.tenor.com/RdOIkGp7rIQAAAd/laugh-anime.mp4',
  clap: 'https://media.tenor.com/M0Hkbi9s5tcAAAd/anime-clap.mp4',
  happy: 'https://media.tenor.com/BJY8-0KzJ4YAAAd/anime-happy.mp4',
};

async function handleEmotionCommand(message, command) {
  const videoUrl = emotionCommands[command];
  if (!videoUrl) return;

  try {
    const mentions = await message.getMentions();
    const sender = message._data.notifyName || 'Someone';
    const targetName = mentions.length > 0
      ? `@${mentions[0].id.user}`
      : 'themselves';

    const caption = `*${sender}* ${command}ed *${targetName}* 🖤`;

    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });

    const media = new MessageMedia(
      'video/mp4',
      Buffer.from(response.data).toString('base64'),
      `${command}.mp4`
    );

    await message.reply(media, undefined, { caption, mentions });
  } catch (err) {
    console.error(`❌ Failed to send .${command} reaction:`, err.message);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  emotionCommands,
  handleEmotionCommand,
};

