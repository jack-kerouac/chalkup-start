'use strict';

angular.module('chalkupStartApp')
    .controller('StartCtrl', function ($scope, $http, $modal, $state, userService, navBarService, feedbackService, CAN_LOGIN) {
        var openLogin = function () {
            $modal.open({
                template: '<div class="column" ng-include="\'/views/login.html\'"></div>' +
                    '<a class="close-reveal-modal" ng-click="$dismiss()">&#215;</a>',
                windowClass: 'small'
            });
        };

        $scope.openLogin = openLogin;

        $scope.demoLogin = function() {
            userService.demoLogin().then(function() {
                $state.go('stats');
            });
        };

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
            if(CAN_LOGIN) {
                navBarService.addMenuItem({
                    label: 'Anmelden',
                    action: function() {
                        openLogin();
                    }
                });
            }
            navBarService.addMenuItem({
                label: 'Feedback',
                action: function() {
                    feedbackService.openFeedbackPanel();
                }
            });
        };

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

    });
