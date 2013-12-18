var db      = require('../models');
var Twitter = require('twitter');

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.query = function(term, geocode, city, callback) {
  console.log('query term:', term);
  console.log('geocode:', geocode);

  twitter.search(term, {lang: 'en', count: 20, geocode: geocode}, function (data) {
    if(data.statuses) {
      for (var i = 0; i < data.statuses.length; i++) {
        var tweet_id = data.statuses[i].id.toString();
        var username = data.statuses[i].user.screen_name;
        var text = data.statuses[i].text;
        var created = data.statuses[i].created_at;

        callback.call(this, tweet_id, username, text, created, city);
      }
      res.send();
    }
  });
};

var opts = {
  radius: '3mi',
  term: 'shopping'
};

opts.geocodes = {
  SF: '37.779159,-122.416363,' + opts.radius,
  CHI: '41.891659,-87.624056,' + opts.radius,
  NYC: '40.738973,-73.989530,' + opts.radius
};

var storeTweet = function(tweet_id, username, text, created, city) {
  console.log(tweet_id, username, text, created, city, '\n');

  var tweet = db.Tweet.build({
    tweet_id: tweet_id,
    username: username,
    text: text,
    created: created
  });

  tweet.save().success(function(tweet) {
    db.City.find({ where: {name: city}}).success(function(city) {
      console.log(city.name, city.id);
      tweet.setCity(city);
    });
  }).error(function() {
    // console.log('save tweet error');
  });
};

var scrape = function() {
  for(var key in opts.geocodes) {
    exports.query(opts.term, opts.geocodes[key], key, storeTweet);
  }    
};

exports.initialize = function() {
  db.City.findAll().success(function(cities) {
    if(cities.length) {
      scrape();
      setInterval(scrape, 15000);
    } else {
      db.City.bulkCreate([
        { name: 'SF' },
        { name: 'CHI' },
        { name: 'NYC' }
      ]).success(function() {
        scrape();
        setInterval(scrape, 15000);
      });
    }
  });
};