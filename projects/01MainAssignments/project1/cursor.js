class Cursor {
    constructor(width, height) {
      this.width = width;
      this.height = height;
  
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.angle = Math.random() * 2 * Math.PI;
      this.factor = 0.8 + Math.random() * 0.4;
    }
  
    move() {
      if (cursorsFrozen) {
        return; // Skip moving if cursors are frozen
      }
  
      const v = { x: mouseX - pmouseX, y: mouseY - pmouseY };
  
      this.rotate(v);
      this.scale(v);
  
      this.x += v.x;
      this.y += v.y;
  
      if (this.x < 0) {
        this.x += this.width;
      }
      if (this.y < 0) {
        this.y += this.height;
      }
      this.x = this.x % this.width;
      this.y = this.y % this.height;
  
      this.updatePos();
    }
  
    rotate(v) {
      const tempX = v.x * cos(this.angle) - v.y * sin(this.angle);
      v.y = v.x * sin(this.angle) + v.y * cos(this.angle);
      v.x = tempX;
    }
  
    scale(v) {
      v.x *= this.factor;
      v.y *= this.factor;
    }
  
    updatePos() {
      image(cursorImage, this.x, this.y, cursorImage.width*0.8, cursorImage.height*0.8);
    }
  }
  
 