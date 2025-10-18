new p5(); // makes it so that you can access variables like RIGHT_ARROW outside of setup

tileSize = 40;
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
    rect(this.px, this.py, tileSize, tileSize);
    fill(this.color);
    rect(this.x, this.y, tileSize, tileSize);

    this.px = this.x;
    this.py = this.y;
  }

  move() {
    const keys = inputs[this.color];
    if (keyCode == keys[0]) {
      if (get(this.x + tileSize, this.y)[3] != 254) {
        this.x += tileSize;
      }
    }
    if (keyCode == keys[1]) {
      if (get(this.x, this.y + tileSize)[3] != 254) {
        this.y += tileSize;
      }
    }
    if (keyCode == keys[2]) {
      if (get(this.x - tileSize, this.y)[3] != 254) {
        this.x -= tileSize;
      }
    }

    if (keyCode == keys[3]) {
      if (get(this.x, this.y - tileSize)[3] != 254) {
        this.y -= tileSize;
      }
    }

    // if moved
    if (this.x != this.px || this.y != this.py) {
      redraw(); //redraws faster than waiting for next draw
      if (this.color == "red") {
        counter += 1;
      }
    }
  }
}

function setup() {
  noStroke();
  noLoop(); // only draws if you specifically call redraw()

  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < Math.floor(windowWidth / tileSize); i++) {
    for (let j = 0; j < Math.floor(windowHeight / tileSize); j++) {
      let r = Math.random();
      if (r < 0.25) {
        fill(0, 0, 0, 254);
        rect(i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }

  p1 = new Player(0, 0, "red");
  p2 = new Player(
    windowWidth - (windowWidth % tileSize) - tileSize,
    windowHeight - (windowHeight % tileSize) - tileSize,
    "blue"
  );
}

function draw() {
  if (gameIsOver) {
    return;
  }

  p1.update();
  p2.update();

  if (get(p1.x, p1.y)[2] == 255) {
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
