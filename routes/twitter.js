var db      = require('../models');
var Twitter = require('twitter');
var twitter = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.query = function(req, res) {
  var term = req.param('term');
  var geocode = req.param('geocode');
  console.log('query term:', term);
  console.log('geocode:', geocode);

  twitter.search(term, {lang: 'en', count: 20, geocode: geocode}, function (data) {
    for (var i = 0; i < data.statuses.length; i++) {
      var tweet_id = data.statuses[i].id.toString();
      var username = data.statuses[i].user.screen_name;
      var text = data.statuses[i].text;
      var created = data.statuses[i].created_at;
      // console.log(data.statuses[i]);
      console.log(tweet_id, username, text, created);
    }
    res.send();
  });
}