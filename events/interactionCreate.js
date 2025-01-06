// const { Events } = require('discord.js');

// module.exports = {
// 	name: Events.InteractionCreate,
// 	async execute(interaction) {
// 		if (!interaction.isChatInputCommand()) return;

// 		const command = interaction.client.commands.get(interaction.commandName);

// 		if (!command) {
// 			console.error(`No command matching ${interaction.commandName} was found.`);
// 			return;
// 		}

// 		try {
// 			await command.execute(interaction);
// 		} catch (error) {
// 			console.error(error);
// 			if (interaction.replied || interaction.deferred) {
// 				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
// 			} else {
// 				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 			}
// 		}
// 	},
// };

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};