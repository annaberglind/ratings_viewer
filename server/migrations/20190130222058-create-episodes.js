module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Episodes', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seriesId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Series',
          key: 'id',
          as: 'seriesId',
        },
      },
      seasonNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      episodeNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      numVotes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Episodes');
  }
};
