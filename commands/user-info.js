module.exports = {
    name: "user-info",

    args: false,

    usage: "[@user]",

    guildOnly: false,

    description: "Displays info for the calling or mentioned user",

    execute(message, arguments) {
        const user = message.mentions.users.first();

        if(user) {
            const member = message.guild.member(user);
            if(member) {
                message.channel.send(`Username: ${user.username}\n ID: ${user.id}`);
            }
        } else {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
        } 
    }

}