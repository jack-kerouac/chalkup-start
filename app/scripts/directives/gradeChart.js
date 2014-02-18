'use strict';

angular.module('chalkupStartApp')
    .directive('gradeChart', function (Restangular) {
        var chart;
        var gradesAboveBelow = 1;

        return {
            restrict: 'A',
            scope: {
                gradeData: '='
            },
            link: function ($scope, elem) {
                var gradeColor = 'rgb(203,75,75)';

                $scope.options = {
                    xaxis: {
                        mode: "time"
                    },
                    yaxes: [
                        {
                            font: { color: gradeColor }
                        }
                    ],
                    series: {
                        lines: { show: true, fill: false },
                        points: { show: true, fill: false }
                    }
                };

                var grades = Restangular.all('grades').getList();
//                $scope.waitFor(grades);
                grades.then(function (grades) {
                    var gradeTicks = _.map(grades, function (grade) {
                        return [grade.value, grade.font];
                    });
                    $scope.$watch('gradeData', function(gradeData) {
                        if(_.isEmpty(gradeData))
                            return;

                        var minGrade = _.min(_.map(gradeData, function(point) { return point[1]}));
                        var maxGrade = _.max(_.map(gradeData, function(point) { return point[1]}));

                        var lowerGrade = _.findIndex(gradeTicks, function(grade) {
                            return grade[0] > minGrade;
                        }) - gradesAboveBelow - 1;
                        var upperGrade = _.findLastIndex(gradeTicks, function(grade) {
                            return grade[0] < maxGrade;
                        }) + gradesAboveBelow + 1;

                        $scope.options.yaxes[0].ticks = gradeTicks.slice(lowerGrade, upperGrade + 1);

                        var chartData = [{ data: gradeData, color: gradeColor, yaxis: 1 }];
                        chart = $.plot(elem, chartData, $scope.options);
                    });
                });
            }
        };
    });
