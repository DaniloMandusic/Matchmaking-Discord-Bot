const Discord = require('discord.js');
const client = new Discord.Client();


client.once('ready', () => {

    console.log('FirstBot is online!');

});

const mongoose = require('mongoose');
//insert your username and password
const mongoServer = 'mongodb+srv://<username>:<password>@discordbot.hz7ik.mongodb.net/<DatabaseName>?retryWrites=true&w=majority';

const prefix = '$';
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


for(const file of commandFiles){
    const command = require(`./commands/${file}`);   
    client.commands.set(command.name, command);
}


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'command'){

        client.commands.get('command').execute(message, args, Discord);

    }else if(command === 'addplayer'){

        client.commands.get('addplayer').execute(message,args,Discord);

    }else if(command === 'scrape'){

        client.commands.get('scrape').execute(message,args,Discord);

    }else if(command === 'findteam'){

        client.commands.get('scrape').execute();
        client.commands.get('findTeam').execute(message,args,Discord);

    }
});


//mongoose.set('useFindAndModify', false);

const database = mongoose.connect(mongoServer, {
    useNewUrlParser: true,
    useUnifieldTopology: true,
    useFindAndModify: false
}).then( () =>{

    console.log('Connected to database!');

}).catch((err) => {

    console.log(err);

});

client.login('<Your discord token>');