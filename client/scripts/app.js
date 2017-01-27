/**
 * @ngdoc overview
 * @name meanApp
 * @description
 * # meanApp
 *
 * Main module of the application.
 */

 ///////////////////////////////////////////////////////////////////////////////
 //                              ROUTES                                      //
 /////////////////////////////////////////////////////////////////////////////

var meanApp = angular.module('meanApp', ['ngRoute']);
  meanApp.config(function ($routeProvider) {
    console.log('meanApp config reached');
  //   // RestangularProvider.setBaseUrl('http://localhost:8000');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'LoginCtrl',
        // controllerAs: 'main'
      })
      .when('/movies/user/:id', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        // controllerAs: 'movies'
      })
      .when('/new', {
        templateUrl: 'views/new-movie.html',
        controller: 'NewMovieCtrl',
        // controllerAs: 'movies'
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'editMovieCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'editMovieCtrl'
      })
      .when('/delete/:id', {
        templateUrl: 'views/delete.html',
        controller: 'editMovieCtrl',
        // controllerAs: 'movies'
      })
      .when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesCtrl',
        // controllerAs: 'movies'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  ///////////////////////////////////////////////////////////////////////////////
  //                              FACTORIES                                   //
  /////////////////////////////////////////////////////////////////////////////

  meanApp.factory('MoviesFactory', function($http) {
      console.log('Movies Factory Started');

      var factory = {};

      factory.jenny = function(callback) {
        $http.get('/movies').then(function(res) {
          if (callback && typeof callback === "function") {
            callback(res.data);
          }
        });
      };

      factory.create = function(newMovie, callback) {
        $http.post('/movies', newMovie).then(function(res) {
          // console.log(res, "%%%%%%%%%%%%%%%%%%%%%%%");
          if (callback && typeof callback === "function") {
            callback(res.data);
            // console.log(res.config, "This is res.config from New Movies Factroy!");
          }
        });
      };

      factory.show = function(id, callback) {
          $http.get('/movies/'+id).then(function(res) {
            if (callback && typeof callback == 'function') {
              callback(res.data);
            }
          })
        }

        factory.update = function(movie, callback) {
          $http.put('/movies/'+movie._id, movie).then(function(res) {
            callback(res.data);
          })
        }

      factory.delete = function(movie, callback) {
        $http.delete('/delete/'+movie._id).then(function(res) {
          console.log("Delete factory in frontend");
            callback(res.data);
        });
      };

      return factory;
  });

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


  ///////////////////////////////////////////////////////////////////////////////
  //                              CONTROLLERS                                 //
  /////////////////////////////////////////////////////////////////////////////

  meanApp.controller('MainCtrl', function() {
    console.log('MainCtrl Started');
  });

  meanApp.controller('MoviesCtrl', ['$scope', 'MoviesFactory', 'UserFactory', 'FavoritesFactory', '$location', '$routeParams', function($scope, MoviesFactory, UserFactory, FavoritesFactory, $location, $routeParams) {
    console.log('Movies Ctrl Started');
    MoviesFactory.jenny(function(data) {
      $scope.movies = data;
    });

    MoviesFactory.show(function(data) {
      $scope.movie = data;
    });

    // UserFactory.show(function(data) {
    //   $scope.user = data;
    //     $console.log(data, "++++++++++++++++++");
    // });

    UserFactory.show($routeParams.id, function(data) {
      // console.log($routeParams.id, "<<<<<<<<<<<<<<<<<<<<<");
      $scope.user = data;
    });

    $scope.addFav = function() {
      FavoritesFactory.create = function() {
        console.log('add fav create in controller being hit');
        FavoritesFactory.create($scope.newFav, function(data){
          console.log($scope.newFav, '**********************');
          if (data.errors) {
            $scope.errors = data.errors;
          } else {
            $location.url('/movies');
          }
        })
      }
    }


    // $scope.addFav = function() {
    //     // $scope.newFav['_user'] = $routeParams.id;
    //     // console.log($routeParams.id, "******************, is the User ID from the addFav method");
    //     // $scope.newFav['_movie'] = $scope.movie.id;
    //     // console.log($scope.movie.id, "&&&&&&&&&&&&&&&&&&&, is the movie ID from addFav");
    //     FavoritesFactory.create($scope.newFav, function(data) {
    //       // console.log(newFav, 'This is newFav object');
    //     })
    //     // topicFactory.show($scope.topic_id, function(data) {
    //     //   // console.log(data.posts);
    //     //   $scope.topic = data;
    //     //   $scope.posts = data.posts;
    //     // })
    //     $scope.newFav = {};
    //     // $location.path('/movies/user/' + $routeParams.userID);
    //
    // }


  }]);

  meanApp.controller('NewMovieCtrl', function($scope, MoviesFactory, $location) {
    console.log("New movie Ctrl, hit!");
    $scope.create = function() {
      MoviesFactory.create($scope.newMovie, function(data){
        if (data.errors) {
          $scope.errors = data.errors;
        } else {
          $location.url('/movies');
        }
      })
    }
  });



  meanApp.controller('editMovieCtrl', ['$scope', 'MoviesFactory','$location', '$routeParams', function($scope, MoviesFactory, $location, $routeParams) {
  console.log('Edit Movies Ctrl Started');

  MoviesFactory.show($routeParams.id, function(data) {
    $scope.movie = data;
  })

  $scope.update = function() {
   MoviesFactory.update($scope.movie, function(data) {
     $location.url('/movies');
   })
  }

  $scope.delete = function(movie) {
    MoviesFactory.delete(movie, function(data) {
      console.log("Delete CTRL in frontend");
      $location.url('/');
    })
  }

}]);
