'use strict';

angular.module('chalkupStartApp')
    .controller('StartCtrl', function ($scope, $http, $modal, userService, navBarService, feedbackService) {
        var openLogin = function () {
            $modal.open({
                template: '<div class="column" ng-include="\'/views/login.html\'"></div>' +
                    '<a class="close-reveal-modal" ng-click="$dismiss()">&#215;</a>',
                windowClass: 'small'
            });
        };

        $scope.openLogin = openLogin;

        var setLoggedInMenu = function() {
            navBarService.addMenuItem({
                label: 'Statistik',
                state: 'stats'
            });
            navBarService.addMenuItem({
                label: 'Feedback',
                action: function() {
                    feedbackService.openFeedbackPanel();
                }
            });
            navBarService.addMenuItem({
                label: 'Abmelden',
                action: function() {
                    $scope.user.logout();
                }
            });
        };

        var setLoggedOutMenu = function() {
            navBarService.addMenuItem({
                label: 'Anmelden',
                action: function() {
                    openLogin();
                }
            });
            navBarService.addMenuItem({
                label: 'Feedback',
                action: function() {
                    feedbackService.openFeedbackPanel();
                }
            });
        }

        userService.onLoginStatusChange($scope, function(loggedIn, user) {
            navBarService.clearNavBar();
            if(loggedIn) {
                setLoggedInMenu();
            }
            else {
                setLoggedOutMenu();
            }
        });

        if(userService.isLoggedIn()) {
            setLoggedInMenu();
        }
        else {
            setLoggedOutMenu();
        }


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
