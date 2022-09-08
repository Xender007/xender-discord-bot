const { SlashCommandBuilder } = require('@discordjs/builders');
const {Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flip')
		.setDescription('Coin Flip'),
	    async execute(interaction) {

            var randomVal =  Math.floor(Math.random() * 2);
            const coinSides = ['Heads', 'Tails'];

            await interaction.reply('Flipping...');
            setTimeout(() => {
                interaction.editReply({content: `Result is ${coinSides[randomVal]} `, ephemeral: false});
            }, 1000)
            

	},
};