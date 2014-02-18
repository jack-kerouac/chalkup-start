'use strict';

angular.module('chalkupStartApp')
  .controller('StatsCtrl', function ($scope, Restangular) {
        var statistics = Restangular.one('users', 1).all('statistics').getList();

        $scope.isLoading(true);
        statistics.then(function(statistics) {
            console.log(statistics);
            $scope.statistics = statistics;
            $scope.isLoading(false);
        })

  });
