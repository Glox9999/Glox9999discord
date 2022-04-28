const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij hebt geen permissies om dit te kunnen!");

    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("Geen perms!");

    if (!args[0]) return message.reply("Graag een gebruiker invoeren!");

    if (!args[1]) return message.reply("Graag een reden invullen!");

    var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!kickUser) return message.reply("Sorry! Persoon kan niet worden gevonden!");

    if (kickUser.permissions.has("MANAGE_MESSAGES")) return message.reply('sorry deze persoon kan je niet kicken!');

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("AQUA")
        .setTitle("Graag reageren in 30 seconden!")
        .setDescription(`Wil je ${kickUser} kicken?`)
    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Gekickt:** ${kickUser} (${kickUser.id})
    **GEKICKT DOOR:** ${message.author}
    **REDEN:** ${reason}`)
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

                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets fout gegaan!`)
                });

                message.channel.send({ embeds: embed })

            } else if (emojiDetails.emoji.name === "💖") {

                msg.delete();

                message.channel.send("**Kick Geanulleerd!**").then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000);
                });

            }
        });
    });

}

module.exports.help = {
    name: "kick",
    category: "general",
    description: "deelt kick uit!"
}