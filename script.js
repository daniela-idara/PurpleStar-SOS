const APP_FILE = "./PurpleStarSOS.html";

document.getElementById("year").textContent = new Date().getFullYear();
const launchApp = document.getElementById("launchApp");
launchApp.href = APP_FILE;
launchApp.addEventListener("click", () => {
  launchApp.textContent = "› OPENING SYSTEM...";
});

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
const glyphs = "PURPLESTAR0123456789✦☿♀♂♃♄♅♆♇";
let drops = [];
const fontSize = 15;

function resize() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(innerWidth * ratio);
  canvas.height = Math.floor(innerHeight * ratio);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  drops = Array.from({ length: Math.ceil(innerWidth / fontSize) }, () => Math.random() * -70);
}

function draw() {
  ctx.fillStyle = "rgba(8,0,15,.09)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  ctx.font = `${fontSize}px Courier New`;
  ctx.fillStyle = "rgba(125,255,35,.55)";
  drops.forEach((y, i) => {
    ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * fontSize, y * fontSize);
    drops[i] = y * fontSize > innerHeight && Math.random() > .976 ? 0 : y + .34;
  });
  requestAnimationFrame(draw);
}

resize();
addEventListener("resize", resize);
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
