const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

const emotionCommands = {
  kiss: 'https://media.tenor.com/kiW_5RsO5fUAAAPo/ghibli-couple-hugging-and-kissing-hugging.mp4',
  slap: 'https://media.tenor.com/b7lPcGXxKpsAAAPo/shut-up-stfu.mp4',
  angry: 'https://media.tenor.com/2bKwc6q_9IkAAAPo/anime-angry.mp4',
  pinch: 'https://media.tenor.com/yR13xNk3NfMAAAPo/anime-pinch.mp4',
  cry: 'https://media.tenor.com/I22hM9aQwGcAAAPo/sad-cry.mp4',
  hug: 'https://media.tenor.com/5k1OYAwLQ0cAAAPo/anime-hug.mp4',
  bite: 'https://media.tenor.com/YpjgE3UeAx0AAAPo/anime-bite.mp4',
  blush: 'https://media.tenor.com/eDF6-n0ox6QAAAPo/anime-blush.mp4',
  punch: 'https://media.tenor.com/7tP63YbVv5kAAAPo/anime-punch.mp4',
  dance: 'https://media.tenor.com/5xSYYahOJ_cAAAPo/anime-dance.mp4',
  run: 'https://media.tenor.com/_96fR4I68isAAAPo/anime-run.mp4',
  facepalm: 'https://media.tenor.com/GlYRmJYvGeQAAAPo/anime-facepalm.mp4',
  laugh: 'https://media.tenor.com/VDkfQYXsnXwAAAPo/anime-laugh.mp4',
  clap: 'https://media.tenor.com/PH0cZQzPy3gAAAPo/anime-clap.mp4',
  happy: 'https://media.tenor.com/AM8PNMx2G44AAAPo/anime-happy.mp4',
};

async function handleEmotionCommand(message, command) {
  const videoUrl = emotionCommands[command];
  if (!videoUrl) return;

  try {
    const mentions = await message.getMentions();
    const sender = message._data.notifyName || 'Someone';
    const targetName = mentions.length > 0 ? `@${mentions[0].id.user}` : 'themselves';

    const caption = `*${sender}* ${command}ed *${targetName}* 🖤`;

    // Fetch the MP4 video from URL
    const response = await axios.get(videoUrl, {
      responseType: 'arraybuffer'
    });

    // Convert to base64
    const base64Video = Buffer.from(response.data).toString('base64');

    // Create MessageMedia with video/mp4 mime type
    const media = new MessageMedia('video/mp4', base64Video, `${command}.mp4`);

    // Send video with caption and mentions (use message.reply)
    await message.reply(media, undefined, { caption, mentions });
  } catch (err) {
    console.error(`❌ Failed to send .${command} reaction:`, err.message);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  emotionCommands,
  handleEmotionCommand
};
