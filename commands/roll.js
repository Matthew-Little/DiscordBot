module.exports = {
    name: "roll",

    args: true,

    usage: "<Number of Dice>d<Die Size> <+/-> <Modifier>",

    description: "dice rolling command",

    execute(message, arguments)  {
        if(!validNumberOfArguments(arguments)) {
            let error = "It seems like you sent me the wrong number of Arguments!\n"
            error += "This command can be used in the following way:\n";
            error += this.usage;
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
            //Ensures only numbers are passed to the rollDice function
            if(isNaN(sizeOfDie) || isNaN(numberOfDice) || isNaN(modifier)){
                message.channel.send("Sorry it appears that you did not input a number where I expected one!");
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

//Parses the first argument to ensure that whether the user enters d8 or 1d8 the command functions as expected
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

//random number generator fills an array with the result of each "Roll" and the total result including any modifiers
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

//recieves the result array and formats it into a string that can be put into the channel
function generateResultString(result, modifier) {
    let lastResult = result.length - 2; //-2 because we pop the total off the end

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