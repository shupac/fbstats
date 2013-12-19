var app = angular.module('TwitterShopApp', []);

app.controller('IndexCtrl', function($scope, $http, ChartService) {
  $scope.getLinks = function() {
    console.log('get links');
    $http.get('/tweets')
    .success(function(data) {
      console.log(data);
      $scope.tweets = data;
      $scope.ready = true;
    })
    .error(function(data){
      console.log('get error: ', data);
    });
  };

  $scope.show = function() {
    $scope.ready = false;
    ChartService.initialize($scope.tweets);
  };

  $scope.getLinks();
});
