module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('City', {
    name: DataTypes.STRING
  }, {
    associate: function(models) {
      City.hasMany(models.Tweet);
    }
  });

  return City;
};
