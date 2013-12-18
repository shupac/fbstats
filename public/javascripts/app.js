var app = angular.module('TwitterShopApp', []);

app.controller('IndexCtrl', function($scope, $http) {
  $scope.getLinks = function() {
    $http.get('/tweets')
    .success(function(data) {
      $scope.tweets = data;
    })
    .error(function(data){
      console.log('get error: ', data);
    });
  };

  $scope.getLinks();
})

// .controller('SortCtrl', function($scope){
//   $scope.displaySort = function(predicate){
//     var sort;
//     switch(predicate) {
//       case 'visits':
//         sort = 'number of visits';
//         break;
//       case 'updated_at':
//         sort = 'last visit';
//         break;
//       case 'created_at':
//         sort = 'when created';
//         break;
//       default:
//         break;
//     }
//     return sort;
//   };
// }).
// controller('LinkStats', function($scope, $http){
//   $scope.showingStats = false;
//   $scope.showStats = function(id) {
//     $http.get('/stats/'+id).success(function(data) {
//       $scope.clicks = data;
//     });
//     $scope.showingStats = true;
//   };

//   $scope.hideStats = function() {
//     $scope.showingStats = false;
//   };
// });