const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

const emotionCommands = {
  kiss: 'https://media1.tenor.com/m/kiW_5RsO5fUAAAAd/ghibli-couple-hugging-and-kissing-hugging.gif',
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
    const mentions = await message.getMentions();
    const senderName = message._data.notifyName || 'Someone';

    // Get mention IDs as strings
    const mentionIds = mentions.map(m => m.id._serialized);

    let caption = '';
    let mentionsToSend = [];

    if (mentionIds.length > 0) {
      // Extract only the numeric part for caption mention (remove '@c.us')
      const targetTag = '@' + mentionIds[0].split('@')[0];
      caption = `*${senderName}* ${command}ed *${targetTag}* 🖤`;
      mentionsToSend = mentionIds; // must be array of serialized IDs
    } else {
      caption = `*${senderName}* ${command}ed themselves 🖤`;
      mentionsToSend = [];
    }

    // Download gif and convert to base64
    const response = await axios.get(gifUrl, { responseType: 'arraybuffer' });
    const media = new MessageMedia('image/gif', Buffer.from(response.data).toString('base64'), `${command}.gif`);

    if (mentionsToSend.length > 0) {
      // Send with mentions option
      await message.reply(media, undefined, { caption, mentions: mentionsToSend });
    } else {
      await message.reply(media, caption);
    }

  } catch (err) {
    console.error(`❌ Failed to send .${command} reaction:`, err);
    await message.reply(`❌ Could not send *.${command}* reaction.`);
  }
}

module.exports = {
  emotionCommands,
  handleEmotionCommand,
};

