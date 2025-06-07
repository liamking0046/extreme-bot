const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

// Predefined reactions and their corresponding GIFs
const reactions = {
    slap: 'slap.gif',
    kiss: 'kiss.gif',
    hug: 'hug.gif',
    angry: 'angry.gif',
    cry: 'cry.gif',
    bite: 'bite.gif',
    pinch: 'pinch.gif',
    punch: 'punch.gif',
    blush: 'blush.gif',
    dance: 'dance.gif',
    facepalm: 'facepalm.gif',
    run: 'run.gif',
    laugh: 'laugh.gif',
    clap: 'clap.gif',
    happy: 'happy.gif'
};

async function handleReaction(client, message, command) {
    const mediaPath = path.join(__dirname, 'media', 'reactions', reactions[command]);

    if (!fs.existsSync(mediaPath)) {
        await message.reply('Reaction GIF not found.');
        return;
    }

    const media = MessageMedia.fromFilePath(mediaPath);

    // Get tagged user (if any)
    const mentioned = message.mentionedIds;
    const sender = message._data.notifyName || 'Someone';

    let caption = '';

    if (mentioned.length > 0) {
        caption = `@${sender} ${command}ed <@${mentioned[0]}>`;
    } else {
        caption = `@${sender} is feeling ${command}`;
    }

    await client.sendMessage(message.from, media, {
        caption: caption,
        mentions: message.mentionedIds
    });
}

module.exports = {
    handleReaction,
    availableReactions: Object.keys(reactions)
};
