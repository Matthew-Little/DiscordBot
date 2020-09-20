module.exports = {
    name: "avatar",

    args: false,

    usage: "[@user]",

    guildOnly: true,

    description: "Returns a link to the users avatar",

    execute(message, arguments) {

        let users = [];
        if(typeof(arguments[0]) === typeof([])) {
            users = arguments.shift();
        } else {
            message.channel.send(`${message.author.username}'s avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
        }
        
        for(let i = 0; i < users.length; ++i) {
            message.channel.send(`${users[i].username}'s avatar: ${users[i].displayAvatarURL({ dynamic: true })}`);
        }
    }

}