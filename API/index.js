var v1 = require("./v1");

module.exports = {
    populationStats : function(app, BASE_PATH){ 
        v1.populationStats(app, BASE_PATH+"/v1");
    }
}