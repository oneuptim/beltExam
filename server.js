var bodyParser = require('body-parser');
var express    = require('express');
var path       = require('path');
var mongoose   = require('mongoose');
var app        = express();
var root       = __dirname;

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static( path.join( root, './client' )));
// app.use( express.static( path.join( root, './node_modules' )))
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/meanapp'); // <== DON'T FORGET TO CHANGE THIS EVERYTIME!!!!!!!!!!!

// Load the models.
require(path.join(__dirname, './server/models/index.js'));
// Load the routes.
require(path.join(__dirname, './server/routes.js'))(app);

app.listen(8000, function(){
  console.log("Mean App Listening on Port 8000");
});
// END OF MONGO DATABASE CONNECTION






// app.use(express.static(path.join(__dirname, './static')));
// app.set('views', path.join(__dirname, './views'));

// app.use(methodOverride('X-HTTP-Method-Override'));
// var methodOverride = require('method-override');
