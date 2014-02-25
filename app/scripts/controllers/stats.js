'use strict';

angular.module('chalkupStartApp')
    .controller('StatsCtrl', function ($scope, $rootScope, $q, Restangular, LoadingIndicator, navBarService) {
        navBarService.addButton({
            icon: 'plus',
            state: 'create-session'
        });
        navBarService.addMenuItem({
            label: 'Abmelden',
            action: function() {
                $scope.user.logout();
            }
        });

        var user = $scope.user.current;
        var statisticsGet = user.all('statistics').getList();
        LoadingIndicator.waitFor(statisticsGet);

        $scope.gradeData = [];

        statisticsGet.then(function (statistics) {
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
