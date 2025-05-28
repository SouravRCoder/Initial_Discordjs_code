const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave from VC'),

    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        connection.destroy();
    }
}