module.exports = {
    name: "roll",

    args: true,

    usage: "<Number of Dice>d<Die Size> <+/-> <Modifier>",

    description: "dice rolling command",

    execute(message, arguments){
        if(!validNumberOfArguments(arguments)){
            let error = "It seems like you sent me the wrong number of Arguments!\n"
            error += "This command can be used in any of the following ways:\n";
            error += "/roll dy\n"
            error += "/roll xdy\n"
            error += "/roll xdy + z\n"
            error += "/roll xdy - z\n"
            error += "where x is the number of dice to roll, y is the type of die and z is the modifier\n";
            message.channel.send(error);
            
        }  else {
            let numberOfDice = 0;
            let sizeOfDie = 0;
            let modifier = 0;

            const tokens = parseFirstArgument(arguments[0]);
            numberOfDice = tokens[0];
            sizeOfDie = tokens[1];

            if(arguments.length > 1) {

                if(arguments[1] === '+') {
                    modifier += parseInt(arguments[2]);
                } else if(arguments[1] === '-') {
                    modifier -= parseInt(arguments[2]);
                } else {
                    message.channel.send("Sorry I did not recognize the second argument, I am looking for a + or -");
                }
            }
            if(isNaN(sizeOfDie) || isNaN(numberOfDice) || isNaN(modifier)){
                message.channel.send("Sorry it appears that you did not input a number where I expected one!")
            } else {
                let result = rollDice(sizeOfDie, numberOfDice, modifier);
                let resultString = generateResultString(result, modifier);
                message.channel.send(resultString);
            }
           
        }
    }
}

function validNumberOfArguments(arguments) {
    let isValid = false;
    if(arguments.length === 1 || arguments.length === 3) {
        isValid = true;
    }
    return isValid;
}

function parseFirstArgument(argument) {
    const tokens = [];

    if(arguments[0].charAt(0).toLowerCase() === 'd') {
        tokens.push(1);
        tokens.push(parseInt(argument.charAt(1)));
    } else {
        tokens.push(parseInt(argument.charAt(0)));
        tokens.push(parseInt(argument.charAt(2)));
    }

    return tokens;
}

function rollDice(sizeOfDie, numberOfDice, modifier) {
    let total = modifier;
    let result = [];
    for(let i = 0; i < numberOfDice; ++i) {
        result.push(Math.floor((Math.random() * sizeOfDie) + 1));
        total += result[i];
    }
    result.push(total);
    return result;
}

function generateResultString(result, modifier) {
    let lastResult = result.length - 2;

    let resultString = `Your result is: ${result.pop()} (`;
    for(let i = 0; i < result.length; ++i) {
        resultString += `${result[i]}`;
        if(i != lastResult) {
            resultString += " + ";
        } else if(modifier != 0) {
            resultString += ` + ${modifier}`;
        }
    }
    resultString += ")";

    return resultString;
}