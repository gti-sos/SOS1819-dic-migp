
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var populationStats;

client.connect(err => {
  populationStats = client.db("mangalper").collection("populationStats");
  // perform actions on the collection object
});