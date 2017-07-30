let SIZE = 12;
let MAX_SPEED = 2;
let ACC_RATE = 0.05;
let DEC_RATE = 0.03;
const R_SPEED = 0.04;  // rotation speed

function Triangle(originx, originy, angleoff) {
  this.x = originx;
  this.y = originy;
  this.velocity = [0, 0];
  this.accel = [0, 0];
  this.offset = angleoff * (Math.PI / 180);
  let left;
  let right;
  let top;
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
  // dont know why if i use ACC_RATE the velocity backwards is a little bigger
  // than when moving forwards
  // this.moveBackwards = function() {
  //   this.accel[0] = Math.cos(this.offset - 0.5 * Math.PI) * DEC_RATE;
  //   this.accel[1] = Math.sin(this.offset - 0.5 * Math.PI) * DEC_RATE;
  //   if (this.velocity[0] > MAX_SPEED)
  //     this.velocity[0] = MAX_SPEED - 0.01;
  //   else if (this.velocity[0] < -MAX_SPEED)
  //     this.velocity[0] = -MAX_SPEED + 0.01;
  //   else this.velocity[0] += this.accel[0];
  //   if (this.velocity[1] > MAX_SPEED)
  //     this.velocity[1] = MAX_SPEED - 0.01;
  //   else if (this.velocity[1] < -MAX_SPEED)
  //     this.velocity[1] = -MAX_SPEED + 0.01;
  //   else this.velocity[1] += this.accel[1];
  //   this.x -= this.velocity[0];
  //   this.y -= this.velocity[1];
  //   // console.log(`${this.velocity[0].toFixed(2)} and ${this.velocity[1].toFixed(2)}`);
  // }
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
  this.collides = function(obj) {
    let a = pointToSegment(obj, top, left) - obj.r;
    let b = pointToSegment(obj, top, right) - obj.r;
    let c = pointToSegment(obj, right, left) - obj.r;
    if (a < 1 || b < 1 || c < 1) return true;
    else return false;
  }

  let pointToSegment = function(p, l1, l2) {
    let A = p.x - l1[0];
    let B = p.y - l1[1];
    let C = l2[0] - l1[0];
    let D = l2[1] - l1[1];

    let dot = A*C + B*D;
    let len_sq = C*C + D*D;
    let param = -1;
    if (len_sq != 0) param = dot;

    let xx, yy;

    if (param < 0) {
      xx = l1[0];
      yy = l1[1];
    }
    else if (param > 1) {
      xx = l2[0];
      yy = l2[1];
    }
    else {
      xx = l1[0] + param * C;
      yy = l1[1] + param * D;
    }

    let dx = p.x - xx;
    let dy = p.y - yy;
    return Math.sqrt(dx*dx + dy*dy);
  }
}
