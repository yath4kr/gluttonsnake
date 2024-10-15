const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
const snake = [{ x: 200, y: 200 }]; // Initial position of snake
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box,
};
let direction = { x: 0, y: 0 };
let score = 0;
let gameInterval;

// Control the snake
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const keyPressed = event.key;
  if ((keyPressed === "ArrowUp" || KeyPressed === "W") && direction.y === 0) {
    direction = { x: 0, y: -box };
  } else if ((keyPressed === "ArrowDown" || KeyPressed == "S") && direction.y === 0) {
    direction = { x: 0, y: box };
  } else if ((keyPressed === "ArrowLeft" || KeyPressed == "A") && direction.x === 0) {
    direction = { x: -box, y: 0 };
  } else if ((keyPressed === "ArrowRight" || keyPressed === "D") && direction.x === 0) {
    direction = { x: box, y: 0 };
  }
}

// Main game loop
function gameLoop() {
  if (isGameOver()) {
    clearInterval(gameInterval); // Stop the game loop
    setTimeout(() => {
      alert(`Game Over! Your score: ${score}`);
      location.reload(); // Automatically reload the game after alert
    }, 100); // Delay alert to avoid conflict with rendering
    return; // Exit the function to stop the game
  } else {
    updateSnake();
    draw();
  }
}

// Update the snake's position and check if it eats the food
function updateSnake() {
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Add new head
  snake.unshift(newHead);

  // Check if snake eats the food
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 1;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  } else {
    snake.pop(); // Remove the tail if not eating food
  }
}

// Check if the snake hits itself or the walls
function isGameOver() {
  const head = snake[0];

  // Check collision with walls
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize
  ) {
    return true;
  }

  // Check collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Draw the game (snake, food, score)
function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lime";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw the score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Start the game loop every 100 milliseconds
gameInterval = setInterval(gameLoop, 100);
