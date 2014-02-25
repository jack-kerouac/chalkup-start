
angular.module('chalkupStartApp')
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, userServiceProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('start', {
                url: "/",
                views: {
                    content: {
                        templateUrl: "views/start.html",
                        controller: 'StartCtrl'
                    },
                    navbar: { templateUrl: "views/navbar/start.navbar.html" }
                }
            })
            .state('stats', {
                url: "/stats",
                views: {
                    content: {
                        templateUrl: "views/stats.html",
                        controller: 'StatsCtrl'
                    },
                    navbar: { templateUrl: "views/navbar/stats.navbar.html" }
                }
            })
            .state('create-session', {
                url: "/createSession",
                views: {
                    content: {
                        templateUrl: "views/create-session.html",
                        controller: 'CreateSessionCtrl'
                    },
                    navbar: { templateUrl: "views/navbar/create-session.navbar.html" }
                }
            })
            .state('edit-session', {
                url: "/editSession?id",
                views: {
                    content: {
                        templateUrl: "views/edit-session.html",
                        controller: 'EditSessionCtrl'
                    },
                    navbar: {
                        templateUrl: "views/navbar/edit-session.navbar.html",
                        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                            $scope.save = function () {
                                $rootScope.$broadcast('SAVE-SESSION');
                            }
                            $scope.delete = function() {
                                $rootScope.$broadcast('DELETE-SESSION');
                            }
                        }]
                    }
                }
            });


        // send Cookie along with the CORS AJAX requests
        $httpProvider.defaults.withCredentials = true;

        var host = 'http://demo.chalkup.de';

        RestangularProvider.setBaseUrl(host + '/rest/v1');

        userServiceProvider.setLoginUrl(host + '/loginOrRegister');
        userServiceProvider.setLogoutUrl(host + '/j_spring_security_logout');
        userServiceProvider.setLoginStatusUrl(host + '/loginStatus');
    });
