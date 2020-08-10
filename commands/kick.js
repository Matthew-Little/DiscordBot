module.exports = {

    name: "kick",

    args: true,

    usage: "[@user]",

    description: "The kick command",

    execute(message, arguments) {
       
        if(message.member.roles.cache.has("742409416946614352")) {
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
            message.reply("You don't have the proper permission to use this command!");
        }
    }
}