const { executionAsyncResource } = require('async_hooks');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
 
const { YTSearcher } = require('ytsearcher');
 
const searcher = new YTSearcher({
    key: process.env.youtube_api,
    revealed: true
});
 
const client = new Discord.Client();
 
const queue = new Map();


client.on('ready', () => {
    console.log('XeNDeR Bot is running');
    client.user.setActivity("!help - get commands.");
});


 
client.on("message", async(message) => {
    const prefix = '!';
 
    const serverQueue = queue.get(message.guild.id);
 
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
 
    switch(command){
        case 'play':
            execute(message, serverQueue);
            break;
        case 'stop':
            stop(message, serverQueue);
            break;
        case 'skip':
            skip(message, serverQueue);
            break;
        case 'help':
            help(message);
            break;
        case 'ping':
            ping(message);
            break;
    }
 
    async function execute(message, serverQueue){
        //if(command === 'play'){
        let vc = message.member.voice.channel;
            if(!vc){
                return message.channel.send("Please join a voice chat first");
            }else{
                let result = await searcher.search(args.join(" "), { type: "video" })
                const songInfo = await ytdl.getInfo(result.first.url)
    
                let song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url
                };
    
                if(!serverQueue){
                    const queueConstructor = {
                        txtChannel: message.channel,
                        vChannel: vc,
                        connection: null,
                        songs: [],
                        volume: 10,
                        playing: true
                    };
                    queue.set(message.guild.id, queueConstructor);
    
                    queueConstructor.songs.push(song);
    
                    try{
                        let connection = await vc.join();
                        queueConstructor.connection = connection;
                        play(message.guild, queueConstructor.songs[0]);
                    }catch (err){
                        console.error(err);
                        queue.delete(message.guild.id);
                        return message.channel.send(`Unable to join the voice chat ${err}`)
                    }
                }else{
                    serverQueue.songs.push(song);
                    return message.channel.send(`The song has been added ${song.url}`);
                }
            }
        //}
    }
    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
            serverQueue.vChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].url}`)
    }
    function stop (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first!")
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
    function skip (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first");
        if(!serverQueue)
            return message.channel.send("There is nothing to skip!");
        serverQueue.connection.dispatcher.end();
    }
    function help (message) {
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'Some title',
            url: 'https://discord.js.org',
            author: {
                name: 'Some name',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
                url: 'https://discord.js.org',
            },
            description: 'Some description here',
            thumbnail: {
                url: 'https://i.imgur.com/wSTFkRM.png',
            },
            fields: [
                {
                    name: 'Regular field title',
                    value: 'Some value here',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
            ],
            image: {
                url: 'https://i.imgur.com/wSTFkRM.png',
            },
            timestamp: new Date(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
            },
        };
        
        return channel.send({ embed: exampleEmbed });
    }
    function ping (message) {
        return message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
    
});

client.login(process.env.token);
 
        
