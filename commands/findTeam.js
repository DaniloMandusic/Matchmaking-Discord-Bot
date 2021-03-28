module.exports = {

    name : 'findTeam',
    description : 'finds 2 ideal teammates based on database data scraped from internet',
    async execute(message, args, Discord){

        //loop trough database

        const profileModel = require('../models/profileSchema');

        const authorDiscordName = message.author.username;

        var firstMinObj;
        var secondMinObj;

        var authorRank;
        var authorLevel;

        const foundUser = await profileModel.findOne({discordName : authorDiscordName});

        authorRank = foundUser.playerRank;
        authorLevel = foundUser.playerLevel;    

        await profileModel.find({} , (err, users) => {
            if(err) 
                console.log(err);
            users.map(user => {

                if(user.discordName != authorDiscordName){
                    if(!firstMinObj){
                        firstMinObj = user;
                    }else if(Math.abs(authorLevel - firstMinObj.playerLevel) > Math.abs(authorLevel - user.playerLevel)){
                        secondMinObj = firstMinObj;
                        firstMinObj = user;

                    }else if(!secondMinObj){
                        secondMinObj = user;

                    }else if(Math.abs(authorLevel - secondMinObj.playerLevel) > Math.abs(authorLevel - user.playerLevel)){
                        secondMinObj = user;

                    }
                                                                
                }

            });

            const newEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(authorDiscordName)
            .setDescription(authorRank + '\n' + 'level:' + authorLevel)
            .addFields(
                {
                    name: firstMinObj.discordName,
                    value: firstMinObj.playerRank + '\n'+ 'level:' +
                    firstMinObj.playerLevel
                },
                {
                    name: secondMinObj.discordName,
                    value: secondMinObj.playerRank+ '\n'+ 'level:' +
                    secondMinObj.playerLevel
                }

            );

            return message.channel.send(newEmbed);
        
        });
   
    }

}