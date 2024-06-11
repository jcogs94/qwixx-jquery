import * as elements from "./elements.js";
import { gameState } from "./gameState.js";
import * as displayMessage from "./displayMessage.js";
import * as utils from "./utils.js"

// Resets dice display to be blank
const resetDice = () => {
    // Replaces red die if previously removed    
    if (document.querySelector('#red-die') === null) {
        elements.dice.white2.insertAdjacentElement('afterend', elements.dice.red);
    }

    // Replaces yellow die if previously removed    
    if (document.querySelector('#yellow-die') === null) {
        elements.dice.red.insertAdjacentElement('afterend', elements.dice.yellow);
    }

    // Replaces red die if previously removed    
    if (document.querySelector('#green-die') === null) {
        elements.dice.yellow.insertAdjacentElement('afterend', elements.dice.green);
    }

    // Replaces red die if previously removed    
    if (document.querySelector('#blue-die') === null) {
        elements.dice.green.insertAdjacentElement('afterend', elements.dice.blue);
    }

    // Resets dice to appear blank until first roll
    const diceArr = Object.keys(elements.dice);
    diceArr.forEach( (die) => {
        elements.dice[die].innerHTML = '';
    })
}

const gameOver = () => {
    let interactiveElements = ['red', 'yellow', 'green', 'blue', 'penaltyBox', 'rollButton'];
    interactiveElements.forEach( (element) => {
        switch (element) {
            case ('penaltyBox'):
                for (let i = 1; i < 5; i++) {
                    elements[element][`${i}`].setAttribute('disabled', true);
                }
                break;
            case ('rollButton'):
                elements[element].setAttribute('disabled', true);
                break;
            default:
                let colorKey = Object.keys(elements[element]);
                colorKey.forEach( (key) => {
                    elements[element][key].setAttribute('disabled', true);
                });
                break;
        }
    })

    // Remove options from turn box
    displayMessage.removeOptionsElement();

    // Removes options in turn box
    displayMessage.removeTurnOptions();

    // Remove roll prompt
    displayMessage.removeRollPrompt();

    // Display game over
    displayMessage.gameOver();
}

// Loops through score values and displays them on the dom
const updateScoreBoard = () => {
    // Defines array to reference the keys for scores
    let scoresArr = Object.keys(gameState.scores);
    
    // Updates scores for gameState
    let marksArr = Object.keys(gameState.playerSelectionCount);
        
    // Loops through the colors, checks the score reference in gameState, and updates values
    marksArr.forEach( (countType) => {
        // If statetment makes sure that the score value is not at default 0
        if (gameState.playerSelectionCount[countType] !== 0) {
            // If penalties, score = count * 5, else uses pointsRef obj to calculate score per color
            if (countType === 'penalties') {
                gameState.scores[countType] = gameState.playerSelectionCount[countType] * 5;
            } else {
                gameState.scores[countType] = gameState.pointsRef[gameState.playerSelectionCount[countType]];
            }
        }
    })

    // Updates total
    gameState.scores.total = gameState.scores.red + gameState.scores.yellow + gameState.scores.green + gameState.scores.blue - gameState.scores.penalties;
    
    // Displays updated scores on the dom
    scoresArr.forEach( (scoreType) => {
        elements.scores[scoreType].innerText = `${gameState.scores[scoreType]}`;
    });
}

// Clears disabled buttons and disables lock buttons
const resetDisabledButtons = () => {
    // Variable and array to be used in the loop
    let buttonKey;
    let color = ['red', 'yellow', 'green', 'blue']
    // Loops through each color[] and uses its key to remove 'disabled' attributes of all buttons
    for (let i = 0; i < 4; i++) {
        buttonKey = Object.keys(elements[color[i]]);
        buttonKey.forEach( (key) => {
            elements[color[i]][key].removeAttribute('disabled');
        })
    }

    // Enables roll button
    elements.rollButton.removeAttribute('disabled');

    // Resets penalty boxes to be unchecked and disabled until first roll
    for (let i = 1; i < 5; i++) {
        elements.penaltyBox[i].checked = false;
        elements.penaltyBox[i].setAttribute('disabled', true);
    }
    
    // Adds 'disabled' attribute to the lock buttons to show user they are unavailable at game start
    for (let disableLock of elements.lockButtons.all) {
        disableLock.setAttribute('disabled', true);
    }
}

// Function used to remove 'X's left from previous game
const removeXs = () => {
    const xElements = document.querySelectorAll('.box-mark');
    xElements.forEach( (markedBox) => {
        markedBox.remove();
    })

    // Removes X's on penalty boxes
    for (let i = 1; i < 5; i++) {
        if (elements.penaltyDisplay[i].innerHTML === 'X') {
            elements.penaltyDisplay[i].innerHTML = '';
        }
    }
}

// Resets all values in gameState
const resetGameState = () => {
    // Used for reference in how functions will clear board (updateScoreBoard())
    gameState.start = true;
    
    // Defines array to reference the keys of multiple objects
    let keyArr = Object.keys(gameState.scores);
    
    // Resets scores
    keyArr.forEach( (scoreType) => {
        gameState.scores[scoreType] = 0;
    });

    // Resets the number of 'boxes' played
    keyArr = Object.keys(gameState.playerSelectionCount);
    keyArr.forEach( (selection) => {
        gameState.playerSelectionCount[selection] = 0;
    });
    
    // Resets the colors in play
    keyArr = Object.keys(gameState.colorInPlay);
    keyArr.forEach( (type) => {
        if (type === 'count') {
            gameState.colorInPlay[type] = 4;
        } else {
            gameState.colorInPlay[type] = true;
        }
    });

    // Resets locks available
    keyArr = Object.keys(gameState.colorLockAvailable);
    keyArr.forEach( (color) => {
        gameState.colorLockAvailable[color] = false;
    });

    // Reset 'hightest' and 'lowest' values
    gameState.colorStatus.lowestRed = 0;
    gameState.colorStatus.lowestYellow = 0;
    gameState.colorStatus.highestGreen = 13;
    gameState.colorStatus.highestBlue = 13;

    // Reset playerChoice
    gameState.playerChoice = '';

    // Reset booleans
    gameState.diceRolled = false;
    gameState.whiteSelection = false;
    gameState.combinationSelection = false;
}

// Clears board to begin a new game
const newGame = () => {
    // Resets values in gameState for a new game
    resetGameState();

    // Resets the dice to be empty
    resetDice();

    // Resets the scores and displays new reset scores
    updateScoreBoard();

    // Reset disabled buttons to false, disable lock buttons
    resetDisabledButtons();

    // Removes any 'X' marks from previous game
    removeXs();

    // Removes game over message
    displayMessage.removeGameOver();

    // Removes the options from the turn box until the first roll
    displayMessage.removeOptionsElement();

    // Resets color options that may have previously been removed
    displayMessage.resetColorOptions();

    // Removes turn options for start of game
    displayMessage.removeTurnOptions();

    // Removes roll prompt
    displayMessage.removeRollPrompt();

    // Prompts player to roll dice
    displayMessage.rollToBegin();
}

// Disables buttons to the left of the user selection to have visual reference
// to the player that those moves are invalid
const disableToLeft = (color) => {
    const colorRowElements = Object.values(elements[color]);
    colorRowElements.forEach((element) => {
        // Determines the color and disables buttons to the left of the highest selection
        switch (color) {
            case 'red':
                if (parseInt(element.innerText) <= gameState.colorStatus.lowestRed) {
                    element.setAttribute('disabled', true);
                }
                
                break;
            case 'yellow':
                if (parseInt(element.innerText) <= gameState.colorStatus.lowestYellow) {
                    element.setAttribute('disabled', true);
                }
                
                break;
            case 'green':
                if (parseInt(element.innerText) >= gameState.colorStatus.highestGreen) {
                    element.setAttribute('disabled', true);
                }
                
                break;
            case 'blue':
                if (parseInt(element.innerText) >= gameState.colorStatus.highestBlue) {
                    element.setAttribute('disabled', true);
                }
                
                break;
        }
    }); 
}

// Checks if player has reached 5 of a color and unlocks last two boxes
const lockCheck = (color, num, lock) => {
    // Else if statements determine if the last number before lock has been played, and player has not
    // marked out 5 of that color yet, disables the color for the rest of the game (not legal for the color
    // to be finished)
    if (gameState.playerSelectionCount[color] >= 5 && gameState.colorLockAvailable[color] === false && gameState.colorInPlay[color]) {
        elements.lockButtons[color].forEach( (lock) => {
            lock.removeAttribute('disabled');
        });
        gameState.colorLockAvailable[color] = true;
    } else if (gameState.colorStatus.lowestRed === 11 && gameState.colorLockAvailable.red === false) {
        gameState.colorInPlay.red = false;
        displayMessage.removeColorOption('red');
    } else if (gameState.colorStatus.lowestYellow === 11 && gameState.colorLockAvailable.yellow === false) {
        gameState.colorInPlay.yellow = false;
        displayMessage.removeColorOption('yellow');
    } else if (gameState.colorStatus.highestGreen === 3 && gameState.colorLockAvailable.green === false) {
        gameState.colorInPlay.green = false;
        displayMessage.removeColorOption('green');
    } else if (gameState.colorStatus.highestBlue === 3 && gameState.colorLockAvailable.blue === false) {
        gameState.colorInPlay.blue = false;
        displayMessage.removeColorOption('blue');
    }
}

// Function to remove a color from the dice rolls
const removeColor = (color) => {
    elements.dice[color].remove();
}

// Crosses out the selection, updates visuals
const crossOutInput = (color, num, lock) => {
    // Updates 'highest' or 'lowest' to implement the rule that
    // the player can't mark things to the left of any of thier
    // previous marks
    switch (color) {
        case 'red':
            gameState.colorStatus.lowestRed = num;
            break;
        case 'yellow':
            gameState.colorStatus.lowestYellow = num;
            break;
        case 'green':
            gameState.colorStatus.highestGreen = num;
            break;
        case 'blue':
            gameState.colorStatus.highestBlue = num;
    }

    // Calls disableToLeft() to disable invalid buttons based
    // on prev rule
    disableToLeft(color);

    // Updates the number of boxes selected for that color
    gameState.playerSelectionCount[color]++;

    // Create 'X' element to go on top of selected box
    const boxMark = document.createElement('h1');
    boxMark.setAttribute('class', 'box-mark');
    boxMark.innerText = 'X';

    // Adds 'X' to box selected, if 'L', referenced separately
    if (num === 0) {
        // Append new 'X' element to the 'L' selected
        elements[color]['L'].appendChild(boxMark);
    }
    else {
        // Append new 'X' element to the number selected
        elements[color][num].appendChild(boxMark);
    }

    // Enables 'lock' buttons if more than five of that
    // color have been selected
    lockCheck(color, num, lock);

    // If a lock has been selected, also marks the adjacent
    // box and adjusts the score
    if (lock) {
        // Copied from above for new 'X', can re-write?
        const lockMark = document.createElement('h1');
        lockMark.setAttribute('class', 'box-mark');
        lockMark.innerText = 'X';
        
        // Marks adjacent box
        if (num === 0) {
            // Player hit 'L' button
    
            // Marks either 12 or 2, depending on color
            if (color === 'red' || color === 'yellow') {
                elements[color]['12'].appendChild(lockMark);
            } else if (color === 'green' || color === 'blue') {
                elements[color]['2'].appendChild(lockMark);
            }
        } else if (num === 12 || num === 2) {
            // Player hit '12' button
            
            // Marks 'L'
            elements[color]['L'].appendChild(lockMark);
        }
        
        // Lock whole row
        let colorRow = Object.keys(elements[color]);
        colorRow.forEach( (key) => {
            elements[color][key].setAttribute('disabled', true);
        });

        // Removes locked color die from game
        removeColor(color);

        // Removes color option from turn box
        displayMessage.removeColorOption(color);

        // Update game state
        gameState.playerSelectionCount[color]++;        // For the 12 or 'L'
        gameState.colorInPlay[color] = false;           // Takes color out of play
        gameState.colorInPlay.count--;                  // Notes color taken out of play (for the end of game)
        gameState.colorLockAvailable[color] = false;    // Ensures the lock buttons do not become enabled again
    }

    // Update scores and score board
    updateScoreBoard();

    // Updates options
    if (!gameState.combinationSelection) {
        utils.updateOptionValues();
    }

    if (gameState.colorInPlay.count <= 2) {
        if (gameState.combinationSelection) {
            gameOver();
        } else {
            let secondMoveAvailable = false;
            const displayOptionsKeys = Object.keys(gameState.displayColorOption);
            displayOptionsKeys.forEach( (key) => {
                if (gameState.displayColorOption[key] === true) {
                    secondMoveAvailable = true;
                }
            })

            if (!secondMoveAvailable) {
                gameOver();
            }
        }
    }
}

// validates the user's input as a valid play
const validateInput = () => {
    let valid = false;
    
    let input = gameState.playerChoice.split(' ');
    let color = input[0];
    let num = 0;
    let lock = false;
    let numChanged = false;

    // Checks the last character of the string given by button press
    // If 'L', lock. Else, num
    if (isNaN(input[1])) {
        lock = true;
    }
    else {
        num = parseInt(input[1]);
        if (num === 12 && (color === 'red' || color === 'yellow')) {
            lock = true;
        }
        else if (num === 2 && (color === 'green' || color === 'blue')) {
            lock = true;
        }
    }  
    
    // Checks if color is valid (from utils function)
    let colorValid = utils.colorValid(color);

    // If the color is valid and 'L' or '12' have been pressed,
    // makes sure the 'L' press num equal to '12'
    if (colorValid && lock && num === 0) {
        if (color === 'red' || color === 'yellow') {
            num = 12;
        } else if (color === 'green' || color === 'blue'){
            num = 2;
        }
        numChanged = true;
    }

    // Checks if the number in that color is valid
    let numValid = utils.numValid(color, num);

    // Checks if the dice rolled can be added together to make that number
    let additionValid = utils.additionValid(color, num);

    // Makes the input valid if all three conditions are met
    if (colorValid && numValid && additionValid) {
        valid = true;
    }

    // Continues game if input valid, else message displayed
    if (valid) {
        // Turn validation before continuing, else message displayed
        if (gameState.diceRolled) {
            if(gameState.combinationSelection) {
                // Enables roll dice button
                elements.rollButton.removeAttribute('disabled');
                
                gameState.diceRolled = false;
            }
            
            if (numChanged) {
                num = 0;
            }
            
            crossOutInput(color, num, lock);
        }
    }
    else {
        // Placeholder for displaying invalid selection error message
    }
}

// Updates possible values choosen by user
const calcOptions = () => {
    gameState.rollValues.whiteTotal = gameState.roll.white1 + gameState.roll.white2;
    
    if (gameState.colorInPlay.red) {
        gameState.rollValues.redWhite1 = gameState.roll.red + gameState.roll.white1;
        gameState.rollValues.redWhite2 = gameState.roll.red + gameState.roll.white2;
    }

    if (gameState.colorInPlay.yellow) {
        gameState.rollValues.yellowWhite1 = gameState.roll.yellow + gameState.roll.white1;
        gameState.rollValues.yellowWhite2 = gameState.roll.yellow + gameState.roll.white2;
    }

    if (gameState.colorInPlay.green) {
        gameState.rollValues.greenWhite1 = gameState.roll.green + gameState.roll.white1;
        gameState.rollValues.greenWhite2 = gameState.roll.green + gameState.roll.white2;
    }

    if (gameState.colorInPlay.blue) {
        gameState.rollValues.blueWhite1 = gameState.roll.blue + gameState.roll.white1;
        gameState.rollValues.blueWhite2 = gameState.roll.blue + gameState.roll.white2;
    }
}

// Used for rolling dice, obtained from url below:
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const rollDie = () => {
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

// Rolls white dice and dice by color if still in play
const rollDice = () => {
    if (gameState.diceRolled === false || gameState.whiteSelection) {
        // Game started on first roll
        if (gameState.start) {
            // Enables penalty boxes
            for (let i = 1; i < 5; i++) {
                elements.penaltyBox[i].removeAttribute('disabled');
            }
            
            gameState.start = false;
        }

        // Removes roll to begin prompt
        if (document.querySelector('#roll-to-begin') !== null) {
            displayMessage.removeRollToBegin();
        }

        // Removes roll prompt
        if (document.querySelector('#roll-dice-prompt') !== null) {
            displayMessage.removeRollPrompt();
        }

        // Displays turn prompt
        displayMessage.turnOptions();
        
        // Rolls white die
        gameState.roll.white1 = rollDie();
        elements.dice.white1.innerHTML = gameState.roll.white1;
        
        gameState.roll.white2 = rollDie();
        elements.dice.white2.innerHTML = gameState.roll.white2;
        
        // Rolls each color if in play and updates dom
        if (gameState.colorInPlay.red) {
            gameState.roll.red = rollDie();
            elements.dice.red.innerHTML = gameState.roll.red;
        }
        if (gameState.colorInPlay.yellow) {
            gameState.roll.yellow = rollDie();
            elements.dice.yellow.innerHTML = gameState.roll.yellow;
        }
        if (gameState.colorInPlay.green) {
            gameState.roll.green = rollDie();
            elements.dice.green.innerHTML = gameState.roll.green;
        }
        if (gameState.colorInPlay.blue) {
            gameState.roll.blue = rollDie();
            elements.dice.blue.innerHTML = gameState.roll.blue;
        }
        
        // Calls function to update possible values from roll
        calcOptions();

        // Displays options
        displayMessage.options();

        // Updates game state
        gameState.diceRolled = true;
        gameState.whiteSelection = false;
        gameState.combinationSelection = false;

        // Disables roll dice button until turn complete
        elements.rollButton.setAttribute('disabled', 'true');
    } else {
        // Can't roll dice error placeholder
    }
}

// export functions for use in app
export { newGame, rollDice, validateInput, updateScoreBoard, gameOver };
