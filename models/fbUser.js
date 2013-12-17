module.exports = function(sequelize, DataTypes) {
  var FbUser = sequelize.define('FbUser', {
    fbId: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING
  // }, {
  //   associate: function(models) {
  //     User.hasMany(models.Task);
  //   }
  });

  return FbUser;
}
