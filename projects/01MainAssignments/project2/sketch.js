let tileSize = 60;
let tiles;
let tiles2;
let font;
let fontSize = 260;

let hueOffset = 0;
let w = 1550;
let h = 550;

let diagonal;
const numSpokes = 100;

function preload() {
  font = loadFont("assets/TSCharm-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  diagonal = dist(0, 0, width, height);

  //smooth();
  noStroke();

  // Draw the text to a graphics object
  let pg = createGraphics(w, h);
  pg.background("#FDF4E3");
  pg.textFont(font);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(fontSize);
  //pg.fill(255);
  pg.fill("#008B47");
  pg.noStroke();
  pg.text("SPRITE", pg.width / 2, pg.height / 2 - 60);

  // Split the graphics object into tiles
  tiles = [];
  for (let y = 0; y < pg.height; y += tileSize) {
    for (let x = 0; x < pg.width; x += tileSize) {
      let tile = new Tile(x, y, tileSize, pg);
      tiles.push(tile);
      console.log("new tile");
    }
  }

  pg = createGraphics(w, h);
  pg.background("#FDF4E3");
  pg.textFont(font);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(fontSize);
  //pg.fill(255);
  pg.fill("#FF8300");

  pg.noStroke();
  pg.text("FANTA", pg.width / 2, pg.height / 2 - 60);

  // Split the graphics object into tiles
  tiles2 = [];
  for (let y = 0; y < pg.height; y += tileSize) {
    for (let x = 0; x < pg.width; x += tileSize) {
      let tile = new Tile(x, y, tileSize, pg);
      tiles2.push(tile);
    }
  }
}

function draw() {
  background("#FDF4E3");

  // Display the tiles
  push();
  translate(width / 2 - w / 2, height / 2 - h / 2);
  let tileset = tiles;
  for (let i = 0; i < tiles.length; i++) {
    let mouseIndex = floor(map(mouseX, 0, width, 0, tiles.length));
    if (mouseIndex < i) {
      tileset = tiles2;
    }
    tileset[i].display();
    //tileset[randomIndex[i]].display();
  }

  let percent = map(mouseX, 0, width, 0, 1);

  // Interpolate between light blue and dark blue based on the mouse position
  let bgColor = lerpColor(color("#FF8300"), color("#008B47"), percent);

  pop();

  // Draw the second canvas with the animated background
  push();
  translate(width / 2, height / 2);
  fill(bgColor);
  drawStars(frameCount * 0.002);
  pop();
}

function drawStars(rotation) {
  rotate(rotation);
  for (let i = numSpokes; i--; ) {
    rotate(TWO_PI / numSpokes);
    strokeWeight(25);
    arc(0, 0, diagonal, diagonal, 0, TWO_PI / numSpokes / 6);
  }
}
