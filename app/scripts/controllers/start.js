'use strict';

angular.module('chalkupStartApp')
    .controller('StartCtrl', function ($scope, $http, $modal, navBarService, feedbackService) {
        var openLogin = function () {
            var modalInstance = $modal.open({
                template: '<div class="column" ng-include="\'/views/login.html\'"></div>' +
                    '<a class="close-reveal-modal" ng-click="$dismiss()">&#215;</a>',
                windowClass: 'small'
            });
        };

        $scope.openLogin = openLogin;

        // watching the login status is required since upon initializing this controller, the login state is not clear yet.
        var unregisterLoggedInMenuWatcher = $scope.$watch('user.isLoggedIn()', function(loggedIn) {
            if(loggedIn) {
                navBarService.addMenuItem({
                    label: 'Statistik',
                    state: 'stats'
                });
                navBarService.addMenuItem({
                    label: 'Abmelden',
                    action: function() {
                        $scope.user.logout();
                    }
                });
            }
            else {
                navBarService.addMenuItem({
                    label: 'Anmelden',
                    action: function() {
                        openLogin();
                    }
                });
            }
        });
        navBarService.addMenuItem({
            label: 'Feedback',
            action: function() {
                feedbackService.openFeedbackPanel();
            }
        });

        $scope.openFeedbackPanel = feedbackService.openFeedbackPanel;

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

    });
