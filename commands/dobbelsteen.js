module.exports.run = async (client, message, args) => {

    var number = Math.ceil(Math.random() * 6);

    return message.channel.send(`🎲 Je hebt **${number}** gegooid!`);

}

module.exports.help = {
    name: "gooi",
    category: "general",
    description: "gooi een dobbelsteen"
}