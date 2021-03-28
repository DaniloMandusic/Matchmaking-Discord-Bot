module.exports = {
    name:'scrape',
    async execute(){
        const request = require('request');
        const cheerio = require('cheerio');

        //loop trough database

        const profileModel = require('../models/profileSchema');

        profileModel.find({} , (err, users) => {
            if(err) 
                console.log(err);
            users.map(user => {
                //Do somethign with the user

                var username = user.playerUsername;
                console.log(user.playerUsername);
                var parsedUsername = username.substring(0,username.length - 4) + '%23' + username.substring(username.length - 4, username.length);

                request(('https://cod.tracker.gg/warzone/profile/battlenet/' + parsedUsername + '/overview').toString(), async (error, response, html) => {
            
                    if(!error && response.statusCode == 200) {

                        const $ = cheerio.load(html);

                        var level = $('.highlight-text');
                        var num = level.toString().replace(/[^0-9]/g,'');
                        num = num.replace('472','');
                        num = num.replace('472','');
                        //num = num.join("");
                        console.log(num);

                        rank = $('.highlight-suptext');
                        console.log(rank.text());
                        rank = rank.text();

                        //update database
                
                        //const profileModel = require('./models/profileSchema');

                        await profileModel.findOneAndUpdate({playerUsername : username}, {

                            $set: { playerRank: rank, playerLevel: num}

                        }).catch(function(error,affected,resp){

                        console.log(error);

                        })

                        //end of database update
                            
                    }

                });

            })
        })

        //end of loop trough database

    }
}