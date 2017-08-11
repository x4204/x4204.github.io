const R_BULLET = 4;     // bullet radius
// -----------------------------------------------------------------------------

function Bullet(originx, originy, offset) {
  this.offset = offset;
  this.velocity = [
    Math.sin(this.offset + Math.PI) * C_BULLET_SPEED,
    Math.cos(this.offset + Math.PI) * C_BULLET_SPEED
  ];
  this.x = originx - Math.sin(this.offset + Math.PI) * SIZE * 2;
  this.y = originy + Math.cos(this.offset + Math.PI) * SIZE * 2;
  this.r = R_BULLET;
  this.damage = C_BULLET_DAMAGE;
  this.draw = function() {
    ctx.beginPath();
      ctx.fillStyle = '#ef5858';
      ctx.arc(this.x, this.y, R_BULLET, 0, 2 * Math.PI);
    ctx.fill();
  }
  this.update = function() {
    this.x -= this.velocity[0];
    this.y += this.velocity[1];
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
        changeColor(a[i]);
        a[i].health -= C_BULLET_DAMAGE;
        collision = 1;
        if (a[i].health <= 0) {
          deadTargets.push(new DeadTarget(a[i].x, a[i].y, a[i].r));
          if (Math.random() <= C_DROP_CHANCE)
            upgrades.push(a[i].dropUpgrade());
          POP_SOUND.play();
          SCORE += Math.floor(a[i].r * 0.5);
          a.splice(i, 1);
        }
      }
    }
    return collision;
  }
}

let changeColor = function(tar) {
  tar.color = '#d36363';
  setTimeout(function() {
      tar.color = '#92bfce';
  }, 50);
}
