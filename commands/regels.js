const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Commands")
        .setDescription(`**1.** Spam en zelfpromotie mag **NIET**
        **2.** dingen zoals gore, nsfw, tokengrabbers etc. mogen **NIET**
        **3.** Gebruik de goede channels! Bijv. Foto's en video's plaatsen in media.
        **4.** Geen bedreigingen of hacken!
        **5.** Heb respect naar elkaar dus niet elkaar helemaal uitschelden.
        **6.** Laat iedereen zich veilig voelen in deze server!`)
        .setColor("#6d4fff")
        .setTimestamp();

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "regels"
}