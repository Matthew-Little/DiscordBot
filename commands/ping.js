module.exports = {
    name: "ping",

    description: "ping commmand",
    
    execute(message, arguments){
        message.channel.send("pong");
    }
}