const { Client, Intents, Collection } = require('discord.js');
require('dotenv/config');
const fs = require('node:fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.commands = new Collection();

//functions like eventhandler
const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
//event folder
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
//commands will contain multiple folders
const commandFiles = fs.readdirSync('./src/commands');



(async () => {

    for (const file of functions) {
      require(`./src/functions/${file}`)(client);
    }

    process.on('unhandledRejection', error => {
      console.log('error:', error);
    });
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFiles, "./src/commands");
    client.login(process.env.bot_api);

})();


