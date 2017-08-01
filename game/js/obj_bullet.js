const R_BULLET = 4;     // bullet radius
const S_BULLET = 4;     // bullet speed
const D_BULLET = 4;     // bullet damage
// -----------------------------------------------------------------------------

function Bullet(originx, originy, offset) {
  this.offset = offset;
  this.velocity = [
    Math.cos(this.offset + 0.5 * Math.PI) * S_BULLET,
    Math.sin(this.offset + 0.5 * Math.PI) * S_BULLET
  ];
  this.x = originx - Math.cos(this.offset + 0.5 * Math.PI) * SIZE * 2;
  this.y = originy - Math.sin(this.offset + 0.5 * Math.PI) * SIZE * 2;
  this.r = R_BULLET;
  this.damage = D_BULLET;
  this.draw = function() {
    ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#999';
      ctx.fillStyle = '#ef5858';
      ctx.arc(this.x, this.y, R_BULLET, 0, 2 * Math.PI);
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
  this.collides = function(a) {
    let collision = 0;
    for (let i = 0; i < a.length && !collision; i++) {
      let diffx = Math.pow(this.x - a[i].x, 2);
      let diffy = Math.pow(this.y - a[i].y, 2);
      let diffr = Math.pow(this.r + a[i].r, 2);
      if(diffx + diffy <= diffr) {
        a[i].color = '#d36363';
        a[i].health -= 4;
        collision = 1;
        setTimeout(function() {
          if (a[i] !== undefined)
            a[i].color = '#92bfce'
        }, 50);
        if (a[i].health <= 0) {
          a.splice(i, 1);
          SCORE += 10;
        }
      }
    }
    return collision;
  }
}
