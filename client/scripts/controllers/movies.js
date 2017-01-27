'use strict';

/**
 * @ngdoc function
 * @name meanApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the meanApp
 */
  var meanApp = angular.module('meanApp', ['ngRoute']);
  meanApp.controller('MoviesCtrl', ['$scope', 'MoviesFactory', function($scope, MoviesFactory) {
  console.log('Movies Ctrl Started');
  MoviesFactory.index(function(data) {
    console.log(data, "This is data from MoviesCtrl");
    $scope.movies = data;
  });
  // $scope.delete = function(friend) {
  //   friendsFactory.delete(friend, function(data) {
  //     friendsFactory.index(function(data) {
  //       $scope.friends = data;
  //     })
  //   })
  // }
}]);



// meanApp.controller('MoviesCtrl', 'moviesFactory', ['$scope', '$http', function ($scope,moviesFactory, $http) {
//   console.log('Movie Controller Started');
//   $http.get('http://localhost:8000/movie').then(function(res){
//     $scope.movies = res.data;
//     console.log(res.data, "This is res.data");
//   });
// }]);
