module.exports = {
	data: {
        name: "ping",
        description: "pong!と送信します。",
    },
    async execute(interaction) {
        const now = Date.now(); //現在時刻を取得
	await interaction.deferReply(); //考え中...を表示
        const sent = await interaction.channel.send('Pinging...'); //考え中...と同時にPinging...と送信
        await interaction.deleteReply(); //考え中...を削除
        sent.edit(`Pong!`); //Pinging...を編集し、Pong!に書き換える
    }
}
