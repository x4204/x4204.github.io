let bStop = document.querySelector(`#bStop`);
let bStart = document.querySelector(`#bStart`);
let isStart = false;
let FPS = 60;
let G = 6.67e-11;
let magnitude = 1e-6;
let lunarMass = 7.342e22;
let defDist = 384.5e7; // 100 px is equal to the distance between earth and moon
let bodies = [];

bodies.push(new Body(200, 200, 10, lunarMass));
bodies.push(new Body(400, 400, 10, lunarMass));
bodies.push(new Body(400, 200, 10, lunarMass));
bodies.push(new Body(200, 400, 10, lunarMass));

for (let i = 0; i < bodies.length; i++)
  bodies[i].draw();

function force(a, b) {
  let R = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * defDist;
  let A = (G * b.mass) / R;
  return A;
}

function det_force(a, b) {
  let fx = b.x - a.x;
  let fy = b.y - a.y;
  let f = force(a, b);
  a.accel[0] = fx * f * magnitude;
  a.accel[1] = fy * f * magnitude;
  b.accel[0] = -a.accel[0];
  b.accel[1] = -a.accel[1];
  a.velocity[0] += a.accel[0];
  a.velocity[1] += a.accel[1];
  b.velocity[0] += b.accel[0];
  b.velocity[1] += b.accel[1];
  a.x += a.velocity[0];
  a.y += a.velocity[1];
  b.x += b.velocity[0];
  b.y += b.velocity[1];
}

let interval;
bStart.addEventListener('click', function() {
  if(!isStart)
    interval = setInterval(function () {
      for (let i = 0; i < bodies.length; i++)
        for (let j = 0; j < bodies.length; j++)
          if (i != j) det_force(bodies[i], bodies[j]);
      ctx.clearRect(0, 0, 600, 600);
      for(let i = 0; i < bodies.length; i++)
        bodies[i].draw();
    }, 1000/FPS);
  isStart = true;
  console.log('Started interval');
});

bStop.addEventListener('click', function() {
  clearInterval(interval);
  isStart = false;
  console.log('Cleared interval');
});
