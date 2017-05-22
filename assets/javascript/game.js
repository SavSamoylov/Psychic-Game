// Global game variables.
var playerWins = 0;
var playerLosses = 0;
var playerGuesses = 10;
var wrongGuesses = [];


function startGame() {
	// We use the getRandomInt function to get an integer between 97 and 122.
	// We then convert that integer into it's corresponding lowercase letter.
    var x = getRandomInt(97, 122);
    var compPick = String.fromCharCode(x);

    document.onkeyup = function(event) {
        var wins = document.getElementById("wins");
        var losses = document.getElementById("losses");
        var guesses = document.getElementById("guesses");
        var wrongLetters = document.getElementById("wrongLetters");

        // Convert the button clicked into lowercase, and get the charCode value of the pick.
        var playerPick = event.key.toLowerCase();
        var pickCode = playerPick.charCodeAt(0);

        // This If statement makes sure that only letter keys are logged and evaluated.
        if (playerPick.length == 1 && (pickCode >= 97 && pickCode <= 122)) {
        	// If the Player guesses the computers pick correctly, the Win count is increased by 1,
        	// and the game restarts.
            if (compPick === playerPick) {
                playerWins++;
                wins.textContent = "Wins: " + playerWins;
                restartGame();
            } else {
            	// This If statement prevents duplicate choices from counting against the player by
            	// searching through the wrongGuesses array for a match.
            	// If the player picks a new letter, the guess count is decreased by 1 and the new
            	// letter is added to the wrongGuesses array.
                if (wrongGuesses.indexOf(playerPick) === -1) {
                    playerGuesses--;
                    guesses.textContent = "Guesses left: " + playerGuesses;
                    wrongGuesses.push(playerPick);
                    wrongLetters.textContent = "Your guesses so far: " + wrongGuesses.join(", ").toUpperCase();
                }

            }
            // If the player runs out of guesses, the Loss count is increased by 1 and the game restarts.
            if (playerGuesses === 0) {
                playerLosses++;
                losses.textContent = "Losses: " + playerLosses;
                restartGame();
            }

        }

    }
}

// Initiate the start of the game.
startGame();

// This function restarts the game after a Win or a Loss. Resetting the number of guesses and the wrong
// guess array back to their original values.
function restartGame() {
    playerGuesses = 10;
    wrongGuesses.length = 0;
    guesses.textContent = "Guesses left: " + playerGuesses;
    wrongLetters.textContent = "Your guesses so far: " + wrongGuesses;
    startGame();
}

// This function selects a random integer between a certain range of numbers. 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}