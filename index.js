const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const tempMute = JSON.parse(fs.readFileSync("./tempMutes.json", "utf8"));
const swearWords = require("./Data/SwearWords.json");
const levelFile = require("./Data/levels.json");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES]
});

client.commands = new Collection();
client.slashCommands = new Collection();
const slashCommands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`De file ${command.help.name}.js is geladen`)

}

const commandSlashFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith(".js"));

for (const fileSlash of commandSlashFiles) {

    const commandSlash = require(`./slashCommands/${fileSlash}`);

    client.slashCommands.set(commandSlash.data.name, commandSlash);
    slashCommands.push(commandSlash.data.toJSON());

    console.log(`De file ${commandSlash.data.name}.js is geladen`);

}


client.once("ready", async () => {
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("Custom Bot", { type: "Streaming" });

    await mongoose.connect(
        process.env.MONGO_URI,
        {
            keepAlive: true
        }
    );

    const statusOptions = [
        "𝘈𝘯𝘦𝘴𝘩/𝘎𝘭𝘰𝘹'𝘴 V2",
        "𝘈𝘯𝘦𝘴𝘩/𝘎𝘭𝘰𝘹'𝘴 V2",
    ]

    let counter = 0;

    let time = 1 * 60 * 1000; // 1 Minuut.


    const updateStatus = () => {

        client.user.setPresence({

            status: "online",
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        });

        if (++counter >= statusOptions.length) counter = 0;

        setTimeout(updateStatus, time);
    }
    updateStatus();

    const checkTempMute = async () => {


        for (const result of Object.keys(tempMute)) {

            const idMember = result;

            const time = tempMute[result].time;


            let date = new Date();
            let dateMilli = date.getTime();

            let dateReset = new Date(time);


            if (dateReset < dateMilli && time != 0) {

                try {

                    let guild = await client.guilds.fetch("966404718739988481");

                    const mutePerson = guild.members.cache.find(member => member.id === idMember.replace(/[<@!>]/g, ''));

                    let muteRole = guild.roles.cache.get('968157585792434266');

                    if (!muteRole) return console.log("De mute rol bestaat niet.");

                    await (mutePerson.roles.remove(muteRole.id));

                    tempMute[mutePerson].time = 0;

                    fs.writeFile("./tempMutes.json", JSON.stringify(tempMute), (err) => {
                        if (err) console.log(err);
                    });
                }
                catch (err) {
                    console.log(err + " Persoon kon niet geunmute worden omdat deze persoon niet meer in de server is");
                }
            }
        }
        setTimeout(checkTempMute, 1000 * 60);
    }
    checkTempMute();


    let guildId = "966404718739988481";
    let clientId = "968156565209235528";

    const rest = new REST({ version: '9' }).setToken(botConfig.token);

    (async () => {
        try {
            console.log('started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: slashCommands },
            );

            console.log('succesfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();


    // const guild = client.guilds.cache.get("966404718739988481");

    // let commands;

    // if (guild) {
    //     commands = guild.commands;
    // } else {
    //     commands = client.application.commands;
    // }

    // commands.create({
    //     name: "youssef",
    //     description: "verteld je hoe gay Youssef is."
    // });

    // commands.create({
    //     name: "optellen",
    //     description: "Twee Getallen Optellen",
    //     options: [
    //         {
    //             name: "nummer1",
    //             description: "het 1ste nummer",
    //             type: 10,
    //             required: true
    //         },
    //         {
    //             name: "nummer2",
    //             description: "het 2de nummer",
    //             type: 10,
    //             required: true
    //         }
    //     ]
    // });


});

client.on("interactionCreate", async interaction => {

    if (interaction.isSelectMenu()) {
        const { customId, values, member } = interaction;

        if (customId === 'roles') {

            const component = interaction.component;

            const removed = component.options.filter((option) => {
                return !values.includes(option.value)
            });

            for (var id of removed) {
                member.roles.remove(id.value)
            }

            for (var id of values) {
                member.roles.add(id)
            }

            interaction.reply({
                content: "Rollen zijn geupdate!",
                ephemeral: true
            });

        }
    } else if (interaction.isCommand()) {

        const slashCommand = client.slashCommands.get(interaction.commandName);
        if (!slashCommand) return;

        try {

            await slashCommand.execute(client, interaction);

        } catch (err) {
            await interaction.reply({ content: "Er is een fout opgetreden", ephemeral: true });
        }

        // const { commandName, options } = interaction

        // if (commandName === 'youssef') {

        //     interaction.reply({
        //         content: "Youssef is super gay. Gewoon echt mega gay. Als je hem ziet moet je hem en zijn 2 vaders gewoon uitlachen😇😊😎",
        //     })

        // } else if (commandName === 'optellen') {

        //     const num1 = options.getNumber("nummer1");
        //     const num2 = options.getNumber("nummer2");

        //     interaction.reply({
        //         content: `${num1 + num2}`,
        //     })

        // }

    } else {
        return
    }



})

// client.on("interactionCreate", async (interaction) => {

//     if (interaction.isButton()) {
//         if (interaction.customId === "test") {
//             interaction.reply("Je hebt op test geklikt!");
//         }else{
//             interaction.reply("fout")
//         }
//     }

// })

client.on("guildMemberAdd", async (member) => {

    var role = member.guild.roles.cache.get("966404718739988483")

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get("966404719348170870")

    if (!channel) return;

    channel.send(`**Welkom in deze server ${member}**!`);



    for (const result of Object.keys(tempMute)) {

        const idMember = result;
        const time = tempMute[result].time;


        if (idMember.replace(/[<@!>]/g, '') == member.id) {

            let date = new Date();
            let dateMilli = date.getTime();
            let dateReset = new Date(time);

            let muteRole = member.guild.roles.cache.get('968157585792434266');

            if (!muteRole) return message.channel.send("De mute rol bestaat niet");

            try {

                if (dateReset > dateMilli) {
                    await (member.roles.add(muteRole.id));
                } else if (time != 0) {

                    let guild = await client.guilds.fetch("966404718739988481");
                    const mutePerson = guild.members.cache.find(member => member.id === idMember.replace(/[<@!>]/g, ''));
                    tempMute[mutePerson].time = 0;

                    fs.writeFile("./tempMutes.json", JSON.stringify(tempMute), (err) => {
                        if (err) console.log(err);
                    });
                }
            } catch (err) {
                console.log(err + " Iets ging fout met de rollen toevoegen/verwijderen.");
            }
        }
    }

})

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) {

        XP(message);

        var msg = message.content.toLowerCase();

        for (let index = 0; index < swearWords.length; index++) {
            const swearWord = swearWords[index];

            if (msg.includes(swearWord.toLowerCase())) {

                message.delete();
                return message.channel.send("Je mag deze woorden hier niet gebruiken!").then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 3000);
                });

            }

        }

    }
    else {
        const commandData = client.commands.get(command.slice(prefix.length));

        if (!commandData) return;

        var arguments = messageArray.slice(1);

        try {

            await commandData.run(client, message, arguments);

        } catch (error) {
            console.log(error);
            await message.reply("Er was een probleem gevonden tijdens het uitvoeren van dit command");
        }
    }
});

function XP(message) {

    var XP = Math.floor(Math.random() * 15) + 1;

    console.log(XP);

    var idUser = message.author.id;

    if (!levelFile[idUser]) {

        levelFile[idUser] = {
            xp: 0,
            level: 0
        }

    }

    levelFile[idUser].xp += XP;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevel = levelUser * 300;

    if (nextLevel == 0) nextLevelXp = 100;

    if (xpUser >= nextLevel) {

        levelFile[idUser].level += 1;

        fs.writeFile("./Data/levels.json", JSON.stringify(levelFile),
            err => {
                if (err) return console.log("Er is een fout opgetreden!");
            });

            if (levelFile[idUser].level == 5) {
                var role = message.guild.roles.cache.find(r => r.name === "Level 5");
             
                var member = message.member;
                member.roles.add(role);
             
                var embedLevel = new MessageEmbed()
                    .setDescription("***Nieuwe rang & level hoger***")
                    .setColor("#00ff00")
                    .addField("Nieuwe rang: ", "Level 5")
                    .addField("Nieuw level: ", levelFile[idUser].level.toString());
                message.channel.send({ embeds: [embedLevel] });
             
            } else {
                var embedLevel = new MessageEmbed()
                    .setDescription("***Level hoger***")
                    .setColor("#00ff00")
                    .addField("Nieuw level: ", levelFile[idUser].level.toString());
                message.channel.send({ embeds: [embedLevel] });
            }


    }

}

client.login(process.env.token);