'use strict';
module.exports = (sequelize, DataTypes) => {
  var venue = sequelize.define('venue', {
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    area: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return venue;
};