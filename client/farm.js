var vec = Victor;

window.onload = init;

var canvas;
var ctx;

var width;
var height;

var domos = [{}, {}, {}, {}, {}];

function init() {
  canvas = document.querySelector('#farmCanvas');
  ctx = canvas.getContext('2d');
  
  width = canvas.width;
  height = canvas.height;

  ctx.fillStyle = 'rgb(0, 150, 0)';
  ctx.fillRect(0, 0, width, height);

  createDomos();
  setInterval(main, 100);
}

function createDomos() {
  function create(domo) {
    domo.pos = vec(width / 2, height / 2);
    domo.dest = null;
    domo.speed = vec(5, 5);
    domo.dim = vec(10, 10);
  }

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
  
    ctx.fillRect(domo.pos.x - domo.dim.x / 2, domo.pos.y + domo.dim.y / 2, domo.dim.x, domo.dim.y);
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

  console.log('random vec: ' + vec(x, y));
  return vec(x, y);
}

function seekDestination(object) {
  var direction = object.dest.clone().subtract(object.pos).norm();
  var velocity = direction.multiply(object.speed);

  object.pos.add(velocity);
}

function arrivedAtDestination(object) {
  var distance = object.pos.distance(object.dest);

  return distance <= object.speed.x;
}

function main() {
  update();
  display();
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

