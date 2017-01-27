var mongoose = require('mongoose');
var Poll  = mongoose.model('Poll');

module.exports = {
///////////////////////////////////////////////////////////////////////////////
//                              INDEX METHOD                                //
/////////////////////////////////////////////////////////////////////////////

index: function(req, res) {
  console.log("Polls Index in Poll Controller on Server");
  Poll.find({}, function(err, data) {
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
  console.log("Poll has been added to the database!");
  var poll = new Poll({title: req.body.title, optOne: req.body.optOne, optTwo: req.body.optTwo, optThree: req.body.optThree, optFour: req.body.optFour, _user: req.params.id, date: req.body.date});
  console.log(poll, "This is the new poll object");
  poll.save(function(err) {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      res.json({success: true});
    }
  });
},

// title: {type: String,required: true},
// optOne: {type: String,required: true},
// optTwo: {type: String,required: true},
// optThree: {type: String,required: true},
// optFour: {type: String,required: true},
// likeOne: {type: Number},
// likeTwo: {type: Number},
// likeThree: {type: Number},
// likeFour: {type: Number},
// _user: {type: Schema.Types.ObjectId, ref: 'User'},
// date: {type: Date,required: true}

///////////////////////////////////////////////////////////////////////////////
//                              SHOW METHOD                                 //
/////////////////////////////////////////////////////////////////////////////


show: function(req, res){
  Poll.findOne({_id: req.params.id}, function(err, data) {
    if (err) {
      // console.log(err);
      res.json(err);
    } else {
      res.json(data);
      // console.log(res.json, 'res.json on Poll Ctrl on Server!');
    }
  });
},

///////////////////////////////////////////////////////////////////////////////
//                              UPDATE METHOD                               //
/////////////////////////////////////////////////////////////////////////////
update: function(req, res){
  Poll.findOne({_id: req.params.id}, function(err, data) {
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
Poll.findOne({_id: req.params.id}, function(err, data) {
  if (err) {
    // console.log(err);
    res.json(err);
  } else {
    Poll.remove(data, function(err) {
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