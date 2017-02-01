var poll = require('./controllers/PollController.js');
var users = require('./controllers/UserController.js');

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
  app.get('/polls', function(req, res) {
    poll.index(req, res);
  })
  // Show one
  app.get('/polls/:id', function(req, res) {
    poll.show(req, res);
  })
  // Add New Poll
  app.post('/polls/:id', function(req, res) {
    poll.create(req, res);
  })
  // Update
  app.put('/polls/:id', function(req, res) {
    poll.update(req, res);
  })
  // Delete
  app.delete('/delete/:id', function(req, res) {
    poll.delete(req, res);
  })
  // QME app
  // app.get('/qme', function(req, res) {
  //   poll.index(req, res);
  // })

  app.post('/qme', function(req, res) {
    console.log("SLACK Index in Poll Controller on Server", req);
    poll.slack(req, res);
  })


};
