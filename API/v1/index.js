var populationStats = require("./population-stats/populationStats.js");

module.exports = {
    populationStats : function(app, BASE_PATH){
        populationStats(app, BASE_PATH);
    }
}