import { gameState } from "./gameState.js";
import * as gameFunctions from "./gameFunctions.js";
import * as elements from "./elements.js";
import * as displayMessage from "./displayMessage.js";

// Each color button will update the 'playerChoice' and call for validation
// if the dice have been rolled
const colorButton = (color, name) => {
    gameState.playerChoice = `${color} ${name}`;
    if (gameState.diceRolled) {
        gameFunctions.validateInput();
    }
}

const rollButton = () => {
    gameFunctions.rollDice();
}

const newGameButton = () => {
    gameFunctions.newGame();
}

const penaltyBox = () => {
    if (gameState.diceRolled) {
        // Disables the checked box
        for (let i = 1; i < 5; i++) {
            let id = '#checkbox' + String(i)
            if (document.querySelector(id).checked === true) {
                $(id).attr('disabled', true);
                $((id + '-label')).html('X');
            }
        }
    
        // Adjusts penalty count in gameState
        gameState.playerSelectionCount.penalties++;
    
        // Displays updated score
        gameFunctions.updateScoreBoard();
    
        // Game over if all boxes checked
        if (gameState.playerSelectionCount.penalties === 4) {
            gameFunctions.gameOver();
        } else {
            // Ends turn, enables roll button
            gameState.diceRolled = false;
            $('#roll-button').removeAttr('disabled');
            
            // Removes options display, and calls for roll
            displayMessage.removeColorOption('all');
            displayMessage.removeTurnOptions();
            displayMessage.rollPrompt();
        }
    } else {
        // Unchecks the checked box
        for (let i = 1; i < 5; i++) {
            if (elements.penaltyBox[i].checked === true && elements.penaltyBox[i].disabled === false) {
                elements.penaltyBox[i].checked = false;
            }
        }
    }
}

export { colorButton, rollButton, newGameButton, penaltyBox };
