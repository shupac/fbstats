var db = require('../models');

exports.create = function(req, res) {
  console.log('req', req.body);
  db.FbUser.create({ fbId: req.param('fbId') }).success(function() {
    res.send();
  });
}