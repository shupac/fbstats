module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING
  // }, {
  //   associate: function(models) {
  //     User.hasMany(models.Task);
  //   }
  });
  console.log('************** User table created');

  return User;
}
