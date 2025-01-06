const { SlashCommandBuilder } = require("discord.js");
const { AttachmentBuilder, Events } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { request } = require('undici');



// Pass the entire Canvas object because you'll need access to its width and context
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		context.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (context.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return context.font;
};


module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Show your Profile"),

  async execute(interaction) {
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage('./wallpaper.jpg');


	// This uses the canvas dimensions to stretch the image onto the entire canvas
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    // Set the color of the stroke
	context.strokeStyle = '#0099ff';
    
	// Draw a rectangle with the dimensions of the entire canvas
	context.strokeRect(0, 0, canvas.width, canvas.height);

	// Assign the decided font to the canvas
	context.font = applyText(canvas, interaction.member.displayName);
	context.fillStyle = '#ffffff';
	context.fillText(interaction.member.displayName, canvas.width / 2.5, canvas.height / 1.8);
	

	// Select the font size and type from one of the natively available fonts
	context.font = '60px sans-serif';

	// Select the style that will be used to fill the text in
	context.fillStyle = '#ffffff';

	// Actually fill the text with a solid color
	context.fillText(interaction.member.displayName, canvas.width / 2.5, canvas.height / 1.8);

// ---------------------------------------------
	
    // Pick up the pen
	context.beginPath();
	

	// Start the arc to form a circle
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
    
	// Put the pen down
	context.closePath();
    
	// Clip off the region you drew on
	context.clip();
    
    // ---------------------------------------------------
    
    
    
    // Using undici to make HTTP requests for better performance
	const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }));
	const avatar = await Canvas.loadImage(await body.arrayBuffer());
    
	// If you don't care about the performance of HTTP requests, you can instead load the avatar using
	// const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: 'jpg' }));

	
	// Draw a shape onto the main canvas
	// context.drawImage(avatar, 25, 0, 200, canvas.height);
	
	
    // Move the image downwards vertically and constrain its height to 200, so that it's square
	context.drawImage(avatar, 25, 25, 200, 200);
	
    
    
	// Use the helpful Attachment class structure to process the file for you
	const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    
    
	await interaction.reply({ files: [attachment] });
  },
};
