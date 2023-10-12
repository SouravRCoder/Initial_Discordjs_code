const { SlashCommandBuilder } = require('discord.js');

const random = () => {
	return Math.floor(Math.random() * 100)
}


module.exports = {
	data: new SlashCommandBuilder()
	.setName('ping')
	.setDMPermission(false)
	.setDescription('Replies with Pong!'),
		
	async execute(interaction) {
		// await interaction.reply({content:`${random()}`, ephemeral: true});
		await interaction.reply(`<:SilverLove:1141063640775151759> pong!`);
		// await interaction.followUp({ content: `Heyo`, ephemeral: true });
		// await interaction.random(`100`);
	},
};