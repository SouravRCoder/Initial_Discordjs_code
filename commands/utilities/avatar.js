const {SlashCommandBuilder, Attachment} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Showing your avatar'),

        async execute(interaction){
           const avatar =  await interaction.user.displayAvatarURL({ extension: 'jpg' })

           await interaction.reply({ files: [avatar] });
        }

}