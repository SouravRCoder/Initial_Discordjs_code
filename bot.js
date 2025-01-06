// Require the necessary discord.js classes
const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');


require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


//---------------Command Handling---------------------- 

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
//------------Events Handling--------------------------

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

// ------------Client Ready-------

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
});

// Express OAUTH2

// const app = express();

// app.get('/', (request, response) => {
// 	console.log(`The access code is: ${request.query.code}`);
// 	return response.sendFile('index.html', { root: '.' });
// });

// app.listen(process.env.port, () => console.log(`App listening at http://localhost:${process.env.port}`));

// Log in to Discord with your client's token
client.login(process.env.Token);


