const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let endLoop = false;
let score = 0;

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

moles.forEach(mole => mole.addEventListener("click", hit));