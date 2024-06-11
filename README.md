# Qwixx
##### A fast-paced dice rolling game

## Overview
>"This quick-playing dice game will have you on the edge of your seat from beginning to end! Qwixx is simple to play but each decision is crucial - the more numbers you cross off, the more points you score. With no downtime between turns, you'll have a change to gain from each and every roll. Just one round of this thrilling game and you will be caught up in Qwixx-fever!"
> `-Gamewright`

![New Game Screenshot](/img/new-game-screenshot.jpg)

![In Game Screenshot](/img/in-game-screenshot.jpg)

#### This Version:
In this solo variant, you are able to leave the distraction of other players behind and focus on scoring the highest points possible.

## Getting Started:
You can find the link to play the game [here](https://jcogs94.github.io/qwixx/) and see the process that I took [here](/res/Project%20Week%201%20Timeline.pdf).

## Resources:
- Game basis from [Gamewright](https://gamewright.com/product/Qwixx).
- Icon from [Font Awesome](https://fontawesome.com/icons/dice?f=classic&s=solid).
- Inter font from [Google Fonts](https://fonts.google.com/specimen/Inter?query=inter).
- Random number generator for dice roll found from [Stack Overflow](https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range).
- Iterating through objects method found on [Free Code Camp](https://www.freecodecamp.org/news/how-to-iterate-over-objects-in-javascript/).
- Import/export function found from [Scaler](https://www.scaler.com/topics/javascript/import-js-file-in-js/).

## Technologies Used:
- Javascript
- HTML
- CSS

## Next Steps:
- Make the site more mobile-friendly. As of right now, the site is useable on mobile devices, but requires users to zoom out/in to fit the screen properly. A hamburger menu could display instructions and the turn box could be placed closer to the board, with the board filling the screen properly.
- As of right now, the site is not compatible with Safari browsers. It displays sub-par, but is functional. The instructions in the instructions box displays off the the right of its container, underneath the board.
- Make a "score reference guide" box that shows reference for the player. For instance:
    > ~ < 25 points: terrible, try again
    >
    > 26-50 points: starting to do better
    >
    > 51-100 points: luck must be on your side
    >
    > 100+ points: impressive
- Refine the display of the dice, showing how they would normally look, with pips instead of a number character.
- Have the dice perform an animated roll (or shake) when the roll button is pushed.
- Display an arrow pointing to the penalty boxes when there are no valid moves. As of right now, the game leaves it up to the user to realize that, with no guidance for newer players.
- Have the valid plays highlighted somehow on the board, making it easier for the player to see the options displayed on the right.
