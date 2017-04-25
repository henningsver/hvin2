var express = require('express');
var router = express.Router();

var Counter     = require('../models/counter');


router.route('/check/:id')
.get(function(req, res) {
  Counter.findById(req.params.id, function(err, counter) {
    if (err) {
      handleError(res, err.message, "Failed to check counter");
    } else {
      res.status(200).json(counter);
    }
  });
});

router.route('/get/:id')
.get(function(req, res) {
  Counter.findByIdAndUpdate(req.params.id,   { $inc: { seq: 1 } }, function(err, counter) {
    if (err) {
      handleError(res, err.message, "Failed to retreive counter");
    } else {
      res.status(200).json(counter);
  }
  });

});

module.exports = router;
