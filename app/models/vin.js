var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WineSchema   = new Schema({
  _id: Number,
  namn: String,
  argang: String,
  typ: String,
  land: String,
  region: String,
  subRegion: String,
  appellation: String,
  druva: String,
  pris: Number,
  inlagd: String,
  bestalld: String,
  aov: {
    betyg: String,
    kvalitet: {
      max: Number,
      kvalitet: Number
    },
    lagring: String,
    smaktyp: String,
    bedomning: String
  },
  systembolaget: {
    nr: Number,
    klocka: {
      fyllighet: Number,
      stravhet: Number,
      fruktsyra: Number,
      sotma: Number
    },
    smaktyp: String,
    smak: String,
    doft: String
  },
  hd: {
    betyg: Number,
    kvalitet: {
      max: Number,
      kvalitet: Number
    }
  },
  lrvf: {
    kvalitet: {
      max: Number,
      kvalitet: Number
    }
  }
},
{
  versionKey: false // You should be aware of the outcome after set to false
});
module.exports = mongoose.model('vin', WineSchema, 'vin');
