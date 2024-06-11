import * as handler from "./handlers.js";

const addListeners = () => {
    let colors = ['red', 'yellow', 'green', 'blue']
    
    colors.forEach( (color) => {
        buttons = document.querySelectorAll(`.${color} > button`)
        buttons.forEach( (button) => {
            $(button).click( () => {
                switch (color) {
                    case 'red':
                        handler.red(button.innerHTML)
                    case 'yellow':
                        handler.yellow(button.innerHTML)
                    case 'green':
                        handler.green(button.innerHTML)
                    case 'blue':
                        handler.blue(button.innerHTML)
                }
            })
        })
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
