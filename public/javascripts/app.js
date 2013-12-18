var app = angular.module('TwitterShopApp', []);
var startDate = new Date('Wed Dec 18 00:00:00 +0000 2013');

app.controller('IndexCtrl', function($scope, $http, $timeout) {
  $scope.getLinks = function() {
    console.log('get links');
    $http.get('/tweets')
    .success(function(data) {
      console.log(data);

      $scope.tweets = data;
      var factor = data.NYC.length / 80;

      document.querySelectorAll('circle.sf')[0].setAttribute('r', data.SF.length/factor);
      document.querySelectorAll('circle.chi')[0].setAttribute('r', data.CHI.length/factor);
      document.querySelectorAll('circle.nyc')[0].setAttribute('r', data.NYC.length/factor);

      document.querySelectorAll('circle.sf')[0].addEventListener('click', function() {
        scrubDate($scope.tweets.SF);
      });
    })
    .error(function(data){
      console.log('get error: ', data);
    });
  };

  var increment = 5;
  console.log(startDate);

  var scrubDate = function(tweets) {
    var data = [];
    for(var i = 0; i < 100; i++) {
      data.push(0);
    }
    for(var i = 0; i < tweets.length; i++) {
      var count = 0;
      var tweetDate = new Date(tweets[i].created);
      var timeDiff = Math.floor((tweetDate - startDate)/1000/60); // mins
      console.log(timeDiff);
      data[Math.floor(timeDiff/5)-1]++;
    }
    console.log(data);
    plot(data);
  };

  $scope.getLinks();
});

function plot(tweetData) {
  $('#chart').highcharts({
    chart: {
      zoomType: 'x',
      spacingRight: 0
    },
    title: {
      text: 'Shopping Tweets'
    },
    // subtitle: {
    //     text: document.ontouchstart === undefined ?
    //         'Click and drag in the plot area to zoom in' :
    //         'Pinch the chart to zoom in'
    // },
    xAxis: {
      type: 'datetime',
      maxZoom: 1 * 24 * 3600000, // fourteen days
      title: {
        text: null
      }
    },
    yAxis: {
      title: {
        text: 'Exchange rate'
      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        lineWidth: 1,
        marker: {
          enabled: false
        },
        shadow: false,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },

    series: [{
      type: 'area',
      name: 'Number of Tweets',
      pointInterval: 3600 * 1000,
      pointStart: Date.UTC(2013, 1, 01),
      data: tweetData
    }]
  });
};
