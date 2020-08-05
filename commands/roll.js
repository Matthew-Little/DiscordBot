module.exports = {
    name: "roll",
    description: "dice rolling command",
    execute(message, arguments){
        if(arguments.length > 1){
            message.channel.send("You sent me too many arguments!");
        } else if(arguments.length < 1){
            message.channel.send("You sent me too few arguments!");
        } else {
            const argument = arguments.shift();
            const numberOfDice = parseInt(argument.charAt(0));
            const sizeOfDie = parseInt(argument.charAt(2));

            message.channel.send(numberOfDice);
            message.channel.send(sizeOfDie);

            let result = rollDice(sizeOfDie, numberOfDice);
            message.channel.send(`Your result is: ${result}`);
        }
    }
}

function rollDice(sizeOfDie, numberOfDice) {
    let result = 0;
    for(let i = 0; i < numberOfDice; ++i) {
        result += Math.floor((Math.random() * sizeOfDie) + 1);
    }

    return result;
}