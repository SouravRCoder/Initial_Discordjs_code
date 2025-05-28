const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guess_number")
    .setDescription("Guess a number between 1 and 10"),

  async execute(interaction) {

    const user = interaction.user.username;
    const user_avatar = interaction.user.avatarURL();

    const guess_number = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Guess a Number")
      .setDescription("Guess a number between 1 and 10")
      .setTimestamp();

    
    interaction.reply({ embeds: [guess_number.setFooter({ text: `${Math.abs(Date.now() - interaction.createdTimestamp)} ms`})] });

    const number = Math.floor(Math.random() * 10) + 1;

    const filter = response => {
        return response.author.id === interaction.user.id;
      };
  
      interaction.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
        .then(collected => {
          const guess = parseInt(collected.first().content, 10);
          if (guess == number) {
            interaction.followUp({embeds:[guess_number.setDescription(`Congratulations! You guessed the correct number: ${number}`).setFooter({ text: `${Math.abs(Date.now() - interaction.createdTimestamp)} ms`})]});
          } else {
            interaction.followUp({embeds:[guess_number.setDescription(`Sorry, the correct number was ${number}. Better luck next time!`).setFooter({ text: `${Math.abs(Date.now() - interaction.createdTimestamp)} ms`})]});
          }
        })
        .catch(collected => {
          interaction.followUp({embeds:[guess_number.setDescription('You did not provide a valid guess in time!').setFooter({ text: `${Math.abs(Date.now() - interaction.createdTimestamp)} ms`})]});
        });
    },
  };
