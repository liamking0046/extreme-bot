// menu.js
const menuText = `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃        ⚫ LIAM BOT ⚫        
┃━━━━━━━━━━━━━━━━━━━━━┃
┃ 👑 Owner   : Liam Arendsen
┃ 📞 Contact : wa.me/+27833098338
┗━━━━━━━━━━━━━━━━━━━━━┛

🎰 Casino Games (Skill + Chance):
• .slot                 ➜ Spin reels, match combos & win coins
• .blackjack            ➜ Play 21 against the bot (hit/stand/double)
• .roulette [bet]       ➜ Bet numbers/colors, wheel spins, win coins
• .dice [guess]         ➜ Guess dice roll (odd/even/range)
• .coinflip [heads/tails]➜ Flip coin, double or lose coins
• .jackpot [bet]        ➜ Pool bets, guess to boost chance, win big
• .scratchcard          ➜ Pick cards, match pairs, win coins

💖 Fun / Emotions:
• .kiss        • .slap
• .hug         • .laugh
• .angry       • .pinch
• .sad         • .cry
• .pat         • .poke
• .cuddle      • .bite
• .blush       • .dance
• .highfive    • .smile

⚽ FIFA Card Shop:
• .mycards     • .buy
• .sell        • .coins
• .cards       • .market
• .trade @user • .cardinfo [name]

🛠️ Admin Tools:
• .add @user             ➜ Add user to group
• .kick @user            ➜ Remove user from group
• .promote @user         ➜ Make user admin
• .demote @user          ➜ Remove admin rights
• .warn @user            ➜ Give warning
• .resetwarn @user       ➜ Reset warnings
• .delete                ➜ Delete bot's message
• .antilink on/off       ➜ Block group links
• .antispam on/off       ➜ Delete spam
• .antitoxic on/off      ➜ Censor swearing
• .lockgroup on/off      ➜ Lock messaging
• .setdesc [text]        ➜ Set group description
• .setname [name]        ➜ Change group name
• .tagall                ➜ Mention everyone
• .rules [text]          ➜ Set/view rules

📹 Media / Tools:
• .ytmp3 [url]           ➜ YouTube audio
• .ytmp4 [url]           ➜ YouTube video
• .sticker               ➜ Img/video to sticker
• .toimg                 ➜ Sticker to image
• .img [prompt]          ➜ AI image generator
• .quote [text]          ➜ Create quote image
• .ocr                   ➜ Text from image
• .translate [text]      ➜ Translate text
• .weather [location]    ➜ Get weather info
• .wiki [query]          ➜ Wikipedia summary
• .barcode [text]        ➜ Generate barcode
• .qrcode [text/url]     ➜ Generate QR code
• .lyrics [song name]    ➜ Get song lyrics

🤣 Meme & Funny Videos:
• .meme                 ➜ Send a random meme
• .joke                 ➜ Send a funny joke
• .funnyvideo           ➜ Send a random funny video
• .catvid               ➜ Cute cat videos
• .dogvid               ➜ Cute dog videos
• .whatanime            ➜ Guess anime from pics

🎵 Music:
• .play [song]           ➜ Play a song from YouTube
• .pause                 ➜ Pause current song
• .resume                ➜ Resume paused song
• .skip                  ➜ Skip current song
• .queue                 ➜ Show song queue
• .np                    ➜ Now playing info

📺 Streamer:
• .twitch [channel]      ➜ Get Twitch channel info
• .ytchannel [name]      ➜ YouTube channel info
• .livestream [platform] ➜ Get livestream status
• .streamers             ➜ List popular streamers

📊 Leaderboard:
• .leaderboard           ➜ See top coin holders

📎 Misc / Utilities:
• .profile               ➜ View your stats
• .ping                  ➜ Check bot status
• .menu                  ➜ Show this menu
• .help                  ➜ Help guide
• .owner                 ➜ Show bot owner

━━━━━━━━━━━━━━━━━━━━━━━
🔹 Powered by Liam Bot
━━━━━━━━━━━━━━━━━━━━━━━
`;

async function sendMenu(client, message) {
  try {
    // Send Luffy GIF as video message (animated)
    await client.sendMessage(message.from, {
      video: { url: 'https://media.giphy.com/media/MaJS2BMfGk6Hm/giphy.gif' },
      gifPlayback: true,
    });

    // Send menu text separately
    await client.sendMessage(message.from, menuText);
  } catch (error) {
    console.error('Error sending menu:', error);
  }
}

module.exports = { sendMenu };
