const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Commands")
        .setDescription(`**prefix = "!". Later worden er meer commands toegvoegd!**
    
    **!ban/kick:** Met dit command kan je mensen van de server bannen/kicken. Let op: je hebt wel perms nodig!
    
    **!gooi:** Gooi een dobbelsteen.

    **!kopofmunt:** kop of munt spelen.

    **!steenpapierschaar:** steen, papier, schaar

    **!serverinfo:** Geeft informatie over de server weer

    **!clear:** meerdere berichten in 1 keer verwijderen.
    
    **!rollen:** Laat je je rollen kiezen (games)
    
    **!info:** geeft info over de bot.
    
    **!bothulp:** Geeft tools en servers weer die je kan gebruiken bij het maken van een bot.
    
    **!status:** **NIEUW!** Met dit commando kan je de status van de bot aanpassen. Dit werkt weer sinds 28 april 2022, omdat de veranderende status uit staat!
    
    **!mute:** Met dit command kan je iemand voor een bepaalde tijd muten. Als dit persoon leaved en weer joined krijgt hij zijn rol gewoon weer terug!
    
    **!ticket:** met dit command kan je een **ticket** maken. Er is ingesteld dat je meerdere kan maken. Je mag bijv. 2 maken voor verschillende dingen, maar als je spammed krijg je een ban! (**ticket** = prive channel)
    
    **!unmute:** unmute een persoon.
    
    **!warn:** Geeft een persoon een waarschuwing. (bij 4 waarschuwingen krijg je een kick uit de server!)
    
    **!Youssef:** laat bot zeggen: *Is gay*
    
    
    ***/commands:***
    **/server:** Vertelt informatie over deze server.
    
    **/optellen:** telt 2 getallen op bij elkaar`)
        .setColor("#6d4fff")
        .setTimestamp();

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "commands"
}