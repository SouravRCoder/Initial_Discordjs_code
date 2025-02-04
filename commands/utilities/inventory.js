const { SlashCommandBuilder } = require("discord.js");
const { Users } = require("../../dbObjects.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")

    .setDescription("Check your inventory")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to check the inventory for")
        .setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user") ?? interaction.user;
    const user = await Users.findOne({ where: { user_id: target.id } });

    if (!user) {
      return interaction.reply(`${target.tag} does not have an inventory.`);
    }
    const items = await user.getItems();

    if (!items.length) {
      await interaction.reply(`${target.tag} has nothing!`);
    } else {
      await interaction.reply(
        `${target.tag} currently has ${items
          .map((i) => `${i.amount} ${i.item.name}`)
          .join(", ")}`
      );
    }
  },
};
