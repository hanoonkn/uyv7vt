let score = 0;
const scoreText = document.getElementById("score");
const gameArea = document.getElementById("game-area");

function spawnBug() {
  const bug = document.createElement("div");
  bug.style.width = "30px";
  bug.style.height = "30px";
  bug.style.backgroundColor = "green";
  bug.style.position = "absolute";
  bug.style.borderRadius = "50%";

  bug.style.left = Math.random() * 370 + "px";
  bug.style.top = Math.random() * 270 + "px";

  bug.onclick = function () {
    score++;
    scoreText.textContent = "Score: " + score;
    bug.remove();
  };

  gameArea.appendChild(bug);

  setTimeout(() => {
    if (gameArea.contains(bug)) {
      bug.remove();
    }
  }, 1500);
}

setInterval(spawnBug, 1000);
