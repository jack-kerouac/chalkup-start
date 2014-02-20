'use strict';

angular.module('chalkupStartApp')
    .controller('StatsCtrl', function ($scope, $q, Restangular, LoadingIndicator) {
        var user = Restangular.one('users', 8);

        var userGet = user.get();
        LoadingIndicator.waitFor(userGet);

        var statisticsGet = user.all('statistics').getList();
        LoadingIndicator.waitFor(statisticsGet);

        $scope.gradeData = [];

        $q.all([userGet, statisticsGet]).then(function (args) {
            var user = args[0];
            var statistics = args[1];

            $scope.user = user;

            // trend calculation
            var oldGradeValue = user.initialGrade.value;
            $scope.statistics = _.map(statistics, function (stat) {
                var gradeValue = stat.grade.mean.value
                stat.gradeDiff = gradeValue - oldGradeValue;
                oldGradeValue = gradeValue;
                return stat;
            });

            var currentGradeData = [];
            currentGradeData.push([moment(user.registrationDate).toDate(), user.initialGrade.value]);

            _.each(statistics, function (stat) {
                var date = moment(stat.session.date).toDate();
                var grade = stat.grade.mean.value;
                currentGradeData.push([date, grade]);
            });

            $scope.gradeData = currentGradeData;
        });

    });
