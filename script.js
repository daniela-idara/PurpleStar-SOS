document.getElementById("year").textContent = new Date().getFullYear();

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

const feedbackForm = document.getElementById("appFeedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("feedbackName").value.trim();
    const email = document.getElementById("feedbackEmail").value.trim();
    const category = document.getElementById("feedbackCategory").value;
    const message = document.getElementById("feedbackMessage").value.trim();
    const subject = `PurpleStar SOS - ${category}`;
    const body = [
      `Category: ${category}`,
      name ? `Name: ${name}` : "",
      email ? `Reply email: ${email}` : "",
      "",
      message
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:daniela@purplestar-tarot.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
