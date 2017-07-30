const R_BULLET = 4;     // bullet radius
const S_BULLET = 4;    // bullet speed

function Bullet(originx, originy, offset) {
  this.offset = offset;
  this.velocity = [
    Math.cos(this.offset + 0.5 * Math.PI) * S_BULLET,
    Math.sin(this.offset + 0.5 * Math.PI) * S_BULLET
  ];
  this.x = originx - Math.cos(this.offset + 0.5 * Math.PI) * SIZE * 2;
  this.y = originy - Math.sin(this.offset + 0.5 * Math.PI) * SIZE * 2;
  this.draw = function() {
    ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#999';
      ctx.fillStyle = '#ef5858';
      ctx.arc(this.x, this.y, R_BULLET, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  this.update = function() {
    this.x -= this.velocity[0];
    this.y -= this.velocity[1];
  }
  this.isOutOfBoundries = function() {
    if (this.x < -10 || this.x > WIDTH + 10
      || this.y < -10 || this.y > HEIGHT + 10) return true;
    else return false;
  }
}
