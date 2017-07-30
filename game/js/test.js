const FPS = 60;
let keys = { w: false, a: false, s: false, d: false, space: false };
let canvas = document.querySelector(`#canvas`);
let ctx = canvas.getContext(`2d`);
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let target;
// for testing -->
let startBtn = document.querySelector(`#startBtn`);
let stopBtn = document.querySelector(`#stopBtn`);
let status = document.querySelector(`#status`);
// <-- for testing

let tri = new Triangle(300, 300, 0);
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
    switch (event.key) {
      case 'a':
        keys.a = true;
        break;
      case 'd':
        keys.d = true;
        break;
      case 'w':
        keys.w = true;
        break;
      // case 's':        // no backwards for the moment
      //   keys.s = true;
      //   break;
      case ' ':
        keys.space = true;
        break;
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (target == canvas) {
    switch (event.key) {
      case 'a':
        keys.a = false;
        break;
      case 'd':
        keys.d = false;
        break;
      case 'w':
        keys.w = false;
        break;
      // case 's':
      //   keys.s = false;
      //   break;
      case ' ':
        keys.space = false;
        break;
    }
  }
});

let mainInterval = setInterval(function() {
  ctx.clearRect(0, 0, 600, 600);
  if (keys.w == true) tri.moveForwards();
  else if (Math.abs(tri.velocity[0]) > DEC_RATE * 1.1
        || Math.abs(tri.velocity[1]) > DEC_RATE * 1.1)
    tri.decelerate();
  if (keys.a == true) tri.rotateLeft();
  if (keys.d == true) tri.rotateRight();
  tri.keepOnTheMap();
  tri.draw();
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
