console.log('Movie Model being hit on server!');
var mongoose = require('mongoose');

// Create a Movie Schema
var MovieSchema = new mongoose.Schema({
  title: {type: String,required: true},
  url: {type: String,required: true}
});

mongoose.model('Movie', MovieSchema);

// Export the model schema so it can be used by other parts of this application.
// modules.exports = MovieSchema;
