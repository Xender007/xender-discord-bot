module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {	
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity("/help - get commands.");
	},
};