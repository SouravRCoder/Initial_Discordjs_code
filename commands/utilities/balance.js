const { SlashCommandBuilder, Collection,EmbedBuilder } = require("discord.js");

const { getBalance } = require("../../Helperfunc.js");




module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance')
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to check the inventory for")
                .setRequired(false)
        ),

    async execute(interaction) {
        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Balance')
            .setTimestamp()

        const target = interaction.options.getUser('user') ?? interaction.user;

        await interaction.reply({
            embeds: [Embed.setDescription(`${target.displayName} has ${getBalance(target.id)} 💰`)
                .setFooter({ text: `${Math.abs(Date.now() - interaction.createdTimestamp)} ms` })]
        });
    }

}