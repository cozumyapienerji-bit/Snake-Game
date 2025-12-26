const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;

const headImg = new Image();
headImg.src = "snake_head.png";

const bodyImg = new Image();
bodyImg.src = "snake_body.png";

const appleImg = new Image();
appleImg.src = "apple.png";

let snake;
let direction;
let food;
let game;

function init() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").innerText = "Skor: 0";
  food = randomFood();
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 17 + 1) * box
  };
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function setDirection(dir) {
  if (dir === "left" && direction !== "RIGHT") direction = "LEFT";
  if (dir === "up" && direction !== "DOWN") direction = "UP";
  if (dir === "right" && direction !== "LEFT") direction = "RIGHT";
  if (dir === "down" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 🍎 Elma
  ctx.drawImage(appleImg, food.x, food.y, box, box);

  // 🐍 Yılan çizimi
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      // Kafa
      ctx.save();
      ctx.translate(snake[i].x + box / 2, snake[i].y + box / 2);

      let angle = 0;
      if (direction === "RIGHT") angle = 0;
      if (direction === "DOWN") angle = Math.PI / 2;
      if (direction === "LEFT") angle = Math.PI;
      if (direction === "UP") angle = -Math.PI / 2;

      ctx.rotate(angle);
      ctx.drawImage(headImg, -box / 2, -box / 2, box, box);
      ctx.restore();
    } else {
      // Gövde
      ctx.drawImage(bodyImg, snake[i].x, snake[i].y, box, box);
    }
  }

  // 🚶 Hareket
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
 const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;
let game;

// Görseller
const headImg = new Image();
headImg.src = "snake_head.png";

const bodyImg = new Image();
bodyImg.src = "snake_body.png";

const appleImg = new Image();
appleImg.src = "apple.png";

// Oyun değişkenleri
let snake = [];
let direction = "RIGHT";
let food = {};

// --------------------
// OYUN BAŞLAT
// --------------------
function init() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").innerText = "Skor: 0";
  food = randomFood();
}

// --------------------
// RASTGELE ELMA
// --------------------
function randomFood() {
  return {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };
}

// --------------------
// KLAVYE KONTROL
// --------------------
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// --------------------
// MOBİL BUTONLAR
// --------------------
function setDirection(dir) {
  if (dir === "left" && direction !== "RIGHT") direction = "LEFT";
  if (dir === "up" && direction !== "DOWN") direction = "UP";
  if (dir === "right" && direction !== "LEFT") direction = "RIGHT";
  if (dir === "down" && direction !== "UP") direction = "DOWN";
}

// --------------------
// ÇARPIŞMA
// --------------------
function collision(head, body) {
  return body.some(part => part.x === head.x && part.y === head.y);
}

// --------------------
// OYUN DÖNGÜSÜ
// --------------------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Elma
  ctx.drawImage(appleImg, food.x, food.y, box, box);

  // Yılan çiz
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      // Kafa
      ctx.save();
      ctx.translate(snake[i].x + box / 2, snake[i].y + box / 2);

      let angle = 0;
      if (direction === "RIGHT") angle = 0;
      if (direction === "DOWN") angle = Math.PI / 2;
      if (direction === "LEFT") angle = Math.PI;
      if (direction === "UP") angle = -Math.PI / 2;

      ctx.rotate(angle);
      ctx.drawImage(headImg, -box / 2, -box / 2, box, box);
      ctx.restore();
    } else {
      // Gövde
      ctx.drawImage(bodyImg, snake[i].x, snake[i].y, box, box);
    }
  }

  // Hareket
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Elma yeme
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = "Skor: " + score;
    food = randomFood();
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  // Çarpışma kontrolü
  if (
    headX < 0 || headY < 0 ||
    headX >= canvas.width || headY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Oyun Bitti!");
    return;
  }

  snake.unshift(newHead);
}

// --------------------
// YENİDEN OYNA
// --------------------
function restartGame() {
  clearInterval(game);
  init();
  game = setInterval(draw, 120);
}

// --------------------
// BAŞLAT
// --------------------
init();
game = setInterval(draw, 120);
