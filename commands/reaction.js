const axios = require('axios');

const reactions = ['kiss', 'slap', 'hug', 'angry', 'cry', 'punch', 'bite', 'blush', 'dance', 'run', 'facepalm', 'laugh', 'clap', 'happy'];

module.exports = async (client, msg) => {
    const text = msg.body.trim().toLowerCase().split(" ")[0].replace(".", "");
    if (!reactions.includes(text)) return;

    try {
        const res = await axios.get(`https://tenor.googleapis.com/v2/search`, {
            params: {
                q: text,
                key: process.env.TENOR_API_KEY,
                limit: 1,
                media_filter: 'minimal'
            }
        });

        const videoUrl = res.data.results[0].media_formats.mp4.url;

        await client.sendMessage(msg.from, videoUrl, { caption: `💫 Reaction: ${text}` });
    } catch (err) {
        console.error(`Error fetching ${text} GIF:`, err.message);
        msg.reply(`❌ Couldn't get a "${text}" reaction.`);
    }
};
