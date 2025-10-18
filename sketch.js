tileSize = 40;
gameOver = false;
winner = "red";

counter = 0;

function setup() {
  noStroke();

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

  x1 = 0;
  y1 = 0;
  px1 = x1;
  py1 = y1;
  x2 = windowWidth - (windowWidth % tileSize) - tileSize;
  y2 = windowHeight - (windowHeight % tileSize) - tileSize;
  px2 = x2;
  py2 = y2;
}

function draw() {
  if (gameOver) {
    textSize(48); // text size
    textAlign(CENTER); // center text horizontally
    fill(winner);
    text(`${winner} wins!`, width / 2, height / 2); // draw text at center
    return;
  }
  fill("white");
  rect(px1, py1, tileSize, tileSize);
  rect(px2, py2, tileSize, tileSize);
  px1 = x1;
  py1 = y1;
  px2 = x2;
  py2 = y2;

  fill("red");
  rect(x1, y1, tileSize, tileSize);
  fill("blue");
  rect(x2, y2, tileSize, tileSize);

  if (get(x1, y1)[2] == 255) {
    clear();
    winner = "blue";
    gameOver = true;
  }

  if (counter >= 100) {
    clear();
    winner = "red";
    gameOver = true;
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    if (get(x1 + tileSize, y1)[3] != 254) {
      x1 += tileSize;
      counter += 1;
    }
  }
  if (keyCode == DOWN_ARROW) {
    if (get(x1, y1 + tileSize)[3] != 254) {
      y1 += tileSize;
      counter += 1;
    }
  }
  if (keyCode == LEFT_ARROW) {
    if (get(x1 - tileSize, y1)[3] != 254) {
      x1 -= tileSize;
      counter += 1;
    }
  }

  if (keyCode == UP_ARROW) {
    if (get(x1, y1 - tileSize)[3] != 254) {
      y1 -= tileSize;
      counter += 1;
    }
  }

  if (keyCode == 68) {
    // D
    if (get(x2 + tileSize, y2)[3] != 254) {
      x2 += tileSize;
    }
  }
  if (keyCode == 83) {
    if (get(x2, y2 + tileSize)[3] != 254) {
      y2 += tileSize;
    }
  }
  if (keyCode == 65) {
    if (get(x2 - tileSize, y2)[3] != 254) {
      x2 -= tileSize;
    }
  }

  if (keyCode == 87) {
    if (get(x2, y2 - tileSize)[3] != 254) {
      y2 -= tileSize;
    }
  }
}
