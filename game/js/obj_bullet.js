const R_BULLET = 4;     // bullet radius
// -----------------------------------------------------------------------------

function Bullet(originx, originy, offset) {
  this.offset = offset;
  this.velocity = [
    Math.cos(this.offset + 0.5 * Math.PI) * C_BULLET_SPEED,
    Math.sin(this.offset + 0.5 * Math.PI) * C_BULLET_SPEED
  ];
  this.x = originx - Math.cos(this.offset + 0.5 * Math.PI) * SIZE * 2;
  this.y = originy - Math.sin(this.offset + 0.5 * Math.PI) * SIZE * 2;
  this.r = R_BULLET;
  this.damage = C_BULLET_DAMAGE;
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
    if (this.x < -10 || this.x > Game.canvas.width + 10
      || this.y < -10 || this.y > Game.canvas.height + 10) return true;
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
        a[i].health -= C_BULLET_DAMAGE;
        collision = 1;
        setTimeout(function() {
          if (a[i] !== undefined)
            a[i].color = '#92bfce'
        }, 50);
        if (a[i].health <= 0) {
          let chance = Math.random();
          if (chance <= C_DROP_CHANCE)
            upgrades.push(a[i].dropUpgrade());
          a.splice(i, 1);
          SCORE += 10;
        }
      }
    }
    return collision;
  }
}
