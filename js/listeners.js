import * as elements from "./elements.js";
import * as handler from "./handlers.js";

const addListeners = () => {
    // Iterating objects through method learned in url below:
    // https://www.freecodecamp.org/news/how-to-iterate-over-objects-in-javascript/
    // Red button listeners
    let redButtons = Object.values(elements.red);
    redButtons.forEach((element) => {
        $(element).click( () => {
            handler.red(element.innerHTML);
        });
    })

    // Yellow button listeners
    let yellowButtons = Object.values(elements.yellow);
    yellowButtons.forEach((element) => {
        $(element).click( () => {
            handler.yellow(element.innerHTML);
        });
    })

    // Green button listeners
    let greenButtons = Object.values(elements.green);
    greenButtons.forEach((element) => {
        $(element).click( () => {
            handler.green(element.innerHTML);
        });
    })

    // Blue button listeners
    let blueButtons = Object.values(elements.blue);
    blueButtons.forEach((element) => {
        $(element).click( () => {
            handler.blue(element.innerHTML);
        });
    })

    // Listeners for game flow control
    $('#roll-button').click(handler.rollButton );
    $('#new-game-button').click(handler.newGameButton);

    // Listener for penalty checks
    for (let i = 1; i < 5; i++) {
        $(('#checkbox' + String(i))).change(handler.penaltyBox);
    }
}

export { addListeners };
