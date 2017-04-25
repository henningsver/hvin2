var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CounterSchema   = new Schema({
    _id: String,
    seq: Number
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('counters', CounterSchema, 'counters');
