const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("ππ―π¦π΄π©/ππ­π°πΉ'π΄ π­π°πΆπ―π¨π¦")
    .setDescription("Server gemaakt door ππ―π¦π΄π© en ππ­π°πΉ")
    .setColor("#6d4fff")
    .addFields(
        { name: "Je bent de server gejoined op", value: message.member.joinedAt.toString() },
        { name: "Aantal Members", value: message.guild.memberCount.toString() }
    );
    
    return message.channel.send({ embeds: [botEmbed] });
    
}

module.exports.help = {
    name: "serverinfo"
}