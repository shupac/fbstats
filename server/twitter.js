var db      = require('../models');
var Twitter = require('twitter');

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.query = function(term, geocode, city, callback) {
  // var term = req.param('term');
  // var geocode = req.param('geocode');
  console.log('query term:', term);
  console.log('geocode:', geocode);

  twitter.search(term, {lang: 'en', count: 3, geocode: geocode}, function (data) {
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

exports.scrape = function() {
  var radius = '1mi'
  var term = 'shopping';
  var geocodes = {
    sf: '37.779159,-122.416363,' + radius,
    chi: '41.891659,-87.624056,' + radius,
    ny: '40.738973,-73.989530,' + radius
  };

  var storeTweet = function(tweet_id, username, text, created, city) {
    console.log(tweet_id, username, text, created, city);
  };

  var scrape = function() {
    for(var key in geocodes) {
      exports.query(term, geocodes[key], key, storeTweet);
    }    
  };

  scrape();
  // setInterval(scrape, 5000);
};

