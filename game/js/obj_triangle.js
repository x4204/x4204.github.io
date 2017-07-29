let SIZE = 12;
let MAX_SPEED = 4;

function Triangle(originx, originy, angleoff) {
  this.x = originx;
  this.y = originy;
  this.velocity = [0, 0];
  this.speed = [0, 0];
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
}
