function Body(x, y, radius, mass)
{
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.mass = mass;
  this.velocity = [0, 0];
  this.accel = [0, 0];
  this.draw = function() {
    drawCircle(this.x, this.y, this.radius, 0, 2 * Math.PI)
  }
}
