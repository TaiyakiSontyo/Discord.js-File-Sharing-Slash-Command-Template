module.exports = {
	data: {
        name: "ping",
        description: "pingを送信します。",
    },
	async execute(interaction) {
        const now = Date.now();
		await interaction.deferReply();
        const sent = await interaction.channel.send('Pinging...');
        await interaction.deleteReply();
        sent.edit(`\`\`\`diff\n! Completed\n+++ ping:${now-interaction.createdTimestamp}ms +++\`\`\``);
	}
}