function Vector2D(x, y) {
  this.x = x;
  this.y = y;

  this.addVector2D = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  this.multiply = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
  this.distanceTo = function(vector) {
    let d1 = Math.pow(this.x - vector.x, 2);
    let d2 = Math.pow(this.y - vector.y, 2);
    return Math.sqrt(d1 + d2);
  }
}
