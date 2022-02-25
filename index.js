//----------- Startup -----------//


const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require ("fs");
const { measureMemory } = require('vm');
let version = fs.readFileSync("./api/version.txt", "utf8");
const WebSocket = require("ws");
const fetch = require("node-fetch");
const chalk = require("chalk");
const xpfile = require("./datas/xp.json")
const random = require("random")

//----------- Loading -----------//

console.log(chalk.blue(`[Deamon] loading Files...`));
console.log(chalk.blue(`[Blacklist] Check Blacklist...`))
let blacklist = fs.readFileSync("./api/blacklist/blacklist.txt", "utf8");
if (blacklist > 1) {
    let reason = fs.readFileSync("./api/blacklist/reason.txt", "utf8");
    console.log(chalk.red.bold(`[Blacklist] Your Bot is blacklistet! Reason: ${reason}`))
    return
}
console.log("The Blacklist isnt aktiv. But in next updates we will aktivate the Blacklist!")


const { prefix, token, name, status, theme, profilpictureurl } = require('./settings.json');

console.log(chalk.blue("=============================="));
console.log(chalk.blue("           MasterBot          "));
console.log(chalk.blue("=============================="));
console.log(chalk.blue(`[Deamon] starting Bot...`));

client.on('ready', () => {
    console.log(chalk.blue(`[Deamon] ${name} are online`));
    console.log("")
    console.log(chalk.blue("=============================="));
    console.log(chalk.blue("             Stats            "));
    console.log(chalk.blue("=============================="));
    console.log(chalk.blue(`Channels: ${client.channels.cache.size}`));
    console.log(chalk.blue(`Server: ${client.guilds.cache.size}`));
    console.log(chalk.blue(`User: ${client.users.cache.size}`));
    console.log(chalk.blue("=============================="));


});

//----------- Prefix -----------//

let statuses = [
    `${prefix}help`,
    `${status}`
]

setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: 'PLAYING' }).catch(console.error);
}, 3000)


//----------- Commands for Admin Features -----------//


client.on("message", message => {
    let parts = message.content.split(" ");

    if (message.content == prefix+"changelog"){
        let embed = new Discord.MessageEmbed()
            .setTitle("Changelog")
            .setDescription("Version: "+version)
            .addField("🛡 Updates:", "```\n[+] Stats\n[+] updater is now userfriendly\n[+] Blacklist\n```")
            .addField("📅 Release:", "```25.02.2022```")
            .setFooter(`${name} | version ${version}`)
            .setThumbnail(profilpictureurl)
            .setColor(theme)

        message.channel.send(embed)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}changelog`))
            
    }
    if (message.content == prefix+"help"){
        let embed = new Discord.MessageEmbed()
            .setTitle("Commands")
            .addField(`Imporant Commands`, `${prefix}help - shows this menu\n${prefix}version - opens the version manager\n${prefix}changelog - shows the changelog\n${prefix}ping - shows your ping`)
            .addField("Fun", `${prefix}iq - shows your IQ\n${prefix}random - shows a random number\n${prefix}rank - shows your XP rate`)
            .addField("Infos", `${prefix}bots - the number of Bots\n${prefix}owner - shows the Ownertag`)
            .addField("Admin", `${prefix}nuke - delete all messages\n${prefix}poll - start a poll`)
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
                        .setDescription("Please update your bot immediately! Your can download the update [here](https://github.com/Sharesystems/MasterBot/releases/latest). Here are the Docs to [update](https://github.com/Sharesystems/MasterBot#update-masterbot) your Bot")

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


//----------- Other Commands -----------//


client.on("message", function (message){
    let parts = message.content.split(" ");

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
    else if (parts[0].toLowerCase() == prefix + `random`) {
        message.channel.send(`loading...`).then(m => m.edit(`Your Random Number is: ${random.int(1, 99999999)}`))
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}random`))
    }
    if (parts[0] == prefix + 'nuke') {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            let embed = new Discord.MessageEmbed()
                .setTitle("❌ No Perms")
                .setDescription("You do not have enough rights for this command!")
                .setFooter(`${name} | version ${version}`)
                .setThumbnail(profilpictureurl)
                .setColor(theme)
            return message.channel.send(embed)
        }
        message.channel.clone().then(channel => {
            channel.setPosition(message.channel.position)
            let embed = new Discord.MessageEmbed()
                .setTitle("✅ Channel have been genuked")
                .setColor(theme)
                .setThumbnail(profilpictureurl)
                .setFooter(`${name} | version ${version}`)
                .setImage("https://i.gifer.com/6Ip.gif")
                .setDescription("This channel has been successfully destroyed! All messages have been deleted.")
            channel.send(embed)
            console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}nuke`))
        })
        message.channel.delete()
    }
    else if (parts[0].toLowerCase() == prefix + `iq`) {
        message.channel.send(`Scann IQ...`).then(m => m.edit(`The 100% accurate measurement showed that you have **${random.int(1, 200)}**IQ :exploding_head:`))
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}iq`))
    }
})



//----------- XPSystem -----------//


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