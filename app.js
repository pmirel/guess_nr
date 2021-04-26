// Game function:
// -player must guess a nr between a min and SVGFEColorMatrixElement
// -player gets a certain amounts of guesses
// -notify player nr of guesses remaining
// -notify the player of the correct answer if localStorage-let player choose to play again

// game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// ui elements
const game = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');


// asign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// play gain event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})

// listen for guess
guessBtn.addEventListener('click', function () {

  let guess = parseInt(guessInput.value);

  // validate
  if (guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else if (isNaN(guess)) {
    setMessage(`Please enter a number`, 'red');
  }

  // check if won
  if (guess === winningNum) {
    // game over won

    gameOver(true, `${winningNum} is correct! YOU WIN!`);

  } else {
    // wrong number
    guessesLeft -= 1;
    if (guessesLeft <= 0) {
      gameOver(false, `Game over, you lost, the correct number was ${winningNum}`)
    } else {
      // game continous answer wrong
      // change color green
      guessInput.style.borderColor = 'red';
      // message user
      setMessage(`${guess} is not correct! Your have ${guessesLeft} left`, 'red');
      //  clear input
      guessInput.value = ''
    }
  }

});

// game over fct
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // dissable input
  guessInput.disabled = won;
  // change color green
  guessInput.style.borderColor = color;
  // set message 
  setMessage(msg, color);

  // play again
  guessBtn.value = 'Play Again'
  guessBtn.className += 'play-again'
}
// winnign number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}



// set message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}