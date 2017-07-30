let T_MIN_RAD = 8;
let T_MAX_RAD = 18;

function Target() {
// function Target(originx, originy, radius) {
  // this.x = originx;
  // this.y = originy;
  // this.r = radius;
  this.x = Math.random() * WIDTH;
  this.y = Math.random() * HEIGHT;
  this.r = Math.random() * (T_MAX_RAD - T_MIN_RAD) + T_MIN_RAD;
  this.draw = function () {
    ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#888';
      ctx.fillStyle = '#92bfce';
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
