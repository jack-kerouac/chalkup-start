'use strict';

angular.module('chalkupStartApp')
    .controller('StartCtrl', function ($scope, $http) {

        $('.flexslider').flexslider({
            animation: "slide"
        });

        $scope.registerNotification = function (email) {
            $scope.error = null;
            var data = { email: email };
            $http.post('http://demo.chalkup.de/notifications', data).success(function () {
                $scope.registered = true;

                var dimensionValue = 'signedUp';
                ga('set', 'dimension1', dimensionValue);

            }).error(function (data, status) {
                $scope.error = {data: data, status: status };
            });
        }

    });