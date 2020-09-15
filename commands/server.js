module.exports = {
    name: "server",

    args: false,

    usage: "",

    guildOnly: true,

    description: "This command displays server information",

    execute(message, arguments) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated on: ${message.guild.createdAt}\nRegion: ${message.guild.region}`);
    }
}