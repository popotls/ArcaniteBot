const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    fs = require('fs')

client.login(config.token)
client.commands = new Discord.Collection()
const Client = new Discord.Client()

fs.readdir('./commands', (err, files) =>{
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greetinga.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} !`)
        .setColor('#00ff00')
        .setFooter('ArcaniteRP', 'https://media.discordapp.net/attachments/814092340880736256/814804879015936050/Arcanite.png.gif'))
    member.roles.add(config.greetinga.role)
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greetinga.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitter le serveur...`)
        .setColor('#ff0000'))
})
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greetingb.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} !`)
        .setColor('#00ff00')
        .setFooter('ArcaniteRP', 'https://media.discordapp.net/attachments/814092340880736256/814804879015936050/Arcanite.png.gif'))
    member.roles.add(config.greetingb.role)
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greetingb.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitter le serveur...`)
        .setColor('#ff0000'))
})
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greetingc.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} !`)
        .setColor('#00ff00')
        .setFooter('ArcaniteRP', 'https://media.discordapp.net/attachments/814092340880736256/814804879015936050/Arcanite.png.gif'))
    member.roles.add(config.greetingc.role)
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greetingc.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitter le serveur...`)
        .setColor('#ff0000'))
})
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greetingd.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} !`)
        .setColor('#00ff00')
        .setFooter('ArcaniteRP', 'https://media.discordapp.net/attachments/814092340880736256/814804879015936050/Arcanite.png.gif'))
    member.roles.add(config.greetingd.role)
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greetingd.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitter le serveur...`)
        .setColor('#ff0000'))
})

const fivereborn = require('fivereborn-query')

Client.once('ready', () => {
    console.log('Bot is online')
})

function activity(){ 
    setTimeout(() => { 
        fivereborn.query(config.SERVER_IP,config.SERVER_PORT, (err, data) => { 
            if (err) { 
                return console.log(err); 
            } else { 
                Client.user.setActivity(`${data.clients} players on ${config.SERVER_NAME}`, (status, { type: 'WATCHING' })) 
            }
        });
        activity(); 
    }, 1000); 
}

activity(); 

Client.login(config.token)
