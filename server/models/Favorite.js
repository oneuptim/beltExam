console.log('Favorite Model being hit on server!');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a Favorite Schema
var FavoriteSchema = new mongoose.Schema({
  // name: {type: String,required: true},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
  // date: {type: Date,required: true}
});

mongoose.model('Favorite', FavoriteSchema);

// Export the model schema so it can be used by other parts of this application.
// modules.exports = FavoriteSchema;
