var db = require('../models');

exports.create = function(req, res) {
  console.log('req', req.body);
  db.User.create({ username: req.param('username') }).success(function() {
    res.send();
  });
}