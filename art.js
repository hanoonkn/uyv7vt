const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

const cx = canvas.width / 2;
const cy = canvas.height / 2;

const colors = ["turquoise", "deepskyblue", "lightseagreen"];
let colorIndex = 0;
let angleOffset = 0;

function filledCenterCircle() {
  ctx.fillStyle = "lightseagreen";
  ctx.beginPath();
  ctx.arc(cx, cy + 20, 20, 0, Math.PI * 2);
  ctx.fill();
}

function outlineCircle(r, lw) {
  ctx.strokeStyle = "azure";
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.arc(cx, cy + 45 - (r === 80 ? 35 : 0), r, 0, Math.PI * 2);
  ctx.stroke();
}

function stampTriangle(angle, radius, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.lineTo(-8, -radius - 14);
  ctx.lineTo(8, -radius - 14);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function stampCircle(angle, radius, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, -radius, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // static elements
  filledCenterCircle();
  outlineCircle(45, 10);
  outlineCircle(80, 10);

  // rotating rings
  const triCount = 10;
  const circCount = 20;
  const color = colors[colorIndex];

  for (let i = 0; i < triCount; i++) {
    const a = (2 * Math.PI / triCount) * i + angleOffset;
    stampTriangle(a, 28, color);
  }

  for (let i = 0; i < circCount; i++) {
    const a = (2 * Math.PI / circCount) * i - angleOffset;
    stampCircle(a, 60, color);
  }

  angleOffset += 0.01;
  colorIndex = (colorIndex + 1) % colors.length;

  requestAnimationFrame(draw);
}

draw();
