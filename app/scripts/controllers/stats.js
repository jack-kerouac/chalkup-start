'use strict';

angular.module('chalkupStartApp')
    .controller('StatsCtrl', function ($scope, Restangular) {

        var user = Restangular.one('users', 1);

        $scope.user = user.get().$object;

        $scope.gradeData = [];

        var statistics = user.all('statistics').getList();

        $scope.waitFor(statistics);
        statistics.then(function (statistics) {
            $scope.statistics = statistics;

            var currentGradeData = [];
            currentGradeData.push([moment($scope.user.registrationDate).toDate(), $scope.user.initialGrade.value]);

            _.each(statistics, function (stat) {
                var date = moment(stat.session.date).toDate();
                var grade = stat.grade.mean.value;
                currentGradeData.push([date, grade]);
            });

            $scope.gradeData = currentGradeData;
        });

    });
