(async () => {
    // default imports
    const events = require('events');
    const {
        exec
    } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const {
        MessageEmbed,
        MessageButton,
        MessageActionRow,
        Intents,
        Permissions,
        MessageSelectMenu
    } = require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    let https = require("https")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');

    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire: null,
        joiningMember: null,
        reply: null,
        player: null,
        manager: null,
        Inviter: null,
        message: null,
        notifer: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
        let file = JSON.parse(fs.readFileSync('package.json'))
        file.dependencies['discord.js'] = '^13.15.1'
        fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
        exec('npm i')
        throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.12.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
        let file = JSON.parse(fs.readFileSync('package.json'))
        file.dependencies['discord-logs'] = '^2.0.0'
        fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
        exec('npm i')
        throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION",
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function(err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code


    // blockly code
    var randomchange;

    function mathRandomInt(a, b) {
        if (a > b) {
            // Swap a and b to ensure a is smaller.
            var c = a;
            a = b;
            b = c;
        }
        return Math.floor(Math.random() * (b - a + 1) + a);
    }


    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('This site was created to keep bot on 25/8');
    });
    server.listen(3000);

    s4d.client.on('ready', async () => {

        while (s4d.client && s4d.client.token) {
            await delay(50);
            randomchange = mathRandomInt(1, 5);
            if (randomchange == 1) {
                s4d.client.user.setPresence({
                    status: "online",
                    activities: [{
                        name: 'Fun Games at Fun.Games',
                        type: "PLAYING"
                    }]
                });
            } else if (randomchange == 2) {
                s4d.client.user.setPresence({
                    status: "dnd",
                    activities: [{
                        name: 'WITH FUN.GAMES PLAYER',
                        type: "COMPETING"
                    }]
                });
            } else if (randomchange == 3) {
                s4d.client.user.setPresence({
                    status: "idle",
                    activities: [{
                        name: 'Select a game at Fun.Games',
                        type: "COMPETING"
                    }]
                });
            } else if (randomchange == 4) {
                s4d.client.user.setPresence({
                    status: "online",
                    activities: [{
                        name: 'To Justice on Soundcloud',
                        type: "LISTENING"
                    }]
                });
            } else if (randomchange == 5) {
                s4d.client.user.setPresence({
                    status: "online",
                    activities: [{
                        name: ' With Time',
                        type: "COMPETING"
                    }]
                });
            }

            console.log('ran')
        }

    });

    await s4d.client.login((process.env[String('token')])).catch((e) => {
        const tokenInvalid = true;
        const tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid bot token was provided!")
        } else {
            throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
        }
    });

    s4d.client.on('interactionCreate', async (interaction) => {
        let member = interaction.guild.members.cache.get(interaction.member.user.id)
        if ((interaction.commandName) == 'tomato') {
            // true - only the person who t=did the comamnd can see it
            //
            // false - everyone can see it
            //
            await interaction.reply({
                embeds: [{
                    color: String('#660000'),
                    title: String('IS IT A FRUIT?'),
                    description: String('Is the tomato a fruit answer yes/no..'),
                }],
                ephemeral: true,
                components: []
            });
            (interaction.channel).send({
                content: String('Here are the available options:'),
                components: [(new MessageActionRow()
                    .addComponents(new MessageButton()
                        .setCustomId('yes.tomato.command')
                        .setLabel('Yes')
                        .setEmoji('✅')
                        .setStyle(('SUCCESS')),
                        new MessageButton()
                        .setCustomId('no.tomato.command')
                        .setLabel('No')
                        .setEmoji('❌')
                        .setStyle(('DANGER')),
                    ))]
            }).then(async m => {

                let collector = m.createMessageComponentCollector({
                    filter: i => i.user.id === (interaction.member).id,
                    time: Number(60000) * 1000
                });
                collector.on('collect', async i => {
                    if ((i.customId) == 'yes.tomato.command') {
                        (interaction.member).send({
                            embeds: [{
                                color: String('#33ff33'),
                                title: String('YOU GOT IT!'),
                                description: String('YES THE TOMATO IS A FRUIT BABY!'),
                            }]
                        });
                    } else {
                        (interaction.member).send({
                            embeds: [{
                                color: String('#ff0000'),
                                title: String('no...'),
                                description: String('no... it isn\'t a fruit... :('),
                            }]
                        });
                    }

                })

            });
        }

    });

    synchronizeSlashCommands(s4d.client, [{
        name: 'tomato',
        description: 'See if a tomato is a fruit or not',
        options: [

        ]
    }, ], {
        debug: false,

    });

    return s4d
})();
