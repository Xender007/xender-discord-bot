const { SlashCommandBuilder } = require('@discordjs/builders');
const {Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: `Pong!`, ephemeral: true });
		await interaction.editReply({content: `Latency is ${Math.abs(Date.now() - interaction.createdTimestamp)} ms`, ephemeral: true});

	},
};