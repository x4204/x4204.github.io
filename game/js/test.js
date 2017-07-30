const FPS = 60;
let keys = { w: false, a: false, s: false, d: false, shoot: false };
let canvas = document.querySelector(`#canvas`);
let ctx = canvas.getContext(`2d`);
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let target;
let mainInterval;     // update for the game
let shootTimer = 15;       // interval for shooting;
// for testing -->
let startBtn = document.querySelector(`#startBtn`);
let stopBtn = document.querySelector(`#stopBtn`);
let status = document.querySelector(`#status`);
// <-- for testing

let tri = new Triangle(300, 300, 0);
let bullets = [];
tri.draw();

document.addEventListener('mousedown', function(event) {
  target = event.target;
  if (target == canvas)
    status.innerHTML = '(you are IN the game)';
  else
    status.innerHTML = '(you are NOT in the game)';
});

document.addEventListener('keydown', function(event) {
  if (target == canvas) {
    switch (event.which) {
      case 65:
        keys.a = true;
        break;
      case 68:
        keys.d = true;
        break;
      case 87:
        keys.w = true;
        break;
      // case 's':        // no backwards for now
      //   keys.s = true;
      //   break;
      case 38:
        keys.shoot = true;
        break;
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (target == canvas) {
    switch (event.which) {
      case 65:
        keys.a = false;
        break;
      case 68:
        keys.d = false;
        break;
      case 87:
        keys.w = false;
        break;
      // case 's':
      //   keys.s = false;
      //   break;
      case 38:
        keys.shoot = false;
        shootTimer = 15;
        break;
    }
  }
});

mainInterval = setInterval(function() {
  ctx.clearRect(0, 0, 600, 600);
  if (keys.w == true) tri.moveForwards();
  else if (Math.abs(tri.velocity[0]) > DEC_RATE
        || Math.abs(tri.velocity[1]) > DEC_RATE)
    tri.decelerate();
  if (keys.a == true) tri.rotateLeft();
  if (keys.d == true) tri.rotateRight();
  if (keys.shoot == true) {
    if (shootTimer % 15 == 0)
      bullets.push(new Bullet(tri.x, tri.y, tri.offset));
    shootTimer++;
  }
  tri.keepOnTheMap();
  tri.draw();
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    if (bullets[i].isOutOfBoundries())
      bullets.splice(i, 1);
    else bullets[i].draw();
  }
}, 1000/FPS);








//------------------------------------------------------------------------------
// for testing purposes -->
let isStart = false;
let intvl;
startBtn.addEventListener('click', function() {
  if (!isStart) {
    isStart = true;
    intvl = setInterval(function() {
      tri.offset += 0.1;
      ctx.clearRect(0, 0, 600, 600);
      tri.draw();
    }, 1000/FPS);
  }
});

stopBtn.addEventListener('click', function() {
  isStart = false;
  clearInterval(intvl);
  clearInterval(mainInterval);
});
// <-- for testing purposes
