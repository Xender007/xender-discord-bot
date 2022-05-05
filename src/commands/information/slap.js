const { SlashCommandBuilder } = require('@discordjs/builders');
const {Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');
//const {Canvas} = require('canvacord');
const Canvas = require('canvas');
const fs = require('fs');
const path = require('path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap an user')
        .addUserOption(option => option.setName('target').setDescription('The user you selected')),

    async execute(interaction) {

        const target = interaction.options.getUser('target');
        const author = interaction.member;

        // const mentionedUserAvatarURL = interaction.options.getMember('target').user.displayAvatarURL({format : "png"});
        // const authorUserAvatarURL = interaction.user.displayAvatarURL({format : "png"});
        // const image = await Canvas.slap(authorUserAvatarURL, mentionedUserAvatarURL);
        // const attachment = new MessageAttachment(image, 'image.png');
        // console.log(attachment);
        // await interaction.reply({ content: `<@${author.user.id}> Succesfully slapped <@${target.id}>`, files: [attachment] , ephemeral: false });


        const canvas = Canvas.createCanvas(700, 350);
        const context = canvas.getContext('2d');

        var slapImage = fs.readFileSync(path.join(__dirname, '../../assets/slap/slap1.jpg'))
        const background = await Canvas.loadImage(slapImage);
    
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Set the color of the stroke
        context.strokeStyle = '#0099ff';
        // Draw a rectangle with the dimensions of the entire canvas
	    context.strokeRect(0, 0, canvas.width, canvas.height);

        const authorUserAvatarURL = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'jpg' }));
        context.drawImage(authorUserAvatarURL, 440, 20, 110, 110);

        const mentionedUserAvatarURL = await Canvas.loadImage(interaction.options.getMember('target').user.displayAvatarURL({format : "jpg"}));
        context.drawImage(mentionedUserAvatarURL, 160, 40, 85, 85);

        
        // Use the helpful Attachment class structure to process the file for you
        const attachment = new MessageAttachment(canvas.toBuffer(), 'slap-image.png');

  
        await interaction.reply({ content: `<@${author.user.id}>  slapped <@${target.id}>`, files: [attachment] , ephemeral: true });

    },

};

