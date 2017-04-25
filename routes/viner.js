var express = require('express');
var router = express.Router();

var CONTACTS_COLLECTION = "vin";
/*  "/api/viner"
 *    GET: Hittar alla viner
 *    POST: skapar nytt vin
 */
router.route('/')
.get(function(req, res) {
  req.db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get wines.");
    } else {
      res.status(200).json(docs);
    }
  });

})
.post(function(req, res) {
  var newWine = req.body;

  if (!req.body.namn) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  req.db.collection(CONTACTS_COLLECTION).insertOne(newWine, function(err, doc) {
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
router.route('/:id')
.get(function(req, res) {
  req.db.collection(CONTACTS_COLLECTION).findOne({ _id: parseInt(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get wine");
    } else {
      res.status(200).json(doc);
    }
  });

})
.put(function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  req.db.collection(CONTACTS_COLLECTION).updateOne({_id: parseInt(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update wine");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
})
.delete(function(req, res) {
  req.db.collection(CONTACTS_COLLECTION).deleteOne({_id: parseInt(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete wine");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});


module.exports = router;
