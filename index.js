// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// import Commands in commands folder 
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection

	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
// Import event command from events folder

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
// When the client is ready, run this code (only once)
// client.once('ready', () => {
// 	console.log('Ready!');
// });
//Commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	// const { commandName } = interaction;

	// if (commandName === 'ping') {
	// 	await interaction.reply('Pong!');
	// } else if (commandName === 'server') {
	// 	await interaction.reply(`Server Name = ${interaction.guild.name}\n Total Member: ${interaction.guild.memberCount}`);
	// } else if (commandName === 'user') {
	// 	await interaction.reply(`User info.\n ${interaction.user.tag} \n Id : ${interaction.user.id}`);
	// }


	// ---------------Dynamically executing commands---------------------------------
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



// Login to Discord with your client's token
client.login(token);