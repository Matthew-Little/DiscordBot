module.exports = {
    name: "roll",

    args: true,

    usage: "<Number of Dice>d<Die Size><+/-><Modifier>",

    description: "dice rolling command",

    execute(message, arguments)  {
        
        let numberOfDice = 0;
        let sizeOfDie = 0;
        let operation = '';
        let modifier = 0;

        let tokens = [];
        while(arguments.length > 0) {
            try {
                tokens = parseArgument(arguments.shift());
                numberOfDice = tokens[0];
                sizeOfDie = tokens[1];
                operation = tokens[2];
                modifier = tokens[3];
                    //Ensures only numbers are passed to the rollDice function
                if(!validTokens(numberOfDice, sizeOfDie, modifier)){
                    message.reply("You put a letter where I expected a number! Please try again.");
                } else {
                    let result = rollDice(numberOfDice, sizeOfDie, operation, modifier);
                    let resultString = generateResultString(result, operation, modifier);
                    message.channel.send(resultString);
                }
            } catch(error) {
                console.error(error);
                message.reply(error)
            }
        }   
    }
}



function parseArgument(argument) {
    let tokens = [];
    let charLocation = 0;
    let symbolLocation = 0;
    
    if(isInvalidArgument(argument)) {
        throw `${argument} is not a valid argument!`;
    }

    for(let i = 0; i < argument.length; ++i) {
        if(argument.charAt(i) === 'd') {
            charLocation = i;
        } else if(isValidSymbol(argument.charAt(i))) {
            symbolLocation = i;
        }
    }

    if(argument.startsWith('d')) {
        tokens.push(1);
    } else {
        tokens.push(parseInt(argument.substring(0, charLocation)));
    }
        
    if(symbolLocation !== 0 ) {
        tokens.push(parseInt(argument.substring(charLocation + 1, symbolLocation)))
        tokens.push(argument.charAt(symbolLocation));
        tokens.push(parseInt(argument.substring(symbolLocation + 1)));
    } else {
        tokens.push(parseInt(argument.substring(charLocation + 1)));
        tokens.push("");
        tokens.push(0);
    }

    return tokens;
}

function isInvalidArgument(argument) {
    let inValid = false;
    let regex = /(\d+|d{1})(\d+|d{1})\d*([\+\-]\d+)?/gi;
    let compare = argument.match(regex);
    console.log(compare);
    if(compare != argument) {
        inValid = true;
    }

    return inValid;
}

function isValidSymbol(symbol) {
    let isValid = false;

    if(symbol === '+' || symbol === '-')
        isValid = true;

    return isValid;
}

function validTokens(numberOfDice, sizeOfDie, modifier) {
    let valid = true;
    if(isNaN(sizeOfDie) || isNaN(numberOfDice) || isNaN(modifier)) {
        valid = false;
    }
    return valid;
}

//random number generator fills an array with the result of each "Roll" and the total result including any modifiers
function rollDice(timesRolled, maximum, operation, modifier) {
    const MINIMUM_RESULT = 1;
    let total = 0;
    let result = [];
    for(let i = 0; i < timesRolled; ++i) {
        result.push(Math.floor((Math.random() * maximum) + MINIMUM_RESULT)); //Math.floor(Math.random() * MAX + MIN) inclusive between min and max
            total += result[i];
    }

    if(operation === '+') {
        total += modifier;
    } else if(operation === '-') {
        total -=modifier;
    }

    result.push(total);
    return result;
}

//recieves the result array and formats it into a string that can be put into the channel
function generateResultString(result, operation, modifier) {
    let lastResult = result.length - 2; //-2 because we pop the total off the end

    let resultString = `Your result is: ${result.pop()} (`;
    for(let i = 0; i < result.length; ++i) {

        resultString += `${result[i]}`;
        if(i != lastResult) {
            resultString += " + ";
        } else if(modifier != 0 && operation === '+') {
            resultString += ` + ${modifier}`;
        } else if(modifier != 0 && operation === '-') {
            resultString += ` - ${modifier}`;
        }
    }
    resultString += ")";

    return resultString;
}


