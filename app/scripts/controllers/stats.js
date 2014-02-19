'use strict';

angular.module('chalkupStartApp')
    .controller('StatsCtrl', function ($scope, Restangular, LoadingIndicator) {

        var user = Restangular.one('users', 1);

        $scope.user = user.get().$object;

        $scope.gradeData = [];

        var statistics = user.all('statistics').getList();

        LoadingIndicator.waitFor(statistics);
        statistics.then(function (statistics) {
            // trend calculation
            var oldGradeValue = $scope.user.initialGrade.value;
            $scope.statistics = _.map(statistics, function (stat) {
                var gradeValue = stat.grade.mean.value
                stat.gradeDiff = gradeValue - oldGradeValue;
                oldGradeValue = gradeValue;
                return stat;
            });


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
