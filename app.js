
var express    = require('express');
var http       = require('http');
var path       = require('path');
var db         = require('./models');
var routes     = require('./routes');
var user       = require('./routes/user');
var ejs        = require('ejs');

// authentication dependencies
var passport          = require("passport");
var FacebookStrategy  = require('passport-facebook').Strategy;

var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', ejs.renderFile);
app.set('port', process.env.PORT || 3000);


// routes middleware
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());



// directing routes
app.get('/', routes.index);
app.post('/users/create', user.create);
// app.post('/users/:user_id/tasks/create', task.create);
// app.get('/users/:user_id/tasks/:task_id/destroy', task.destroy);



// start server
db.sequelize
  .sync({force: true})
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });
