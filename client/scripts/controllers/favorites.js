var meanApp = angular.module('meanApp', ['ngRoute']);
meanApp.controller('FavoritesCtrl', ['$scope', 'FavoritesFactory', 'MoviesFactory', 'UserFactory', function($scope, MoviesFactory, UserFactory, FavoritesFactory) {
console.log('Fav Ctrl Started');

FavoritesFactory.index(function(data) {
  console.log(data, "This is data from MoviesCtrl");
  $scope.favorites = data;
});



$scope.addFav = function() {
    $scope.newFav['_user.id'] = $routeParams.id;
    console.log($routeParams.id, "******************, is the User ID from the addFav method");
    $scope.newFav['_movie.id'] = $scope.movie.id;
    console.log($scope.movie.id, "&&&&&&&&&&&&&&&&&&&, is the movie ID from addFav");
    FavoritesFactory.create($scope.newFav, function(data) {
    })
    // topicFactory.show($scope.topic_id, function(data) {
    //   // console.log(data.posts);
    //   $scope.topic = data;
    //   $scope.posts = data.posts;
    // })
    $scope.newFav = {};
    // $location.path('/movies/user/' + $routeParams.userID);

}


$scope.create = function() {
  MoviesFactory.create($scope.newMovie, function(data){
    if (data.errors) {
      $scope.errors = data.errors;
    } else {
      $location.url('/movies');
    }
  })
}






}]);
