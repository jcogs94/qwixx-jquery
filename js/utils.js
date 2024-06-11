import { gameState } from "./gameState.js";
import * as elements from "./elements.js";
import * as displayMessage from "./displayMessage.js";

// Validate color is in play still
const colorValid = (inputColor) => {
    if (inputColor === 'red' && gameState.colorInPlay.red) {
        return true;
    } else if (inputColor === 'yellow' && gameState.colorInPlay.yellow) {
        return true;
    } else if (inputColor === 'green' && gameState.colorInPlay.green) {
        return true;
    } else if (inputColor === 'blue' && gameState.colorInPlay.blue) {
        return true;
    }
    else {
        return false;
    }
}

// Validate to ensure number selected is to the right of previously crossed out boxes
const numValid = (inputColor, inputNum) => {
    if (inputColor === 'red' && inputNum > gameState.colorStatus.lowestRed) {
        return true;
    } else if (inputColor === 'yellow' && inputNum > gameState.colorStatus.lowestYellow) {
        return true;
    } else if (inputColor === 'green' && inputNum < gameState.colorStatus.highestGreen) {
        return true;
    } else if (inputColor === 'blue' && inputNum < gameState.colorStatus.highestBlue) {
        return true;
    }
    else
        return false;
}

// Validate to ensure that dice rolled can legally add together to equal the box selected
const additionValid = (inputColor, inputNum) => {
    let combinationValid = false;
    
    // Valid if the two white dice added together equal this amount
    if (inputNum === gameState.rollValues.whiteTotal && gameState.whiteSelection === false) {
        // Enables roll dice button
        $('#roll-button').removeAttr('disabled');
        
        // Removes white option if used
        displayMessage.removeColorOption('white');
        displayMessage.removeOptionOne();

        gameState.whiteSelection = true;
        return true;
    }

    // Valid if the addition of the colored die and one of the white die equals selection
    switch (inputColor) {
        case 'red':
            if (inputNum === gameState.rollValues.redWhite1 || inputNum === gameState.rollValues.redWhite2) {
                combinationValid = true;
            }
            break;
        case 'yellow':
            if (inputNum === gameState.rollValues.yellowWhite1 || inputNum === gameState.rollValues.yellowWhite2) {
                combinationValid = true;
            }
            break;
        case 'green':
            if (inputNum === gameState.rollValues.greenWhite1 || inputNum === gameState.rollValues.greenWhite2) {
                combinationValid = true;
            }
            break;
        case 'blue':
            if (inputNum === gameState.rollValues.blueWhite1 || inputNum === gameState.rollValues.blueWhite2) {
                combinationValid = true;
            }
            break;
    }

    // If the addition of one colored die and one white die equals
    // the player's selection, gameState updated as that part of
    // their turn being completed
    if (combinationValid && gameState.combinationSelection === false) {
        // Removes all options from turn box, turn is over
        displayMessage.removeColorOption('all');

        // Removes turn options
        displayMessage.removeTurnOptions();

        // Displays roll prompt
        displayMessage.rollPrompt();

        gameState.combinationSelection = true;
        return true;
    } else {
        return false;
    }
}

const updateOptionValues = () => {
    // Resets diplay color for each color to false, to be set to true again based on conditions
    const displayColorKeys = Object.keys(gameState.displayColorOption);
    displayColorKeys.forEach( (key) => {
        gameState.displayColorOption[key] = false;
    });

    // If statements below allow the options per color to only display one option if the combination
    // with both white dice are the same. Also removes that color from being displayed if it is no
    // longer in play
    let option1 = 0;
    let option1Valid = false;
    let option2 = 0;
    let option2Valid = false;
    let mostLeftNumber = 0;

    // Displays white if there is a valid move using it, else remove option
    if ( (gameState.rollValues.whiteTotal > gameState.colorStatus.lowestRed) || (gameState.rollValues.whiteTotal > gameState.colorStatus.lowestYellow) || (gameState.rollValues.whiteTotal < gameState.colorStatus.highestGreen) || (gameState.rollValues.whiteTotal < gameState.colorStatus.highestBlue)) {
            let whiteHighValid = false;
            let whiteLowValid = false;
            
            // If it is a 12 or 2, checks if it is valid for any color
            // Any other number has already been checked and displays white
            if (gameState.rollValues.whiteTotal === 12) {
                if (gameState.colorInPlay.red && gameState.colorLockAvailable.red) {
                    whiteHighValid = true;
                } else if (gameState.colorInPlay.yellow && gameState.colorLockAvailable.yellow) {
                    whiteHighValid = true;
                } else if (12 < gameState.colorStatus.highestGreen) {
                    whiteLowValid = true;
                } else if (12 < gameState.colorStatus.highestBlue) {
                    whiteLowValid = true;
                }

                if (whiteHighValid || whiteLowValid) {
                    gameState.displayColorOption.white = true;
                }
            } else if (gameState.rollValues.whiteTotal === 2) {
                if (gameState.colorInPlay.green && gameState.colorLockAvailable.green) {
                    whiteHighValid = true;
                } else if (gameState.colorInPlay.blue && gameState.colorLockAvailable.blue) {
                    whiteHighValid = true;
                } else if (2 > gameState.colorStatus.lowestRed) {
                    whiteLowValid = true;
                } else if (2 > gameState.colorStatus.lowestYellow) {
                    whiteLowValid = true;
                }

                if (whiteHighValid || whiteLowValid) {
                    gameState.displayColorOption.white = true;
                }
            } else {
                if (gameState.rollValues.whiteTotal > gameState.colorStatus.lowestRed) {
                    gameState.displayColorOption.white = true;
                } else if (gameState.rollValues.whiteTotal > gameState.colorStatus.lowestYellow) {
                    gameState.displayColorOption.white = true;
                } else if (gameState.rollValues.whiteTotal < gameState.colorStatus.highestGreen) {
                    gameState.displayColorOption.white = true;
                } else if (gameState.rollValues.whiteTotal < gameState.colorStatus.highestBlue) {
                    gameState.displayColorOption.white = true;
                }
            }
    } else {
        displayMessage.removeColorOption('white');
    }

    // Updates red if it is in play
    if (gameState.colorInPlay.red) {
        mostLeftNumber = gameState.colorStatus.lowestRed;
        
        // If the combination of the red and either white dice is the same number, display number true if valid
        // else, both num variables are updated and checked before displaying true
        if (gameState.rollValues.redWhite1 === gameState.rollValues.redWhite2) {
            if (gameState.rollValues.redWhite1 > mostLeftNumber) {
                if (gameState.rollValues.redWhite1 === 12) {
                    if (gameState.colorLockAvailable.red) {
                        elements.turnBox.redOptions.innerHTML = `${gameState.rollValues.redWhite1}`;
                        gameState.displayColorOption.red = true;
                    }
                } else {
                    elements.turnBox.redOptions.innerHTML = `${gameState.rollValues.redWhite1}`;
                    gameState.displayColorOption.red = true;
                }
            } else {
                displayMessage.removeColorOption('red');
            }
        } else {
            // Adjusts the order of the numbers based on order of the board
            if (gameState.rollValues.redWhite1 < gameState.rollValues.redWhite2) {
                option1 = gameState.rollValues.redWhite1;
                option2 = gameState.rollValues.redWhite2;
            } else {
                option1 = gameState.rollValues.redWhite2;
                option2 = gameState.rollValues.redWhite1;
            }
            
            if (option1 > mostLeftNumber) {
                option1Valid = true;
            }
            
            if (option2 > mostLeftNumber) {
                if (option2 === 12) {
                    if (gameState.colorLockAvailable.red) {
                        option2Valid = true;
                    }
                } else {
                    option2Valid = true;
                }
            }
            
            if (option1Valid && option2Valid) {
                gameState.displayColorOption.red = true;
                elements.turnBox.redOptions.innerHTML = `${option1} / ${option2}`;
            } else if (option1Valid) {
                gameState.displayColorOption.red = true;
                elements.turnBox.redOptions.innerHTML = `${option1}`;
            } else if (option2Valid) {
                gameState.displayColorOption.red = true;
                elements.turnBox.redOptions.innerHTML = `${option2}`;
            } else {
                displayMessage.removeColorOption('red');
            }

            option1Valid = false;
            option2Valid = false;
        }
    }

    // Updates yellow if in play
    if (gameState.colorInPlay.yellow) {
        mostLeftNumber = gameState.colorStatus.lowestYellow;
        
        if (gameState.rollValues.yellowWhite1 === gameState.rollValues.yellowWhite2) {
            if (gameState.rollValues.yellowWhite1 > mostLeftNumber) {
                if (gameState.rollValues.yellowWhite1 === 12) {
                    if (gameState.colorLockAvailable.yellow) {
                        elements.turnBox.yellowOptions.innerHTML = `${gameState.rollValues.yellowWhite1}`;
                        gameState.displayColorOption.yellow = true;
                    }
                } else {
                    elements.turnBox.yellowOptions.innerHTML = `${gameState.rollValues.yellowWhite1}`;
                    gameState.displayColorOption.yellow = true;
                }
            } else {
                displayMessage.removeColorOption('yellow');
            }
        } else {
            // Adjusts the order of the numbers based on order of the board
            if (gameState.rollValues.yellowWhite1 < gameState.rollValues.yellowWhite2) {
                option1 = gameState.rollValues.yellowWhite1;
                option2 = gameState.rollValues.yellowWhite2;
            } else {
                option1 = gameState.rollValues.yellowWhite2;
                option2 = gameState.rollValues.yellowWhite1;
            }
            
            if (option1 > mostLeftNumber) {
                option1Valid = true;
            }
            
            if (option2 > mostLeftNumber) {
                if (option2 === 12) {
                    if (gameState.colorLockAvailable.yellow) {
                        option2Valid = true;
                    }
                } else {
                    option2Valid = true;
                }
            }

            if (option1Valid && option2Valid) {
                gameState.displayColorOption.yellow = true;
                elements.turnBox.yellowOptions.innerHTML = `${option1} / ${option2}`;
            } else if (option1Valid) {
                gameState.displayColorOption.yellow = true;
                elements.turnBox.yellowOptions.innerHTML = `${option1}`;
            } else if (option2Valid) {
                gameState.displayColorOption.yellow = true;
                elements.turnBox.yellowOptions.innerHTML = `${option2}`;
            } else {
                displayMessage.removeColorOption('yellow');
            }

            option1Valid = false;
            option2Valid = false;
        }
    }
    
    // Updates green if in play
    if (gameState.colorInPlay.green) {
        mostLeftNumber = gameState.colorStatus.highestGreen;
        
        if (gameState.rollValues.greenWhite1 === gameState.rollValues.greenWhite2) {
            if (gameState.rollValues.greenWhite1 < mostLeftNumber) {
                if (gameState.rollValues.greenWhite1 === 2) {
                    if (gameState.colorLockAvailable.green) {
                        elements.turnBox.greenOptions.innerHTML = `${gameState.rollValues.greenWhite1}`;
                        gameState.displayColorOption.green = true;
                    }
                } else {
                    elements.turnBox.greenOptions.innerHTML = `${gameState.rollValues.greenWhite1}`;
                    gameState.displayColorOption.green = true;
                }
            } else {
                displayMessage.removeColorOption('green');
            }
        } else {
            // Adjusts the order of the numbers based on order of the board
            if (gameState.rollValues.greenWhite1 > gameState.rollValues.greenWhite2) {
                option1 = gameState.rollValues.greenWhite1;
                option2 = gameState.rollValues.greenWhite2;
            } else {
                option1 = gameState.rollValues.greenWhite2;
                option2 = gameState.rollValues.greenWhite1;
            }
            
            if (option1 < mostLeftNumber) {
                option1Valid = true;
            }
            
            if (option2 < mostLeftNumber) {
                if (option2 === 2) {
                    if (gameState.colorLockAvailable.green) {
                        option2Valid = true;
                    }
                } else {
                    option2Valid = true;
                }
            }
            
            if (option1Valid && option2Valid) {
                gameState.displayColorOption.green = true;
                elements.turnBox.greenOptions.innerHTML = `${option1} / ${option2}`;
            } else if (option1Valid) {
                gameState.displayColorOption.green = true;
                elements.turnBox.greenOptions.innerHTML = `${option1}`;
            } else if (option2Valid) {
                gameState.displayColorOption.green = true;
                elements.turnBox.greenOptions.innerHTML = `${option2}`;
            } else {
                displayMessage.removeColorOption('green');
            }

            option1Valid = false;
            option2Valid = false;
        }
    }

    // Updates blue if in play
    if (gameState.colorInPlay.blue) {
        mostLeftNumber = gameState.colorStatus.highestBlue;
        
        if (gameState.rollValues.blueWhite1 === gameState.rollValues.blueWhite2) {
            if (gameState.rollValues.blueWhite1 < mostLeftNumber) {
                if (gameState.rollValues.blueWhite1 === 2) {
                    if (gameState.colorLockAvailable.blue) {
                        elements.turnBox.blueOptions.innerHTML = `${gameState.rollValues.blueWhite1}`;
                        gameState.displayColorOption.blue = true;
                    }
                } else {
                    elements.turnBox.blueOptions.innerHTML = `${gameState.rollValues.blueWhite1}`;
                    gameState.displayColorOption.blue = true;
                }
            } else {
                displayMessage.removeColorOption('blue');
            }
        } else {
            // Adjusts the order of the numbers based on order of the board
            if (gameState.rollValues.blueWhite1 > gameState.rollValues.blueWhite2) {
                option1 = gameState.rollValues.blueWhite1;
                option2 = gameState.rollValues.blueWhite2;
            } else {
                option1 = gameState.rollValues.blueWhite2;
                option2 = gameState.rollValues.blueWhite1;
            }
            
            if (option1 < mostLeftNumber) {
                option1Valid = true;
            }
            
            if (option2 < mostLeftNumber) {
                if (option2 === 2) {
                    if (gameState.colorLockAvailable.blue) {
                        option2Valid = true;
                    }
                } else {
                    option2Valid = true;
                }
            }
            
            if (option1Valid && option2Valid) {
                gameState.displayColorOption.blue = true;
                elements.turnBox.blueOptions.innerHTML = `${option1} / ${option2}`;
            } else if (option1Valid) {
                gameState.displayColorOption.blue = true;
                elements.turnBox.blueOptions.innerHTML = `${option1}`;
            } else if (option2Valid) {
                gameState.displayColorOption.blue = true;
                elements.turnBox.blueOptions.innerHTML = `${option2}`;
            } else {
                displayMessage.removeColorOption('blue');
            }
        }
    }
}

export { colorValid, numValid, additionValid, updateOptionValues };
