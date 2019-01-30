'use strict';
module.exports = (sequelize, DataTypes) => {
  const Series = sequelize.define('Series', {
    title: DataTypes.STRING,
    startYear: DataTypes.INTEGER,
    endYear: DataTypes.INTEGER
  }, {});
  Series.associate = function(models) {
    Series.hasMany(models.Episodes, {
      foreignKey: 'seriesId',
      as: 'episodes'
    })
  };

  return Series;
};