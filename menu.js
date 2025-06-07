// menu.js
const menuText = `
╔══✪〘 LIAM BOT MENU 〙✪══
║
║ 👑 Owner: Liam Arendsen
║ 📞 Contact: 0833098338
║ 🖼️ Wallpaper: https://wallpaperaccess.com/full/842245.jpg
║
╠═════════════
║ 🎭 EMOTIONS
╠═════════════
║ 1. .kiss    - Send a kiss 💋
║ 2. .slap    - Slap someone 👋
║ 3. .angry   - Show anger 😠
║ 4. .pinch   - Pinch someone 🤏
║ 5. .laugh   - Laugh out loud 😂
║ 6. .hug     - Send a hug 🤗
║
╠═════════════
║ 🎮 GAMES
╠═════════════
║ 7. .gtn        - Guess the Number 🎲
║ 8. .dice       - Roll a Dice 🎲
║ 9. .rps        - Rock Paper Scissors ✂️
║ 10. .flipcoin  - Flip a Coin 🪙
║ 11. .tictactoe - Play Tic Tac Toe ❌⭕
║ 12. .hangman   - Hangman Word Guess 🪦
║ 13. .memory    - Memory Card Game 🧠
║ 14. .trivia    - Trivia Quiz 🧩
║
╠═════════════
║ ⚽ FIFA CARDS
╠═════════════
║ 15. .mycards  - Your collection 🃏
║ 16. .coins    - Check coins 💰
║ 17. .buy     - Buy a card 🛒
║ 18. .sell    - Sell a card 💸
║ 19. .cards   - List all cards 📋
║
╠═════════════
║ 🧰 TOOLS
╠═════════════
║ 20. .ytmp3 <url>       - YouTube MP3 downloader 🎵
║ 21. .add <num>         - Add user to group ➕
║ 22. .kick <num>        - Kick user from group 👢
║ 23. .remove <num>      - Remove user from group 🚫
║ 24. .promote <num>     - Promote to admin 🔰
║ 25. .demote <num>      - Demote admin ⚠️
║ 26. .mute <time>       - Mute group for time ⏲️
║ 27. .unmute            - Unmute group 🔊
║ 28. .warn <num>        - Warn user ⚠️
║ 29. .warnings <num>    - Check warnings 📄
║ 30. .resetwarn <num>   - Reset warnings 🔄
║ 31. .antilink on/off   - Anti-link protection 🚫
║ 32. .antispam on/off   - Spam filter toggle 🚨
║ 33. .antiswear on/off  - Swear word filter 🚫💬
║ 34. .profile           - View your profile 👤
╚═════════════
`;

function sendMenu(client, message) {
    message.reply(menuText);
}

module.exports = { sendMenu };
