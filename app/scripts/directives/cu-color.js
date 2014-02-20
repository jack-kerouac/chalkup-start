'use strict';

angular.module('chalkupStartApp')
    .factory('cuColorService', function () {

        function getCss(color) {
            if (_.isUndefined(color)) {
                return {
                    background: 'transparent'
                };
            }
            else if (color.hasOwnProperty('ternary')) {
                // use text gradient for two colored boulders
                var gradient = color.primary + " 33%, " +
                    color.secondary + " 33%, " + color.secondary + " 67%, " +
                    color.ternary + " 67%";

                return {
                    background: "linear-gradient(to bottom, " + gradient + ")"
                };
            }
            else if (color.hasOwnProperty('secondary')) {
                // use text gradient for two colored boulders
                var gradient = color.primary + " 50%, " + color.secondary + " 50%";

                return {
                    background: "linear-gradient(to bottom, " + gradient + ")"
                };
            }
            else {
                return {
                    background: color.primary
                };
            }
        }

        return {
            color: function (elem, color) {
                var css = getCss(color);
                $(elem).css(css);
            }
        }
    });


angular.module('chalkupStartApp')
    .directive('cuColor', function (cuColorService) {

        return {
            restrict: 'A',
            scope: {
                cuColor: '='
            },
            link: function ($scope, elem) {
                $scope.$watch('cuColor', function (color) {
                    cuColorService.color(elem, color);
                })
            }
        };
    });