var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var app = express();

var CONTACTS_COLLECTION = "vin";

app.set('port', (process.env.PORT || 5000));

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


});

app.post("/api/viner", function(req, res) {
});

/*  "/api/viner/:id"
 *    GET: hitta vin med id
 *    PUT: updatera vin med id
 *    DELETE: ta bort vin med id
 */

app.get("/api/viner/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        res.status(200).json(docs);
      }
    });
  });


app.put("/api/viner/:id", function(req, res) {
});

app.delete("/api/viner/:id", function(req, res) {
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
