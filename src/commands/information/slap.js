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

            const target = interaction.options.getUser('target');
            const author = interaction.member.user.id;
            await interaction.reply({ content: `<@${author}> Succesfully slapped <@${target.id}>`, ephemeral: false });
        }


    },

};

//ODE1NTI3NDAyODQyMjI2NzEw.YDttFA.tNai6knxsDASKF_rnSBZgXGd4gc