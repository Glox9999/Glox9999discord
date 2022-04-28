module.exports.run = async (client, message, args) => {


    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("Je hebt niet de permissies om dit te kunnen");

    if (!args[0]) return message.reply("Geef een aantal op hoeveel je weg wilt halen!");

    if (parseInt(args[0])) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (parseInt(args[0]) == 1) {
                message.channel.send("Ik heb 1 bericht verwijderd").then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3000);
                });
            } else {
                message.channel.send(`Ik heb ${parseInt(args[0])} berichten verwijderd!`).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3000);
                });
            }

        }).catch(err => {
            return message.reply("Graag een getal hoger dan 0 opgeven!");
        });

    } else {
        return message.reply("Geef een getal op!");
    }

}

module.exports.help = {
    name: "clear",
    category: "general",
    description: "Verwijderd een bepaald aantal berichten"
}