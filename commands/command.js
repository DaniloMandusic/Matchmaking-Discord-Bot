module.exports = {

    name:'command',
    distribution: "Embeds!",
    execute(message, args, Discord){

        const newEmbed = new Discord.MessageEmbed()
            .setColor('#304281')
            .setTitle('Rules')
            .setDescription('This is embed')
            .addFields(
                {
                    name: 'Rule 1',
                    value: 'Be nice'
                },
                {
                    name: 'Rule 1',
                    value: 'Be nice'
                }

            );

            message.channel.send(newEmbed);
    }

}