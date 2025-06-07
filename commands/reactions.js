const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

// Map of emotion commands and their corresponding MP4 video URLs
const emotionCommands = {
  kiss: 'https://media.tenor.com/4j4UT0-4xTMAAAPo/peach-and-goma.mp4',
  slap: 'https://media.tenor.com/b7lPcGXxKpsAAAPo/shut-up-stfu.mp4',
  angry: 'https://media.tenor.com/_xFEbRDYBWsAAAPo/angry-mad.mp4',
  pinch: 'https://media.tenor.com/4iycqp-7mLEAAAPo/pinch-pinch-cheeks.mp4',
  cry: 'https://media.tenor.com/Ocs_P_9emxoAAAPo/girls%27-last-tour-shoujo-shuumatsu-ryokou.mp4',
  hug: 'https://media.tenor.com/oZtU0xcJCdMAAAPo/i-love-you-love-you.mp4',
  bite: 'https://media.tenor.com/0I_7w_12F4cAAAPo/bite-shoulder.mp4',
  blush: 'https://media.tenor.com/04MHPTs8JYsAAAPo/blush-anime-embarrassing.mp4',
  punch: 'https://media.tenor.com/vQOnKgNwH2kAAAPo/peter-griffin-punch.mp4',
  dance: 'https://media.tenor.com/be0RW1YG7hEAAAPo/6-months-happy-dance.mp4',
  run: 'https://media.tenor.com/-T29lwTa3esAAAPo/moment-comming.mp4',
  facepalm: 'https://media.tenor.com/WxufwY6cQV0AAAPo/facepalm.mp4',
  laugh: 'https://media.tenor.com/keerZWzdwQsAAAPo/laurajs34567.mp4',
  clap: 'https://media.tenor.com/f3_kfNdFAb0AAAPo/leonardo-dicaprio-clapping.mp4',
  happy: 'https://media.tenor.com/vlXSbBQHesoAAAPo/sanjay-sanjay-chat.mp4',
};

async function handleEmotionCommand(message, command) {
  const videoUrl = emotionCommands[command];
  if (!videoUrl) return;

  try {
    const mentions = await message.getMentions();
    const senderName = message._data.notifyName || 'Someone';
    const targetName = mentions.length > 0 ? `@${mentions[0].id.user}` : 'themselves';
    const caption = `*${senderName}* ${command}ed *${targetName}* 🎬`;

    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });

    const media = new MessageMedia(
      'video/mp4',
      Buffer.from(response.data).toString('base64'),
      `${command}.mp4`
    );

    // Send without mentions (avoids deprecated warning)
    await message.reply(media, undefined, { caption });

  } catch (err) {
    console.error(`❌ Failed to send .${command} reaction:`, err.message);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  emotionCommands,
  handleEmotionCommand
};


