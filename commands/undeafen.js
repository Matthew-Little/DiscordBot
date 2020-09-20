module.exports = {
    name: "undeafen",

    args: true,

    usage: "[@user(s)]",

    guildOnly: true,

    description: "This command undeafens the tagged user(s)",

    execute(message, arguments) {
        
        if(message.member.hasPermission("DEAFEN_MEMBERS")) {

            for(let i = 0; i < users.length; ++i) {
                let member = message.guild.member(users[i]);
                if(member) {
                    member.voice.setDeaf(false, "")
                    .then(()=>{
                        message.reply(`${users[i].tag} has been undeafened`);
                    }).catch(error => {
                        message.reply(`I was unable to undeafen ${users[i].tag}`);
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