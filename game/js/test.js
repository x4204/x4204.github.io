const FPS = 60;
let SCORE = 0;          // player score
let HEALTH = 10000;     // player health
let ARMOR = 10000;      // player armor
let keys = { w: false, a: false, s: false, d: false, shoot: false };
let canvas = document.querySelector(`#canvas`);
let ctx = canvas.getContext(`2d`);
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let currObj;
let mainInterval;           // game loop
let targetSpawn;            // target spawn interval
let shootTimer = 20;        // interval for shooting

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
      // case 83:        // there will be no backwards movement for now
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
      // case 83:
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
  if (keys.s == true) tri.moveBackwards();
  if (keys.shoot == true) {
    if (shootTimer % 20 == 0)
      bullets.push(new Bullet(tri.x, tri.y, tri.offset));
    shootTimer++;
  }
  tri.keepOnTheMap();
  for (let i = 0; i < targets.length; i++) { // check for triangle-circle collision
    if (tri.collides(targets[i])) {
        if (ARMOR > 0) {
          ARMOR -= 180;
          HEALTH -= 20;
        } else {
          HEALTH -= 180;
        }
        if (HEALTH <= 0){
          clearInterval(mainInterval);
          drawGameOver();
        }
    }
    if (targets[i].r < 1) {
      targets.splice(i, 1);
    }
    targets[i].draw();
  }
  for (let i = 0; i < bullets.length; i++) { // check for circle-circle collision
    bullets[i].update();
    if (bullets[i].collides(targets)) {
      bullets.splice(i, 1);
      SCORE += 1;
      break;
    }
    if (bullets[i].isOutOfBoundries())
      bullets.splice(i, 1);
    else bullets[i].draw();
  }
  tri.draw();
  drawScore();
  drawHealth();
  drawArmor();
}, 1000/FPS);

targetSpawn = setInterval(function() {
  targets.push(new Target());
}, 1000);





let drawScore = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#ffcc00';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 4;
  ctx.strokeText(`Score: ${SCORE}`, 10, 25);
  ctx.fillText(`Score: ${SCORE}`, 10, 25);
}

let drawHealth = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#d8291c';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.strokeText(`Health: ${Math.floor(HEALTH / 100)}`, WIDTH / 2 - 50, 25);
  ctx.fillText(`Health: ${Math.floor(HEALTH / 100)}`, WIDTH / 2 - 50, 25);
}

let drawArmor = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#2475c6';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.strokeText(`Armor: ${Math.floor(ARMOR / 100)}`, WIDTH - 120, 25);
  ctx.fillText(`Armor: ${Math.floor(ARMOR / 100)}`, WIDTH - 120, 25);
}

let drawGameOver = function() {
  ctx.font = '41px TheFont';
  ctx.fillStyle = '#ffcc00';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 6;
  ctx.strokeText(`You Lost`, WIDTH / 2 - 83, HEIGHT / 2 - 20);
  ctx.fillText(`You Lost`, WIDTH / 2 - 83, HEIGHT / 2 - 20);
  ctx.strokeText(`Final Score: ${SCORE}`,
              WIDTH / 2 - 130 - (SCORE.toString().length - 1) * 10,
              HEIGHT / 2 + 30);
  ctx.fillText(`Final Score: ${SCORE}`,
              WIDTH / 2 - 130 - (SCORE.toString().length - 1) * 10,
              HEIGHT / 2 + 30);
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
