import * as handle from "./handlers.js";

const addListeners = () => {
    // Defines colors and adds a handler function to each button for each color
    let colors = ['red', 'yellow', 'green', 'blue']
    colors.forEach( (color) => {
        let buttons = document.querySelectorAll(`.${color} > button`)
        buttons.forEach( (button) => {
            $(button).click( () => {
                handle.colorButton(color, button.innerHTML)
            })
        })
    })

    // Listeners for game flow control
    $('#roll-button').click(handle.rollButton );
    $('#new-game-button').click(handle.newGameButton);

    // Listener for penalty checks
    for (let i = 1; i < 5; i++) {
        $(('#checkbox' + String(i))).change( () => {
            handle.penaltyBox(String(i))
        });
    }
}

export { addListeners };
