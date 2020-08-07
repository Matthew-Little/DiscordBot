module.exports = {
    name: "reload",

    args: true,

    usage: "<Command name>",

    description: "Reloads a command",

    execute(message, arguments) {

        const commandName = arguments[0].toLowerCase();
        const command = message.client.commands.get(commandName);

        if(!command)
            return message.channel.send(`There is no command with the name \`${commandName}\`, ${message.author}`);

        //removes the command from the require cache so that the updated file is added when we call require again
        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const reloadedCommand = require(`./${command.name}.js`);
            message.client.commands.set(reloadedCommand.name, reloadedCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded!`);
        } catch(error) {
            console.log(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    }
}