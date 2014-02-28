'use strict';

angular.module('chalkupStartApp')
    .controller('LoginCtrl', function ($scope, $state, $timeout) {
        $scope.credentials = {};

        $scope.demoLogin = function() {
            $scope.credentials = {
                email: 'demo@chalkup.de',
                password: 'demo123'
            };
            // timeout for the effect
            $timeout(function() {
                $scope.loginAndRedirect($scope.credentials);
            }, 500);
        };

        $scope.loginAndRedirect = function(credentials) {
            var login = $scope.user.login(credentials);
            login.then(function() {
                $state.go('stats');
            });
        };

    });
