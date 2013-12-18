module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    associate: function(models) {
      City.hasMany(models.Tweet);
    }
  });

  return City;
};
