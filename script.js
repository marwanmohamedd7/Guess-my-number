'use strict';
/*
Both of math.trunc() or toFixed() remove the decimeals
but math.trunc() return number 
toFixed() return string
*/
// body access
const gameBody = document.querySelector('body');
// secret number box access
const secretNumBox = document.querySelector('.number');
// again Btn access
const againBtn = document.querySelector('.again');
// check Btn access
const checkBtn = document.querySelector('.check');
// guess input Box access
const guessInput = document.querySelector('.guess');
// generate secretNumber
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
let score = 20;
let highScore = 0;
let ifEmpty = true;

// reset the game by pressing again
// againBtn = document.querySelector('.again')
againBtn.addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  overwriteMess('.score', score);
  overwriteMess('.message', 'Start guessing...');
  overwriteMess('.number', '?');
  guessInput.value = '';
  secretNumBox.style.width = '15rem';
  gameBody.style.backgroundColor = '#222';
});

// when user press on check button
// checkBtn = document.querySelector('.check')
checkBtn.addEventListener('click', function () {
  const guess = Number(guessInput.value);
  // when guess greater or smaller than range (1-20)
  if (guess < 1 || guess > 20) {
    overwriteMess('.message', '❌ Number between 1-20');
  } else {
    // when there is no input
    if (!guess) {
      overwriteMess('.message', '⛔ No Number');
    }
    // when player wins
    else if (guess === secretNumber) {
      overwriteMess('.message', '🎉 Corret Number');
      // gameBody = document.querySelector('body')
      gameBody.style.backgroundColor = '#60b347';
      overwriteMess('.number', secretNumber);
      // secretNumBox = document.querySelector('.number')
      secretNumBox.style.width = '30rem';
      if (score > highScore) {
        highScore = score;
        overwriteMess('.highscore', highScore);
      }
    }
    // when guess is wrong
    else if (guess !== secretNumber) {
      ifEmpty = false;
      if (score > 1) {
        guess > secretNumber
          ? overwriteMess('.message', '📈 Too High')
          : overwriteMess('.message', '📉 Too Low');
        decreaseScore();
      } else {
        // overwriteMess() = document.querySelector(className).textContent = message;
        // className = '.message'
        // message = '💥 You Lost The Game!'
        overwriteMess('.message', '💥 You Lost The Game!');
        //document.querySelector('.score').textContent = score;
        decreaseScore();
      }
    }
  }
});

// keyboard clicks
document.addEventListener('keydown', e => {
  // when user press on any number of keyboard buttons
  for (let i = 0; i < 10; i++) {
    if (Number(e.key) === i) {
      // remove value from input box to enter a new one
      if (!ifEmpty) {
        guessInput.value = '';
        ifEmpty = true;
      }
        // guessInput = document.querySelector('.guess')
        guessInput.focus();
    }
  }
  // when user press enter from keyboard (it act like a mouse click event to press check button)
  if (e.key === 'Enter') {
    guessInput.blur();
    checkBtn.click();
  }
  // when user press escape from keyboard (it act like a mouse click event to press again button)
  else if (e.key === 'Escape') {
    againBtn.click();
  }
  // when user delete any of input numbers
  else if (e.key === 'Backspace') {
    guessInput.focus();
  }
});
// Decreasing score(tries) by each wrong answer
function decreaseScore() {
  score > 0 ? score-- : (score = 0);
  document.querySelector('.score').textContent = score;
}
// message overwrite depending on the state
function overwriteMess(className, message) {
  document.querySelector(className).textContent = message;
}
