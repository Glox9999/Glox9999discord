const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const categoryID = "968179740986974298";

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij hebt geen permissies om dit te kunnen!");

    if (message.channel.parentId == categoryID) {

        message.channel.delete();

        var embedTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("Het ticket is **afgerond**")
            .setFooter("Ticket gesloten");

        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "logs");
        if (!ticketChannel) return message.reply("Kanaal kan niet worden gevonden");

        return ticketChannel.send({ embeds: [embedTicket] });

    } else {
        return message.channel.send("Graag commando uitvoeren in de ticket!")
    }

}

module.exports.help = {
    name: "close",
    category: "general",
    description: "sluit ticket"
}