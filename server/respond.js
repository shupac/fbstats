var http = require('http');
var db = require('../models');

module.exports = function(req, res) {
  var response = {
    SF: null,
    CHI: null,
    NYC: null
  };

  for(var i = 1; i <= 3; i++) {
    (function(i) {
      db.Tweet.findAll({where: {CityId: i}}).success(function(tweets) {
        db.City.find({where: {id: i}}).success(function(city) {
          console.log(i);
          response[city.name] = tweets;
          checkComplete();
        });
      });
    })(i);
  }

  function checkComplete() {
    for(var key in response) {
      if(!response[key]) return;
    }
    res.send(response);
  };
};