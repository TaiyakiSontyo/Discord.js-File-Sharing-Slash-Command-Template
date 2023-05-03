const { REST, Routes } = require('discord.js'); // discord.jsを使うことを宣言します
require('dotenv').config() // dotenvを使うことを宣言します
const fs = require('fs'); // fsを使うことを宣言します
const path = require('path'); // path を使うことを宣言します
// 宣言祭りですね

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) { // commandFilesをすべて読み込みます
    const command = require(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON()); // 登録するコマンドをあらかじめここで用意しておきます
    } else {
        console.log(`[警告] ${filePath} にはスラッシュコマンドの登録に必要な "data" または "execute" が足りません。正しい構文になっていることを確認してください。`);
    } // 何かが足りなかった場合に警告を表示します。
}


const rest = new REST().setToken(process.env.DISCORD_TOKEN); // REST という物を使ってスラッシュコマンドの登録を実行します。

// スラッシュコマンドを登録します！
(async () => {
    try {
        console.log(`${commands.length} 個のスラッシュコマンドを登録します`);

        const data = await rest.put(
            Routes.applicationCommands('Application-Id'), // Application-IdにはあなたのBotのIDを入れてください。
            { body: commands }, // 先ほど用意したコマンドをすべてここで登録します
        )
        console.log(`${data.length} 個のスラッシュコマンドの登録に成功しました！`);
    } catch (error) {
        console.error(error); // スラッシュコマンドの登録に失敗した場合のエラーが表示されます。
    }
})();