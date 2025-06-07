const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

// Map of emotion commands and their corresponding MP4 video URLs
const emotionCommands = {
  kiss: 'https://media.tenor.com/Wx9I2k8u5NIAAAAM/anime-kiss.mp4',
  slap: 'https://media1.tenor.com/m/mxzgfeabiiwaaaad/taiga-toradora.mp4',
  angry: 'https://media.tenor.com/ogSykpROj6wAAAAM/anime-angry.mp4',
  pinch: 'https://media.tenor.com/Dxt6J74vACIAAAAM/anime-pinch.mp4',
  cry: 'https://media.tenor.com/I_tTjuL2DqUAAAAM/sad-cry.mp4',
  hug: 'https://media.tenor.com/BxxAb6Dg9-oAAAAM/anime-hug.mp4',
  bite: 'https://media.tenor.com/VmyWcFaGrhMAAAAM/anime-bite.mp4',
  blush: 'https://media.tenor.com/nNn5DEc10RMAAAAM/anime-blush.mp4',
  punch: 'https://media.tenor.com/yh-hTGHpFxsAAAAM/anime-punch.mp4',
  dance: 'https://media.tenor.com/bBYzk0h7PG0AAAAM/anime-dance.mp4',
  run: 'https://media.tenor.com/nwC1Il1DoDcAAAAM/anime-run.mp4',
  facepalm: 'https://media.tenor.com/N4I6NQZl8AkAAAAM/anime-facepalm.mp4',
  laugh: 'https://media.tenor.com/RdOIkGp7rIQAAAAM/laugh-anime.mp4',
  clap: 'https://media.tenor.com/M0Hkbi9s5tcAAAAM/anime-clap.mp4',
  happy: 'https://media.tenor.com/BJY8-0KzJ4YAAAAM/anime-happy.mp4',
};

async function handleEmotionCommand(message, command) {
  const videoUrl = emotionCommands[command];
  if (!videoUrl) return;

  try {
    const mentions = await message.getMentions();
    const sender = message._data.notifyName || 'Someone';

    // Format tagged user or fallback
    const targetMention = mentions.length > 0
      ? `@${mentions[0].id.user}`
      : 'themselves';

    const caption = `*${sender}* ${command}ed *${targetMention}* 🖤`;

    // Fetch MP4 video from URL as base64
    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const media = new MessageMedia(
      'video/mp4',
      Buffer.from(response.data).toString('base64'),
      `${command}.mp4`
    );

    // Proper mention object format for whatsapp-web.js
    const mentionsArray = mentions.length > 0
      ? [{ id: mentions[0].id._serialized, fromMe: false, participant: null }]
      : [];

    // Send video with caption and mentions
    await message.reply(media, undefined, { caption, mentions: mentionsArray });

  } catch (err) {
    console.error(`❌ Failed to send .${command} reaction:`, err.message);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  emotionCommands,
  handleEmotionCommand
};

