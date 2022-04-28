const fs = require("fs");
const tempMute = JSON.parse(fs.readFileSync("./tempMutes.json", "utf8"));

module.exports.run = async (client, message, args) => {

    //tempmute gebruiker tijd(h,m,s)

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry jij hebt geen permissies om dit te kunnen!");

    if (!args[0]) return message.reply("Je moet een gebruiker mee geven");

    var mutePerson = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!mutePerson) return message.reply("Gebruiker kan niet worden gevonden!")

    if (mutePerson.permissions.has("MANAGE_MESSAGES")) return message.reply("Deze persoon kan je niet muten!");

    let muteRole = message.guild.roles.cache.get("968157585792434266");

    if (!muteRole) return message.channel.send("De mute rol bestaat niet!");

    if (!mutePerson.roles.cache.some(role => role.name === "Mute (Noob)")) {
        message.channel.send("Deze persoon is niet gemute!");
    } else {
        mutePerson.roles.remove(muteRole.id);
        message.channel.send(`${mutePerson} is niet meer gemute!`);

        tempMute[mutePerson].time = 0;

        fs.writeFile("./tempMutes.json", JSON.stringify(tempMute), (err) => {
            if(err) console.log(err);
        });
    }

}

module.exports.help = {
    name: "unmute",
    category: "general",
    description: "unmute een persoon"
}