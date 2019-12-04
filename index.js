var express = require("express");
var API = require("./API");
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");

var cors = require("cors");

var app = express();

app.use(cors());

const BASE_PATH = "/api";

app.use(bodyParser.json());



app.use("/", express.static(path.join(__dirname,"/public")));



var port = process.env.PORT || 3000;

//PROXY G12
var APIG12 = "https://sos1819-12.herokuapp.com/api/v1/life-expectancy-stats";
    app.use("/proxyG12", function(req, res) {
        console.log('piped: '+ APIG12);
        req.pipe(request(APIG12)).pipe(res);
    })

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

console.log("A"); // A 
client.connect(err => {
    console.log("Mangalper1 DB connected!");
console.log("B");//B  
        app.listen(port, () => {
            console.log("Server ready on port " +port);
console.log("C");//C
        });
});
console.log("D");//D

//v1
API.populationStats(app, BASE_PATH);

//PROXY EXTERNA 1 - Weather
var APIExt1 = "https://www.metaweather.com/api/location/753692/";
    app.use("/proxyExt1", function(req, res) {
        console.log('piped: '+ APIExt1);
        req.pipe(request(APIExt1)).pipe(res);
    })
    
var APIExt2 = "http://api.citybik.es/v2/networks?fields=location";
    app.use("/proxyExt2", function(req, res) {
       console.log("piped: "+APIExt2);
       req.pipe(request(APIExt2)).pipe(res);
    });