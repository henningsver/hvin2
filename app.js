var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

var ObjectID = mongodb.ObjectID;
var CONTACTS_COLLECTION = "vin";
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
  var index = db.collection(CONTACTS_COLLECTION).find().sort( { _id : -1 } ).limit(1);
  console.log("Next ID: " + index._id);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

});

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

/*  "/api/viner"
 *    GET: Hittar alla viner
 *    POST: skapar nytt vin
 */

app.get("/api/viner", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get wines.");
    } else {
      res.status(200).json(docs);
    }
  });

});

app.post("/api/viner", function(req, res) {
  var newWine = req.body;

  if (!req.body.namn) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }
  
  db.collection(CONTACTS_COLLECTION).insertOne(newWine, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new wine.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/viner/:id"
 *    GET: hitta vin med id
 *    PUT: updatera vin med id
 *    DELETE: ta bort vin med id
 */

app.get("/api/viner/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: parseInt(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get wine");
    } else {
      res.status(200).json(doc);
    }
  });

});

app.put("/api/viner/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: parseInt(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/viner/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: parseInt(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
