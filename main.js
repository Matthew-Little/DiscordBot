const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = '/';
const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once("ready", ()=>{
    console.log("DiceBot is online!");
});

client.on("message", (message)=>{

    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const arguments = message.content.slice(prefix.length).split(' ');
    const command = arguments.shift().toLowerCase()

    if(command === "ping") {
        client.commands.get("ping").execute(message, arguments);
    } else if(command === "roll") {
        client.commands.get("roll").execute(message, arguments);
    } else {
        message.channel.send("Sorry, I didnt quite catch that!");
    }
});

client.login("NzQwNjUzMjEyOTE0NDE3Nzc0.XysJDg.AOvugT88dPekEmxu9pVcxXFdEGo");