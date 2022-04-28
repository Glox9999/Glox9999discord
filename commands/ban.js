const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Jij hebt geen permissies om dit te kunnen!");

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("Geen perms!");

    if (!args[0]) return message.reply("Graag een gebruiker meegeven!");

    if (!args[1]) return message.reply("Graag een reden(en) meegeven!");

    var banUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!banUser) return message.reply("Sorry! Persoon kan niet worden gevonden!");

    if (banUser.permissions.has("MANAGE_MESSAGES")) return message.reply('sorry deze persoon kan je niet bannen!');

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("AQUA")
        .setTitle("Graag reageren in 30 seconden!")
        .setDescription(`Wil je ${banUser} bannen?`)
    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Gebanned:** ${banUser} (${banUser.id})
    **GEBANNED DOOR:** ${message.author}
    **REDEN(EN):** ${reason}`)
        .setFooter(message.member.displayName)
        .setTimestamp();

    message.channel.send({ embeds: [embedPrompt] }).then(async msg => {

        let authorID = message.author.id;
        let time = 30;
        let reactions = ["💚", "💖"];

        time *= 1000;

        for (const reaction of reactions) {
            await msg.react(reaction);
        }

        const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === authorID;
        };

        msg.awaitReactions({ filter, max: 1, time: time }).then(collected => {
            var emojiDetails = collected.first();

            if (emojiDetails.emoji.name === "💚") {

                msg.delete();

                banUser.ban({reason: reason}).catch(err => {
                    if (err) return message.channel.send(`Er is iets fout gegaan!`)
                });

                message.channel.send({ embeds: embed })

            } else if (emojiDetails.emoji.name === "💖") {

                msg.delete();

                message.channel.send("**Ban Geanulleerd!**").then(msg => {
                    message.delete();
                    setTimeout(() => msg.delete(), 5000);
                });

            }
        });
    });
}

module.exports.help = {
    name: "ban",
    category: "general",
    description: "deelt ban uit!"
}