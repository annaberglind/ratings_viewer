var csv = require('csvtojson');
var path = require('path');

module.exports = {
    up: (queryInterface) => {
        return csv()
            .fromFile(path.resolve(__dirname, '../../files/series.csv'))
            .then( seriesInJson => {
                seriesInJson = seriesInJson.map(serie => {
                    if (serie['field5']) {
                        console.log(serie)
                    }
                    Object.keys(serie).map(key => {
                        if (serie[key] === 'NULL') {
                            serie[key] = null;
                        }
                    });


                    serie['updatedAt'] = new Date();
                    serie['createdAt'] = new Date();
                    
                    return serie;
                });

                return queryInterface.bulkInsert('Series', seriesInJson, {});
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Series', null, {});
    }
};
