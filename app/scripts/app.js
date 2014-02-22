'use strict';

angular.module('chalkupStartApp', ['ui.router', 'restangular', 'angularSpinner', 'angularMoment'])
    .run(function ($window, $rootScope, $state) {
        // foundation init when displaying view/include
        $rootScope.$on('$viewContentLoaded', function () {
            $(document).foundation();
        });
        $rootScope.$on('$includeContentLoaded', function () {
            $(document).foundation();
        });

        $rootScope.$state = $state;

        $window.moment.lang('de');
    });


angular.module('chalkupStartApp')
    .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {

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
                        controller: function ($scope, $rootScope) {
                            $scope.save = function () {
                                $rootScope.$broadcast('SAVE-SESSION');
                            }
                            $scope.delete = function() {
                                $rootScope.$broadcast('DELETE-SESSION');
                            }
                        }
                    }
                }
            });

        RestangularProvider.setBaseUrl('http://demo.chalkup.de')
    });