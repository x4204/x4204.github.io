function Body(x, y, radius, mass)
{
  this.radius   = radius;
  this.mass     = mass;
  this.position = new Vector2D(x, y);
  this.velocity = new Vector2D(0, 0);
  this.accel    = new Vector2D(0, 0);
  this.draw = function() {
    drawCircle(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
  };
  this.update = function() {
    this.velocity.addVector2D(this.accel);
    this.position.addVector2D(this.velocity);
    this.accel.multiply(0);
  }
  this.applyForce = function( obj2) {
    let f = force(this, obj2);
    let fx = obj2.position.x - this.position.x;
    let fy = obj2.position.y - this.position.y;
    let force2D = new Vector2D(fx, fy);
    force2D.multiply(f);
    this.accel.addVector2D(force2D);
  }
}
