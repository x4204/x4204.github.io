let U_COLOR = '#4fc197';                  // upgrade color
let U_RADIUS = 7;                       // radius of the upgrade
// -----------------------------------------------------------------------------

function Upgrade(originx, originy) {
  this.x = originx;
  this.y = originy;
  this.r = U_RADIUS;
  this.draw = function() {
    ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#888';
      ctx.fillStyle = U_COLOR;
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
