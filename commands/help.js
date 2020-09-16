const { prefix } = require("../config.json");

module.exports = {
    name: "help",

    args: false,

    usage: "[Command name>]",

    guildOnly: false,

    description: "List all of my commands or info about a specific command.",

    execute(message, arguments) {
        const data = [];
        const { commands }  = message.client;

        if(!arguments.length) {
            data.push("Here's a list of all my commands:");
            data.push(commands.map(command => command.name).join(", "));
            data.push(`\nYou can send \`${prefix}help <command name>\` to get info on a specific command!`);

            return message.author.send(data, {split: true})
            .then(()=> {
                //this ensures that if you DM the bot the help command it does not display the message that follows this if statement
                if(message.channel.type === "dm") 
                    return;
                message.reply("I've sent you a DM with all my commands!");
            })
            .catch(error=> {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply("it seems like I can't DM you! Do you have DMs disabled?");
            })
        }

        const name = arguments[0].toLowerCase();
        const command = commands.get(name);

        if(!command) 
            return message.reply("that's not a valid command!");
        
        //Formatting for the /help <command name> return
        data.push(`**Name:** ${command.name}`);
        if (command.description) 
            data.push(`**Description:** ${command.description}`);
        if (command.usage) 
            data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });
    }
}