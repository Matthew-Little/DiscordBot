module.exports = {
    name: "deafen",

    args: true,

    usage: "[@user] [length of deafen]",

    guildOnly: true,

    description: "This command deafens the tagged user",

    execute(message, arguments) {
        
        if(message.member.hasPermission("DEAFEN_MEMBERS")) {
            const user = message.mentions.users.first();
            if(user) {
                const member = message.guild.member(user);
                if(member) {
                    member.voice.setDeaf(true, "Reason for deafen")
                    .then(() =>{
                        message.reply(`${user.tag} has been deafened`);
                    }).catch(error =>{
                        message.reply("I was unable to deafen the member!");
                        console.log(error);
                    })
                } else {
                    message.reply("That user isn't in this guild!")
                }
            } else {
                message.reply("You didn't mention the user to deafen!")
            }
        } else {
            message.reply("You don't have the proper permissions to use this command!")
        }
    }
}