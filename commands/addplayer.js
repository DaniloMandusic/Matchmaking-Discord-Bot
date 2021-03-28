module.exports = {
    name:'addplayer',
    description: "Add players username to database so it can be used for scraping",
    execute(message, args, Discord){

        const username = args.join(' ');

        if(!username) return message.channel.send('Please enter an username');
        else{ 
            const profileModel = require('../models/profileSchema');

            new profileModel({

                userID: message.author.id,
                playerUsername: username,
                playerRank: 'unranked',
                discordName: message.author.username,
                playerLevel: 0

            }).save();
            
        }

        return message.channel.send(username + ' added successfully');
    }
        
}
