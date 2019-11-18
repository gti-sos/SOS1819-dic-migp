var populationStats = require("./population-stats/populationStats.js");

module.exports = {
    populationStats : function(app, BASE_PATH){
        unemploymentRates(app, BASE_PATH);
    }
}