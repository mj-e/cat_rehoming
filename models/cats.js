// your cats model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catSchema = new Schema({
  name: String,
  ready_for_home: Boolean,
  age: Number,
  personality: Array
});

module.exports = mongoose.model('cats', catSchema);
