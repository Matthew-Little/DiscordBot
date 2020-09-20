module.exports = {
    name: "add-role",

    args: true,

    usage: "[@user] [role-name]",

    guildOnly: true,

    description: "This command allows the admins to add a users role",

    execute(message, arguments) {
        
        let users = [];
        if(typeof(arguments[0]) === typeof([])) {
            users = arguments.shift();
        } else {
            message.reply("No users were mentioned!");
            return;
        }

        const role = message.guild.roles.cache.find(role => role.name === arguments[0]);
        if(!role) {
            message.reply("There is no role with that name!");
            return;
        }

        if(message.member.hasPermission("MANAGE_ROLES")) {

            for(let i = 0; i < users.length; ++i) {
                let member = message.guild.member(users[i]);
                if(member) {
                    member.roles.add(role)
                    .then(()=>{
                        message.reply(`${user.tag} was added to ${role.name}`);
                    }).catch(error => {
                        message.reply(`I was unable to add ${user.tag} to ${role.name}`);
                        console.log(error);
                    })
                } else {
                    message.reply(`${user.tag} isn't in the guild!`);
                }
            }

        } else {
            message.reply("You don't have the proper permissions to use this command!");
        }
    }
}





