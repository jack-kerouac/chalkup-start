'use strict';

angular.module('chalkupStartApp')
    .controller('LoginCtrl', function ($scope, $state, $timeout, $analytics, userService) {
        $scope.credentials = {};

        userService.onLoginStatusChange($scope, function(loggedIn, user) {
            $scope.currentUser = user;
        });

        $scope.currentUser = userService.current;

        var demoCredentials = {
            email: 'demo@chalkup.de',
            password: 'demo123'
        };

        $scope.demoLogin = function() {
            $scope.credentials = demoCredentials;
            // timeout for the effect
            $timeout(function() {
                $scope.loginAndRedirect($scope.credentials);
            }, 500);
        };

        $scope.loginAndRedirect = function(credentials) {
            var login = userService.login(credentials);
            login.then(function() {
                if(credentials === demoCredentials) {
                    $analytics.eventTrack('demoUserLogin');
                }
                else {
                    $analytics.eventTrack('normalUserLogin');
                }

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
