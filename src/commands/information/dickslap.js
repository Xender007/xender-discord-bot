const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
const fs = require('fs');
const path = require('path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dickslap')
        .setDescription('Dick Slap an user')
        .addUserOption(option => option.setName('target').setDescription('The user you selected')),

    async execute(interaction) {

        const target = interaction.options.getUser('target');
        const author = interaction.member;


        const canvas = Canvas.createCanvas(700, 350);
        const context = canvas.getContext('2d');

        var slapImage = fs.readFileSync(path.join(__dirname, '../../assets/dslap/dslap1.png'))
        const background = await Canvas.loadImage(slapImage);
    
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Set the color of the stroke
        context.strokeStyle = '#0099ff';
        // Draw a rectangle with the dimensions of the entire canvas
	    context.strokeRect(0, 0, canvas.width, canvas.height);


        if(interaction.options.getMember('target').user.id === '815527402842226710') {
            const authorUserAvatarURL = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'jpg' }));
            context.drawImage(authorUserAvatarURL, 180, 160, 140, 140);
    
            const mentionedUserAvatarURL = await Canvas.loadImage(interaction.options.getMember('target').user.displayAvatarURL({format : "jpg"}));
            context.drawImage(mentionedUserAvatarURL, 335, 15, 150, 150);

            const attachment = new MessageAttachment(canvas.toBuffer(), 'slap-image.png');
            await interaction.reply({ content: `You can't dick slap almighty <@${target.id}>, Instead <@${author.user.id}> got a dick slap!! `, files: [attachment] , ephemeral: false });
        }
        else {
            const authorUserAvatarURL = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'jpg' }));
            context.drawImage(authorUserAvatarURL, 335, 15, 150, 150);
    
            const mentionedUserAvatarURL = await Canvas.loadImage(interaction.options.getMember('target').user.displayAvatarURL({format : "jpg"}));
            context.drawImage(mentionedUserAvatarURL, 180, 160, 140, 140);

            // Use the helpful Attachment class structure to process the file for you
            const attachment = new MessageAttachment(canvas.toBuffer(), 'slap-image.png');
            await interaction.reply({ content: `OMG !!  <@${target.id}> just got dick slapped by <@${author.user.id}>`, files: [attachment] , ephemeral: false });

        }

    },

};

