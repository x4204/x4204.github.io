let SIZE = 12;          // triangle size
let MAX_SPEED = 2;      // maximum player speed (default 2)
let ACC_RATE = 0.05;    // acceleration rate (default 0.05)
let DEC_RATE = 0.03;    // deceleration rate (default 0.03)
const R_SPEED = 0.04;   // rotation speed (default 0.04)
const MASS = 1;         // triangle mass (default 1)
// -----------------------------------------------------------------------------

function Triangle(originx, originy, angleoff) {
  this.x = originx;
  this.y = originy;
  this.velocity = [0, 0];
  this.accel = [0, 0];
  this.offset = angleoff * (Math.PI / 180);
  let left = [];
  let right = [];
  let top = [];
  this.draw = function() {
    left = [    // the left point of the triangle
      this.x - Math.cos(this.offset + Math.PI) * SIZE,
      this.y - Math.sin(this.offset + Math.PI) * SIZE
    ];
    right = [   // the right point of the triangle
      this.x + Math.cos(this.offset + Math.PI) * SIZE,
      this.y + Math.sin(this.offset + Math.PI) * SIZE
    ];
    top = [     // the top point of the triangle
      this.x - Math.cos(this.offset + 0.5 * Math.PI) * SIZE * 2,
      this.y - Math.sin(this.offset + 0.5 * Math.PI) * SIZE * 2
    ];
    ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#888';
      ctx.fillStyle = '#ffcc00';//`rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
      ctx.moveTo(top[0], top[1]);
      ctx.lineTo(left[0], left[1]);
      ctx.lineTo(right[0], right[1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  this.moveForwards = function () {
    this.accel[0] = (Math.sin(this.offset + Math.PI) * ACC_RATE) / MASS;
    this.accel[1] = (Math.cos(this.offset + Math.PI) * ACC_RATE) / MASS;
    if (this.velocity[0] > MAX_SPEED)
      this.velocity[0] = MAX_SPEED - 0.01;
    else if (this.velocity[0] < -MAX_SPEED)
      this.velocity[0] = -MAX_SPEED + 0.01;
    else this.velocity[0] += this.accel[0];
    if (this.velocity[1] > MAX_SPEED)
      this.velocity[1] = MAX_SPEED - 0.01;
    else if (this.velocity[1] < -MAX_SPEED)
      this.velocity[1] = -MAX_SPEED + 0.01;
    else this.velocity[1] -= this.accel[1];
    this.x -= this.velocity[0];
    this.y -= this.velocity[1];
  }
  this.moveBackwards = function() {
    this.accel[0] = (Math.sin(this.offset - Math.PI) * ACC_RATE) / MASS;
    this.accel[1] = (Math.cos(this.offset - Math.PI) * ACC_RATE) / MASS;
    if (this.velocity[0] > MAX_SPEED)
      this.velocity[0] = MAX_SPEED - 0.01;
    else if (this.velocity[0] < -MAX_SPEED)
      this.velocity[0] = -MAX_SPEED + 0.01;
    else this.velocity[0] -= this.accel[0];
    if (this.velocity[1] > MAX_SPEED)
      this.velocity[1] = MAX_SPEED - 0.01;
    else if (this.velocity[1] < -MAX_SPEED)
      this.velocity[1] = -MAX_SPEED + 0.01;
    else this.velocity[1] += this.accel[1];
    this.x -= this.velocity[0];
    this.y -= this.velocity[1];
  }
  this.rotateLeft = function() {
    this.offset -= R_SPEED;
  }
  this.rotateRight = function() {
    this.offset += R_SPEED;
  }
  this.decelerate = function() {
    this.velocity[0] -= this.velocity[0] * DEC_RATE / MASS;
    this.velocity[1] -= this.velocity[1] * DEC_RATE / MASS;
    this.x -= this.velocity[0];
    this.y -= this.velocity[1];
    // console.log(`${this.velocity[0].toFixed(2)} and ${this.velocity[1].toFixed(2)}`);
  }
  this.keepOnTheMap = function() {
    // variant to keep on the map by teleporting to the opposite point of the map
    // if (this.x < 0)      this.x = WIDTH;
    // if (this.x > WIDTH)  this.x = 0;
    // if (this.y < 0)      this.y = HEIGHT;
    // if (this.y > HEIGHT) this.y = 0;

    // variant to keep on the map by stopping/bouncing off the wall
    if (this.x < 10) {
      this.x = 10;
      this.velocity[0] *= -0.5;
    }
    if (this.x > Game.canvas.width - 10) {
      this.x = Game.canvas.width - 10;
      this.velocity[0] *= -0.5;
    }
    if (this.y < 10) {
      this.y = 10;
      this.velocity[1] *= -0.5;
    }
    if (this.y > Game.canvas.height - 10) {
      this.y = Game.canvas.height - 10;
      this.velocity[1] *= -0.5;
    }
  }
  this.collides = function(obj) {
    let c1x = obj.x - left[0];
    let c1y = obj.y - left[1];
    let radiusSqr = obj.r * obj.r;
    let c1sqr = c1x*c1x + c1y*c1y - radiusSqr;
    if (c1sqr <= 0)
      return true;
    let c2x = obj.x - right[0];
    let c2y = obj.y - right[1];
    let c2sqr = c2x*c2x + c2y*c2y - radiusSqr;
    if (c2sqr <= 0)
      return true;
    let c3x = obj.x - top[0];
    let c3y = obj.y - top[1];
    let c3sqr = c3x*c3x + c3y*c3y - radiusSqr;
    if (c3sqr <= 0)
      return true;
    // test 2
    let e1x = right[0] - left[0];
    let e1y = right[1] - left[1];
    let e2x = top[0] - right[0];
    let e2y = top[1] - right[1];
    let e3x = left[0] - top[0];
    let e3y = left[1] - top[1];
    if ((e1y*c1x - e1x*c1y) >= 0
      && (e2y*c2x - e2x*c2y) >= 0
      && (e3y*c3x - e3x*c3y) >= 0)
      return true;
    // test 3
    let k = c1x*e1x + c1y*e1y;
    if (k > 0) {
      let len = e1x*e1x + e1y*e1y;
      if (k < len) {
        if (c1sqr * len <= k*k)
          return true;
      }
    }
    k = c2x*e2x + c2y*e2y;
    if (k > 0) {
      let len = e2x*e2x + e2y*e2y;
      if (k < len) {
        if (c2sqr * len <= k*k)
          return true;
      }
    }
    k = c3x*e3x + c3y*e3y;
    if (k > 0) {
      let len = e3x*e3x + e3y*e3y;
      if (k < len) {
        if (c3sqr * len <= k*k)
          return true;
      }
    }
    return false;
  }
}
