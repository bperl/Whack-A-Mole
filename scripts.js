const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const highScores = document.querySelector(".high-scores");
const moles = document.querySelectorAll(".mole");
let lastHole;
let endLoop = false;
let score = 0;

const highScoresList = [];

function randomTime(min, max) {
  return Math.ceil(Math.random() * max - min + min);
}

function randomHole() {
  const hole = Math.floor(Math.random() * holes.length);
  if (hole === lastHole) {
    console.log("same!");
    return randomHole();
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const hole = randomHole();
  const lengthTime = randomTime(500, 1000);
  holes[hole].classList.add("up");
  setTimeout(() => {
    holes[hole].classList.remove("up");
    if (!endLoop) peep();
    else endGame();
  }, lengthTime);
}

function startGame() {
  setTimeout(() => {
    console.log("timeover");
    endLoop = true;
  }, 10000);
  score = 0;
  scoreBoard.textContent = score;
  endLoop = false;
  peep();
}

function hit(e) {
  // console.log(e)
  this.parentNode.classList.remove("up");
  score++;
  scoreBoard.textContent = score;
}

function endGame() {
  highScoresList.push(score);
  highScoresList.sort((a, b) => b - a);
  if (highScoresList.length > 3) highScoresList.length = 3;
  highScores.textContent = highScoresList;
}

moles.forEach(mole => mole.addEventListener("click", hit));
