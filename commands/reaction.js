const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

const tenorApiKey = 'AIzaSyC8xhONkfUt3WRkk3Dxi6vLly4PyMXBVOA';

const reactions = [
  'kiss', 'slap', 'angry', 'pinch', 'cry', 'hug', 'bite',
  'blush', 'punch', 'dance', 'run', 'facepalm', 'laugh', 'clap', 'happy'
];

async function getTenorGif(reaction) {
  const url = `https://tenor.googleapis.com/v2/search?q=anime+${reaction}&key=${tenorApiKey}&limit=10&media_filter=gif`;
  try {
    const res = await axios.get(url);
    const gifs = res.data.results;
    if (gifs.length > 0) {
      const random = gifs[Math.floor(Math.random() * gifs.length)];
      return random.media_formats.gif.url;
    } else {
      return null;
    }
  } catch (err) {
    console.error(`Error fetching Tenor GIF for ${reaction}:`, err);
    return null;
  }
}

async function handleReactionCommand(command, message) {
  if (!reactions.includes(command)) return;

  const chat = await message.getChat();
  const sender = message.author || message.from;

  let mentions = [];
  if (message.hasQuotedMsg) {
    const quotedMsg = await message.getQuotedMessage();
    mentions = [quotedMsg.author || quotedMsg.from];
  } else if (message.mentionedIds.length > 0) {
    mentions = message.mentionedIds;
  } else {
    mentions = [sender];
  }

  const mentionText = `@${sender.split('@')[0]} ${command}s @${mentions[0].split('@')[0]}`;

  await message.reply(mentionText, undefined, { mentions: [sender, ...mentions] });

  setTimeout(async () => {
    const gifUrl = await getTenorGif(command);
    if (gifUrl) {
      const media = await MessageMedia.fromUrl(gifUrl);
      await message.reply(media);
    } else {
      await message.reply('⚠️ Failed to fetch a GIF for this reaction.');
    }
  }, 1500);
}

module.exports = { handleReactionCommand };
