var csv = require('csvtojson');
var path = require('path');

module.exports = {
  up: (queryInterface) => {
    return csv()
      .fromFile(path.resolve(__dirname, '../../files/episodes.csv'))
      .then( episodesInJson => {
        episodesInJson = episodesInJson.map(episode => {
          Object.keys(episode).map(key => {
            if (episode[key] === 'NULL' || episode[key] === 'null') {
              episode[key] = null;
            }
          });


          episode['updatedAt'] = new Date();
          episode['createdAt'] = new Date();
          
          if (episode['seasonNumber'] && episode['episodeNumber']) {
            return episode;
          }
        });

        return queryInterface.bulkInsert('Episodes', episodesInJson, {});
      });
  }
};
