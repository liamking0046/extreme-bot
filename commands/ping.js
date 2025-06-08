module.exports = (client, msg) => {
    const start = Date.now();
    client.sendMessage(msg.from, '🏓 Pinging...').then((res) => {
        const end = Date.now();
        res.reply(`✅ Pong! Response time: ${end - start}ms`);
    });
};
