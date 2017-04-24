var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

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

  if (req.params.id != 123) {
      handleError(res, "error reason", "Failed to get wine");
    } else {
      var response = {
        id: 123,
        namn: "Domaine de l'Echevin Côtes du Rhône Villages Saint-Maurice-sur-Eygues Guillaume de Rouville",
        argang: 2014,
        typ: "Rött",
        land: "Frankrike",
        region: "Rhône",
        subRegion: "Southern Rhône",
        appellation: "Côtes du Rhône Villages Saint-Maurice-sur-Eygues",
        druva: "Red Rhone Blend",
        pris: 170,
        markning: "Eko, 2400 fl",
        slapp: "Exlusiva Nyheter 3/2",
        inlagd: "2017-02-12",
        bestallt: "2017-02-03",
        aov: {
          betyg: "Fynd",
          kvalitet: "3,5",
          lagring: "Kan lagras",
          smaktyp: "Strama fruktiga röda",
          bedomning: "Kryddig och god doft med generös, lite örtig ursprungskaraktär. Mycket rik, flödig, intagande smak i tillgänglig, ändå högst seriös stil.",
        },
        systembolaget: {
          nr: 95549,
          fyllighet: 9,
          stravhet: 8,
          fruktsyra: 9,
          smaktyp: "Kryddigt & mustigt",
          smak: "Kryddig, nyanserad smak med fatkaraktär, inslag av mörka bär, kaffe, hallon, lagerblad, kryddpeppar och choklad. Serveras vid 16-18°C till rätter av lamm- eller nötkött.",
          doft: "Kryddig, nyanserad doft med fatkaraktär, inslag av mörka bär, kaffe, lagerblad, kryddpeppar och tobak"
        }
      }
      res.status(200).json(response);
    }
});

app.put("/api/viner/:id", function(req, res) {
});

app.delete("/api/viner/:id", function(req, res) {
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
