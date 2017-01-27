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
    console.log('BeltExam App Config reached');
  //   // RestangularProvider.setBaseUrl('http://localhost:8000');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'LoginCtrl',
        // controllerAs: 'main'
      })
      .when('/polls/dash/:id', {
        templateUrl: 'views/dashboard.html',
        controller: 'PollCtrl',
        // controllerAs: 'Poll'
      })
      .when('/new/:id', {
        templateUrl: 'views/new-poll.html',
        controller: 'NewPollCtrl',
        // controllerAs: 'Poll'
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'editMovieCtrl'
      })
      .when('/delete/:id', {
        templateUrl: 'views/delete.html',
        controller: 'editMovieCtrl',
        // controllerAs: 'Poll'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  ///////////////////////////////////////////////////////////////////////////////
  //                              FACTORIES                                   //
  /////////////////////////////////////////////////////////////////////////////

  meanApp.factory('PollFactory', function($http) {
      console.log('Poll Factory Started');

      var factory = {};

      factory.index = function(callback) {
        $http.get('/polls').then(function(res) {
          if (callback && typeof callback === "function") {
            callback(res.data);
          }
        });
      };

      factory.create = function(newPoll, callback) {
        poll = {title: newPoll.title, optOne: newPoll.optOne, optTwo: newPoll.optTwo, optThree: newPoll.optThree, optFour: newPoll.optFour, _user: newPoll._user, date: new Date()};
        console.log(poll, "This is poll stuff in Poll Factory");
        $http.post('/polls/' + newPoll._user, poll).then(function(res) {
          if (callback && typeof callback === "function") {
            callback(res.data);
            // console.log(res.config, "This is res.config from New Poll Factroy!");
          }
        });
      };

      factory.show = function(id, callback) {
          $http.get('/polls/'+id).then(function(res) {
            if (callback && typeof callback == 'function') {
              callback(res.data);
            }
          })
        }

        factory.update = function(movie, callback) {
          $http.put('/polls/'+movie._id, movie).then(function(res) {
            callback(res.data);
          })
        }

      factory.delete = function(poll, callback) {
        $http.delete('/delete/'+ poll._id).then(function(res) {
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

    // factory.show = function(id, callback) {
    //     $http.get('/users/'+id).then(function(res) {
    //       if (callback && typeof callback == 'function') {
    //         callback(res.data);
    //       }
    //     })
    //   }



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
          // console.log(res.config, "This is res.config from New Poll Factroy!");
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

  meanApp.controller('PollCtrl', ['$scope', 'PollFactory', 'UserFactory', '$location', '$routeParams', function($scope, PollFactory, UserFactory, $location, $routeParams) {
    console.log('Poll Ctrl Started');
    PollFactory.index(function(data) {
      $scope.polls = data;
    });

    PollFactory.show(function(data) {
      $scope.poll = data;
    });

    // UserFactory.show(function(data) {
    //   $scope.user = data;
    //     $console.log(data, "++++++++++++++++++");
    // });

    UserFactory.show($routeParams.id, function(data) {
      // console.log($routeParams.id, "<<<<<<<<<<<<<<<<<<<<<");
      $scope.user = data;
    });

    // $scope.addFav = function() {
    //   FavoritesFactory.create = function() {
    //     console.log('add fav create in controller being hit');
    //     FavoritesFactory.create($scope.newFav, function(data){
    //       console.log($scope.newFav, '**********************');
    //       if (data.errors) {
    //         $scope.errors = data.errors;
    //       } else {
    //         $location.url('/polls');
    //       }
    //     })
    //   }
    // }


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
    //     // $location.path('/Poll/user/' + $routeParams.userID);
    //
    // }


  }]);

  meanApp.controller('NewPollCtrl', ['$scope', 'PollFactory', 'UserFactory', '$location', '$routeParams', function($scope, PollFactory, UserFactory, $location, $routeParams) {
    console.log("New Poll Ctrl, hit!");
    $scope.createPoll = function() {
      $scope.newPoll['_user'] = $routeParams.id
      PollFactory.create($scope.newPoll, function(data){
        console.log('Create method triggered in new poll ctrl');
        if (data.errors) {
          $scope.errors = data.errors;
        } else {
          $location.url('/polls/dash/'+ $routeParams.id);
        }
      })
    }
  }]);



  meanApp.controller('editMovieCtrl', ['$scope', 'PollFactory', 'UserFactory', '$location', '$routeParams', function($scope, PollFactory, UserFactory, $location, $routeParams) {
  console.log('Edit Polls Ctrl Started');

  PollFactory.show($routeParams.id, function(data) {
    $scope.polls = data;
  })

  $scope.update = function() {
   PollFactory.update($scope.poll, function(data) {
     $location.url('/polls');
   })
  }

  // $scope.addVote = function(likeID) {
  //   $scope.likeOne = {id: target_id};
  //   postFactory.update($scope.post_id, function(data) {
  //
  //   })

  $scope.count = 0;
    var max = $scope.count + 1;

  $scope.increment = function() {
    if ($scope.count >= max) { return; }
    $scope.count++;
  };

  $scope.deletePoll = function(poll) {
    PollFactory.delete(poll, function(data) {
      console.log("Delete CTRL in frontend");
      $location.url('/');
    })
  }

}]);
