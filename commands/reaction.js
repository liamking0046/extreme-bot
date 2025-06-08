const { TENOR_API_KEY } = require('../config');
const axios = require('axios');

const reactions = [
  'kiss', 'slap', 'angry', 'pinch', 'cry', 'hug', 'bite',
  'blush', 'punch', 'dance', 'run', 'facepalm', 'laugh', 'clap', 'happy'
];

async function fetchGifUrl(keyword) {
  const res = await axios.get(`https://tenor.googleapis.com/v2/search?q=${keyword}&key=${TENOR_API_KEY}&limit=1&media_filter=gif`);
  const gif = res.data.results[0]?.media_formats?.gif?.url;
  return gif;
}

async function handleReactionCommand(command, msg, client) {
  if (!reactions.includes(command)) return;

  const sender = msg._data.notifyName || msg.from;
  const mentions = msg.mentionedIds?.length
    ? msg.mentionedIds.map(id => `@${id.split('@')[0]}`).join(' ')
    : '@everyone';

  try {
    const gifUrl = await fetchGifUrl(command);
    if (!gifUrl) return msg.reply('❌ Could not find a matching GIF.');

    await client.sendMessage(msg.from, `${sender} ${command}s ${mentions}`, {
      mentions: msg.mentionedIds,
    });

    await client.sendMessage(msg.from, gifUrl, { caption: `*${command.toUpperCase()}!*`, sendVideoAsGif: true });
  } catch (error) {
    console.error(`Failed to send ${command} reaction:`, error.message);
    msg.reply('❌ Error sending reaction.');
  }
}

module.exports = { handleReactionCommand };
