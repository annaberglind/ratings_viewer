export default (sequelize, DataTypes) => {
  const Episodes = sequelize.define('Episodes', {
    seasonNumber: DataTypes.INTEGER,
    episodeNumber: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    numVotes: DataTypes.INTEGER
  }, {});
  Episodes.associate = function(models) {
    Episodes.belongsTo(models.Series, {
      foreignKey: 'seriesId',
      onDelete: 'CASCADE'
    });
  };
  return Episodes;
};
