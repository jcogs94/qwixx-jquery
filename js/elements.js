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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~BUTTON SELECTION ELEMENTS~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Define empty objects to obtain button elements by color
let red = {};
let yellow = {};
let green = {};
let blue = {};

// Obtain red button elements
const redRow = document.querySelector('.red');
const redChildren = redRow.children;
for (let element of redChildren) {
    red[element.innerHTML] = element;
}

// Obtain yellow button elements
const yellowRow = document.querySelector('.yellow');
const yellowChildren = yellowRow.children;
for (let element of yellowChildren) {
    yellow[element.innerHTML] = element;
}

// Obtain green button elements
const greenRow = document.querySelector('.green');
const greenChildren = greenRow.children;
for (let element of greenChildren) {
    green[element.innerHTML] = element;
}

// Obtain blue button elements
const blueRow = document.querySelector('.blue');
const blueChildren = blueRow.children;
for (let element of blueChildren) {
    blue[element.innerHTML] = element;
}

// Score box elements
const scores = {
    red: document.querySelector('#red-total-box'),
    yellow: document.querySelector('#yellow-total-box'),
    green: document.querySelector('#green-total-box'),
    blue: document.querySelector('#blue-total-box'),
    penalties: document.querySelector('#penalty-total-box'),
    total: document.querySelector('#total-box')
}

// Dice elements
const dice = {
    white1: document.querySelector('#white1'),
    white2: document.querySelector('#white2'),
    red: document.querySelector('#red-die'),
    yellow: document.querySelector('#yellow-die'),
    green: document.querySelector('#green-die'),
    blue: document.querySelector('#blue-die')
}

// Object to contain all lock button elements
const lockButtons = {
    all: document.querySelectorAll('.disable-lock'),
    red: [],
    yellow: [],
    green: [],
    blue: []
};

// Separates out the lock button elements by color
for (let i = 0; i < 8; i++) {
    if (i === 0 || i === 1) {
        lockButtons.red.push(lockButtons.all[i]);
    } else if (i === 2 || i === 3) {
        lockButtons.yellow.push(lockButtons.all[i]);
    } else if (i === 4 || i === 5) {
        lockButtons.green.push(lockButtons.all[i]);
    } else if (i === 6 || i === 7) {
        lockButtons.blue.push(lockButtons.all[i]);
    }
}

// Turn box elements
const optionsContainer = document.querySelector('#options-container');
const optionsHeadingBox = document.querySelector('#options-heading-box')
const optionsBox = document.querySelector('#options-box');

const guideBox = document.querySelector('#guide-box');

// Exports all objects/elements
export {
    turnBox, red, yellow, green, blue, scores, lockButtons,
    dice, optionsContainer,
    optionsHeadingBox, optionsBox, guideBox
};
