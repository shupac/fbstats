var app = angular.module('TwitterShopApp', []);

app.controller('IndexCtrl', function($scope, $http) {
  $scope.getLinks = function() {
    console.log('get links');
    $http.get('/tweets')
    .success(function(data) {
      console.log(data);
      $scope.tweets = data;
    })
    .error(function(data){
      console.log('get error: ', data);
    });
  };

  $scope.getLinks();
});