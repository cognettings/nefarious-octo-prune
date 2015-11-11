var farmData = require('./farm.js');

function init(io) {
  io.on('connection', function(socket) {
    farmData(socket);
  });
}

module.exports = init;
