const { Client, GatewayIntentBits, Collection } = require('discord.js'); // discord.jsを使うことを宣言(めちゃくちゃ使います)
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // サーバー情報を読み取れるように設定

require('dotenv').config(); // dotenvを使うことを宣言(トークンを読み取るときに使います)
const fs = require('fs'); // fsを使うことを宣言(このfsはファイル分けしたコマンドを読み取るときなどに使います)
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // commands フォルダ内の 拡張子が.jsの物のみを用意します
for (const file of commandFiles) {
    try {
        const interaction = require(`./commands/${file}`);
        client.commands.set(interaction.data.name, interaction);
        console.log(`Loaded interaction command ${file}`);  // 読み込めたことをコンソールで報告します
    } catch (err) {
        console.error(`Unable to load file ${file}: ${err}`); // 読み込めなかった場合は コンソールでエラーと一緒に報告します
    }
};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); //ログインしたユーザー名を表示します
});

client.on('interactionCreate', async interaction => { // スラッシュコマンドが実行された際に発生する インタラクション というイベント
   if (!interaction.isChatInputCommand()) return; // 発生したイベントが スラッシュコマンドではなければ処理を停止します。(ボタンとかもインタラクションイベントなんだよね)
   const command = client.commands.get(interaction.commandName);
        if (!command) return; // 実行したコマンド名の処理が存在しなかったら処理を停止
        try {
            await command.execute(interaction); // 処理を実行
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true }); // 実行中にエラーが発生したら報告
        }
});

client.login(process.env.DISCORD_TOKEN); //.envのDISCORD_TOKENを読み取りログイン
