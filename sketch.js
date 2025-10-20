new p5(); // makes it so that you can access variables like RIGHT_ARROW outside of setup

tileSize = 40;
tilesX = Math.floor(windowWidth / tileSize);
tilesY = Math.floor(windowHeight / tileSize);
tiles = Array.from({ length: tilesY }, () => Array(tilesX).fill(0)); // 0 for empty, 1 for obstacle (players arent stored in this)     tiles[y][x]

// Fit to window (changing the tileSize itself makes weird gaps)
scaleX = windowWidth / (windowWidth - (windowWidth % tileSize));
scaleY = windowHeight / (windowHeight - (windowHeight % tileSize));
document.body.style.transform = `scale(${scaleX}, ${scaleY})`;

counter = 0;
gameIsOver = false;

const inputs = {
  red: [68, 83, 65, 87],
  blue: [RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, UP_ARROW],
};

class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.color = color;
  }

  update() {
    fill("white");
    rect(this.px * tileSize, this.py * tileSize, tileSize, tileSize);
    fill(this.color);
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);

    this.px = this.x;
    this.py = this.y;
  }

  move() {
    const keys = inputs[this.color];

    let dx = 0;
    let dy = 0;
    if (keyCode == keys[0]) {
      dx += 1;
    }
    if (keyCode == keys[1]) {
      dy += 1;
    }
    if (keyCode == keys[2]) {
      dx -= 1;
    }
    if (keyCode == keys[3]) {
      dy -= 1;
    }

    // If moved
    if (dx || dy) {
      // Move if empty tile
      if (tiles[this.y + dy][this.x + dx] == 0) {
        this.x += dx;
        this.y += dy;
        redraw(); // redraws faster than waiting for next draw
        if (this.color == "red") {
          counter += 1;
        }
      }
    }
  }
}

function setup() {
  noStroke();
  noLoop(); // only draws if you specifically call redraw()

  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < tilesX; i++) {
    for (let j = 0; j < tilesY; j++) {
      let r = Math.random();
      if (r < 0.25) {
        fill(0, 0, 0, 255);
        rect(i * tileSize, j * tileSize, tileSize, tileSize);
        tiles[j][i] = 1; // obstacle
      }
    }
  }

  p1 = new Player(0, 0, "red");
  p2 = new Player(tilesX - 1, tilesY - 1, "blue");
}

function draw() {
  if (gameIsOver) {
    return;
  }

  p1.update();
  p2.update();

  if (p1.x == p2.x && p1.y == p2.y) {
    gameOver("blue");
  }
  if (counter >= 100) {
    gameOver("red");
  }
}

function keyPressed() {
  p1.move();
  p2.move();
}

function gameOver(color) {
  clear();
  textSize(48); // text size
  textAlign(CENTER); // center text horizontally
  fill(color);
  text(`${color} wins!`, width / 2, height / 2);
  gameIsOver = true;
}
