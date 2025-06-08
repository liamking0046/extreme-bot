const fetch = require('node-fetch');

const tenorApiKey = 'AIzaSyC8xhONkfUt3WRkk3Dxi6vLly4PyMXBVOA';
const tenorBaseUrl = 'https://tenor.googleapis.com/v2/search';

const reactionCommands = [
  'kiss', 'slap', 'angry', 'pinch', 'cry', 'hug', 'bite',
  'blush', 'punch', 'dance', 'run', 'facepalm', 'laugh', 'clap', 'happy'
];

module.exports = async function handleReactionCommand(command, message, client) {
  const mentionedUsers = message.mentionedIds;
  const senderContact = await message.getContact();

  if (!reactionCommands.includes(command)) return;

  if (mentionedUsers.length === 0) {
    return message.reply(`Please mention someone to ${command}.`);
  }

  const targetUser = mentionedUsers[0];
  const senderName = senderContact.pushname || senderContact.number;

  // Search Tenor with random result using 'random=true'
  const url = `${tenorBaseUrl}?q=${command}&key=${tenorApiKey}&limit=10&random=true&media_filter=minimal`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const gifResults = data.results;

    if (!gifResults || gifResults.length === 0) {
      return message.reply(`Sorry, couldn't find a GIF for ${command}.`);
    }

    // Pick a random gif from the list
    const randomGif = gifResults[Math.floor(Math.random() * gifResults.length)];
    const gifUrl = randomGif.media_formats.gif.url;

    const taggedUser = `@${targetUser.replace(/@c\.us$/, '')}`;
    const senderTag = `@${senderContact.number}`;

    await message.reply(`${senderTag} ${command}ed ${taggedUser}`, {
      mentions: [targetUser, senderContact.id._serialized]
    });

    // Delay sending the GIF
    setTimeout(() => {
      client.sendMessage(message.from, gifUrl, {
        mentions: [targetUser, senderContact.id._serialized],
        caption: `${senderName} ${command}ed ${taggedUser}`
      });
    }, 1500);
  } catch (err) {
    console.error(`Error in .${command}:`, err);
    message.reply(`Failed to send .${command} reaction.`);
  }
};
