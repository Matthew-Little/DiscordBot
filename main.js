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

    //if message did not start with the prefix or the message came from a bot, ignore the message
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;

    //slice message into individual "arguments"
    const arguments = message.content.slice(prefix.length).trim().split(/ +/);
    //move the first argument containing the commandName from the array
    const commandName = arguments.shift().toLowerCase()

    //If the command does not exist
    if(!client.commands.has(commandName)) {
        message.channel.send("Sorry I can't find that command! \nTry using my /help command to see a list of all the commands I have available.");        
        return;
    }

    //retrieve the command from the command collection
    const command = client.commands.get(commandName);

    //Ensures Commands meant for the server are not executed in DM's
    if(command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs!");
    }

    //Mention Handler
    let mentions = [];
    let user;

    for(let i = 0; i < arguments.length; ++i) {
        //try to retrieve a user from the argument
        user = getUserFromMention(arguments[i]);

        //if the user is not null add it to the mentions array
        if(user) {
            mentions.push(user);
        }
    }
    //For each mention shift the argument off the front
    for(let i = 0; i < mentions.length; ++i) {
        arguments.shift();
    }
    //Add array of mentions to the front of the arguments array
    if(mentions.length > 0) {
        arguments.unshift(mentions);
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

process.on("unhandledRejection", error => {
   console.error("Unhandled promise rejection: ", error); 
});

client.login(token);


function getUserFromMention(mention) {
    
    const matches = mention.match(/^<@!?(\d+)>$/);

    //If supplied variable was not a mention, matches will be null instead of an array.
    if(!matches) return;

    //the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
    const id = matches[1];

    return client.users.cache.get(id);  
}