var app = angular.module('TwitterShopApp', []);

app.controller('IndexCtrl', function($scope, $http, ChartService) {
  $scope.getLinks = function() {
    console.log('get links');
    $http.get('/tweets')
    .success(function(data) {
      console.log(data);
      ChartService.initialize(data);
    })
    .error(function(data){
      console.log('get error: ', data);
    });
  };
  $scope.getLinks();
});
