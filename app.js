
var express    = require('express');
var http       = require('http');
var path       = require('path');
var db         = require('./models');
var twitter    = require('./server/twitter');
var ejs        = require('ejs');

var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', ejs.renderFile);
app.set('port', process.env.PORT || 3000);


// directing routes
app.get('/tweets', function(req, res) {
  var response = {
    SF: null,
    CHI: null,
    NYC: null
  };

  for(var i = 1; i <= 3; i++) {
    (function(i) {
      db.Tweet.findAll({where: {CityId: i}, include: [db.City]}).success(function(tweets) {
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
});


// start server
db.sequelize
  .sync({force: false})
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      twitter.initialize();
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });

