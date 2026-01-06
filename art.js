const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let colorIndex = 0;
const colors = ["turquoise", "deepskyblue", "lightseagreen"];

function drawCircle(radius, lineWidth) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "#b0c4de";
  ctx.stroke();
}

function drawTriangle(angle, radius, color) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.lineTo(-6, -radius - 12);
  ctx.lineTo(6, -radius - 12);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Concentric circles (from Turtle project)
  drawCircle(45, 8);
  drawCircle(80, 8);

  // Rotating triangles
  const triangleCount = 10;
  const color = colors[colorIndex];

  for (let i = 0; i < triangleCount; i++) {
    const angle = ((Math.PI * 2) / triangleCount) * i;
    drawTriangle(angle + performance.now() / 1000, 28, color);
  }

  colorIndex = (colorIndex + 1) % colors.length;

  requestAnimationFrame(animate);
}

animate();
