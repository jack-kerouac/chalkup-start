'use strict';

angular.module('chalkupStartApp')
    .controller('LoginCtrl', function ($scope, $state, $timeout, userService) {
        $scope.credentials = {};

        userService.onLoginStatusChange($scope, function(loggedIn, user) {
            $scope.currentUser = user;
        });

        $scope.currentUser = userService.current;

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
            var login = userService.login(credentials);
            login.then(function() {
                // TODO: this is ugly
                if(!_.isUndefined($scope.$close)) {
                    $timeout($scope.$close, 1000);
                }
                $state.go('stats');
            });
        };

        $scope.logout = function() {
            var logout = userService.logout()

            logout.then(function() {
                // TODO: this is ugly
                if(!_.isUndefined($scope.$close)) {
                    $scope.$close();
                }
            });
        };

    });
