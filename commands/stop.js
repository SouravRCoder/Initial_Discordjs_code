const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
	.setName('stop')
	.setDMPermission(false)
	.setDescription('break a cmd'),
		
	async execute(interaction) {
		await interaction.reply(`paheli fursat ma nikal`);
	},
    
};
