const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js")

module.exports = {

    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('laat zien welk level je bent'),
    async execute(client, interaction) {

        var levelFile = JSON.parse(fs.readFileSync("./Data/levels.json"));

        var userID = interaction.user.id;

        try {

            var nextLevelXP = levelFile[userID].level * 300;

            if (nextLevelXP == 0) nextLevelXP == 100;

            const rank = new canvacord.Rank()
                .setAvatar(interaction.user.displayAvatarURL({ dynamic: false, format: "png" }))
                .setCurrentXP(levelFile[userID].xp)
                .setLevel(levelFile[userID].level)
                .setRequiredXP(nextLevelXP)
                .setProgressBar("#91a7ff", "COLOR")
                .setUsername(interaction.user.username)
                .setDiscriminator(interaction.user.discriminator);

               rank.build().then(data => {
                   const attachment = new MessageAttachment(data, "RankCard.png");
                   interaction.reply({files: [attachment]});
               }) 

        } catch (err) {
            interaction.reply({ content: "Geen gegevens gevonden!" });
        }



    }

}