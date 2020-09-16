module.exports = {
    name: "unmute",

    args: true,

    usage: "[@user]",

    guildOnly: true,

    description: "This command unmutes the tagged user",

    execute(message, arguments) {
        if(message.member.hasPermission("MUTE_MEMBERS")) {
            const user = message.mentions.users.first();
            if(user) {
                const member = message.guild.member(user);
                if(member) {
                    member.voice.setMute(false, "Reason for unmute")
                    .then(() =>{
                        message.reply(`${user.tag} has been unmuted`);
                    }).catch(error =>{
                        message.reply("I was unable to unmute the member!");
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