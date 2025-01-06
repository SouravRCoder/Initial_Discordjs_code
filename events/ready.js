module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		client.user.setPresence({ activities: [{name: `in ${client.guilds.cache.size} servers` }], status: 'idle' });
		// client.users.send('626741966927036426', `Ready! Logged in as ${client.user.tag}`);

		const channel = await client.channels.fetch('1161942884405231647')
		channel.send({content:`Ready! Logged in as ${client.user.tag}` })
	},
};