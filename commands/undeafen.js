module.exports = {
    name: "undeafen",

    args: true,

    usage: "[@user]",

    guildOnly: true,

    description: "This command undeafens the tagged user",

    execute(message, arguments) {
        
        if(message.member.hasPermission("DEAFEN_MEMBERS")) {
            const user = message.mentions.users.first();
            if(user) {
                const member = message.guild.member(user);
                if(member) {
                    member.voice.setDeaf(false, "Reason for undeafen")
                    .then(() =>{
                        message.reply(`${user.tag} has been undeafened`);
                    }).catch(error =>{
                        message.reply("I was unable to undeafen the member!");
                        console.log(error);
                    })
                } else {
                    message.reply("That user isn't in this guild!")
                }
            } else {
                message.reply("You didn't mention the user to undeafen!")
            }
        } else {
            message.reply("You don't have the proper permissions to use this command!")
        }
    }
}