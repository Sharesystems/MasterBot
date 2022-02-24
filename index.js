const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require ("fs");
const { measureMemory } = require('vm');
let version = fs.readFileSync("./api/version.txt", "utf8");
const WebSocket = require("ws");
const fetch = require("node-fetch");
const chalk = require("chalk");
const xpfile = require("./datas/xp.json")
console.log(chalk.blue(`[Deamon] loading Files...`));
console.log("")
console.log("")

//API

const { prefix, token, name, status, theme, profilpictureurl } = require('./settings.json');

console.log(chalk.blue("=============================="));
console.log(chalk.blue("             Q-BOT            "));
console.log(chalk.blue("=============================="));
console.log(chalk.blue(`[Deamon] starting Bot...`));

client.on('ready', () => {

    console.log(chalk.blue(`[Deamon] ${name} are online!`));

});

let statuses = [
    `${prefix}help`,
    `${status}`
]

setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: 'PLAYING' }).catch(console.error);
}, 3000)


//Commands
client.on("message", message => {
    let parts = message.content.split(" ");

    if (message.content == prefix+"changelog"){
        let embed = new Discord.MessageEmbed()
            .setTitle("Changelog")
            .setDescription("Version: "+version)
            .addField("🛡 Updates:", "```Really? All is new :)```")
            .addField("📅 Release:", "```22.02.2022```")
            .setFooter(`${name} | version ${version}`)
            .setThumbnail(profilpictureurl)
            .setColor(theme)

        message.channel.send(embed)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}changelog`))
            
    }
    if (message.content == prefix+"help"){
        let embed = new Discord.MessageEmbed()
            .setTitle("Commands")
            .addField("Command","description")
            .addField(`${prefix}help`, `shows this menu`)
            .addField(`${prefix}bots`, `shows the number of bots`)
            .addField(`${prefix}owner`, `shows the owner of this server`)
            .addField(`${prefix}ping`, `shows your ping`)
            .addField(`${prefix}version`, `opens the version manager`)
            .addField(`${prefix}poll`, "starts a poll")
            .addField(`${prefix}rank`, "shows your XP rate")
            .setFooter(`${name} | version ${version}`)
            .setThumbnail(profilpictureurl)
            .setColor(theme)
        message.channel.send(embed)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}help`))
    }
    if (message.content == prefix+"ping") {
        message.channel.send("Ping is calculated...").then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            let embed = new Discord.MessageEmbed()
                .setTitle("Ping")
                .addField("⌛️ Botping", ping + "ms")
                .addField("⏰ API Ping:", client.ws.ping + "ms")
                .setThumbnail(profilpictureurl)
                .setFooter(`${name} | version ${version}`)
                .setColor(theme)
            message.channel.send(embed)
            console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}ping`))
        })
    }
    if (message.content === prefix+"version") {
        fetch.default(`https://sharesystems.github.io/MasterBot/`)
            .then(res => res.json())
            .then(data => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Versionmanger")
                    .addField("📀 Installed version:", version)
                    .addField("💎 Latest version:", data.version)
                    .setFooter(name+" | "+version)
                    .setThumbnail(profilpictureurl)
                    .setColor(theme)
                message.channel.send(embed)
                console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}version`))
                if (version < data.version) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle("Update available")
                        .setColor("RED")
                        .setDescription("Please update your bot immediately! It may be important security updates!")

                    message.channel.send(embed)
                    return
                }
                if (version = data.version) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle("System up2date!")
                        .setColor("GREEN")
                        .setDescription("Excellent! Your bot is up to date.")

                    message.channel.send(embed)
                    return
                }
            })
    }
})
//Demo Commands
client.on("message", function (message){

    if (message.content == prefix+'bots') {
        message.channel.send(`**${message.guild.name}** has **${message.guild.members.cache.filter(m => m.user.bot).size}** Bot(s) 🤖`)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}bots`))
    }
    if (message.content.startsWith(prefix+"poll")) {
        let text = message.content.split(" ").slice(1).join(" ");
        if (!text) return message.channel.send("Please write a poll!")
        message.delete()
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}poll`))

        let embed = new Discord.MessageEmbed()
            .setTitle("Poll")
            .setColor(theme)
            .setThumbnail(profilpictureurl)
            .setDescription(text)
            .setFooter(`${name} | version ${version}`)

        message.channel.send(embed).then(msg => {
            msg.react("👍");
            msg.react("👎")
        })

    }
    if (message.content == prefix+'owner') {
        message.channel.send(`The Owner of **${message.guild.name}** is **${message.guild.owner.user.tag}**`)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}owner`))
    }
})
client.on("message", function (message) {
    if (message.author.bot) return;
    var addXP = Math.floor(Math.random() * 8) + 3;

    if (!xpfile[message.author.id]) {
        xpfile[message.author.id] = {
            xp: 0,
            level: 1,
            reqxp: 100
        }

        fs.writeFile("./datas/xp.json", JSON.stringify(xpfile), function (err) {
            if (err) console.log(err)
        })
    }

    xpfile[message.author.id].xp += addXP

    if (xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
        xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp
        xpfile[message.author.id].reqxp *= 1.25
        xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp)
        xpfile[message.author.id].level += 1

        message.reply("is now level **" + xpfile[message.author.id].level + "**!")
        console.log(chalk.green(`[Logs] ${message.author.tag} is now level `+xpfile[message.author.id].level+"!"))
    }

    fs.writeFile("./datas/xp.json", JSON.stringify(xpfile), function (err) {
        if (err) console.log(err)
    })

    if (message.content.startsWith(prefix+"rank")) {
        let user = message.mentions.users.first() || message.author

        if (user.bot) return message.channel.send("❌ **ERROR** | Bots dont have XP!")

        let embed = new Discord.MessageEmbed()
            .setTitle(":sparkles: XPSystem :sparkles:")
            .setColor(theme)
            .addField("Level: ", xpfile[user.id].level)
            .addField("XP: ", xpfile[user.id].xp + "/" + xpfile[user.id].reqxp)
            .addField("XP Level: ", xpfile[user.id].reqxp)
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter(name + " | version " + version)

        message.channel.send(embed)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}rank`))
    }
})

client.login(token)