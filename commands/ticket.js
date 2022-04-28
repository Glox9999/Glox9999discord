const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const categoryID = "968179740986974298";

    var userName = message.author.username;

    var userDiscriminator = message.author.discriminator;

    var reason = args.join(" ");
    if (!reason) return message.channel.send("Graag een reden toevoegen!")

    var ticketBestaat = false;

    message.guild.channels.cache.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            //message.channel.send("Je hebt al een ticket aangemaakt!");

            //ticketBestaat = true;

            //return;

        }

    });

    //if (ticketBestaat) return;

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: "text" }).then((createdChan) => {

        createdChan.setParent(categoryID).then((settedParent) => {

            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "@everyone"), {

                SEND_MESSAGES: false,
                VIEW_CHANNEL: false

            });

            settedParent.permissionOverwrites.edit(message.author.id, {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "Server Staff"), {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0'); 
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = `${dd}/${mm}/${yyyy}`;

            let embedParent = new discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ size: 4096 }))
                .setTitle('Nieuwe Ticket')
                .addFields(
                    { name: "Reden", value: reason, inline: true },
                    { name: "Aangemaakt op", value: today, inline: true }
                );

            message.channel.send('💚 Ticket aangemaakt!');

            settedParent.send({ embeds: [embedParent] }) 


        }).catch(err => {
            message.channel.send('💖 er is iets fout gegaan!');
        })

    }).catch(err => {
        message.channel.send('💖 er is iets fout gegaan!');
    });

}

module.exports.help = {
    name: "ticket",
    category: "general",
    description: "Maakt Ticket aan"
}