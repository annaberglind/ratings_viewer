export default (sequelize, DataTypes) => {
  const Series = sequelize.define('Series', {
    title: DataTypes.STRING,
    startYear: DataTypes.INTEGER,
    endYear: DataTypes.INTEGER,
  }, {
    // default values for dates => current time
    myDate: { type: sequelize.DATE, defaultValue: sequelize.NOW },
  });
  Series.associate = function(models) {
    Series.hasMany(models.Episodes, {
      foreignKey: 'seriesId',
      as: 'episodes'
    });
  };

  return Series;
};