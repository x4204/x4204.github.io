let bStop = document.querySelector(`#bStop`);
let bStart = document.querySelector(`#bStart`);
let running = false;
let FPS = 60;
let G = 6.67e-11;
let magnitude = 1e-6;
let lunarMass = 7.342e22;
let defDist = 384.5e11; // 100 px is equal to the distance between earth and moon
let bodies = [];
// -----------------------------------------------------------------------------
let nbOfObjects = 3;


// -----------------------------------------------------------------------------

for (let i = 0; i < nbOfObjects; i++) {
  bodies.push(new Body(Math.random() * 600, Math.random() * 600, 10, lunarMass));
}

for (let i = 0; i < bodies.length; i++)
  bodies[i].draw();

function force(obj1, obj2) {
  let R = obj1.position.distanceTo(obj2.position) * defDist;
  let A = (G * obj2.mass) / R;
  return A;
}


let interval;
bStart.addEventListener('click', function() {



  running = true;
  if(running) {
    interval = setInterval(function () {
      ctx.clearRect(0, 0, 600, 600);
      for (let i = 0; i < bodies.length; i++) {
        for (let j = 0; j < bodies.length; j++) {
          if (i != j) {
            bodies[i].applyForce(bodies[j]);
          }
        }
        bodies[i].update();
      }
      for (let i = 0; i < bodies.length; i++)
        bodies[i].draw();

    }, 1000/FPS);
  }
  console.log('Started interval');
});

bStop.addEventListener('click', function() {
  clearInterval(interval);
  running = false;
  console.log('Cleared interval');
});
