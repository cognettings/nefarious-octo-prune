var Domo = require('../models/Domo.js');

function init(socket) {
  socket.on('update weight', function (data) {
    Domo.DomoModel.updateWeight(data.id, data.weight, function(err, raw) {
      if (err) {
        console.log('error updating weight: ' + err);
      }
    });
  });
}

module.exports = init;
