const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

const emotionCommands = {
    slap: 'slap.gif',
    kiss: 'kiss.gif',
    angry: 'angry.gif',
    pinch: 'pinch.gif',
    cry: 'cry.gif',
    hug: 'hug.gif',
    bite: 'bite.gif',
    blush: 'blush.gif',
    punch: 'punch.gif',
    dance: 'dance.gif',
    run: 'run.gif',
    facepalm: 'facepalm.gif',
    laugh: 'laugh.gif',
    clap: 'clap.gif',
    happy: 'happy.gif'
};

const handleEmotionCommand = async (message, command) => {
    const mentioned = message.mentionedIds;
    const sender = message._data.notifyName || message._data.from;

    // Check if command is in the emotionCommands
    if (!emotionCommands[command]) return;

    const filePath = path.join(__dirname, '..', 'media', emotionCommands[command]);

    // Make sure the GIF file exists
    if (!fs.existsSync(filePath)) {
        await message.reply(`❌ Missing file for .${command} in /media folder.`);
        return;
    }

    const media = MessageMedia.fromFilePath(filePath);

    let replyText = '';

    if (mentioned.length > 0) {
        const taggedUser = message.mentionedIds[0];
        replyText = `@${message.author?.split('@')[0] || sender} ${command}ed @${taggedUser.split('@')[0]}`;
    } else {
        replyText = `@${message.author?.split('@')[0] || sender} feels ${command} 😅`;
    }

    // Send the GIF with the formatted text
    await message.reply(media, undefined, {
        caption: replyText,
        mentions: message.getMentions()
    });
};

module.exports = { handleEmotionCommand, emotionCommands };

