var db = require('../models')
// var html = require('html');

exports.index = function(req, res){
  db.FbUser.findAll().success(function(users) {
    users.forEach(function(user) {
      // console.log(user.username);
    });
    res.render('../public/html/main.html');
  })
};
