class Tile {
  constructor(x, y, w, pg) {
    this.x = x;
    this.y = y;

    // create an empty image and copy from
    // the graphics object we made above!
    this.img = createImage(w, w);
    this.img.copy(pg, x, y, w, w, 0, 0, w, w);
  }

  // display the tile!
  display() {
    push();
    translate(this.x, this.y);
    rotate(map(mouseX, 0, width, 0, TWO_PI));
    image(this.img, 0, 0);
    pop();
  }
}
