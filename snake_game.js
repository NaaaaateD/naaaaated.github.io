const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const gridSize = 20;

let snake = [{x: 200, y: 200}];
let direction = {x: 0, y: 0};
let food = generateFood();

function update() {
  const head = {
    x: snake[0].x + direction.x * gridSize,
    y: snake[0].y + direction.y * gridSize
  };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }

  if (collision()) {
    snake = [{x: 200, y: 200}];
    direction = {x: 0, y: 0};
  }

  draw();

  setTimeout(update, 100);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'green';
  for (const segment of snake) {
    context.fillRect(segment.x, segment.y, gridSize, gridSize);
  }

  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, gridSize, gridSize);
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
    y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
  };
}

function collision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && direction.y === 0) {
    direction = {x: 0, y: -1};
  } else if (e.key === 'ArrowDown' && direction.y === 0) {
    direction = {x: 0, y: 1};
  } else if (e.key === 'ArrowLeft' && direction.x === 0) {
    direction = {x: -1, y: 0};
  } else if (e.key === 'ArrowRight' && direction.x === 0) {
    direction = {x: 1, y: 0};
  }
});

update();
