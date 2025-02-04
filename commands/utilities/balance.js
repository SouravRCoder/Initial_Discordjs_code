const {SlashCommandBuilder, Collection} = require("discord.js");

const {getBalance} = require("../../Helperfunc.js");




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

        async execute(interaction){
            
            const target = interaction.options.getUser('user') ?? interaction.user;

            await interaction.reply(`${target.tag} has ${getBalance(target.id)}💰`);
        }

}