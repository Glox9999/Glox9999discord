const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("𝘈𝘯𝘦𝘴𝘩/𝘎𝘭𝘰𝘹'𝘴 𝘭𝘰𝘶𝘯𝘨𝘦")
    .setDescription("Server gemaakt door 𝘈𝘯𝘦𝘴𝘩 en 𝘎𝘭𝘰𝘹")
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