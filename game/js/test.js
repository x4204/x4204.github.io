let blurDiv = document.querySelector(`#blur`);
let gover = document.querySelector(`#gameOver`);
let endInfo = document.querySelector(`#endInfo`);
let score = document.querySelector(`#score`);
let canvas = document.querySelector(`#canvas`);
let startBtn = document.querySelector(`#startBtn`);
let ctx = canvas.getContext(`2d`);
// general data ----------------------------------------------------------------
let keys = { w: false, a: false, s: false, d: false, shoot: false };
const HEIGHT = canvas.height;     // height of the canvas
const WIDTH = canvas.width;       // width of the canvas
let TIME_LEFT;                    // time left for the player
const FPS = 60;                   // game fps
let HEALTH;                       // player health
let SCORE;                        // player score
let ARMOR;                        // player armor
let currObj;                      // last clicked DOM element
// game loops ------------------------------------------------------------------
let mainInterval;                 // game loop
let mainTimer;                    // 60 seconds game timer
let targetSpawn;                  // target spawn interval
let shootTimer = 20;              // interval for shooting
// game objects ----------------------------------------------------------------
let tri;
let bullets = [];
let targets = [];
// -----------------------------------------------------------------------------
document.addEventListener('mousedown', function(event) {
  currObj = event.target;
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

startBtn.addEventListener('click', function() {
  // preinitializer -->
  startBtn.style.visibility = 'hidden';
  gover.style.visibility = 'hidden';
  blurDiv.style.visibility = 'hidden';
  endInfo.style.visibility = 'hidden';
  score.style.visibility = 'hidden';
  currObj = canvas;
  isStart = true;
  HEALTH = 10000;
  ARMOR = 10000;
  SCORE = 0;
  TIME_LEFT = 60
  bullets = [];
  targets = [];
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  tri = new Triangle(300, 300, 0);
  // <-- preinitializer

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
      targets[i].moveTowardsPlayer(tri);
      if (tri.collides(targets[i])) {
          if (ARMOR > 0) {
            ARMOR -= 180;
            HEALTH -= 20;
          } else {
            HEALTH -= 180;
          }
          if (HEALTH / 100 <= 0){
            setTimeout(drawGameOver('Game'), 200);
            clearInterval(mainInterval);
            clearInterval(targetSpawn);
            clearInterval(mainTimer);
            isStart = false;
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
    drawTimeLeft();
    drawScore();
    drawHealth();
    drawArmor();
  }, 1000/FPS);

  targetSpawn = setInterval(function() {
    let newTarget = new Target();
    let distanceToPlayer = Math.sqrt(Math.pow(newTarget.x - tri.x, 2) + Math.pow(newTarget.y - tri.y, 2));
    while (distanceToPlayer < 100) { // this ensures that targets will never spawn in a 100px radius to the player
      newTarget = new Target();
      distanceToPlayer = Math.sqrt(Math.pow(newTarget.x - tri.x, 2) + Math.pow(newTarget.y - tri.y, 2));
    }
    targets.push(newTarget);
  }, 1000);

  mainTimer = setInterval(function() {
      if (TIME_LEFT == 0) {               // time rush gamemode
        clearInterval(mainInterval);
        clearInterval(targetSpawn);
        clearInterval(mainTimer);
        drawGameOver(' Time');
        isStart = false;
      }
      else TIME_LEFT--;
    }, 1000);
});

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

let drawTimeLeft = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#ffcc00';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 4;
  ctx.strokeText(`You have ${TIME_LEFT} seconds to get a highscore`,
                  WIDTH / 2 - 195,
                  HEIGHT - 15);
  ctx.fillText(`You have ${TIME_LEFT} seconds to get a highscore`,
                  WIDTH / 2 - 195,
                  HEIGHT - 15);
}

let drawGameOver = function(text) {
  blurDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  gover.style.visibility = 'visible';
  blurDiv.style.visibility = 'visible';
  endInfo.style.opacity = '0';
  score.style.opacity = '0';
  endInfo.innerHTML = `${text} Over`;
  score.innerHTML = `Final Score: ${SCORE}`;
  endInfo.style.visibility = 'visible';
  score.style.visibility = 'visible';
  let i = 0;
  let smooth = setInterval(function(){
    blurDiv.style.backgroundColor = `rgba(0, 0, 0, ${i})`;
    endInfo.style.opacity = `${i*2}`;
    score.style.opacity = `${i*2}`;
    i += 0.005;
    if (i > 0.5)
      clearInterval(smooth);
  }, 5);
  startBtn.innerHTML = `Restart`;
  startBtn.style.visibility = 'visible';
}
