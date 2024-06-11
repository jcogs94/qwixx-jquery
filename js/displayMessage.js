import * as elements from "./elements.js";
import { gameState } from "./gameState.js";
import { updateOptionValues } from "./utils.js";

// Remove heading and option elements from dom
const removeOptionsElement = () => {
    elements.optionsHeadingBox.remove();
    elements.optionsBox.remove();
}

const removeColorOption = (color) => {
    switch (color) {
        case 'all':
            elements.turnBox.whiteOptions.remove();
            elements.turnBox.redOptions.remove();
            elements.turnBox.yellowOptions.remove();
            elements.turnBox.greenOptions.remove();
            elements.turnBox.blueOptions.remove();
            break;
        case 'white':
            elements.turnBox.whiteOptions.remove();
            break;
        case 'red':
            elements.turnBox.redOptions.remove();
            break;
        case 'yellow':
            elements.turnBox.yellowOptions.remove();
            break;
        case 'green':
            elements.turnBox.greenOptions.remove();
            break;
        case 'blue':
            elements.turnBox.blueOptions.remove();
            break;
    }
}

// Removes all turn box options and adds them if they are valid plays
const resetColorOptions = () => {
    // Resets options in turn box
    removeColorOption('all');
    
    if (gameState.displayColorOption.white === true) {
        elements.optionsBox.append(elements.turnBox.whiteOptions);
    }
    
    if (gameState.displayColorOption.red === true) {
        elements.optionsBox.append(elements.turnBox.redOptions);
    }
    
    if (gameState.displayColorOption.yellow === true) {
        elements.optionsBox.append(elements.turnBox.yellowOptions);
    }
    
    if (gameState.displayColorOption.green === true) {
        elements.optionsBox.append(elements.turnBox.greenOptions);
    }
    
    if (gameState.displayColorOption.blue === true) {
        elements.optionsBox.append(elements.turnBox.blueOptions);
    }
}

const options = () => {
    // Updates options with current values
    elements.turnBox.whiteOptions.innerHTML = `${gameState.rollValues.whiteTotal}`;

    // Updates options elements with valid plays
    updateOptionValues();
    
    // Insert heading and options elements to dom if previously removed
    if (document.querySelector('#options-heading-box') === null) {
        elements.optionsContainer.appendChild(elements.optionsHeadingBox);
        elements.optionsContainer.appendChild(elements.optionsBox);
    }

    // Resets all color option that may have been removed from the previous turn
    resetColorOptions();
}

const rollToBegin = () => {
    elements.guideBox.appendChild(elements.turnBox.rollToBegin);
}

const removeRollToBegin = () => {
    elements.turnBox.rollToBegin.remove();
}

const turnOptions = () => {
    if (document.querySelector('#roll-dice-option') !== null) {
        elements.turnBox.rollDiceOption.remove();
    }

    if (document.querySelector('#option-one') === null) {
        elements.turnBox.chooseOptions.prepend(elements.turnBox.optionOne);
    }

    if (document.querySelector('#option-two') === null) {
        elements.turnBox.chooseOptions.appendChild(elements.turnBox.optionTwo);
    }
    
    elements.guideBox.appendChild(elements.turnBox.chooseContainer);
    elements.guideBox.appendChild(elements.turnBox.or);
    elements.guideBox.appendChild(elements.turnBox.selectPenalty);
}

const removeOptionOne = () => {
    document.querySelector('#option-one').remove();
    elements.turnBox.selectPenalty.remove();
    elements.guideBox.appendChild(elements.turnBox.rollDiceOption);
}

const removeTurnOptions = () => {
    elements.turnBox.chooseContainer.remove();
    elements.turnBox.or.remove();
    elements.turnBox.selectPenalty.remove();
    elements.turnBox.rollDiceOption.remove();
}

const rollPrompt = () => {
    elements.guideBox.appendChild(elements.turnBox.rollDicePrompt);
}

const removeRollPrompt = () => {
    elements.turnBox.rollDicePrompt.remove();
}

const gameOver = () => {
    elements.guideBox.appendChild(elements.turnBox.gameOver);
}

const removeGameOver = () => {
    elements.turnBox.gameOver.remove();
}

export { removeOptionsElement, removeColorOption, resetColorOptions,
            options, rollToBegin, removeRollToBegin, turnOptions,
            removeOptionOne, removeTurnOptions, rollPrompt,
            removeRollPrompt, gameOver, removeGameOver };
