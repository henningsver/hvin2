var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

const util = require('util')

var app = express();
app.set('port', (process.env.PORT || 5000));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

});

var mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI); // connect to our database
var db2 = mongoose.connection;
db2.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function(req, res, next) {
  req.db = db;
  next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello you!');
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var viner3 = require('./routes/viner3.js');
app.use('/api/viner3', viner3);

var viner = require('./routes/viner.js');
app.use('/api/viner', viner);

var counters = require('./routes/counters.js');
app.use('/api/counters', counters);


//DB API
app.route('/api/db/collections')
.get(function(req, res) {
//app.get('/api/db/collections',function(req,res) {
  db.listCollections().toArray(function(err, collInfos) {
    res.json(collInfos);
  });
});
app.route('/api/db/collections/:name')
.get(function(req, res) {
//app.get('/api/db/collections/:name',function(req,res){
  db.collection(req.params.name).find({}).limit(20).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get collection");
    } else {
      res.status(200).json(docs);
    }
  });
});
