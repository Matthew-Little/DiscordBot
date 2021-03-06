module.exports = {
    name: "kick",

    args: true,

    usage: "[@user]",

    guildOnly: true,

    description: "This command kicks the tagged user",

    execute(message, arguments) {
        //if the user issuing the command has the correct permissions
        if(message.member.hasPermission("KICK_MEMBERS")) {
            const user = message.mentions.users.first();
            //If there was a user mentioned 
            if(user) {
                const member = message.guild.member(user);
                //if that user is a member of the "guild"
                if(member) {
                    member.kick("Message for audit logs")
                    .then(()=>{
                        message.reply(`${user.tag} kicked succesfully.`);
                    }).catch(error =>{
                        message.reply(`I was unable to kick the member!`);
                        console.log(error);
                    });
                } else {
                    message.reply(`That user isn't in this guild!`);
                }
            } else {
                message.reply("You didn't mention the user to kick!");
            }
        } else {
            message.reply("You don't have the proper permissions to use this command!");
        }
    }
}