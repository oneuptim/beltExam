var mongoose = require('mongoose');
var User = mongoose.model('User')
module.exports = (function() {
  return {
    index: function(req, res) {
      User.find({}, function(err, results) {
        if(err) {
          console.log(err);
        } else {
          // console.log('in controller', results);
          res.json(results);
        }
      })
    },
    show: function(req, res) {
      User.findOne({_id: req.params.id}, function(err, user) {
        if(err) {
          console.log(err);
        } else {
          res.json(user);
        }
      })
    },
    create: function(req, res) {
      // console.log('in controller', req.body);
      var userInstance = new User({name: req.body.name});
      userInstance.save(function(err, results) {
        if(err) {
          console.log(err);
        } else {
          // console.log('in controller', results);
          res.json(results);
        }
      })
    }
  }
})();
