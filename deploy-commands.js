const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');

// const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [];

// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// 	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
// ]
//-----------------------File Handlers-------------------
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	
}
//---------------------------------------------------
// 	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);

    // for guild-based commands
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1021483796660506726'))
// .then(() => console.log('Successfully deleted guild command'))
// .catch(console.error);

// // for global commands
// rest.delete(Routes.applicationCommand(clientId, 'commandId'))
// .then(() => console.log('Successfully deleted application command'))
// .catch(console.error);