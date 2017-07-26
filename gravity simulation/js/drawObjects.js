let canvas = document.querySelector(`#canvas`);
let ctx = canvas.getContext('2d');

function drawCircle(x, y, radius, start, end)
{
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#67f';
  ctx.arc(x, y, radius, start, end);
  ctx.stroke();
}
