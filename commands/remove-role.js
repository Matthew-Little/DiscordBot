module.exports = {
    name: "remove-role",

    args: true,

    usage: "[@user] [role-name]",

    guildOnly: true,

    description: "This command allows the admins to remove a users role",

    execute(message, arguments) {

        const role = message.guild.roles.cache.find(role => role.name === arguments[1]);
        if(!role) {
            message.reply("There is no role with that name!");
            return;
        }
         //if the user issuing the command has the correct permissions
         if(message.member.hasPermission("MANAGE_ROLES")) {
            const user = message.mentions.users.first();
            //If there was a user mentioned 
            if(user) {
                const member = message.guild.member(user);
                //if that user is a member of the "guild"
                if(member) {
                    member.roles.remove(role)
                    .then(()=>{
                        message.reply(`${user.tag} role removed successfully.`);
                    }).catch(error =>{
                        message.reply(`I was unable to remove the members role!`);
                        console.log(error);
                    });
                } else {
                    message.reply(`That user isn't in this guild!`);
                }
            } else {
                message.reply("You didn't mention the user remove the role from to!");
            }
        } else {
            message.reply("You don't have the proper permissions to use this command!");
        }
    }
}