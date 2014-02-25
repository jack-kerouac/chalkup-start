'use strict';

angular.module('chalkupStartApp')
    .controller('StartCtrl', function ($scope, $http, $state, navBarService) {
        $scope.logout = function() {
            $scope.user.logout();
            // this is required since the state does not change and thus the navBar is not emptied and this
            // controller is not initialized again
            navBarService.clearNavBar();
        }

        if($scope.user.isLoggedIn()) {
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
