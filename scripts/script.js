'use strict';

const diceImage = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnNew = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const playerOne = document.querySelector('.player-one');
const playerTwo = document.querySelector('.player-two');
const playerScore = document.querySelectorAll('.player-score');
const currentScore = document.querySelectorAll('.current-score');

let activeScore;
let activePlayer;
let scores;
let playingState;

// Functions
function init() {
  for (let i = 0; i < playerScore.length; i++) {
    playerScore[i].textContent = 0;
    currentScore[i].textContent = 0;
  }
  playerOne.classList.add('player-active');
  playerTwo.classList.remove('player-active');

  activeScore = 0;
  activePlayer = 'one';
  scores = [0, 0];
  playingState = true;

  diceImage.classList.add('hidden');
  document.querySelector(`.player-one`).classList.remove('player-winner');
  document.querySelector(`.player-one`).classList.add('player-active');
  document.querySelector(`.player-two`).classList.remove('player-winner');
  document.querySelector(`.player-two`).classList.remove('player-active');
}

function randomDiceNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function switchPlayer() {
  document.querySelector(`.current-${activePlayer}-score`).textContent = 0;
  activeScore = 0;
  activePlayer = activePlayer === 'one' ? 'two' : 'one';
  playerOne.classList.toggle('player-active');
  playerTwo.classList.toggle('player-active');
}

function checkWinningScore() {
  playingState = false;
  diceImage.classList.add('hidden');
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.add('player-winner');
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove('player-active');
}

// Listeners
init();

btnRoll.addEventListener('click', function () {
  if (playingState) {
    diceImage.classList.remove('hidden');
    let diceNumber = randomDiceNumber();
    diceImage.setAttribute('src', `./assets/images/dice-${diceNumber}.png`);
    if (diceNumber !== 1) {
      activeScore += diceNumber;
      document.querySelector(`.current-${activePlayer}-score`).textContent =
        activeScore;
    } else {
      switchPlayer();
    }
  } else {
    alert(`Player ${activePlayer} Wins! Play Again!`);
  }
});

btnHold.addEventListener('click', function () {
  if (playingState) {
    if (activePlayer === 'one') {
      scores[0] += activeScore;
      document.querySelector(`.player-${activePlayer}-score`).textContent =
        scores[0];
    } else if (activePlayer === 'two') {
      scores[1] += activeScore;
      document.querySelector(`.player-${activePlayer}-score`).textContent =
        scores[1];
    }
    if (scores[0] >= 100 || scores[1] >= 100) {
      checkWinningScore();
    } else {
      switchPlayer();
    }
  } else {
    alert(`Player ${activePlayer} Wins! Play Again!`);
  }
});

btnNew.addEventListener('click', init);
