console.log('PollSchema Model being hit on server!');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a Movie Schema
var PollSchema = new mongoose.Schema({
  title: {type: String,required: true},
  optOne: {type: String,required: true},
  optTwo: {type: String,required: true},
  optThree: {type: String,required: true},
  optFour: {type: String,required: true},
  likeOne: {type: Number},
  likeTwo: {type: Number},
  likeThree: {type: Number},
  likeFour: {type: Number},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date,required: true}
});

mongoose.model('Poll', PollSchema);

// Export the model schema so it can be used by other parts of this application.
// modules.exports = MovieSchema;
