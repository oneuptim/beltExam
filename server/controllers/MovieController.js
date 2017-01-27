var mongoose = require('mongoose');
var Movie  = mongoose.model('Movie');

module.exports = {
///////////////////////////////////////////////////////////////////////////////
//                              INDEX METHOD                                //
/////////////////////////////////////////////////////////////////////////////

index: function(req, res) {
  console.log("Movies Index in Movie Controller on Server");
  Movie.find({}, function(err, data) {
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
  console.log("Movie has been added to the database!");
  var movie = new Movie({title: req.body.title, url: req.body.url});
  console.log(movie, "This is the new movie object");
  movie.save(function(err) {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      res.json({success: true});
      console.log(res.json, 'This is what has been saved to the database!');
    }
  });
},

///////////////////////////////////////////////////////////////////////////////
//                              SHOW METHOD                                 //
/////////////////////////////////////////////////////////////////////////////


show: function(req, res){
  Movie.findOne({_id: req.params.id}, function(err, data) {
    if (err) {
      // console.log(err);
      res.json(err);
    } else {
      res.json(data);
      // console.log(res.json, 'res.json on Movie Ctrl on Server!');
    }
  });
},

///////////////////////////////////////////////////////////////////////////////
//                              UPDATE METHOD                               //
/////////////////////////////////////////////////////////////////////////////
update: function(req, res){
  Movie.findOne({_id: req.params.id}, function(err, data) {
  if (err) {
    console.log(err);
    res.json(err);
  } else {
    for (var i in req.body) {
      if (req.body[i] != data[i]) {
        data[i] = req.body[i];
      }
    }
    console.log(data);
    data.save(function(err, data) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(data);
        res.json(data);
      }
    })
  }
})
},

///////////////////////////////////////////////////////////////////////////////
//                              DELETE METHOD                               //
/////////////////////////////////////////////////////////////////////////////

delete: function(req, res){
Movie.findOne({_id: req.params.id}, function(err, data) {
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
