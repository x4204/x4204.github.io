const T_MIN_RAD = 12;   // target min radius
const T_MAX_RAD = 22;   // target max radius
const T_HEALTH = 12;    // target health
const T_DIR_MULT = 0.5; // target direction multiplier (bigger -> faster targets)
// -----------------------------------------------------------------------------

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
  this.moveTowardsPlayer = function(player) {
    let dir = [
      player.x - this.x,
      player.y - this.y
    ];
    let magnitude = Math.sqrt(Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2));
    dir[0] /= magnitude / T_DIR_MULT;
    dir[1] /= magnitude / T_DIR_MULT;
    this.x += dir[0];
    this.y += dir[1];
  }
  this.dropUpgrade = function() {
    return new Upgrade(this.x, this.y);
  }
}
