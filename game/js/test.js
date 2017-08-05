let blurDiv = document.querySelector(`#blur`);
let gover = document.querySelector(`#gameOver`);
let endInfo = document.querySelector(`#endInfo`);
let score = document.querySelector(`#score`);
let canvas = document.querySelector(`#canvas`);
let startBtn = document.querySelector(`#startBtn`);
let ctx = canvas.getContext(`2d`);
// general data ----------------------------------------------------------------
let SCORE;                        // player score
let currObj;                      // last clicked DOM element
// game loops ------------------------------------------------------------------
let mainInterval;                 // game loop
let mainTimer;                    // 60 seconds game timer
let targetSpawn;                  // target spawn interval
let shootTimer = 20;              // interval for shooting
// game objects ----------------------------------------------------------------
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
    ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
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
          if (Game.armor.current > 0) {
            Game.armor.current -= 180;
            Game.health.current -= 20;
          } else {
            Game.health.current -= 180;
          }
          if (Game.health.current / 100 <= 0){
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
  }, 1000/Game.FPS);

  targetSpawn = setInterval(function() {
    let newTarget = new Target();
    let distanceToPlayer = Math.sqrt(Math.pow(newTarget.x - tri.x, 2) + Math.pow(newTarget.y - tri.y, 2));
    while (distanceToPlayer < 100) { // this ensures that targets will never spawn in a 100px radius to the player
      newTarget = new Target();
      distanceToPlayer = Math.sqrt(Math.pow(newTarget.x - tri.x, 2) + Math.pow(newTarget.y - tri.y, 2));
    }
    targets.push(newTarget);
  }, Game['target spawn interval'].current);

  mainTimer = setInterval(function() {
      if (Game.time.current == 0) {               // time rush gamemode
        clearInterval(mainInterval);
        clearInterval(targetSpawn);
        clearInterval(mainTimer);
        drawGameOver(' Time');
        isStart = false;
      }
      else Game.time.current--;
    }, 1000);
});

let gameINIT = function() {
  SCORE = 0;
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
  Game.time.current = Game.time.default;
  Game.armor.current = Game.armor.default;
  Game.health.current = Game.health.default;
  Game['mass'].current = Game['mass'].default;
  Game['max speed'].current = Game['max speed'].default;
  Game['drop chance'].current = Game['drop chance'].default;
  Game['bullet speed'].current = Game['bullet speed'].default;
  Game['bullet damage'].current = Game['bullet damage'].default;
  Game['rotation speed'].current = Game['rotation speed'].default;
  Game['target spawn interval'].current = Game['target spawn interval'].default;
  ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
  tri = new Triangle(Game.canvas.width / 2, Game.canvas.height / 2, 0);
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
  ctx.strokeText(`Health: ${Math.floor(Game.health.current / 100)}`, Game.canvas.width / 2 - 50, 25);
  ctx.fillText(`Health: ${Math.floor(Game.health.current / 100)}`, Game.canvas.width / 2 - 50, 25);
}

let drawArmor = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#2475c6';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.strokeText(`Armor: ${Math.floor(Game.armor.current / 100)}`, Game.canvas.width - 120, 25);
  ctx.fillText(`Armor: ${Math.floor(Game.armor.current / 100)}`, Game.canvas.width - 120, 25);
}

let drawTimeLeft = function() {
  ctx.font = '21px TheFont';
  ctx.fillStyle = '#ffcc00';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 4;
  ctx.strokeText(`You have ${Game.time.current} seconds to get a highscore`,
                  Game.canvas.width / 2 - 195,
                  Game.canvas.height - 15);
  ctx.fillText(`You have ${Game.time.current} seconds to get a highscore`,
                  Game.canvas.width / 2 - 195,
                  Game.canvas.height - 15);
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
