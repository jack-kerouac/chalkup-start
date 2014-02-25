'use strict';

angular.module('chalkupStartApp')
    .controller('StartCtrl', function ($scope, $http, $state, $timeout, navBarService) {
        $scope.logout = function() {
            $scope.user.logout();
            // this is required since the state does not change and thus the navBar is not emptied and this
            // controller is not initialized again
            navBarService.clearNavBar();
        }

        $scope.$watch('user.isLoggedIn()', function(loggedIn) {
            if(loggedIn) {
                navBarService.addMenuItem({
                    label: 'Statistik',
                    state: 'stats'
                });
                navBarService.addMenuItem({
                    label: 'Abmelden',
                    action: function() {
                        $scope.logout();
                    }
                });
            }
        });
        navBarService.addMenuItem({
            label: 'Feedback',
            action: function() {
                UserVoice.push(['show', { mode: 'contact' }]);
            }
        });

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
        };

        $scope.loginAndRedirect = function(credentials) {
            var login = $scope.user.login(credentials);
            login.then(function() {
                $state.go('stats');
            });
        };

    });
