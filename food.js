class Food {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 10;
    }
  
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'brown';
      ctx.fill();
      ctx.closePath();
    }
  }