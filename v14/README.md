# スラッシュコマンド登録方法
deploy-commands.js 28行目の Application-IdをあなたのBotのIDに置き換えます。  
### ID取得方法
デベロッパーポータルからあなたのアプリケーションのページを開き、 General Informationタブに移動します。  
下にスクロールすると APPLICATION ID という物があるのでそれをコピーし、 Application-Idと置き換えてください。  
![image](https://user-images.githubusercontent.com/113648419/235910788-6a4830a7-0b3e-4e7a-ad81-7a5a0181396b.png)  
↑これね これ

置き換えて保存が終わったら、 ターミナルから `node deploy-commands` を実行すれば　登録されます！


# トラブルシューティング

### DiscordAPIError[50035]: Invalid Form Body application_id[NUMBER_TYPE_COERCE]: Value "Application-id" is not snowflake.

README.mdの最初に戻ってやり直してください。

### DiscordAPIError[10002]: Unknown Application  
Application-Idに文字列ではなく数値を書いているようです。  数値の両端に ' ' がついていることを確認してください。  
例: 12345678901234 → '12345678901234'  

### Error: Expected token to be set for this request, but none was present
.envファイルにトークンは設定しましたか？ DISCORD_TOKEN=あなたのBotのtoken のように書く必要があります。

### 'node' は、内部コマンドまたは外部コマンド、操作可能なプログラムまたはバッチ ファイルとして認識されていません。 
Node.jsをインストールしてください。
### Error: Cannot find module 'discord.js' または Error: Cannot find module 'fs' それか Error: Cannot find module 'dotenv'
必要なモジュールがインストールされていません。 `npm i discord.js fs dotenv` を実行してください。
