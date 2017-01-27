var mongoose = require('mongoose');
var User  = mongoose.model('User');
// var Movie  = mongoose.model('Movie');
// var Favorite  = mongoose.model('Favorite');

module.exports = {
///////////////////////////////////////////////////////////////////////////////
//                              INDEX METHOD                                //
/////////////////////////////////////////////////////////////////////////////

index: function(req, res) {
  console.log("Favorite Index in Fav Controller on Server");
  Favorite.find({}, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
},

///////////////////////////////////////////////////////////////////////////////
//                              CREATE METHOD                               //
/////////////////////////////////////////////////////////////////////////////

create: function(req, res){
  console.log("Favorite Create method has been added to the database!");
  var favorite = new Favorite({_user: req.params.id, _movie: req.body.movie_id});
  console.log(favorite, "This is the new movie object");
  favorite.save(function(err) {
    if (err) {
      res.json(err);
    } else {
      res.json({success: true});
      console.log(res.json, 'This is the favorite has been saved to the database!');
    }
  });
},

///////////////////////////////////////////////////////////////////////////////
//                              DELETE METHOD                               //
/////////////////////////////////////////////////////////////////////////////

delete: function(req, res){
Favorite.findOne({_id: req.params.id}, function(err, data) {
  if (err) {
    // console.log(err);
    res.json(err);
  } else {
    Movie.remove(data, function(err) {
      if (err) {
        res.json(err);
      } else {
        res.json({success: true});
      }
    })
  }
});
},

};
