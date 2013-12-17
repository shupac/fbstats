var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define('Tweet', {
    tweet_id: {
      type: Sequelize.BIGINT,
      primaryKey: true
    },
    city_id: Sequelize.TEXT,
    username: Sequelize.TEXT,
    text: Sequelize.TEXT,
    created: Sequelize.TEXT
  }, {
    associate: function(models) {
      Tweet.belongsTo(models.City)
    }
  });

  return Tweet;
};
