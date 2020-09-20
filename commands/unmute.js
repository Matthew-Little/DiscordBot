module.exports = {
    name: "unmute",

    args: true,

    usage: "[@user(s)]",

    guildOnly: true,

    description: "This command unmutes the tagged user",

    execute(message, arguments) {

        let users = [];
        if(typeof(arguments[0]) === typeof([])) {
            users = arguments.shift();
        } else {
            message.reply("No users were mentioned!");
            return;
        }

        if(message.member.hasPermission("MUTE_MEMBERS")) {

            for(let i = 0; i < users.length; ++i) {
                let member = message.guild.member(users[i]);
                if(member) {
                    member.voice.setMute(false, "")
                    .then(()=>{
                        message.reply(`${users[i].tag} has been unmuted`);
                    }).catch(error => {
                        message.reply(`I was unable to unmute ${users[i].tag}`);
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