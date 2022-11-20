const { SlashCommandBuilder, enableValidators } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('server')
	.setDMPermission(true)
	.setDescription('Replies with Server Info'),
		
	async execute(interaction) {
		await interaction.reply(`Server Name: ${interaction.guild.name}\n Total Member: ${interaction.guild.memberCount}`);
	},
};
