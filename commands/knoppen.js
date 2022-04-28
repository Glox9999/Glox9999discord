const discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
            .setLabel("Hulp bij eigen bots (server)")
            .setStyle("LINK")
            .setURL("https://discord.gg/e4suHmXUS2"),

        new discord.MessageButton()
            .setLabel("VS Code")
            .setStyle("LINK")
            .setURL("https://code.visualstudio.com/"),

            new discord.MessageButton()
            .setLabel("node.js")
            .setStyle("LINK")
            .setURL("https://nodejs.org/en/"),

        new discord.MessageButton()
            .setLabel("Test Server (server)")
            .setStyle("LINK")
            .setURL("https://discord.gg/m6fddS7bPa"),

            new discord.MessageButton()
            .setLabel("Bot Hosting")
            .setStyle("LINK")
            .setURL("https://mc-node.net/index.php?rp=/store/discord-bot-hosting")

    );

    message.channel.send({ content: "**Bots Maken:**", components: [row] });

    const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply("Jij kan dit niet gebruiken.");
    }
 
    const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1
    });

}

module.exports.help = {
    name: "bothulp",
    category: "general",
    description: "Buttons"
}