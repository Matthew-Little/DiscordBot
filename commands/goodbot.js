module.exports = {
    name: "goodbot",

    args: false,

    usage: '',

    guildOnly: false,

    description: "Let the dicebot know he's doing a good job",

    execute(message, arguments) {
        message.react("🐶");
    }
}