
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var populationStats;

client.connect(err => {
  populationStats = client.db("mangalper").collection("populationStats");
  // perform actions on the collection object
});

module.exports = function(app, BASE_PATH){
    var path = "";
    var newPopulationStats = [{
        country: "Spain",
        year: 2018,
        rate: 14.4,
        youthUnemployment: 33.4,
        maleUnemployment: 12.7,
        femaleUnemployment: 16.2
        },
        {
        country: "Germany",
        year: 2018,
        rate: 3.3,
        youthUnemployment: 15.6,
        maleUnemployment: 3.6,
        femaleUnemployment: 3.9
        },
        {
        country: "France",
        year: 2018,
        rate: 8.9,
        youthUnemployment: 20.3,
        maleUnemployment: 8.8,
        femaleUnemployment: 9
        },
        {
        country: "United States",
        year: 2018,
        rate: 3.9,
        youthUnemployment: 8.7,
        maleUnemployment: 3.9,
        femaleUnemployment: 3.8
        },
        {
        country: "United Kingdom",
        year: 2018,
        rate: 4.0,
        youthUnemployment: 11.8,
        maleUnemployment: 4.1,
        femaleUnemployment: 3.9
        },
        {
        country: "Spain",
        year: 2017,
        rate: 16.5,
        youthUnemployment: 37.1,
        maleUnemployment: 15,
        femaleUnemployment: 18.3
        },
        {
        country: "Germany",
        year: 2017,
        rate: 3.6,
        youthUnemployment: 6.5,
        maleUnemployment: 3.9,
        femaleUnemployment: 3.1
        },
        {
        country: "France",
        year: 2017,
        rate: 9.1,
        youthUnemployment: 21.6,
        maleUnemployment: 9.1,
        femaleUnemployment: 9
        },
        {
        country: "United States",
        year: 2017,
        rate: 4.1,
        youthUnemployment: 8.9,
        maleUnemployment: 4.1,
        femaleUnemployment: 4.0
        },
        {
        country: "United Kingdom",
        year: 2017,
        rate: 4.4,
        youthUnemployment: 12.5,
        maleUnemployment: 4.4,
        femaleUnemployment: 4.4
        },
        {
        country: "Spain",
        year: 2016,
        rate: 18.5,
        youthUnemployment: 42.3,
        maleUnemployment: 17.1,
        femaleUnemployment: 20.2
        },
        {
        country: "Germany",
        year: 2016,
        rate: 3.9,
        youthUnemployment: 6.7,
        maleUnemployment: 4.3,
        femaleUnemployment: 3.4
        },
        {
        country: "France",
        year: 2016,
        rate: 9.9,
        youthUnemployment: 23.2,
        maleUnemployment: 10.0,
        femaleUnemployment: 9.8
        },
        {
        country: "United States",
        year: 2016,
        rate: 4.7,
        youthUnemployment: 9.8,
        maleUnemployment: 4.8,
        femaleUnemployment: 4.6
        },
        {
        country: "United Kingdom",
        year: 2016,
        rate: 4.8,
        youthUnemployment: 12.6,
        maleUnemployment: 4.9,
        femaleUnemployment: 4.6
        }
        
        
  ];
  
 // API RES
 
 // GET /population-stats/docs/
    path = BASE_PATH + "/population-stats/docs";
    app.get(path, (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/6914720/SVYqQfLL");
    });
    
    
    //LOAD INITIAL DATA de GET /population-stats
    path = BASE_PATH + "/upopulation-stats/loadInitialData";
    app.get(path, (req,res)=>{
        populationStats.find({}).toArray((error, populationStatsArray)=>{
            if(populationStatsArray.length!=0){
                res.sendStatus(409);
            } else {
                newPopulationStats.filter((d) =>{
                    populationStats.insert(d);
                });
                res.sendStatus(201);
            }
        });
    });
    
};