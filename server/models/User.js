console.log('User Model being hit on server!');
var mongoose = require('mongoose');

// Create a User Schema
var UserSchema = new mongoose.Schema({
  name: {type: String,required: true},
  // date: {type: Date,required: true}
});

mongoose.model('User', UserSchema);

// Export the model schema so it can be used by other parts of this application.
// modules.exports = UserSchema;
