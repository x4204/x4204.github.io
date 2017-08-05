let blurDiv = document.querySelector(`#blur`);
let gover = document.querySelector(`#gameOver`);
let endInfo = document.querySelector(`#endInfo`);
let score = document.querySelector(`#score`);
let canvas = document.querySelector(`#canvas`);
let startBtn = document.querySelector(`#startBtn`);
let ctx = canvas.getContext(`2d`);
// game data -------------------------------------------------------------------
let C_FPS = Game.FPS;
let WIDTH;
let HEIGHT;
let C_ARMOR;
let C_HEALTH;
let C_TIME;
let C_TSI;
let C_MASS;
let C_MAX_SPEED;
let C_DROP_CHANCE;
let C_BULLET_SPEED;
let C_BULLET_DAMAGE;
let C_ROT_SPEED;
let C_ACCEL;
// general data ----------------------------------------------------------------
let SCORE;                        // player score
let currObj;                      // last clicked DOM element
// game loops ------------------------------------------------------------------
let mainInterval;                 // game loop
let mainTimer;                    // 60 seconds game timer
let targetSpawn;                  // target spawn interval
let shootTimer = 20;              // interval for shooting
// game lists of objects -------------------------------------------------------
let tri;                          // the player
let bullets = [];                 // bullets shot
let targets = [];                 // targets on the map
let upgrades = [];                // upgrades on the map
// -----------------------------------------------------------------------------
document.addEventListener('mousedown', function(event) {
  currObj = event.target;
});

document.addEventListener('keydown', function(event) {
  if (currObj == canvas) {
    switch (event.which) {
      case 65:
        Game.keys.a = true;
        break;
      case 68:
        Game.keys.d = true;
        break;
      case 87:
        Game.keys.w = true;
        break;
      case 83:
        Game.keys.s = true;
        break;
      case 38:
        Game.keys.shoot = true;
        break;
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (currObj == canvas) {
    switch (event.which) {
      case 65:
        Game.keys.a = false;
        break;
      case 68:
        Game.keys.d = false;
        break;
      case 87:
        Game.keys.w = false;
        break;
      case 83:
        Game.keys.s = false;
        break;
      case 38:
        Game.keys.shoot = false;
        shootTimer = 20;
        break;
    }
  }
});

startBtn.addEventListener('click', function() {
  gameINIT();

  mainInterval = setInterval(function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    if (Game.keys.w == true) tri.moveForwards();
    else if (Game.keys.s == true) tri.moveBackwards();
    else if (Math.abs(tri.velocity[0]) > DEC_RATE
          || Math.abs(tri.velocity[1]) > DEC_RATE)
      tri.decelerate();
    if (Game.keys.a == true) tri.rotateLeft();
    if (Game.keys.d == true) tri.rotateRight();
    if (Game.keys.shoot == true) {
      if (shootTimer % 20 == 0)
        bullets.push(new Bullet(tri.x, tri.y, tri.offset));
      shootTimer++;
    }
    tri.keepOnTheMap();
    for (let i = 0; i < targets.length; i++) { // check for triangle-circle (player-target) collision
      targets[i].moveTowardsPlayer(tri);
      if (tri.collides(targets[i])) {
          if (C_ARMOR > 0) {
            C_ARMOR -= 180;
            C_HEALTH -= 20;
          } else {
            C_HEALTH -= 180;
          }
          if (C_HEALTH / 100 <= 0){
            setTimeout(drawGameOver('Game'), 200);
            clearInterval(mainInterval);
            clearInterval(targetSpawn);
            clearInterval(mainTimer);
            isStart = false;
          }
      }
      if (targets[i].r < 1) {
        targets.splice(i, 1);
      } else {
        targets[i].draw();
      }
    }
    for (let i = 0; i < upgrades.length; i++) { // check for triangle-circle (player-upgrade) collision
      if (tri.collides(upgrades[i])) {
        Game.upgrades++;
        upgrades.splice(i, 1);
      } else {
        upgrades[i].draw();
      }
    }
    for (let i = 0; i < bullets.length; i++) { // check for circle-circle (bullet-target) collision
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
    drawUpgradesCount();
    drawHealth();
    drawArmor();
  }, 1000/C_FPS);

  targetSpawn = setInterval(function() {
    let newTarget = new Target();
    let distanceToPlayer = Math.sqrt(Math.pow(newTarget.x - tri.x, 2) + Math.pow(newTarget.y - tri.y, 2));
    while (distanceToPlayer < 100) { // this ensures that targets will never spawn in a 100px radius to the player
      newTarget = new Target();
      distanceToPlayer = Math.sqrt(Math.pow(newTarget.x - tri.x, 2) + Math.pow(newTarget.y - tri.y, 2));
    }
    targets.push(newTarget);
  }, C_TSI);

  mainTimer = setInterval(function() {
      if (C_TIME == 0) {               // time rush gamemode
        clearInterval(mainInterval);
        clearInterval(targetSpawn);
        clearInterval(mainTimer);
        drawGameOver(' Time');
        isStart = false;
      }
      else C_TIME--;
    }, 1000);
});

let gameINIT = function() {
  isStart = true;
  currObj = canvas;
  bullets = [];
  targets = [];
  upgrades = [];
  gover.style.visibility = 'hidden';
  score.style.visibility = 'hidden';
  blurDiv.style.visibility = 'hidden';
  endInfo.style.visibility = 'hidden';
  startBtn.style.visibility = 'hidden';
  SCORE = 0;
  WIDTH = Game.canvas.width;
  HEIGHT = Game.canvas.height;
  C_TIME = Game.time.default;
  C_ARMOR = Game.armor.default;
  C_HEALTH = Game.health.default;
  C_TSI = Game['target spawn interval'].default;
  C_MASS = Game['mass'].default;
  C_MAX_SPEED = Game['max speed'].default;
  C_DROP_CHANCE = Game['drop chance'].default;
  C_BULLET_SPEED= Game['bullet speed'].default;
  C_BULLET_DAMAGE = Game['bullet damage'].default;
  C_ROT_SPEED = Game['rotation speed'].default;
  C_ACCEL = Game.acceleration.default;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  tri = new Triangle(WIDTH / 2, HEIGHT / 2, 0);
}

let drawScore = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#ffcc00';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 4;
  ctx.strokeText(`Score: ${SCORE}`, 10, 25);
  ctx.fillText(`Score: ${SCORE}`, 10, 25);
}

let drawUpgradesCount = function() {
  upgradeShopPoints.innerHTML = Game.upgrades;
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#4fc197';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 4;
  ctx.strokeText(`Upgrades: ${Game.upgrades}`, 10, 55);
  ctx.fillText(`Upgrades: ${Game.upgrades}`, 10, 55);
}

let drawHealth = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#d8291c';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.strokeText(`Health: ${Math.floor(C_HEALTH / 100)}`, WIDTH / 2 - 50, 25);
  ctx.fillText(`Health: ${Math.floor(C_HEALTH / 100)}`, WIDTH / 2 - 50, 25);
}

let drawArmor = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#2475c6';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.strokeText(`Armor: ${Math.floor(C_ARMOR / 100)}`, WIDTH - 120, 25);
  ctx.fillText(`Armor: ${Math.floor(C_ARMOR / 100)}`, WIDTH - 120, 25);
}

let drawTimeLeft = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#ffcc00';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 4;
  ctx.strokeText(`You have ${C_TIME} seconds to get a highscore`,
                  WIDTH / 2 - 195,
                  HEIGHT - 15);
  ctx.fillText(`You have ${C_TIME} seconds to get a highscore`,
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
