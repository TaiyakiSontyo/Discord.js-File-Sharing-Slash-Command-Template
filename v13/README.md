# Discord.js-File-Sharing-Slash-Command-Template
discord.js v13,v14 のファイル分け版スラッシュコマンドのテンプレートです。

| package | version |
|:-----------|:------------:|
| "discord.js" | 13.15.1 |
| "dotenv" | 16.0.3 |
| "fs" | 0.0.1-security |

# 使用方法
`.env`ファイルの`TOKEN=`の後にbotのトークンを入れてください。
BotのTOKEN取得方法については[こちらの記事](https://dot-blog.jp/news/discord-bot-token/)を参照してください。

コマンドを追加する場合は`commands`フォルダに`[コマンド名].js`ファイルを作成し、中に
```
module.exports = {
	data: {
        name: "コマンド名を入力",
        description: "コマンドの説明を入力",
    },
	async execute(interaction) {
     //ここに処理を追加
	}
}
```
してください。

また、メッセージを送信する場合は`interaction.reply`が推奨されています。

埋め込みを送信したい場合は
```
const { MessageEmbed } = require('discord.js');
module.exports = {...
```
と`module.exports...`の上に記述してください。
