const { SlashCommandBuilder , AttachmentBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { request } = require('undici');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("Starts a game of tic tac toe.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The target to challenge.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const player1 = interaction.user;
    const player2 = interaction.options.getUser("target");

    if (player2.bot) {
      return interaction.reply("You can't play with bots!");
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder({
        style: 1,
        label: "Accept",
      })
        .setCustomId("tictactoe_accept")
    );

    interaction.reply({
      content: `${player2}, you have been challenged by ${player1} to a game of Tic Tac Toe!`,
      components: [row],
    });

    const filter = (i) => i.customId === "tictactoe_accept" && i.user.id === player2.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (i) => {
      collector.stop();
      const { TicTacToe } = require("discord-gamecord");

      new TicTacToe({
        message: interaction,
        opponent: player2,
        acceptMessage: "Game has started!",
        winMessage: `GG, **{player}** won the game!`,
        gameEndMessage: "The game went unfinished :(",
        drawMessage: "It's a draw!",
        oEmoji: "🔵",
        xEmoji: "❌",
      }).startGame();
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        interaction.editReply("Challenge timed out!");
      }
    });
  },
};
