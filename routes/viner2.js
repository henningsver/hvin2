var express = require('express');
var router = express.Router();

var Vin     = require('../models/vin');

router.route('/')
.get(function(req, res) {
  Vin.find(function(err, viner) {
    if (err) {
      handleError(res, err.message, "Failed to get wines.");
    } else {
      res.status(200).json(viner);
    }
  });

})
.post(function(req, res) {
  var newWine = req.body;
  var vin = new Vin(newWine);

  vin.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json({ message: 'Wine created!' });
    }
  });
});
router.route('/:id')
.get(function(req, res) {
  Vin.findById(req.params.id, function(err, vin) {
    if (err) {
      handleError(res, err.message, "Failed to get wine");
    } else {
      res.status(200).json(vin);
    }
  });
})
.put(function(req, res) {
//  Vin.findById(req.params.id, function(err, vin) {
//    if (err) {
//      handleError(res, err.message, "Failed to find wine");
//    } else {
//      vin.namn = req.body.namn;
//      vin.save(function(err) {
//        if (err) {
//          handleError(res, err.message, "Failed to update wine");
//        } else {
//          res.status(200).json(vin);
//        }
//      });
//    }
//  });
  Vin.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, vin) {
    if (err) {
      handleError(res, err.message, "Failed to update wine");
    } else {
      res.status(200).json(vin);
  }
  });

})
.delete(function(req, res) {
  Vin.findByIdAndRemove(req.params.id, function (err, vin) {
    if (err) {
      handleError(res, err.message, "Failed to find wine");
    } else {
      var response = {
        message: "Wine successfully deleted",
        id: vin._id,
        namn: vin.namn
      };
      res.send(response);
  }
  });
});


module.exports = router;
