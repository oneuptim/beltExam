var myAppModule = angular.module('myApp', []);
myAppModule.controller('UserController', function($scope){

  $scope.user = [
    {name: 'KENtucky Fried Chicken', phrase: "100%, all the time!"},
    {name: 'Jenoodles', phrase: "Don't forget your culture!"},
    {name: 'Farrarara Rice', phrase: "Actually, I'm gonna go!"},
    {name: 'Lena-tella', phrase: "But why though?"},
    {name: 'Sloppy Joe', phrase: "I watched this documentary..."},
    {name: 'DJ', phrase: "Time to take a nap!"}
  ];

  $scope.addUser = function(){
    $scope.user.push($scope.newUser);
    $scope.newUser = {};
  }

  $scope.remove = function($index){
  $scope.user.splice($index,1);
  }

});
