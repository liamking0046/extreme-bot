const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

// Replace these links with actual direct .mp4 URLs from Tenor or other trusted hosts
const reactionVideos = {
  kiss: 'https://media.tenor.com/4j4UT0-4xTMAAAPo/peach-and-goma.mp4',
  slap: 'https://media.tenor.com/b7lPcGXxKpsAAAPo/shut-up-stfu.mp4',
  angry: 'https://media.tenor.com/_xFEbRDYBWsAAAPo/angry-mad.mp4',
  hug: 'https://media.tenor.com/oZtU0xcJCdMAAAPo/i-love-you-love-you.mp4'
};

async function handleEmotionCommand(message, command) {
  const videoUrl = reactionVideos[command];
  if (!videoUrl) return;

  try {
    const sender = message._data.notifyName || 'Someone';
    const mentions = await message.getMentions();
    const targetName = mentions[0] ? `@${mentions[0].id.user}` : 'themselves';
    const caption = `*${sender}* ${command}ed *${targetName}* 🖤`;

    // Download video and convert to base64
    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoBase64 = Buffer.from(response.data).toString('base64');

    const media = new MessageMedia('video/mp4', videoBase64, `${command}.mp4`);

    await message.reply(media, undefined, { caption });
  } catch (err) {
    console.error(`❌ Failed to send .${command} reaction:`, err.message);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  reactionVideos,
  handleEmotionCommand
};



