const { SlashCommandBuilder } = require('@discordjs/builders');
const {Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');
const {Canvas} = require('canvacord');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap an user')
        .addUserOption(option => option.setName('target').setDescription('The user you selected')),

    async execute(interaction) {

        const target = interaction.options.getUser('target');
        const author = interaction.member;

        const mentionedUserAvatarURL = interaction.options.getMember('target').user.displayAvatarURL({format : "png"});
        const authorUserAvatarURL = interaction.user.displayAvatarURL({format : "png"});

        const image = await Canvas.slap(mentionedUserAvatarURL, authorUserAvatarURL);
        const attachment = new MessageAttachment(image, 'image.png')

        await interaction.reply({ content: `<@${author.user.id}> Succesfully slapped <@${target.id}>`, files: [attachment] , ephemeral: false });

    },

};

