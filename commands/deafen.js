module.exports = {
    name: "deafen",

    args: true,

    usage: "[@user(s)] [length of deafen]",

    guildOnly: true,

    description: "This command deafens the tagged user(s)",

    execute(message, arguments) {
        
        let users = [];
        if(typeof(arguments[0]) === typeof([])) {
            users = arguments.shift();
        } else {
            message.reply("No users were mentioned!");
            return;
        }

        if(message.member.hasPermission("DEAFEN_MEMBERS")) {

            for(let i = 0; i < users.length; ++i) {
                let member = message.guild.member(users[i]);
                if(member) {
                    member.voice.setDeaf(true, "")
                    .then(()=>{
                        message.reply(`${users[i].tag} has been deafened`);
                    }).catch(error => {
                        message.reply(`I was unable to deafen ${users[i].tag}`);
                        console.log(error);
                    });
                } else {
                    message.reply(`${users[i].tag} is not a member of the guild!`)
                }
            }

        } else {
            message.reply("You don't have the proper permissions to use this command!")
        }
    }
}