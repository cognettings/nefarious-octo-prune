var vec = Victor;

window.onload = init;

var canvas;
var ctx;

var width;
var height;

// domos comes from jade page
var domoSpeed = vec(1, 1);
var domoDim = vec(20, 20);
var domoStartPos;
var domoWobbleDegrees = 5 * Math.PI / 180;
var thetaInc = 0.01;
var thetaScale = 25;

function init() {
  canvas = document.querySelector('#farmCanvas');
  ctx = canvas.getContext('2d');
  
  width = canvas.width;
  height = canvas.height;
  domoStartPos = vec(width / 2, height / 2);

  ctx.fillStyle = 'rgb(0, 150, 0)';
  ctx.fillRect(0, 0, width, height);

  createDomos();
  window.requestAnimationFrame(main);
}

function createDomos() {
  function create(domo) {
    domo.pos = domoStartPos.clone();
    domo.dest = null;
    domo.speed = domoSpeed.clone();
    domo.dim = domoDim;
    domo.drawRotation = null;
    domo.theta = Math.random() * 2 * Math.PI;
  }

  // Domos come from jade
  domos.forEach(create);
}

function drawDomos() {
  ctx.fillStyle = 'rgb(0, 0, 150)';

  function draw(domo) {
    /*
    // display progress towards waypoint
    if (player.dest) {
      console.log('Pos: ' + player.pos + ' | Dest: ' + player.dest + ' | distance: ' +
                  player.pos.distance(player.dest));
    }
    else {
      console.log('Reached destination!');
    }
    */
  
    ctx.save();
    ctx.translate(domo.pos.x, domo.pos.y);
    ctx.rotate(domo.drawRotation);
    ctx.fillRect(-1 * domo.dim.x / 2, -1 * domo.dim.y, domo.dim.x, domo.dim.y);
    ctx.restore();
  }

  domos.forEach(draw);
}

function drawBackground() {
  ctx.fillStyle = 'rgb(0, 150, 0)';
  ctx.fillRect(0, 0, width, height);
}

function randomVec(maxX, maxY) {
  var x = Math.floor(Math.random() * maxX) + 1;
  var y = Math.floor(Math.random() * maxY) + 1;

  return vec(x, y);
}

function seekDestination(object) {
  var direction = object.dest.clone().subtract(object.pos).norm();
  var velocity = direction.multiply(object.speed);

  object.pos.add(velocity);
}

function arrivedAtDestination(object) {
  if (object.dest) {
    var distance = object.pos.distance(object.dest);
  }
  else {
    return false;
  }

  return distance <= object.speed.x;
}

function main() {
  update();
  display();
  window.requestAnimationFrame(main);
}

function updateDomos() {
  function update(domo) {
    // move towards waypoint
    if (!domo.dest) {
      domo.dest = randomVec(width, height);
    }

    seekDestination(domo);

    if (arrivedAtDestination(domo)) {
      domo.dest = null;
    }

    domo.theta += thetaInc;
    domo.drawRotation = domoWobbleDegrees * Math.sin(thetaScale * domo.theta);
  }

  domos.forEach(update);
}

function update() {
  updateDomos();
}

function display() {
  drawBackground();
  drawDomos();
}

