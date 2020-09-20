module.exports = {
    name: "user-info",

    args: false,

    usage: "[@user]",

    guildOnly: false,

    description: "Displays info for the mentioned user",

    execute(message, arguments) {

        let users = [];
        if(typeof(arguments[0] === typeof([]))) {
            users = arguments.shift();
        } else {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
            return;
        }

        for(let i = 0; i < users.length; ++i) {
            let member = message.guild.member(users[i]);
            if(member) {
                message.channel.send(`Username: ${users[i].username}\n ID: ${users[i].id}`)
            } else {
                message.reply(`${users[i].tag} is not a member of the guild!`);
            }
        }
    }

}