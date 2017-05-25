// get canvas related references
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;
var WIDTH = canvas.width;
var HEIGHT = WIDTH;
var division = WIDTH/10;

// drag related variables
var dragok = false;
var startX;
var startY;

// an array of objects that define different shapes
var shapes=[];
// define 2 circles
shapes.push({// blue circle
  id: 0,
  x: WIDTH*0.25,
  y: HEIGHT*0.9,
  r: 10,
  fill: "rgba(0, 0, 255, 0.8)",
  isDragging: false
});
shapes.push({// red circle
  id: 1,
  x: WIDTH*0.25,
  y: 0,
  r: 10,
  fill: "rgba(255, 0, 0, 0.8)",
  isDragging: false
});

// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

// call to draw the scene
drawBG();
draw();

// draw a single circle
function circle(c) {
  ctx.beginPath();
  if(c.id == 0) ctx.moveTo(0, HEIGHT);
  else ctx.moveTo(WIDTH, 0)
  ctx.lineWidth = 2;
  ctx.lineTo(c.x, c.y);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = c.fill;
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
  ctx.closePath();
  ctx.fill();
}

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// redraw the scene
function draw() {
  clear();
  // redraw the image background
  drawBG();
  // redraw the bezier curve
  drawBezier();
  // redraw each shape in the shapes[] array
  for(var i=0; i<shapes.length; i++)
      circle(shapes[i]);
}

// draw the bezier curve
function drawBezier() {
  ctx.beginPath();
  ctx.moveTo(0, HEIGHT);
  ctx.bezierCurveTo(shapes[0].x, shapes[0].y, shapes[1].x, shapes[1].y, WIDTH, 0);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#7eb282';
  ctx.stroke();
  ctx.closePath();
}

// draw idivisions
function drawBG() {
  for (var i=1; i<=10; i++) {
    // draw horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i*division);
    ctx.lineWidth = 1;
    ctx.lineTo(WIDTH, i*division);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.stroke();
    ctx.closePath();
    // draw vertical lines
    ctx.beginPath();
    ctx.moveTo(i*division, 0);
    ctx.lineWidth = 1;
    ctx.lineTo(i*division, WIDTH);
    ctx.strokeStyle = '#eee';
    ctx.stroke();
    ctx.closePath();
  }
}

// handle mousedown events
function myDown(e){

  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  var mx = parseInt(e.clientX - offsetX);
  var my = parseInt(e.clientY - offsetY);

  // test each shape to see if mouse is inside
  dragok=false;
  for (var i=0; i<shapes.length; i++){
    var s = shapes[i];
    var dx = s.x - mx;
    var dy = s.y - my;
    // test if the mouse is inside this circle
    if ( dx * dx + dy * dy < s.r * s.r){
      dragok = true;
      s.isDragging = true;
    }
  }
  // save the current mouse position
  startX = mx;
  startY = my;
}

// handle mouseup events
function myUp(e){
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  dragok = false;
  for (var i=0; i<shapes.length; i++) {
    shapes[i].isDragging = false;
  }
}

// handle mouse moves
function myMove(e){
  // if we're dragging anything...
  if (dragok){

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx = mx-startX;
    var dy = my-startY;

    // move each rect that isDragging
    // by the distance the mouse has moved
    // since the last mousemove
    for (var i=0; i<shapes.length; i++) {
      var s = shapes[i];
      if (s.isDragging) {
        s.x += dx;
        s.y += dy;
      }
    }

    // redraw the scene with the new rect positions
    draw();

    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;

  }
}
