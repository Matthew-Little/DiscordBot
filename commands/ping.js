//Basic command used to test the bot and understand how commands are created
module.exports = {
    name: "ping",

    description: "ping commmand",
    
    execute(message, arguments){
        message.channel.send("pong");
    }
}