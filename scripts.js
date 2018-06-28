const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const highScores = document.querySelector(".high-scores");
const moles = document.querySelectorAll(".mole");
const timer = document.querySelector(".timer");
const levelBtn = document.querySelector(".level-btn");
let seconds = 0;
let lastHole;
let endLoop = false;
let score = 0;
let newTimer;
let levels = { Fast: [300, 500], Medium: [700, 900], Slow: [1000, 1500] };

const highScoresList = JSON.parse(localStorage.getItem("highScoresList")) || [];
let level = localStorage.getItem("level") || "Medium";

highScores.textContent = highScoresList;
levelBtn.textContent = level;

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
  console.log(levels[level]);
  const lengthTime = randomTime(...levels[level]);
  holes[hole].classList.add("up");
  setTimeout(() => {
    holes[hole].classList.remove("up");
    if (!endLoop) peep();
    else endGame();
  }, lengthTime);
}

function startGame() {
  stopTimer(); // in case it's running
  seconds = 10;
  timer.textContent = seconds;
  setTimeout(() => {
    console.log("timeover");
    endLoop = true;
  }, 10000);

  startTimer();

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
  stopTimer();
  highScoresList.push(score);
  highScoresList.sort((a, b) => b - a);
  if (highScoresList.length > 3) highScoresList.length = 3;
  setStorage();
}

function resetScores() {
  highScoresList.length = 0;
  setStorage();
}

function setStorage() {
  localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
  highScores.textContent = highScoresList;
}

function startTimer() {
  newTimer = setInterval(() => {
    seconds--;
    timer.textContent = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(newTimer);
}

function toggleLevel() {
  switch (this.textContent) {
    case "Medium":
      setLevel("Fast");
      break;
    case "Fast":
      setLevel("Slow");
      break;
    case "Slow":
      setLevel("Medium");
      break;
  }
}

function setLevel(nextLevel) {
  level = nextLevel;
  levelBtn.textContent = nextLevel;
  localStorage.setItem("level", nextLevel);
}

moles.forEach(mole => mole.addEventListener("click", hit));
levelBtn.addEventListener("click", toggleLevel);
