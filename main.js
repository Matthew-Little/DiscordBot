const Discord = require("discord.js");
const fs = require("fs");
const { prefix, token } = require("./config.json")

const client = new Discord.Client();
client.commands = new Discord.Collection();

//Reads through all command files in the directory and adds them to the commands collection
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", ()=>{
    console.log("DiceBot is online!");
});

//Welcome message to new server members
client.on("guildMemberAdd", (member)=>{
    const channel = member.guild.channels.cache.find(ch => ch.name === "general");

    if(!channel)
        return;
    channel.send(`Welcome to the server ${member}, feel free to type /help to see all the things I can do!`);
});

//Command Handler
client.on("message", (message)=>{

    if(!message.content.startsWith(prefix) || message.author.bot)
        return;

    const arguments = message.content.slice(prefix.length).split(' ');
    const commandName = arguments.shift().toLowerCase()
  
    if(!client.commands.has(commandName)) {
        message.channel.send("Sorry I can't find that command! \nTry using my /help command to see a list of all the commands I have available.")        
        return;
    }

    const command = client.commands.get(commandName);

    //Ensures Commands meant for the server are not executed in DM's
    if(command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs!");
    }

    //Argument Checker
    if(command.args && !arguments.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        
        if(command.usage) 
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;

        return message.channel.send(reply);
    }

    try {
        command.execute(message, arguments);
    } catch(error) {
        console.error(error);
        message.reply("Sorry there was an error trying to execute that command!");
    }
});

client.login(token);