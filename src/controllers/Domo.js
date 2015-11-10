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

function sizeToWeight(size) {
  if (size === 'small') {
    return 1;
  }
  else if (size === 'medium') {
    return 13;
  }
  else if (size === 'large') {
    return 20;
  }
}

function makeDomo(req, res) {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({error: 'RAWR! Both name and age are required.'});
  }

  var domoData = {
    name: req.body.name,
    age: req.body.age,
    weight: sizeToWeight(req.body.size),
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

function farmPage(req, res) {
  Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({error: 'An error occurred.'});
    }

    var domos = [];
    docs.forEach(function (doc, index) {
      domos[index] = JSON.stringify(doc.toObject());
    });

    res.render('farm', {domos: domos, account: req.session.account.name});
  });
}

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.farmPage = farmPage;
