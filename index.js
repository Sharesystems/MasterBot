<<<<<<< HEAD
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require ("fs");
=======
//----------- Startup -----------//


const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
const { measureMemory } = require('vm');
let version = fs.readFileSync("./api/version.txt", "utf8");
const WebSocket = require("ws");
const fetch = require("node-fetch");
const chalk = require("chalk");
const xpfile = require("./datas/xp.json")
<<<<<<< HEAD
console.log(chalk.blue(`[Deamon] loading Files...`));
console.log("")
console.log("")

//API

const { prefix, token, name, status, theme, profilpictureurl } = require('./settings.json');

console.log(chalk.blue("=============================="));
console.log(chalk.blue("             Q-BOT            "));

const random = require("random")
const user = client.users.cache.get('857312828787392572');

//----------- Loading -----------//

console.log(chalk.blue(`[Deamon] loading Files...`));
console.log(chalk.blue(`[Blacklist] Check Blacklist...`))
let blacklist = fs.readFileSync("./api/blacklist/blacklist.txt", "utf8");
if (blacklist > 1) {
    let reason = fs.readFileSync("./api/blacklist/reason.txt", "utf8");
    console.log(chalk.red.bold(`[Blacklist] Your Bot is blacklistet! Reason: ${reason}`))
    client.destroy
}
console.log(chalk.blue(`[Deamon] Checking updates...`))
fetch.default(`https://sharesystems.github.io/MasterBot/`)
    .then(res => res.json())
    .then(data => {
        if (version < data.version) {
            console.log(chalk.red(`[Update Manager] =====================================`));
            console.log(chalk.red(`[Update Manager] New Update is available! (${data.version})`));
            console.log(chalk.red(`[Update Manager] =====================================`));
        }
    })
console.log(chalk.blue(`[Deamon] Loading settings...`))
const { prefix, token, name, status, theme, profilpictureurl, antilink, antiinvite, ownerID } = require('./settings.json');

console.log(chalk.blue("=============================="));
console.log(chalk.blue("           MasterBot          "));
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
console.log(chalk.blue("=============================="));
console.log(chalk.blue(`[Deamon] starting Bot...`));

client.on('ready', () => {
<<<<<<< HEAD

    console.log(chalk.blue(`[Deamon] ${name} are online!`));

});

=======
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

>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
let statuses = [
    `${prefix}help`,
    `${status}`
]

setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: 'PLAYING' }).catch(console.error);
}, 3000)


<<<<<<< HEAD
//Commands
client.on("message", message => {
    let parts = message.content.split(" ");

    if (message.content == prefix+"changelog"){
        let embed = new Discord.MessageEmbed()
            .setTitle("Changelog")
            .setDescription("Version: "+version)
            .addField("🛡 Updates:", "```Really? All is new :)```")
            .addField("📅 Release:", "```22.02.2022```")
=======
//----------- Commands for Admin Features -----------//


client.on("message", message => {
    let parts = message.content.split(" ");

    if (message.content == prefix + "changelog") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Changelog")
            .setDescription("Version: 🔥 HOTFIX" + version)
            .addField("🛡 Updates:", "```\n[-] Report Command\n[+] Update Manager```")
            .addField("📅 Release:", "```10.03.2022```")
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
            .setFooter(`${name} | version ${version}`)
            .setThumbnail(profilpictureurl)
            .setColor(theme)

        message.channel.send(embed)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}changelog`))
<<<<<<< HEAD
            
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
=======

    }
    if (message.content == prefix + "help") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Commands")
            .addField(`Imporant Commands`, `${prefix}help - shows this menu\n${prefix}version - opens the version manager\n${prefix}changelog - shows the changelog\n${prefix}ping - shows your ping`)
            .addField("Fun", `${prefix}iq - shows your IQ\n${prefix}random - shows a random number\n${prefix}rank - shows your XP rate`)
            .addField("Infos", `${prefix}bots - the number of Bots\n${prefix}owner - shows the Ownertag`)
            .addField("Admin", `${prefix}nuke - delete all messages\n${prefix}poll - start a poll\n${prefix}ban - ban a user\n${prefix}kick - kick a user`)
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
            .setFooter(`${name} | version ${version}`)
            .setThumbnail(profilpictureurl)
            .setColor(theme)
        message.channel.send(embed)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}help`))
    }
<<<<<<< HEAD
    if (message.content == prefix+"ping") {
=======
    if (message.content == prefix + "ping") {
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
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
<<<<<<< HEAD
    if (message.content === prefix+"version") {
=======
    if (message.content == prefix + "suspend") {
        const allowedusers = [
            "857312828787392572"
        ]

        if (message.author.id !== allowedusers) {

            message.channel.send("Noice! This is a secret!")
        }
        if (message.author.id == allowedusers) {

            
            fs.writeFileSync('./api/blacklist/blacklist.txt', '2');
            fs.writeFileSync('./api/blacklist/reason.txt', 'To many reports!');
            

        }
    }
    if (message.content === prefix + "version") {
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
        fetch.default(`https://sharesystems.github.io/MasterBot/`)
            .then(res => res.json())
            .then(data => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Versionmanger")
                    .addField("📀 Installed version:", version)
                    .addField("💎 Latest version:", data.version)
<<<<<<< HEAD
                    .setFooter(name+" | "+version)
=======
                    .setFooter(name + " | " + version)
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
                    .setThumbnail(profilpictureurl)
                    .setColor(theme)
                message.channel.send(embed)
                console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}version`))
                if (version < data.version) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle("Update available")
                        .setColor("RED")
<<<<<<< HEAD
                        .setDescription("Please update your bot immediately! It may be important security updates!")
=======
                        .setDescription("Please update your bot immediately! Your can download the update [here](https://github.com/Sharesystems/MasterBot/releases/latest). Here are the Docs to [update](https://github.com/Sharesystems/MasterBot#update-masterbot) your Bot")
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92

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
<<<<<<< HEAD
//Demo Commands
client.on("message", function (message){

    if (message.content == prefix+'bots') {
        message.channel.send(`**${message.guild.name}** has **${message.guild.members.cache.filter(m => m.user.bot).size}** Bot(s) 🤖`)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}bots`))
    }
    if (message.content.startsWith(prefix+"poll")) {
=======


//----------- Other Commands -----------//


client.on("message", function (message) {
    let parts = message.content.split(" ");

    if (message.content == prefix + 'bots') {
        let embed = new Discord.MessageEmbed()
            .setTitle("Bots")
            .setDescription(`🤖 **${message.guild.name}** has **${message.guild.members.cache.filter(m => m.user.bot).size}** Bot(s)`)
            .setColor(theme)
            .setThumbnail(profilpictureurl)
            .setFooter(`${name} | version ${version}`)
        message.channel.send(embed)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}bots`))
    }
    if (message.content.startsWith(prefix + "poll")) {
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
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
<<<<<<< HEAD
    if (message.content == prefix+'owner') {
        message.channel.send(`The Owner of **${message.guild.name}** is **${message.guild.owner.user.tag}**`)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}owner`))
    }
})
=======
    if (message.content == prefix + 'owner') {
        let embed = new Discord.MessageEmbed()
            .setTitle("Owner")
            .setDescription(`👨‍💻 The Owner of **${message.guild.name}** is **${message.guild.owner.user.tag}**`)
            .setColor(theme)
            .setThumbnail(profilpictureurl)
            .setFooter(`${name} | version ${version}`)
        message.channel.send(embed)
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}owner`))
    }
    if (message.content == prefix + "random") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Randomnumber")
            .setDescription(`Your Random Number is: **${random.int(1, 99999999)}**`)
            .setColor(theme)
            .setThumbnail(profilpictureurl)
            .setFooter(`${name} | version ${version}`)
        message.channel.send(embed)
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
    if (message.content.startsWith(prefix + 'ban')) {
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}ban`))
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                member
                    .ban({
                        reason: `Banned from ${name}`,
                    })
                    .then(() => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("✅ Successfully banned!")
                            .setDescription(`The User **${user.tag}** was banned from **${message.guild.name}**`)
                            .setColor(theme)
                            .setFooter(`${name} | version ${version}`)
                            .setImage("https://c.tenor.com/UQOlboL7W5cAAAAd/harry-potter-bye-bye.gif")
                        message.channel.send(embed)
                    })
                    .catch(err => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("❌ ERROR")
                            .setDescription("An unexpected error has occurred...")
                            .addField("It could be because of this:", "- I have too few perms\n- The person mentioned is the owner")
                            .setColor("RED")
                            .setFooter(`${name} | version ${version}`)
                        message.channel.send(embed);
                        console.error(err);
                    });
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("❌ ERROR")
                    .setDescription("I was unable to ban the member. ")
                    .addField("Here's how you can fix this problem.", "- Check if the specified user is spelled correctly.\n-Check if the specified user is on the server")
                    .setColor("RED")
                    .setFooter(`${name} | version ${version}`)
                message.channel.send(embed);
            }
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle("❌ ERROR")
                .setDescription(`Usage: ${prefix}ban <@user>`)
                .addField("Here's how you can fix this problem.", "- Ping the user")
                .setColor("RED")
                .setFooter(`${name} | version ${version}`)
            message.channel.send(embed);
        }
    }
    if (message.content.startsWith(prefix + 'kick')) {
        console.log(chalk.green(`[Logs] ${message.author.tag} use ${prefix}kick`))
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                member
                    .kick()
                    .then(() => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("✅ Successfully kicked!")
                            .setDescription(`The User **${user.tag}** was kicked from **${message.guild.name}**`)
                            .setColor(theme)
                            .setFooter(`${name} | version ${version}`)
                            .setImage("https://c.tenor.com/tCPGyy8fUiUAAAAC/punt-kick.gif")
                        message.channel.send(embed)
                    })
                    .catch(err => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("❌ ERROR")
                            .setDescription("An unexpected error has occurred...")
                            .addField("It could be because of this:", "- I have too few perms\n- The person mentioned is the owner")
                            .setColor("RED")
                            .setFooter(`${name} | version ${version}`)
                        message.channel.send(embed);
                        console.error(err);
                    });
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("❌ ERROR")
                    .setDescription("I was unable to ban the member. ")
                    .addField("Here's how you can fix this problem.", "- Check if the specified user is spelled correctly.\n-Check if the specified user is on the server")
                    .setColor("RED")
                    .setFooter(`${name} | version ${version}`)
                message.channel.send(embed);
            }
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle("❌ ERROR")
                .setDescription(`Usage: ${prefix}ban <@user>`)
                .addField("Here's how you can fix this problem.", "- Ping the user")
                .setColor("RED")
                .setFooter(`${name} | version ${version}`)
            message.channel.send(embed);
        }
    }
})



//----------- XPSystem -----------//


>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
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
<<<<<<< HEAD
        console.log(chalk.green(`[Logs] ${message.author.tag} is now level `+xpfile[message.author.id].level+"!"))
=======
        console.log(chalk.green(`[Logs] ${message.author.tag} is now level ` + xpfile[message.author.id].level + "!"))
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
    }

    fs.writeFile("./datas/xp.json", JSON.stringify(xpfile), function (err) {
        if (err) console.log(err)
    })

<<<<<<< HEAD
    if (message.content.startsWith(prefix+"rank")) {
=======
    if (message.content.startsWith(prefix + "rank")) {
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
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
<<<<<<< HEAD

=======
client.on("message", async message => {
    if (antilink == "true") {

        let link = ["http://", "https://"]
        if (link.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete()
            let embed = new Discord.MessageEmbed()
                .setTitle("🔒 Link found")
                .setDescription(`${message.author} please do not send links in the chat!`)
                .setThumbnail(profilpictureurl)
                .setFooter(name + " | version " + version)
                .setColor(theme)

            message.channel.send(embed)
            console.log(chalk.green(`[Logs] ${message.author.tag} posted a link. This one has been deleted!`))
        }
    }
    if (antiinvite == "true") {

        let link = ["discord.com/invite", "discord.gg/", "dsc.gg", "discord.link", "discord.io"]
        if (link.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete()
            let embed = new Discord.MessageEmbed()
                .setTitle("🔒 Invite found")
                .setDescription(`${message.author} please do not send invitelinks in the chat!`)
                .setThumbnail(profilpictureurl)
                .setFooter(name + " | version " + version)
                .setColor(theme)

            message.channel.send(embed)
            console.log(chalk.green(`[Logs] ${message.author.tag} posted a invitelink. This one has been deleted!`))
        }
    }
})
>>>>>>> d8e3355b3cb18086b30ece2f7486d3753872ee92
client.login(token)