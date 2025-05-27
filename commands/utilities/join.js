const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join into VC'),

    async execute(interaction) {
        const connection = joinVoiceChannel({
            channelId: interaction.channel.id,
            guildId: interaction.channel.guild.id,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        });

        const voiceChannelId = interaction.voiceChannelId

        // if (voiceChannelId) {
        //     console.log(`User is in voice channel: ${voiceChannelId}`);
        // } else {
        //     console.log("User is not in a voice channel.");
        // }


        connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
            console.log('The connection has entered the Ready state - ready to play audio!');
            interaction.reply({ content: `Successfully Connected in VC Channel!!`});
        });
    }
}