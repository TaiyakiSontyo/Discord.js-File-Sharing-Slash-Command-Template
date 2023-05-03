# Discord.js-File-Sharing-Slash-Command-Template(glitch対応)

## Tokenの取得
デベロッパーポータルから アプリケーションのBotタブを開き、  
Reset Token を押してください。  

![image](https://user-images.githubusercontent.com/113648419/235915955-8010fc23-44d5-41da-ae89-e30cde02e2e2.png)  
↑押したときに表示された文字列を .envのDISCORD_TOKEN= の後にコピペしてください。  
例: DISCORD_TOKEN=hogehogehogehoge... みたいな感じ  
**絶対にこの文字列は誰にも教えないでください。**  

## スラッシュコマンド登録方法
deploy-commands.js 28行目の Application-IdをあなたのBotのIDに置き換えます。  
### ID取得方法
デベロッパーポータルからあなたのアプリケーションのページを開き、 General Informationタブに移動します。  
下にスクロールすると APPLICATION ID という物があるのでそれをコピーし、 Application-Idと置き換えてください。  
![image](https://user-images.githubusercontent.com/113648419/235910788-6a4830a7-0b3e-4e7a-ad81-7a5a0181396b.png)  
↑これね これ

置き換えて保存が終わったら、 ターミナルから `node deploy-commands` を実行すれば　登録されます！

## Botの起動方法 
`node index.js` を実行し、  
Logged in as ○○! が表示されたら成功です！  
(確かGlitchの場合は自動で起動されるのかな？)

...あ、これで起動できなかった方はトラブルシューティングに進んでください...

## トラブルシューティング
### DiscordAPIError[50035]: Invalid Form Body application_id[NUMBER_TYPE_COERCE]: Value "Application-id" is not snowflake.
README.mdの最初に戻ってやり直してください。

### DiscordAPIError[10002]: Unknown Application  
Application-Idに文字列ではなく数値を書いているようです。  数値の両端に ' ' がついていることを確認してください。  
例: 12345678901234 → '12345678901234'  

### Error: Expected token to be set for this request, but none was present, または Error [TOKEN_INVALID]: An invalid token was provided.
.envファイルにトークンは設定しましたか？ DISCORD_TOKEN=あなたのBotのtoken のように書く必要があります。

### ExpectedConstraintError: Invalid string format  
スラッシュコマンドの名前に大文字アルファベットや日本語は使えません。 すべて小文字のアルファベットに統一してください。  

## コマンドの追加方法
```js
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('スラッシュコマンドの名前')
        .setDescription('説明'),
    async execute(interaction) {
        await interaction.reply('実行された際の応答');
    }
}
```  
基本的にはこんな感じで書きます。  
ファイル名は コマンド名.js の方が分かりやすいかも？  

### 関連サイト
[discord.jsのドキュメント](https://old.discordjs.dev/)  
[discord.jsの公式ガイド](https://discordjs.guide/)  
[discord.jsの公式サイト](https://discord.js.org/)  
