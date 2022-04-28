const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('vertelt informatie over de server.'),
    async execute(client, interaction) {

        interaction.reply({content: `Deze server is eigenlijk om vrienden te maken en een beetje games te spelen met vrienden, maar hier kan je ook leren hoe jij zelf je discord bot moet maken. Dit bericht komt van een custom discord bot. Vind jij dat we nog meer kunnen doen in deze server? Laat dan zeker een suggestie achter :D!`, ephemeral: true})

    }

}