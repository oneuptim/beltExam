var movie = require('./controllers/MovieController.js');
var users = require('./controllers/UserController.js');
var favorite = require('./controllers/FavoritesController.js');

module.exports = function(app) {
  console.log('Hitting routes on server!');
  app.get('/users', function(req, res) {
    users.index(req, res);
    // console.log('in routes');
  });
  app.get('/users/:id', function(req, res) {
    users.show(req, res);
  })
  app.post('/users', function(req, res) {
    console.log('in routes', req.body);
    users.create(req, res);
  });
  // Show all
  app.get('/movies', function(req, res) {
    movie.index(req, res);
  })
  // Show one
  app.get('/movies/:id', function(req, res) {
    movie.show(req, res);
  })
  // Add New
  app.post('/movies', function(req, res) {
    movie.create(req, res);
  })
  // Update
  app.put('/movies/:id', function(req, res) {
    movie.update(req, res);
  })
  // Delete
  app.delete('/delete/:id', function(req, res) {
    movie.delete(req, res);
  })
  // Add New Favorite
  app.post('/favorite', function(req, res) {
    favorite.create(req, res);
  })
  // Show all
  app.get('/favorites', function(req, res) {
    favorite.index(req, res);
  })

};
