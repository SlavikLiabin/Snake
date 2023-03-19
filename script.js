let scoreBlock;
let score = 0;

let recordBlock;
let maxscore = 0;

if (+localStorage.getItem("fromLocal") > 0) {
  maxscore = +localStorage.getItem("fromLocal");
}

let fromLocal = localStorage.getItem("fromLocal");
console.log(fromLocal);

const config = {
  step: 0,
  maxStep: 20,
  sizeCell: 16,
  sizeBerry: 16 / 4,
};

const snake = {
  x: 160,
  y: 160,
  dx: config.sizeCell,
  dy: 0,
  tails: [],
  maxTails: 2,
};

let berry = {
  x: 100,
  y: 100,
};

let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
recordBlock = document.querySelector(".max-score");
drawScore();
drawScoreRecord();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (++config.step < config.maxStep) {
    return;
  }
  config.step = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBerry();
  drawSnake();
}

document.addEventListener("keydown", function (e) {
  if (e.code == "Enter") {
    requestAnimationFrame(gameLoop);
  }
});

//делаем кнопку перезагрузки
const btnNode = document.querySelector(".btn-reboot");
btnNode.addEventListener("click", () => {
  location.reload();
  return true;
});

btnNode.addEventListener("click", () => {
  localStorage.clear();
});

function drawSnake() {
  snake.x += snake.dx;
  snake.y += snake.dy;

  collisionBorder();

  snake.tails.unshift({ x: snake.x, y: snake.y });

  if (snake.tails.length > snake.maxTails) {
    snake.tails.pop();
  }

  snake.tails.forEach(function (el, index) {
    if (index == 0) {
      context.fillStyle = "green";
    } else {
      context.fillStyle = "red";
    }
    context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

    if (el.x === berry.x && el.y === berry.y) {
      snake.maxTails++;
      incScore();
      randomPositionBerry();
    }

    for (let i = index + 1; i < snake.tails.length; i++) {
      if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
        refreshGame();
      }
    }
  });
}

function collisionBorder() {
  if (
    snake.x < 0 ||
    snake.x >= canvas.width ||
    snake.y < 0 ||
    snake.y >= canvas.height
  ) {
    refreshGame();
  }
}

function refreshGame() {
  score = 0;
  drawScore();
  if (+localStorage.getItem("fromLocal") > 0) {
    maxscore = +localStorage.getItem("fromLocal");
  }
  fromLocal = localStorage.getItem("fromLocal");
  console.log(fromLocal);
  drawScoreRecord();

  snake.x = 80;
  snake.y = 80;
  snake.tails = [];
  snake.maxTails = 2;
  snake.dx = config.sizeCell;
  snake.dy = 0;

  randomPositionBerry();
}

function drawBerry() {
  context.beginPath();
  context.fillStyle = "#A00034";
  context.arc(
    berry.x + config.sizeCell / 2,
    berry.y + config.sizeCell / 2,
    config.sizeBerry,
    0,
    2 * Math.PI
  );
  context.fill();
}

function randomPositionBerry() {
  berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
  berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
}

function incScore() {
  score++;
  if (+fromLocal < score) {
    localStorage.setItem("fromLocal", score.toString());
  }
  drawScore();
}

function drawScore() {
  scoreBlock.innerHTML = score;
}

function incScoreRecord() {
  maxscore;
  drawScoreRecord();
}

function drawScoreRecord() {
  recordBlock.innerHTML = maxscore;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", function (e) {
  if (e.code == "ArrowUp") {
    snake.dy = -config.sizeCell;
    snake.dx = 0;
  } else if (e.code == "ArrowLeft") {
    snake.dx = -config.sizeCell;
    snake.dy = 0;
  } else if (e.code == "ArrowDown") {
    snake.dy = config.sizeCell;
    snake.dx = 0;
  } else if (e.code == "ArrowRight") {
    snake.dx = config.sizeCell;
    snake.dy = 0;
  }
});
