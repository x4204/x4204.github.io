var canvas = document.getElementById("canvas");
var ct = canvas.getContext("2d");
var width = canvas.width/3;
var height = canvas.height/3;
var division = width/10;
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;
// drag related variables
var dragok = false;
var startX;
var startY;

// each element of the <ul> (to show the coordinates of blue
// handle and red handle)
var blueX = document.getElementById("blueX");
var blueY = document.getElementById("blueY");
var redX = document.getElementById("redX");
var redY = document.getElementById("redY");
var result = document.getElementById("result");

// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

// an array of objects that define different shapes
var shapes=[];
// define 2 circles
shapes.push({// blue circle
  id: 0,
  x: width*0.25,
  y: -height*0.1,
  r: 10,
  fill: "rgba(0, 0, 255, 0.8)",
  isDragging: false
});
shapes.push({// red circle
  id: 1,
  x: width*0.25,
  y: -height,
  r: 10,
  fill: "rgba(255, 0, 0, 0.8)",
  isDragging: false
});

translate(width, height*2);
draw();


function translate(x, y) {
  ct.translate(x, y);
}

// clear background
function clear() {
  translate(-width, -height*2);
  ct.clearRect(0, 0, width*3, height*3);
  translate(width, height*2);
}

// draw background
function drawBG() {
  translate(-width, -height*2);
  for (var i=1; i<30; i++) {
    // draw the horizontal lines
    ct.beginPath();
      ct.moveTo(0, i*division);
      ct.lineWidth = 1;
      ct.lineTo(width*3, i*division);
      ct.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ct.stroke();
    ct.closePath();
    // draw the vertical lines
    ct.beginPath();
      ct.moveTo(i*division, 0);
      ct.lineWidth = 1;
      ct.lineTo(i*division, height*3);
      ct.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ct.stroke();
    ct.closePath();
  }
  // draw the inner square
  ct.beginPath();
    ct.rect(width, height, width, height)
    ct.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ct.stroke();
  ct.closePath();
  translate(width, height*2);
}

// draw circle
function circle(c) {
  ct.beginPath();
  if(c.id == 0) ct.moveTo(0, 0);
  else ct.moveTo(width, -height)
  ct.lineWidth = 2;
  ct.lineTo(c.x, c.y);
  ct.strokeStyle = 'rgba(0, 0, 0, 0.2)';
  ct.stroke();
  ct.closePath();

  ct.fillStyle = c.fill;
  ct.beginPath();
  ct.arc(c.x, c.y, c.r, 0, Math.PI*2);
  ct.lineWidth = 6;
  ct.strokeStyle = 'rgba(0, 0, 0, 0.15)';
  ct.stroke();
  ct.closePath();
  ct.fill();
}

// draw the bezier curve
function drawBezier() {
  ct.beginPath();
  ct.moveTo(0, 0);
  ct.bezierCurveTo(shapes[0].x, shapes[0].y, shapes[1].x, shapes[1].y, width, -height);
  ct.lineWidth = 4;
  ct.strokeStyle = '#7eb282';
  ct.stroke();
  ct.closePath();
}

// redraw the scene
function draw() {
  clear();
  // redraw the image background
  drawBG();
  // redraw the bezier curve
  drawBezier();
  // redraw each shape in the shapes[] array
  for(var i=0; i<shapes.length; i++) {
    // update each lever
      circle(shapes[i]);
    // update the coordinates
    updateCoords(shapes[i]);
  }
}

// show coordinates
function updateCoords(s) {
  var X = Math.floor(s.x/(division/10))/100;
  var Y = -(Math.floor(s.y/(division/10))/100);

  if (s.id == 0) {
    blueX.innerHTML = "X: " + X;
    blueY.innerHTML = "Y: " + Y;
    result.innerHTML = "cubic-bezier(" + X + ", " + Y;
  } else {
    redX.innerHTML = "X: " + X;
    redY.innerHTML = "Y: " + Y;
    result.innerHTML += ", " + X + ", " + Y + ")";
  }
}

// handle mousedown events
function myDown(e){
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  var mx = parseInt(e.clientX - offsetX - width);
  var my = -parseInt(e.clientY - offsetY - height*2);

  // test each shape to see if mouse is inside
  dragok = false;
  for (var i=0; i<shapes.length; i++){
    var s = shapes[i];
    var dx = s.x - mx;
    var dy = -(-s.y - my);

    // test if the mouse is inside this circle
    if (dx * dx + dy * dy < s.r * s.r){
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

// handle mousemove events
function myMove(e){
  // if we're dragging anything...
  if (dragok){
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX - width);
    var my = -parseInt(e.clientY - offsetY - height*2);

    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx = mx - startX;
    var dy = -(my - startY);
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
