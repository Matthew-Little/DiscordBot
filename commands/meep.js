module.exports = {
    name: 'meep',

    args: false,

    usage: '',

    guildOnly: false,

    execute(message, arguments) {
        message.channel.send("morp, I'm a robot");
    }
}