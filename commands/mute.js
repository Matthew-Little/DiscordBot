module.exports = {
    name: "mute",

    args: true,

    usage: "[@user] [length of mute]",

    guildOnly: true,

    description: "This command mutes the tagged user",

    execute(message, arguments) {

        if(message.member.hasPermission("MUTE_MEMBERS")) {
            const user = message.mentions.users.first();
            if(user) {
                const member = message.guild.member(user);
                if(member) {
                    member.voice.setMute(true, "Reason for mute")
                    .then(() =>{
                        message.reply(`${user.tag} has been muted`);
                    }).catch(error =>{
                        message.reply("I was unable to mute the member!");
                        console.log(error);
                    })
                } else {
                    message.reply("That user isn't in this guild!")
                }
            } else {
                message.reply("You didn't mention the user to mute!")
            }
        } else {
            message.reply("You don't have the proper permissions to use this command!")
        }
    }

}