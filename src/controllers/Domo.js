var _ = require('underscore'); // <- This is an amazing looking library!
var models = require('../models');

var Domo = models.Domo;

function makerPage(req, res) {
  Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({error: 'An error occurred.'});
    }

    res.render('app', {domos: docs, csrfToken: req.csrfToken()});
  });
};

function makeDomo(req, res) {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({error: 'RAWR! Both name and age are required.'});
  }

  var domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id
  };

  var newDomo = new Domo.DomoModel(domoData);

  newDomo.save(function(err) {
    if (err) {
      return res.status(400).json({error: 'An error occurred.'});
    }

    return res.json({redirect: '/maker'});
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
