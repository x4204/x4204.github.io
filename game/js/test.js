const FPS = 60;
let SCORE = 0;
let keys = { w: false, a: false, s: false, d: false, shoot: false };
let canvas = document.querySelector(`#canvas`);
let ctx = canvas.getContext(`2d`);
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let currObj;
let mainInterval;     // update for the game
let targetSpawn;      // target spawn interval
let shootTimer = 20;       // interval for shooting;
// for testing -->
let startBtn = document.querySelector(`#startBtn`);
let stopBtn = document.querySelector(`#stopBtn`);
let status = document.querySelector(`#status`);
// <-- for testing

let tri = new Triangle(300, 300, 0);
let bullets = [];
let targets = [ new Target() ];
tri.draw();

document.addEventListener('mousedown', function(event) {
  currObj = event.target;
  if (currObj == canvas)
    status.innerHTML = '(you are IN the game)';
  else
    status.innerHTML = '(you are NOT in the game)';
});

document.addEventListener('keydown', function(event) {
  if (currObj == canvas) {
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
  if (currObj == canvas) {
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
        shootTimer = 20;
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
    if (shootTimer % 20 == 0)
      bullets.push(new Bullet(tri.x, tri.y, tri.offset));
    shootTimer++;
  }
  tri.keepOnTheMap();
  for (let i = 0; i < targets.length; i++) {
    targets[i].draw();
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    if (bullets[i].collides(targets)) {
      bullets.splice(i, 1);
      SCORE += 10;
      break;
    }
    if (bullets[i].isOutOfBoundries())
      bullets.splice(i, 1);
    else bullets[i].draw();
  }
  tri.draw();
  drawScore();
}, 1000/FPS);

targetSpawn = setInterval(function() {
  targets.push(new Target());
}, 4000);





let drawScore = function() {
  ctx.font="20px Arial";
  ctx.fillStyle = '#ffcc00';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 4;
  ctx.strokeText(`Score: ${SCORE}`, 10, 25);
  ctx.fillText(`Score: ${SCORE}`, 10, 25);
}

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
  clearInterval(targetSpawn);
});
// <-- for testing purposes
