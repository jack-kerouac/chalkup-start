'use strict';

angular.module('chalkupStartApp')
    .directive('gradeChart', function (Restangular, LoadingIndicator) {
        var chart;

        return {
            restrict: 'A',
            scope: {
                gradeData: '='
            },
            link: function ($scope, elem) {
                var foregroundColor = 'white';
                var gridColor = '#0D4F7A';
                var ninetyPercentileOpacity = 0.3;

                $scope.options = {
                    xaxis: {
                        mode: "time",
                        tickFormatter: function(number, object) {
                            var date = moment(number);
                            return date.format("D") + "<br>" + date.format("MMM");
                        },
                        tickLength: 5,
                        font: {
                            color: foregroundColor
                        }
                    },
                    yaxes: [
                        {
                            font: { color: foregroundColor, weight: '600' }
                        }
                    ],
                    series: {
                        lines: { show: true, fill: false, lineWidth: 3 },
                        points: { show: true, fill: true, radius: 5 },
                        shadowSize: 0
                    },
                    grid: {
                        borderWidth: 0,
                        labelMargin: 10,
                        margin: {
                            left: 10,
                            right: 15,
                            bottom: 10
                        },
                        color: gridColor
                    }
                };

                var grades = Restangular.all('grades').getList();
                LoadingIndicator.waitFor(grades);
                grades.then(function (grades) {
                    var gradeTicks = _.map(grades, function (grade) {
                        var label;
                        if(grade.font.length == 2)
                            label = grade.font + "&nbsp;&nbsp;";
                        else
                            label = grade.font;
                        return [grade.value, label];
                    });

                    $scope.options.yaxes[0].ticks = gradeTicks;
                    var gradeDiff = gradeTicks[1][0] - gradeTicks[0][0];

                    $scope.$watch('gradeData', function(gradeData) {
                        if(_.isEmpty(gradeData))
                            return;

                        // TODO: remove this as soon as we have real stddev data from the server
                        for(var i = 0; i < gradeData.length; i++)
                            gradeData[i].push(0.05 * 1 / (i + 1));

                        var minGrade = _.min(_.map(gradeData, function(point) { return point[1]}));
                        var maxGrade = _.max(_.map(gradeData, function(point) { return point[1]}));

                        $scope.options.yaxes[0].min = minGrade - gradeDiff * 1.2;
                        $scope.options.yaxes[0].max = maxGrade + gradeDiff * 1.2;

                        var ninetyPercentileAreaConf = [{ representation: 'symmetric', opacity: ninetyPercentileOpacity }];

                        var chartData = [{ data: gradeData, fillArea: ninetyPercentileAreaConf, color: foregroundColor, yaxis: 1 }];
                        chart = $.plot(elem, chartData, $scope.options);
                    });
                });
            }
        };
    });
