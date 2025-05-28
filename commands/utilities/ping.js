const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies to Pong'),

        async execute(interaction){
            const Embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setDescription('Pong')
                .setTimestamp()
            
            await interaction.reply({ embeds:[Embed.setFooter({ text:`${Math.abs(Date.now() - interaction.createdTimestamp)} ms`})]});
        }

}