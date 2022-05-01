const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap an user')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),

    async execute(interaction) {

        if (interaction.options.getSubcommand() === "user") {

            const Target = interaction.options.getUser('target');
            await interaction.reply({ content: `Succesfully slapped ${Target.username}`, ephemeral: false });
        }


    },

};