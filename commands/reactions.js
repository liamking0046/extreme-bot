const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

// Directory to cache videos after downloading (optional but recommended)
const cacheDir = path.join(__dirname, '..', 'media', 'reactions');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

async function downloadVideoIfNotExists(command) {
  const videoUrl = emotionCommands[command];
  if (!videoUrl) throw new Error(`No video URL found for command: ${command}`);

  const filePath = path.join(cacheDir, `${command}.mp4`);
  if (fs.existsSync(filePath)) return filePath;

  const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(filePath, response.data);
  return filePath;
}

async function handleEmotionCommand(message, command) {
  try {
    const filePath = await downloadVideoIfNotExists(command);
    const media = MessageMedia.fromFilePath(filePath);

    const mentions = await message.getMentions();
    const mentionIds = mentions.map(c => c.id._serialized);

    // Get sender name more safely
    const senderName = message._data?.notifyName || message.author || 'Someone';
    const targetName = mentions.length > 0 ? `@${mentions[0].id.user}` : 'themselves';
    const caption = `*${senderName}* ${command}ed *${targetName}* 🎬`;

    // Send video with caption and mention IDs array (strings)
    await message.reply(media, undefined, { caption, mentions: mentionIds });

  } catch (err) {
    console.error(`❌ Failed to send .${command} reaction:`, err.message);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  emotionCommands,
  handleEmotionCommand
};


