// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~DISPLAY MESSAGE ELEMENTS~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Creates new elements to be added during the game
const rollToBegin = document.createElement('h3');
rollToBegin.setAttribute('id', 'roll-to-begin');
rollToBegin.innerHTML = '<= Roll dice to begin';

const chooseContainer = document.createElement('div');
chooseContainer.setAttribute('id', 'choose-container');

const choose = document.createElement('h2');
choose.setAttribute('id', 'choose');
choose.innerHTML = 'Choose one or both:';

const chooseOptions = document.createElement('ul');
const optionOne = document.createElement('li');
optionOne.setAttribute('id', 'option-one');
optionOne.innerHTML = `Use the addition of the white dice (first)`;
const optionTwo = document.createElement('li');
optionTwo.setAttribute('id', 'option-two');
optionTwo.innerHTML = `Use the addition of one white die and one colored die (second)`;
chooseOptions.appendChild(optionOne);
chooseOptions.appendChild(optionTwo);

// Puts all necessary elements into the options container
chooseContainer.appendChild(choose);
chooseContainer.appendChild(chooseOptions);

const or = document.createElement('h3');
or.innerHTML = 'OR';

const selectPenalty = document.createElement('h2');
selectPenalty.innerHTML = 'Select a Penalty Box';

const rollDiceOption = document.createElement('h2');
rollDiceOption.setAttribute('id', 'roll-dice-option');
rollDiceOption.innerHTML = 'Roll Dice';

const rollDicePrompt = document.createElement('h3');
rollDicePrompt.setAttribute('id', 'roll-dice-prompt');
rollDicePrompt.innerHTML = '<= Roll Dice';

const gameOver = document.createElement('h1');
gameOver.setAttribute('id', 'game-over');
gameOver.innerHTML = 'GAME<br>OVER';

// Puts necessary turn box elements into obj for export
const turnBox = {
    whiteOptions: document.querySelector('#white-options'),
    redOptions: document.querySelector('#red-options'),
    yellowOptions: document.querySelector('#yellow-options'),
    greenOptions: document.querySelector('#green-options'),
    blueOptions: document.querySelector('#blue-options'),
    rollToBegin: rollToBegin,
    chooseContainer: chooseContainer,
    choose: choose,
    chooseOptions: chooseOptions,
    optionOne: optionOne,
    optionTwo: optionTwo,
    or: or,
    selectPenalty: selectPenalty,
    rollDiceOption: rollDiceOption,
    rollDicePrompt: rollDicePrompt,
    gameOver: gameOver
}

// Turn box elements
const optionsContainer = document.querySelector('#options-container');
const optionsHeadingBox = document.querySelector('#options-heading-box')
const optionsBox = document.querySelector('#options-box');

const guideBox = document.querySelector('#guide-box');

// Exports all objects/elements
export {
    turnBox,
    optionsContainer,
    optionsHeadingBox,
    optionsBox,
    guideBox
};
