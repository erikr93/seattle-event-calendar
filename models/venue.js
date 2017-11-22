'use strict';
module.exports = (sequelize, DataTypes) => {
  var venue = sequelize.define('venue', {
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    area: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.venue.belongsTo(models.user);
      }
    }
  });
  return venue;
};
