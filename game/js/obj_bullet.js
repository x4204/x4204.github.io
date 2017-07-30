const R_BULLET = 4;     // bullet radius
const S_BULLET = 5;    // bullet speed

function Bullet(originx, originy, offset) {
  this.x = originx;
  this.y = originy;
  this.offset = offset;
  this.velocity = [
    Math.cos(this.offset + 0.5 * Math.PI) * S_BULLET,
    Math.sin(this.offset + 0.5 * Math.PI) * S_BULLET
  ];
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
}
