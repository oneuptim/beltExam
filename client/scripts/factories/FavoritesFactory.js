meanApp.factory('FavoritesFactory', function($http) {
  var factory = {};
  var users = [];
  var user = "";

  factory.index = function(callback) {
    $http.get('/users').then(function(output) {
      users = output;
      callback(users);
    })
  }
  // factory.show = function(info, callback) {
  //   // console.log(info);
  //   $http.get('/users/' + info.id).then(function(output) {
  //     // $console.log(output);
  //     user = output;
  //     callback(user);
  //   })
  // }

  factory.show = function(id, callback) {
      $http.get('/users/'+id).then(function(res) {
        if (callback && typeof callback == 'function') {
          callback(res.data);
        }
      })
    }



  // factory.create = function(info, callback) {
  //   $http.post('/users', info).then(function(output) {
  //     // console.log(info);
  //     // users.post(info);
  //     callback(output);
  //   });
  // }

  factory.create = function(newUser, callback) {
    $http.post('/favorite', newUser).then(function(res) {
      // console.log(res, "%%%%%%%%%%%%%%%%%%%%%%%");
      if (callback && typeof callback === "function") {
        callback(res.data);
        // console.log(res.config, "This is res.config from New Movies Factroy!");
      }
    });
  };

  return factory;
})
