const gameArea = document.getElementById("game-area");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

let score = 0;
let timer = 30;
let bugs = [];

const frames = ["worm0", "worm1", "worm2"];

function spawnBug() {
  const bug = document.createElement("div");
  bug.className = "bug";
  bug.frame = 0;
  bug.dir = Math.random() < 0.5 ? -1 : 1;

  bug.style.left = Math.random() * 340 + "px";
  bug.style.top = Math.random() * 260 + "px";

  bug.onclick = () => squash(bug);

  gameArea.appendChild(bug);
  bugs.push(bug);
}

function animateBugs() {
  bugs.forEach(bug => {
    bug.className = "bug " + frames[bug.frame];
    bug.frame = (bug.frame + 1) % 3;

    let x = bug.offsetLeft + 8 * bug.dir;
    if (x <= 0 || x >= 370) bug.dir *= -1;
    bug.style.left = Math.max(0, Math.min(370, x)) + "px";
  });
}

function squash(bug) {
  score++;
  scoreText.textContent = "Score: " + score;
  bug.className = "bug squashed";
  setTimeout(() => {
    gameArea.removeChild(bug);
    bugs = bugs.filter(b => b !== bug);
    spawnBug();
  }, 200);
}

function countdown() {
  if (timer > 0) {
    timer--;
    timerText.textContent = "Timer: " + timer;
  } else {
    clearInterval(loop);
    bugs.forEach(b => b.remove());
    bugs = [];
    timerText.textContent = "GAME OVER";
  }
}

for (let i = 0; i < 4; i++) spawnBug();

const loop = setInterval(animateBugs, 150);
setInterval(countdown, 1000);
