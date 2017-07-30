let SIZE = 12;
let MAX_SPEED = 3;
let ACC_RATE = 0.05;
let DEC_RATE = 0.03;
const R_SPEED = 0.04;  // rotation speed

function Triangle(originx, originy, angleoff) {
  this.x = originx;
  this.y = originy;
  this.velocity = [0, 0];
  this.accel = [0, 0];
  this.offset = angleoff * (Math.PI / 180);
  this.draw = function() {
    let left = [    // the left point of the triangle
      this.x - Math.cos(this.offset + Math.PI) * SIZE,
      this.y - Math.sin(this.offset + Math.PI) * SIZE
    ];
    let right = [   // the right point of the triangle
      this.x + Math.cos(this.offset + Math.PI) * SIZE,
      this.y + Math.sin(this.offset + Math.PI) * SIZE
    ];
    let top = [     // the top point of the triangle
      this.x - Math.cos(this.offset + 0.5 * Math.PI) * SIZE * 2,
      this.y - Math.sin(this.offset + 0.5 * Math.PI) * SIZE * 2
    ];
    ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#999';
      ctx.fillStyle = '#ffcc00';
      ctx.moveTo(top[0], top[1]);
      ctx.lineTo(left[0], left[1]);
      ctx.lineTo(right[0], right[1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  this.moveForwards = function () {
    this.accel[0] = Math.cos(this.offset + 0.5 * Math.PI) * ACC_RATE;
    this.accel[1] = Math.sin(this.offset + 0.5 * Math.PI) * ACC_RATE;
    if (this.velocity[0] > MAX_SPEED)
      this.velocity[0] = MAX_SPEED - 0.01;
    else if (this.velocity[0] < -MAX_SPEED)
      this.velocity[0] = -MAX_SPEED + 0.01;
    else this.velocity[0] += this.accel[0];
    if (this.velocity[1] > MAX_SPEED)
      this.velocity[1] = MAX_SPEED - 0.01;
    else if (this.velocity[1] < -MAX_SPEED)
      this.velocity[1] = -MAX_SPEED + 0.01;
    else this.velocity[1] += this.accel[1];
    this.x -= this.velocity[0];
    this.y -= this.velocity[1];
    // console.log(`${this.velocity[0].toFixed(2)} and ${this.velocity[1].toFixed(2)}`);
  }
  // no backwards for the now -->
  // this.moveBackwards = function() {
  //   this.x += Math.cos(this.offset + 0.5 * Math.PI) * ACC_RATE;
  //   this.y += Math.sin(this.offset + 0.5 * Math.PI) * ACC_RATE;
  // }
  // <-- no backwards for the moment
  this.rotateLeft = function() {
    this.offset -= R_SPEED;
  }
  this.rotateRight = function() {
    this.offset += R_SPEED;
  }
  this.decelerate = function() {
    this.velocity[0] -= this.velocity[0] * DEC_RATE;
    this.velocity[1] -= this.velocity[1] * DEC_RATE;
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
    if (this.x > WIDTH - 10) {
      this.x = WIDTH - 10;
      this.velocity[0] *= -0.5;
    }
    if (this.y < 10) {
      this.y = 10;
      this.velocity[1] *= -0.5;
    }
    if (this.y > HEIGHT - 10) {
      this.y = HEIGHT - 10;
      this.velocity[1] *= -0.5;
    }
  }
}
