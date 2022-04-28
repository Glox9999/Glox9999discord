const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const options = [
        {
            label: "Phasmophobia",
            value: "968176750020395040"
        },
        {
            label: "GTA",
            value: "968176894774231071"
        },
        {
            label: "Fortnite",
            value: "968178049440944148"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("roles")
                .setMinValues(0)
                .setMaxValues(3)
                .setPlaceholder("Selecteer een rol!")
                .addOptions(options)
        );

    return message.channel.send({ content: "Selecteer hier je rol", components: [row] });

}

module.exports.help = {
    name: "rollen",
    category: "general",
    description: ""
}