module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.reply("Gebruik **!steenpapierschaar** <steen, papier, schaar>");

    var options = ["steen", "papier", "schaar"];

    var result = options[Math.floor(Math.random() * options.length)];

    switch (args[0].toUpperCase()) {

        case "STEEN":

            switch (result) {

                case "steen":
                    message.channel.send(`Ik heb ${result} 🗿, het is **gelijkspel!**`)
                    break;

                case "papier":
                    message.channel.send(`Ik heb ${result} 📃, ik heb **gewonnen!**`)
                    break;

                case "schaar":
                    message.channel.send(`Ik heb ${result} ✂, jij hebt **gewonnen!**`)
                    break;
            }

            break;

        case "PAPIER":

            switch (result) {
                case "steen":
                    message.channel.send(`Ik heb ${result} 🗿, jij hebt **gewonnen!**`)
                    break;

                case "papier":
                    message.channel.send(`Ik heb ${result} 📃, het is **gelijkspel!**`)
                    break;

                case "schaar":
                    message.channel.send(`Ik heb ${result} ✂, ik heb **gewonnen!**`)
                    break;
            }

            break;

        case "SCHAAR":

            switch (result) {
                case "steen":
                    message.channel.send(`Ik heb ${result} 🗿, ik heb **gewonnen!**`)
                    break;

                case "papier":
                    message.channel.send(`Ik heb ${result} 📃, jij hebt **gewonnen!**`)
                    break;

                case "schaar":
                    message.channel.send(`Ik heb ${result} ✂, het is **gelijkspel!**`)
                    break;
            }

            break;

        default:

            return message.channel.send("Gebruik Steen, papier of schaar!");

    }

}

module.exports.help = {
    name: "steenpapierschaar",
    category: "general",
    description: "steen papier schaar"
}