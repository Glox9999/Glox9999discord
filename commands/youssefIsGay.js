const testSchema = require("../schema");

module.exports.run = async (client, message, args) => {

    await new testSchema({
        bericht: "Dit is een test uit hallo"
    }).save();

    return message.channel.send("Hallo :D !");

}

module.exports.help = {
    name: "hallo",
    category: "general",
    description: "zegt Hallo!"
}