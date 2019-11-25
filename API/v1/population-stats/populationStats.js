
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
        population: 46934632,
        density: 93,
        natality: 7.86,
        mortality: 9.07
        },
        {
        country: "Germany",
        year: 2018,
        population: 83019214,
        density: 232,
        natality: 9.5,
        mortality: 11.5 
        },
        {
        country: "France",
        year: 2018,
        population: 67028048,
        density: 122,
        natality: 11.3,
        mortality: 9.2
        },
        {
        country: "United States",
        year: 2018,
        population: 327352000,
        density: 33,
        natality: 11.6,
        mortality: 8.52
        },
        {
        country: "United Kingdom",
        year: 2018,
        population: 66647112,
        density: 274,
        natality: 11,
        mortality: 9.3
        },
        {
        country: "Spain",
        year: 2017,
        population: 46658447,
        density: 92,
        natality: 8.41,
        mortality: 9.07
        },
        {
        country: "Germany",
        year: 2017,
        population: 82792351,
        density: 232,
        natality: 9.5,
        mortality: 11.3
        },
        {
        country: "France",
        year: 2017,
        population: 66926166,
        density: 122,
        natality: 11.5,
        mortality: 9.1
        },
        {
        country: "United States",
        year: 2017,
        population: 325326000,
        density: 33,
        natality: 11.8,
        mortality: 8.5
        },
        {
        country: "United Kingdom",
        year: 2017,
        population: 66273576,
        density: 272,
        natality: 11.4,
        mortality: 9.2
        },
        {
        country: "Spain",
        year: 2016,
        population: 46527039,
        density: 92,
        natality: 8.8,
        mortality: 8.79
        },
        {
        country: "Germany",
        year: 2016,
        population: 82521653,
        density: 231,
        natality: 9.6,
        mortality: 11.1
        },
        {
        country: "France",
        year: 2016,
        population: 66804121,
        density: 122,
        natality: 11.8,
        mortality: 8.9
        },
        {
        country: "United States",
        year: 2016,
        population: 323127513,
        density: 33,
        natality: 12.2,
        mortality: 8.49
        },
        {
        country: "United Kingdom",
        year: 2016,
        population: 65844142,
        density: 270,
        natality: 11.8,
        mortality: 9.1
        }
        
        
  ];
  
 // API RES
 
 // GET /population-stats/docs/
    path = BASE_PATH + "/population-stats/docs";
    app.get(path, (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/6914720/SW7c3TRV");
    });
    
    
    //LOAD INITIAL DATA de GET /population-stats
    path = BASE_PATH + "/population-stats/loadInitialData";
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
    
    // GET /population-stats
    path = BASE_PATH + "/population-stats"; 
    app.get(path, (req,res)=>{
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        if(from && to) {
            populationStats.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).toArray((err, populationStatsArray)=>{
                if(populationStatsArray.length == 0) {
                    console.log("No se ha encontrado")
                    res.sendStatus(404);
                } else { 
                    res.send(populationStatsArray.map((p)=>{
                        delete p._id;
                        return p;
                    }));
                }    

            
        });
        } else {
            populationStats.find({}).skip(offset).limit(limit).toArray((err, populationStatsArray)=>{
                    res.send(populationStatsArray.map((p)=>{
                        delete p._id;
                        return p;
                    }));
                    
            });
        }
        
    });
    
    // GET /population-stats/Spain
    path = BASE_PATH + "/population-stats/:country";
    app.get(path, (req, res) => {
        var country = req.params.country;
        populationStats.find({"country": country}).toArray((err, populationStatsArray) => {
            res.send(populationStatsArray.map((c) => {
                return c;
            }))
        })
    })
    
     // GET /population-stats/Spain/2018
    path = BASE_PATH + "/population-stats/:country/:year";
    app.get(path, (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        var i = 0;
        var rate = null;

        
        populationStats.find({"country": country, "year": year}).toArray((error, populationStatsArray)=>{
            
                    
        
        
            if (populationStatsArray.length == 0){
                res.sendStatus(404);
                }else{  
                   
                   
                    res.send(populationStatsArray.map((c)=>{
                        delete c._id;
                        return c;
                    })[0]);
                }
                
                }); 
    });
    

    // POST /population-stats
    path = BASE_PATH + "/population-stats";
    app.post(path, (req, res) => {
    
    
    var posted = req.body;


    var coincide = false;
    var i = 0;
    
    var newStat = {
        "country": posted.country,
        "year": Number.parseFloat(posted.year),
        "population": Number.parseFloat(posted.population),
        "density": Number.parseFloat(posted.density),
        "natality": Number.parseFloat(posted.natality),
        "mortality": Number.parseFloat(posted.mortality),
    }
    
   
    
        if (posted.country == null || typeof posted.year == null ||posted.population == null || posted.density == null || posted.natality == null || posted.mortality == null 
            || posted.country == "" || posted.year == "" || posted.population == "" || posted.density == "" || posted.natality == "" || posted.mortality == ""
            ){
                res.sendStatus(400);
        }else{
            populationStats.find({}).toArray((error, populationStatsArray)=>{
            for(i=0;i<populationStatsArray.length;i++)
                if (populationStatsArray[i].country==posted.country && populationStatsArray[i].year==posted.year)
                    coincide = true;
            
            
            
            if(coincide == true) {
                res.sendStatus(409);
            }else{ 
                populationStats.insert(newStat);
                res.sendStatus(201);
                
            } 
            });
        }

       
        });
    console.log("H");
        
        //POST a un recurso  
    path = BASE_PATH + "/population-stats/:country/:year";
    app.post(path, (req, res) => {
        res.send(405);
    });

        
    // DELETE /population-stats
    path = BASE_PATH + "/population-stats";
     app.delete(path, (req, res) => {
            
           populationStats.remove();
           res.sendStatus(200);
        
    });
    
    // PUT /population-stats/Spain/2018
    path = BASE_PATH + "/population-stats/:country/:year";
    app.put(path, (req, res) => {
        var year = parseInt(req.params.year);
        var country = req.params.country;
        var updatedData = req.body;
        
        if(updatedData.year != year || updatedData.country != country 
            || updatedData.population == "" || updatedData.density == "" || updatedData.natality == "" || updatedData.mortality == "" )
            res.sendStatus(400);
        else
            populationStats.update({"country": country, "year": year}, updatedData);
            res.sendStatus(200);
        
        
        
        
    });
    
    //PUT a la ruta base
    path = BASE_PATH + "/population-stats";
    app.put(path, (req, res) => {
        res.sendStatus(405);
    });
    
    
    // DELETE /population-stats/Spain/2018
    path = BASE_PATH + "/population-stats/:country/:year";
    app.delete(path, (req,res)=>{
        var country = req.params.country;
        var year = parseInt(req.params.year);       
        var tam = populationStats.length;
        
        populationStats.find({"country": country, "year": year}).toArray((err, populationStatsArray) => {
            if(populationStatsArray.length == 0)
                res.sendStatus(404);
            else 
                populationStats.remove({"country": country, "year": year});
                res.sendStatus(200);
        })
        
        
    
       
        
    });
    
};