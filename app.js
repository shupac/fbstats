var express    = require('express');
var http       = require('http');
var path       = require('path');
var db         = require('./models');
var respond    = require('./server/respond');
var twitter    = require('./server/twitter');
var ejs        = require('ejs');

var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', ejs.renderFile);
app.set('port', process.env.PORT || 3000);

// directing routes
app.get('/tweets', respond);

// start server
db.sequelize
  .sync({force: false})
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      // twitter.initialize();
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });

