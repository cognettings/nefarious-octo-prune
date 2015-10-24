var _ = require('underscore'); // <- This is an amazing looking library!
var models = require('../models');

function makerPage(req, res) {
  res.render('app');
};

module.exports.makerPage = makerPage;
