const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("ππ―π¦π΄π©/ππ­π°πΉ'π΄ V2")
    .setDescription("2de versie van ππ―π¦π΄π©/ππ­π°πΉ'π΄ π­π°πΆπ―π¨π¦ bot gemaakt door @ππ­π°πΉ#9999")
    .setColor("RED")
    .addField("Bot naam", client.user.username)
    .setThumbnail('https://cdn.discordapp.com/attachments/966406631762038874/968612263030304778/bby.gif')
    .setImage('https://cdn.discordapp.com/attachments/966406631762038874/967789371535290368/standard_16.gif')
    .setTimestamp();

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "botinfo"
}