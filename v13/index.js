const { Client, Intents } = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

const client = new Client({
    partials: ["CHANNEL"],
    intents: new Intents(32767),
    restTimeOffset: -1000,
  });

if (process.env.TOKEN == undefined) {
  console.error("tokenが設定されていません!");
  process.exit(0);
}

const commands = {}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.data.name] = command
}

client.once("ready", async () => {
    const data = []
    for (const commandName in commands) {
        data.push(commands[commandName].data)
    }
    await client.application.commands.set(data);
});

client.on("ready", async () => {
    client.user.setActivity(`/ping`, {
      type: "PLAYING",
    });
    client.user.setStatus("dnd");
    console.log(`${client.user.tag} is ready!`);
});

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

client.login(process.env.TOKEN);
