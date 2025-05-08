const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Replies to Pong'),

    async execute(interaction) {
        
    }

}