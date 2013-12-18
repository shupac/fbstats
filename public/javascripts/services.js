angular.module('TwitterShopApp')
.service('DateService', function($http) {
  var increment = 5;
  var service = {
    scrubData: function(tweets) {
      var data = [];
      var max = 0;
      tweets.sort(function(a,b) {
        return new Date(a.created) - new Date(b.created);
      });
      service.startDate = new Date(tweets[0].created);

      for(var i = 0; i < tweets.length; i++) {
        var count = 0;
        var tweetDate = new Date(tweets[i].created);
        var timeDiff = Math.floor((tweetDate - service.startDate)/1000/60); // mins
        var histDiff = Math.floor(timeDiff/increment)-1;
        if(histDiff > max) max = histDiff;
        if(!data[histDiff]) data[histDiff] = 0;
        data[histDiff]++;
      }

      for(var i = 0; i < max; i++) {
        data[i] = data[i] || 0;
      }

      return data;
    }
  };
  return service;
})
.service('ChartService', function(DateService) {
  var service = {
    initialize: function(data) {
      var factor = data.NYC.length / 80;

      var circleSf = document.querySelectorAll('circle.sf')[0];
      var circleChi = document.querySelectorAll('circle.chi')[0];
      var circleNyc = document.querySelectorAll('circle.nyc')[0];

      circleSf.setAttribute('r', data.SF.length/factor);
      circleChi.setAttribute('r', data.CHI.length/factor);
      circleNyc.setAttribute('r', data.NYC.length/factor);

      circleSf.addEventListener('click', function() {
        service.plot(DateService.scrubData(data.SF), 'San Francisco');
      });

      circleChi.addEventListener('click', function() {
        service.plot(DateService.scrubData(data.CHI), 'Chicago');
      });

      circleNyc.addEventListener('click', function() {
        service.plot(DateService.scrubData(data.NYC), 'NYC');
      });
    },
    plot: function(tweetData, city) {
      $('#chart').highcharts({
        chart: {
          zoomType: 'x',
          spacingRight: 0
        },
        title: {
          text: 'Tweets of "Shopping" in ' + city
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' :
                'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime',
          maxZoom: 1 * 3600000,
          title: {
            text: 'Time'
          }
        },
        yAxis: {
          title: {
            text: 'Number of Tweets'
          }
        },
        tooltip: {
          shared: true
        },
        legend: {
          enabled: false
        },
        series: [{
          type: 'column',
          name: 'Number of Tweets',
          pointInterval: 300 * 1000,
          pointStart: Date.UTC(2013, 8, 18),
          data: tweetData
        }]
      });
    }
  };
  return service;
});