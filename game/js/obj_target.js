const T_MIN_RAD = 12;   // target min radius
const T_MAX_RAD = 22;   // target max radius
const T_HEALTH = 12;    // target health

function Target() {
  this.x = Math.random() * WIDTH;
  this.y = Math.random() * HEIGHT;
  this.r = Math.random() * (T_MAX_RAD - T_MIN_RAD) + T_MIN_RAD;
  this.color = '#92bfce';
  this.health = T_HEALTH;
  this.draw = function () {
    ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#888';
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    this.r -= 0.03;
  }
}
