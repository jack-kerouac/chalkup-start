'use strict';

angular.module('chalkupStartApp')
    .factory('cuColorService', function () {

        function getCss(color, angle) {
            if (_.isUndefined(angle)) {
                angle = 0;
            }

            if (_.isUndefined(color)) {
                return {
                    background: ''
                };
            }
            else if (color.hasOwnProperty('ternary')) {
                // use text gradient for two colored boulders
                var gradient = color.primary + " 33%, " +
                    color.secondary + " 33%, " + color.secondary + " 67%, " +
                    color.ternary + " 67%";

                return {
                    background: "linear-gradient(" + angle + "deg, " + gradient + ")"
                };
            }
            else if (color.hasOwnProperty('secondary')) {
                // use text gradient for two colored boulders
                var gradient = color.primary + " 50%, " + color.secondary + " 50%";

                return {
                    background: "linear-gradient(" + angle + "deg, " + gradient + ")"
                };
            }
            else {
                return {
                    background: color.primary
                };
            }
        }

        return {
            color: function (elem, color, angle) {
                var css = getCss(color, angle);
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
            link: function ($scope, elem, attrs) {
                $scope.$watch('cuColor', function (color) {
                    if(!_.isUndefined(attrs.angle))
                        cuColorService.color(elem, color, parseInt(attrs.angle));
                    else
                        cuColorService.color(elem, color);
                })
            }
        };
    });