// Require the necessary discord.js pakages

const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits , EmbedBuilder } = require('discord.js');


require('dotenv').config();

// Require the necessary Currency System pakages

const { Op } = require('sequelize');
const {codeBlock} = require('discord.js');
const { Users, CurrencyShop } = require('./dbObjects.js');
const {currency , addBalance} = require('./Helperfunc.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



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

client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;
	addBalance(message.author.id, 1);
});

//---------------For Prefix Functions---------------------




// ---------------PREFIX SIDE COMMAND----------------




client.on(Events.MessageCreate, async message => {
	if (message.content === '!guess') {
        	const guess_number = new EmbedBuilder()
			  .setColor(0x0099ff)
			  .setTitle("Guess a Number")
			  .setDescription("Guess a number between 1 and 10")
			  .setTimestamp();
		
			
			message.reply({ embeds: [guess_number] });
		
			const number = Math.floor(Math.random() * 10) + 1;
		
			const filter = response => {
				return response.author.id === message.author.id;
			  };
		  
			  message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
				.then(collected => {
				  const guess = parseInt(collected.first().content, 10);
				  if (guess == number) {
					message.channel.send(`Congratulations! You guessed the correct number: ${number}`);
				  } else {
					message.channel.send(`The correct number was ${number}. Better luck next time!`);
				  }
				})
				.catch(collected => {
				  message.channel.send('You did not provide a valid guess in time!');
				});
    }
});



client.login(process.env.Token);


