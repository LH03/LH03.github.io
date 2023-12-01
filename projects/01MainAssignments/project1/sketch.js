let cursorImage;
let button;
let cursorsFrozen = false;
let restartCountdown = 0;
let font;

let currentLevel = 0;
const maxLevels = 5;
const numCursorsLevels = [1, 40, 700, 3500];
const cursors = [];

let userAgent = window.navigator.userAgent;

function preload() {
  let os = "Unknown OS";

  if (userAgent.indexOf("Win") != -1) {
    cursorImage = loadImage("assets/Windows Cursor.png");
  } else {
    cursorImage = loadImage("assets/MACOS.png");
  }

  font = loadFont("assets/Mulish-Medium.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noCursor(); // Hide the default cursor

  // Create the button
  button = createButton("Click me");
  button.position(random(100, width - 100), random(100, height - 100));
  button.mouseClicked(onButtonClick);

  // Customize button appearance
  button.style("padding", "10px");
  button.style("border", "none");
  button.style("border-radius", "5px");
  button.style("font-size", "1.5em");
  button.style("color", "white");
  button.style("background-color", "#B11BB3");
  button.style("cursor", "pointer");
  button.style("outline", "none");
  button.style("font-family", font);
  button.style("transform", "translate(-50%, -50%)");
  button.position(width / 2, height / 2);

  // Disable hover state for the button
  button.style("hover", "none");
}

function onButtonClick() {
  // Increment the level
  currentLevel = (currentLevel + 1) % maxLevels;

  // Reset button position
  button.position(random(100, width - 100), random(100, height - 100));

  // Clear existing cursors
  cursors.length = 0;

  // Show appropriate number of cursors for the current level
  for (let i = 0; i < numCursorsLevels[currentLevel]; i++) {
    cursors.push(new Cursor(width, height));
  }

  // Set button text based on the current level
  if (currentLevel < maxLevels - 1) {
    button.html("Click me");
  } else {
    button.position(width / 2, height / 2);
    // If it's the last level, show "You did it" message and reset the game
    button.html("🌟✨  You did it!  ✨🌟");
    button.style("background-color", "#65A603");
    button.style("pointer-events", "none"); // Disable further clicks

    // Set restart countdown to 5 seconds
    restartCountdown = 5;
    countdown();
  }
}

function countdown() {
  if (restartCountdown > 0) {
    // Display countdown in the center of the canvas
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(0);
    text(restartCountdown, width / 2, height / 2);

    // Decrease the countdown every second
    setTimeout(() => {
      restartCountdown--;
      countdown();
    }, 1000);
  } else {
    // Reset the game after the countdown
    currentLevel = 0;
    cursorsFrozen = false;

    // Set a new position for the button
    button.position(random(100, width - 100), random(100, height - 100));

    button.html("Click me");
    button.style("background-color", "#B11BB3");
    button.style("pointer-events", "auto"); // Enable clicks

    // Clear existing cursors
    cursors.length = 0;
  }
}

function draw() {
  background('#FDF4E3');

  if (restartCountdown > 0) {
    // Display countdown in the center of the canvas
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(0);
    text(restartCountdown, width / 2, height / 2 - 150);
  } else {
    // Draw and move all cursors
    for (let i = 0; i < cursors.length; i++) {
      cursors[i].move();
    }
  }
}

function mousePressed() {
  return false; // prevent default
}
