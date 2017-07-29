const FPS = 60;
const M_SPEED = 4;    // movement speed
const R_SPEED = 0.1;  // rotation speed
let keys = { w: false, a: false, s: false, d: false };
let canvas = document.querySelector(`#canvas`);
let ctx = canvas.getContext(`2d`);
let target;

let tri = new Triangle(300, 300, 0);
tri.draw();

document.addEventListener('mousedown', function(event) {
  target = event.target;
  // console.log(event.target);
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
      case 's':
        keys.s = true;
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
      case 's':
        keys.s = false;
        break;
    }
  }
});

let mainInterval = setInterval(function() {
  ctx.clearRect(0, 0, 600, 600);
  if (keys.w == true) moveForwards(tri);
  if (keys.a == true) rotateLeft(tri);
  if (keys.s == true) moveBackwards(tri);
  if (keys.d == true) rotateRight(tri);
  tri.draw();
}, 1000/FPS);



let moveForwards = function(obj) {
  obj.x -= Math.cos(obj.offset + 0.5 * Math.PI) * M_SPEED;
  obj.y -= Math.sin(obj.offset + 0.5 * Math.PI) * M_SPEED;
}

let moveBackwards = function(obj) {
  obj.x += Math.cos(obj.offset + 0.5 * Math.PI) * M_SPEED;
  obj.y += Math.sin(obj.offset + 0.5 * Math.PI) * M_SPEED;
}

let rotateLeft = function(obj) {
  obj.offset -= R_SPEED;
}

let rotateRight = function(obj) {
  obj.offset += R_SPEED;
}

//------------------------------------------------------------------------------
// for testing purposes -->
let startBtn = document.querySelector(`#startBtn`);
let stopBtn = document.querySelector(`#stopBtn`);
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
